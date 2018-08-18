<template>
  <div>
    <a-form>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='Fail'>
        <a-input placeholder='unavailable choice' />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='Success'>
        <a-date-picker />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='Warning'>
        <a-time-picker />
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='Error'>
        <a-select defaultValue='1'>
          <a-select-option value='1'>Option 1</a-select-option>
          <a-select-option value='2'>Option 2</a-select-option>
          <a-select-option value='3'>Option 3</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label='inline' :labelCol="labelCol" :wrapperCol="wrapperCol">
        <a-col :span="11">
          <a-form-item>
            <a-date-picker style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :span="2">
          <span :style="{ display: 'inline-block', width: '100%', textAlign: 'center' }">
            -
          </span>
        </a-col>
        <a-col :span="11">
          <a-form-item>
            <a-date-picker style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-form-item>

      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label='Success'>
        <a-input-number style="width: 100%" />
      </a-form-item>
      <a-form-item :wrapperCol="wrapperUEditCol">
        <div style="line-height:0;">
          <vue-ueditor-wrap v-model="msg" :config="myConfig"></vue-ueditor-wrap>
        </div>
      </a-form-item>
      <a-form-item :wrapperCol="wrapperButtonCol">
        <a-button-group>
          <a-button>清空</a-button>
          <a-button type='primary'>确认保存</a-button>
        </a-button-group>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>

import VueUeditorWrap from 'vue-ueditor-wrap'

export default {
  components: {
    VueUeditorWrap
  },
  data () {
    return {
      myConfig: {
        serverUrl: '/ueditor/ue',
        initialFrameHeight: 400
      },
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 }
      },
      wrapperUEditCol: {
        span: 14,
        offset: 4
      },
      wrapperButtonCol: {
        xs: { span: 14, offset: 4 },
        sm: { span: 14, offset: 4 }
      },
      msg: ''
    }
  },
  computed: {},
  created () { },
  beforeDestroy () { },
  mounted () { },
  methods: {}
}
</script>
