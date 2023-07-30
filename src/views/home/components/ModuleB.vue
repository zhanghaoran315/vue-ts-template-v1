<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { sxjrqk } from '@/api/home'
import { ElMessage } from 'element-plus'

const level = ref(1)
const jrqk = ref([
  {
    label: '已接入地市',
    value: 0
  },
  {
    label: '未接入地市',
    value: 0
  },
  {
    label: '已接入区县',
    value: 0
  },
  {
    label: '未接入区县',
    value: 0
  }
])

const chartRef = ref<HTMLDivElement>()

const qxdm = '610000'
const geoName = ref('')
let myChart: echarts.ECharts | null = null
let geoMap: any = null
let featureCollection: any[] = []
let jrqkData: any = null

// 区域突出显示
const getEmphasis = () => ({
  itemStyle: {
    areaColor: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: '#A6CBF7' // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#56AEFF' // 100% 处的颜色
        }
      ]
    }
  },
  label: {
    color: '#fff'
  }
})

const fetchJson = async (url: string) => {
  try {
    const res = await fetch(url)
    return await res.json()
  } catch (error) {
    console.log(error)
  }
}

const getGeoMap = async (qxdm: string) => {
  if (!geoMap) {
    const geo = await fetchJson('geojson/geo.json')

    const getGeoMapItem = (geo: any) => ({
      name: geo.name,
      qxdm: geo.qxdm,
      url: geo.url
    })

    geoMap = { [geo.qxdm]: getGeoMapItem(geo) }

    const eachGeo = (data: any[]) => {
      data &&
        data.forEach((x) => {
          geoMap[x.qxdm] = getGeoMapItem(x)

          if (x.children && x.children.length) eachGeo(x.children)
        })
    }

    eachGeo(geo.children)
    console.log(geoMap)
  }

  return geoMap[qxdm]
}

interface IMapOption {
  ywqk: any[]
}

const getMapOption = ({ ywqk }: IMapOption) => {
  return {
    geo: {
      map: geoName.value,
      silent: true,
      roam: false,
      layoutSize: '97%',
      layoutCenter: ['50%', '50%']
    },
    tooltip: {
      show: true,
      padding: 0,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: 'rgba(255,255,255, 0.4)',
      formatter: (params: any) => getHtmlStr(params)
    },
    series: [
      {
        name: '业务情况',
        type: 'map',
        map: geoName.value,
        roam: false,
        layoutSize: '97%',
        layoutCenter: ['50%', '50%'],
        label: {
          show: true,
          color: '#333'
        },
        itemStyle: {
          areaColor: '#e4f0ff',
          borderColor: '#9DBFE5',
          borderWidth: 1
        },
        emphasis: getEmphasis(),
        select: {
          disabled: true
        },
        data: ywqk
      }
    ]
  }
}

const getFeatureCollection = (geojson: any) => {
  return (
    geojson &&
    geojson.features &&
    geojson.features.map((x: any) => ({
      adcode: x.properties.adcode,
      center: x.properties.center,
      name: x.properties.name
    }))
  )
}

const updateMap = async (qxdm: string) => {
  // 获取对应的信息
  const mapInfo = await getGeoMap(qxdm)

  geoName.value = mapInfo.name

  // 注册地图
  const geoJson = await fetchJson(mapInfo.url)

  echarts.registerMap(geoName.value, { geoJSON: geoJson } as any)

  featureCollection = getFeatureCollection(echarts.getMap(geoName.value).geoJSON)

  console.log('featureCollection: ', featureCollection)
}

// 市级的数据处理
const handleCityData = (data: any[]) => {
  // series.map.data
  const ywqk: any[] = []
  // 下面4个是总数
  // 未接入地市
  let wjrdsTotal = 0
  // 已接入地市
  let yjrdsTotal = 0
  // 已接入区县
  let yjrqxTotal = 0
  // 未接入区县
  let wjrqxTotal = 0

  // 这里是10个地市，遍历的是地市数据
  featureCollection.forEach((x: any) => {
    // 这个x其实是一个地市
    // 而item才是这个地市下的区县
    let item = data[x.adcode] || []

    let dataItem = null

    // x地市下区县总数
    const total = item.length

    // x地市下已接入区县数
    const count = item.filter((x: any) => x.sfjr == '1').length

    dataItem = {
      name: x.name, // item的name
      value: [x.adcode, count, total - count]
    }

    // 已接入区县和未接入区县计入总数
    yjrqxTotal += count
    wjrqxTotal += total - count

    // 地市下面有区县接入，则该地市已接入，加入regions
    if (count) {
      // 该地市已接入
      dataItem = {
        ...dataItem,
        ...getEmphasis()
      }
      yjrdsTotal++
    } else {
      // 该地市未接入
      wjrdsTotal++
    }

    ywqk.push(dataItem)
  })

  jrqk.value = [
    {
      label: '已接入地市',
      value: yjrdsTotal
    },
    {
      label: '未接入地市',
      value: wjrdsTotal
    },
    {
      label: '已接入区县',
      value: yjrqxTotal
    },
    {
      label: '未接入区县',
      value: wjrqxTotal
    }
  ]

  myChart?.setOption(getMapOption({ ywqk }))
}

// 区县的数据处理
const handleDistrictData = (data: any[]) => {
  const ywqk: any[] = []
  // 已接入区县
  let yjrqxTotal = 0
  // 未接入区县
  let wjrqxTotal = 0

  // 这里是区县的数据，遍历的是区县
  featureCollection.forEach((x: any) => {
    const item = data.find((d: any) => d.qydm == x.adcode) ?? {}

    let dataItem: any = { name: x.name, value: x.adcode }

    if (item.sfjr == '1') {
      dataItem = {
        ...dataItem,
        ...getEmphasis()
      }
      yjrqxTotal++
    } else {
      wjrqxTotal++
    }

    if (x.name === '印台区') {
      // 对印台区的label做特殊处理
      dataItem.label = {
        show: true,
        offset: [50, 0],
        position: 'insideBottomRight'
      }
    }

    ywqk.push(dataItem)
  })

  jrqk.value = [
    {
      label: '已接入区县',
      value: yjrqxTotal
    },
    {
      label: '未接入区县',
      value: wjrqxTotal
    }
  ]

  myChart?.setOption(getMapOption({ ywqk }))
}

const initEchart = async () => {
  try {
    myChart = echarts.init(chartRef.value)

    myChart.on('click', (params) => {
      handleAreaClick(params)
    })

    const res = await sxjrqk()

    if (!res.success) throw res.message || '查询失败！'

    jrqkData = res.data

    console.log('接入情况：', res)

    await updateMap(qxdm)

    handleCityData(res.data)
  } catch (error) {
    ElMessage.error(error as string)
  }
}

const handleAreaClick = async (params: any) => {
  console.log('地图的点击：', params)

  if (level.value === 2) return

  const adcode = params.value

  level.value = 2
  await updateMap(adcode)

  const data = jrqkData[adcode]

  console.log('data: ', data)

  handleDistrictData(data)
}

onMounted(() => {
  initEchart()

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  myChart?.dispose()

  window.removeEventListener('resize', handleResize)
})

const getHtmlStr = (params: { data: { name: string; value: number[] } }) => {
  const { data } = params

  if (!data || !Array.isArray(data.value)) return

  return `
    <div class="ps-center-map-tooltip">
      <div class="top-name">接入情况</div>
      <div class="top-area">${data?.name}</div>
      <div class="info-box">
        <div class="item"><i></i><span>已接入：</span><b>${data?.value[1]}</b></div>
        <div class="item"><i></i><span>未接入：</span><b>${data?.value[2]}</b></div>
      </div>
    </div>
  `
}

const onBack = async () => {
  await updateMap(qxdm)
  level.value = 1
  handleCityData(jrqkData)
}

const handleResize = () => myChart?.resize()
</script>

<template>
  <div class="module-b">
    <div class="top-panel">
      <div class="top-panel-item" v-for="(item, index) in jrqk" :key="index">
        <p class="top">
          <span class="num">{{ item.value }}</span>
          个
        </p>
        <p class="title">{{ item.label }}</p>
      </div>
    </div>
    <div class="map-box" ref="chartRef"></div>
    <div class="bottom-panel">
      <div class="legend">
        <div class="legend-box legend-yjr"></div>
        已接入地区
      </div>
      <div class="legend">
        <div class="legend-box legend-wjr"></div>
        未接入地区
      </div>
    </div>
    <div class="count-back">
      <el-button size="small" v-if="level === 2" @click="onBack">返回</el-button>
    </div>
  </div>
</template>

<style>
.ps-center-map-tooltip {
  padding: 12px;
  background: #ffffff;
  box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
}
</style>

<style scoped lang="scss">
.module-b {
  height: 100%;
  position: relative;

  .map-box {
    height: 100%;
    width: 100%;
  }

  .top-panel,
  .bottom-panel,
  .count-back {
    position: absolute;
  }

  .top-panel {
    width: 100%;
    top: 20px;
    left: 0px;
    display: flex;
    justify-content: space-between;

    .top-panel-item {
      flex: 1;
      text-align: center;
      .top {
        line-height: 27px;
        .num {
          font-size: 30px;
          font-weight: bold;
          margin-right: 3px;
          color: #333333;
        }
      }
      .title {
        color: #8898ac;
      }
    }
  }

  .bottom-panel {
    left: 12px;
    bottom: 12px;
    .legend {
      color: #8898ac;
      margin-bottom: 12px;
      margin-right: 12px;
      &-box {
        width: 23px;
        height: 12px;
        display: inline-block;
        margin-right: 3px;
      }

      &-yjr {
        background: linear-gradient(180deg, #a6cbf7 0%, #5c9ae3 100%);
      }

      &-wjr {
        background: #e4f0ff;
      }
    }
  }

  .count-back {
    right: 0;
    top: 0;
    left: auto;
    z-index: 100;
  }
}
</style>
