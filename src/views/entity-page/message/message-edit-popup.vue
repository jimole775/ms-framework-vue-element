<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      :title="formData.id ? 'message-edit' : 'new-message'"
      top="10vh"
      @close="close"
    >
      <div>
        <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'" style="height: 200px;">
          <el-tab-pane label="基础">
            <el-form
              :inline="true"
              :model="formData"
              :ref="'formData'"
              :rules="rules"
              class="demo-form-inline"
              label-position="top"
            >
              <el-row>
                <el-col :md="8" :sm="12" :xs="24">
                  <el-form-item label="内容" required prop="content">
                    <el-input v-model="formData.content" />
                  </el-form-item>
                </el-col>
                <el-col :md="8" :sm="12" :xs="24">
                  <el-form-item label="类型" required prop="type">
                    <el-input-number v-model="formData.type" />
                  </el-form-item>
                </el-col>
                <el-col :md="8" :sm="12" :xs="24">
                  <el-form-item label="创建时间" required prop="createTime">
                    <el-date-picker
                      v-model="formData.createTime"
                      class="max-w"
                      type="datetime"
                      placeholder="选择日期时间" />
                  </el-form-item>
                </el-col>
                <el-col :md="8" :sm="12" :xs="24">
                  <el-form-item label="用户" required prop="userId">
                    <MassageSelect v-model="formData.userId" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetData">重置</el-button>
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MassageSelect from './../message/message-select'
import messageServer from './../../../api/messageServer'
const emptyFormData = {
  userId: null,
  content: '',
  createTime: null,
  type: null
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'MessageEditPopup',
  components: {
    MassageSelect
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      formData: {
        ...initFormData
      },
      rules: {
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入类型', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '请选择日期时间', trigger: 'change' }
        ],
        userId: [
          { required: true, message: '请选择用户', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
    if (this.id) {
      this.getData()
    } else {
      initFormData = {
        ...emptyFormData
      }
      this.formData = {
        ...emptyFormData
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async getData() {
      this.loading = true
      const res = await messageServer.get(this.id)
      initFormData = res.data
      this.formData = {
        ...res.data
      }
      this.loading = false
    },
    save() {
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          if (this.formData.id) {
            await messageServer.put(this.formData)
          } else {
            const res = await messageServer.post(this.formData)
            this.formData.id = res.data.id
          }
          initFormData = {
            ...this.formData
          }
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$emit('update', {
            ...this.formData
          })
        } else {
          this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
          console.log('error submit!!')
        }
      })
    },
    resetData() {
      this.formData = {
        ...initFormData
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form-item {
    width: 100%;
    margin-right: 0;
    /deep/ .el-form-item__content {
      width: calc(100% - 12px);
    }
  }
</style>
