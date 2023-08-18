// 查询信息
export const cxxxFormConfig = [
  {
    title: '基本信息',
    form: [
      { label: '查询任务单号', prop: 'cxqqdh', value: '' },
      { label: '登记机构', prop: 'fycxjgmc', value: '' },
      { label: '文书编号', prop: 'wsbh', value: '' },
      { label: '查询法律文书名称', prop: 'ckh', value: '' },
      { label: '来源单位', prop: 'fymc', value: '' },
      { label: '承办法官', prop: 'cbr', value: '' },
      { label: '承办法官工作证编号', prop: 'gzzbh', value: '' },
      { label: '承办法官公务证编号', prop: 'gwzbh', value: '' }
    ]
  },
  {
    title: '查询内容',
    form: [
      { label: '查询主体模式', prop: 'cxztms', value: '' },
      { label: '权利人', prop: 'xm', value: '' },
      {
        type: 'dic-select',
        label: '证件种类',
        prop: 'zjzl',
        value: ''
      },
      { label: '证件号', prop: 'zjh', value: '' }
    ]
  }
]

interface ITaskMenu {
  formConfig: any
  cxrwId: string
  editable: boolean
  rwzt: string
}

// column用在外面的列表，formConfig用在里面的详情页
const JGLX = [
  { title: '预告登记', index: 'Ygdj', value: '9' },
  { title: '抵押权登记', index: 'Dydj', value: '2' },
  { title: '房地产权', index: 'Fdcq', value: '3' },
  { title: '建设用地使用权', index: 'Jsydsyq', value: '6' },
  { title: '土地使用权', index: 'Tdsyq', value: '8' },
] as const

// 获取数组中元素对象的某个属性的值为新类型
// 1.确定数组的类型 as const ,将这个数组断言为字面量类型
// 2.获取数组的字面量类型
// 3.获取数组里面元素对象的字面量类型的联合
// 4.取对应的属性字面量类型的联合
export type JglxIndex = (typeof JGLX)[number]['index']
export type JglxValue = (typeof JGLX)[number]['value']

// 查询任务的详情菜单
export const inspectionTaskMenu = ({ formConfig, cxrwId, editable, rwzt }: ITaskMenu) => [
  {
    title: '查询信息',
    index: 'Cxxx',
    comp: './Cxxx.vue',
    compAttr: {
      cols: 4,
      formConfig,
      cxrwId,
      editable: false
    }
  },
  {
    title: '协助通知书',
    index: 'Xztzs',
    comp: './Attachment.vue',
    compAttr: {
      cxrwId,
      editable,
      wslx: '3'
    }
  },
  {
    title: '查询反馈',
    index: 'Cxfk',
    children: [
      ...JGLX.map((x) => ({
        title: x.title,
        index: x.index,
        comp: './TaskTable.vue',
        compAttr: {
          rwId: cxrwId,
          djlx: x.index,
          jglx: x.value,
          rwzt,
          editable
        }
      }))
    ]
  },
  {
    title: '协助回执书',
    index: 'Xzhzs',
    comp: './Attachment.vue',
    compAttr: {
      cxrwId,
      editable,
      wslx: '1'
    }
  },
]
