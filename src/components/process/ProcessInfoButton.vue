<template>
  <div>
    <slot name="left" />
    <template v-for="button in buttons">
      <el-button
        v-loading="loading"
        v-if="button.key === 'save' && (show !== 1 || !show)"
        :key="button.key"
        type="primary"
        icon="el-icon-check"
        size="mini"
        @click="onClick('saveFormData')"
      >
        保存
      </el-button>
      <el-button
        v-loading="loading"
        v-if="button.key === 'start' && (show !== 1 || !show)"
        :key="button.key"
        type="primary"
        icon="el-icon-caret-right"
        size="mini"
        @click="onClick('startProcess')"
      >
        提交
      </el-button>
      <el-button
        v-loading="loading"
        v-if="button.key === 'agree'"
        :key="button.key"
        type="primary"
        icon="el-icon-caret-right"
        size="mini"
        @click="onClick('agreeProcess')"
      >
        同意
      </el-button>
      <el-button
        v-loading="loading"
        v-if="button.key === 'reject'"
        :key="button.key"
        type="danger"
        icon="el-icon-caret-right"
        size="mini"
        @click="onClick('rejectProcess')"
      >
        驳回
      </el-button>
      <el-button
        v-loading="loading"
        v-if="button.key === 'abort'"
        :key="button.key"
        type="danger"
        icon="el-icon-warning"
        size="mini"
        @click="onClick('abortProcess')"
      >
        终止
      </el-button>
    </template>
    <el-button v-loading="loading" icon="el-icon-refresh" size="mini" @click="onClick('resetData')">重置</el-button>
    <slot name="right" />
  </div>
</template>

<script>
  export default {
    name: 'ProcessInfoButton',
    props: {
      id: {
        type: String | Number,
        default: null
      },
      loading: {
        type: Boolean,
        default: false
      },
      show: {
        type: String | Number,
        default: null
      },
      check: {
        type: String | Number,
        default: null
      },
      defaultButtons: {
        type: Array,
        default() {
          return null
        }
      },
      abortAuth: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: 2,
        buttons: [
          {
            key: 'save',
            name: '保存'
          }
        ],
        data: {}
      }
    },
    watch: {
      id(val, oldVal) {
        if ((oldVal == null || oldVal === '') && val != null && val !== '') {
          this.buttons.push({
            key: 'start',
            name: '提交'
          })
        }
      }
    },
    created() {
      if (this.defaultButtons != null) {
        this.buttons = this.defaultButtons
      }
      if (this.id != null) {
        this.buttons.push({
          key: 'start',
          name: '提交'
        })
      }
    },
    methods: {
      onClick(name) {
        this.$emit('emitEvent', { key: name })
      },
      async emitEvent(event) {
        switch (event.key) {
          case 'changeProcessButton':
            {
              this.buttons = event.params.buttons
              let has = false
              this.buttons.forEach(item => {
                if (item.key === 'save') {
                  has = true
                }
              })
              if (!has && this.check === 1) {
                this.buttons.push({
                  key: 'save',
                  name: '保存'
                })
              }
            }
            break
          case 'changeProcessButton2':
            this.buttons = []
            this.buttons.push({
              key: 'abort',
              name: '终止'
            })
            break  
          default:
            break
        }
      }
    }
  }
</script>

<style scoped>

</style>
