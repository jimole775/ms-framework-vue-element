<template>
  <div class="container">
    <el-form
      :model="formData"
      :ref="'formData'"
      :rules="rules"
      class="demo-form-inline"
      label-position="right"
      label-width="120px">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="原密码" prop="oldPass">
            <el-input v-model="formData.oldPass" type="password" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="新密码" prop="newPass">
            <el-input v-model="formData.newPass" type="password" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="确认密码" prop="confirmPass">
            <el-input v-model="formData.confirmPass" type="password" size="mini" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="max-w">
      <div class="f-r">
        <el-button v-loading="loading" type="primary" size="mini" @click="cancel">取消</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="save">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import userInfoServer from './../../api/userInfoServer'
import { removeToken, removeUserCode } from '@/utils/auth'

const emptyFormData = {
  oldPass: null,
  newPass: null,
  confirmPass: null,
}
export default {
  name: 'ChangePassword',
  components: {},
  props: {},
  data() {
    return {
      loading: false,
      formData: {
        ...emptyFormData
      },
      rules: {
        oldPass: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        newPass: [
          { required: true, message: '不能为空', trigger: 'blur' },
          {
            message: '密码必须8位以上，并且包含大小写和字母',
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,32}$/.test(value)) {
                callback(new Error('密码必须8位以上，并且包含大小写和字母'))
              } else {
                callback()
              }
            }
          },
        ],
        confirmPass: [
          { required: true, message: '不能为空', trigger: 'blur' },
          {
            message: '密码必须8位以上，并且包含大小写和字母',
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,32}$/.test(value)) {
                callback(new Error('密码必须8位以上，并且包含大小写和字母2'))
              } else {
                callback()
              }
            }
          },
        ],
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  watch: {},
  created() {
    console.log('is load')
  },
  methods: {
    cancel() {
      window.eventBus.$emit('closePage', 'ChangePassword')
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.formData.newPass !== this.formData.confirmPass) {
              this.$message({
                message: '新密码必须和确认密码相同',
                type: 'warning'
              })
              reject('error submit!!')
              return
            }
            const postData = {
              newUserPwd: this.$md5(this.formData.newPass),
              oldUserPwd: this.$md5(this.formData.oldPass),
            }
            const res = await userInfoServer.put(postData)
            if (Number.parseInt(res.data.code) === 200) {
              this.$message({
                message: '修改成功,请重新登录',
                type: 'success'
              })
              resolve({
                ...this.formData
              })
              // 退出登录
              setTimeout(() => {
                localStorage.removeItem('entid')
                removeToken()                
                console.log('修改密码，清除登陆信息')
                removeUserCode()
                location.href = '/'
              }, 1000)
            } else {
              this.$message({
                message: res.data.msg,
                type: 'warning'
              })
              reject('error submit!!')
            }
          } else {
            this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
            reject('error submit!!')
          }
        })
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form-item {
    width: 100%;
    margin-right: 0;
  }
  /deep/.el-form-item__label{
    width:  130px!important;
  }
  /deep/.el-form-item__content{
    margin-left: 130px!important;
  }
  /deep/.el-form-item__error{
    padding-top: 0;
  }
</style>
