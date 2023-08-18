<script lang="ts" setup>
import { ref } from 'vue'
import dayjs from 'dayjs'
import DicSelect from '../DicSelect/DicSelect.vue'
import type { FormInstance, FormRules } from 'element-plus'

interface IProps {
  form: any[]
  rules?: FormRules
  cols?: number
  attr?: any
  disabled?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  cols: 4,
  disabled: true
})

const formRef = ref<FormInstance>()

const formData = ref<{ [k: string]: any }>({})

let formRow: any[] = []

const span = parseInt(24 / props.cols + '')

const init = () => {
  let a = 0 // 控制 formRow的行维度
  let b = 0 // 控制 formRow的列维度
  let formValue: { [k: string]: any } = {}
  props.form.forEach((x) => {
    formValue[x.prop] = x.value
      ? x.type === 'datepicker'
        ? dayjs(x.value).format(x.attr?.format ?? 'YYYY-MM-DD')
        : x.value || ''
      : ''

    if (props.disabled && !x.attr?.disabled) x.attr = { ...x.attr, disabled: true }

    x.span = x.span ?? span

    if (formRow[a]) formRow[a].push(x)
    else formRow[a] = [x]

    if ((b += x.span) >= 24) {
      b = 0
      a++
    }
  })

  formData.value = formValue
}

init()

const submit = () => {}

defineExpose({
  submit
})
</script>

<template>
  <div class="hr-from">
    <el-form ref="formRef" :model="formData" :rules="rules" v-bind="attr">
      <el-row :gutter="20" v-for="(row, index) in formRow" :key="index">
        <el-col :span="col.span" v-for="col in row" :key="col.prop">
          <el-form-item :label="col.label" :prop="col.prop" v-bind="col.colattr">
            <template v-if="col.type === 'select'">
              <el-select v-model="formData[col.prop]" v-bind="col.attr" style="width: 100%">
                <el-option
                  v-for="item in col.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
            <template v-else-if="col.type === 'dic-select'">
              <DicSelect
                v-model="formData[col.prop]"
                :label="col.dic || col.label"
                v-bind="col.attr"
              />
            </template>
            <template v-else-if="col.type === 'date-picker'">
              <el-date-picker
                v-model="formData[col.prop]"
                type="date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                placeholder="请选择"
                v-bind="col.attr"
                style="width: 100%"
              />
            </template>
            <template v-else-if="col.type === 'cascader'">
              <el-cascader
                v-model="formData[col.prop]"
                :options="col.options"
                v-bind="col.attr"
                style="width: 100%"
              />
            </template>
            <template v-else>
              <el-input v-model="formData[col.prop]" placeholder="请输入" v-bind="col.attr" />
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
