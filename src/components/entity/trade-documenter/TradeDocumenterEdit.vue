<template>
  <div class="max-w">
    <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
      <el-tab-pane label="基础">
        <el-form
          :model="formData"
          :ref="'formData'"
          :rules="rules"
          class="demo-form-inline"
          label-position="right"
          label-width="120px"
        >
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="人员名称" prop="name">
                <PersonSelect v-model="formData.name" @changeData="changePerson"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="人员类型" prop="type">
                <TradeDocumenterTypeEnumSelect v-model="formData.type"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="传真" prop="fax">
                <el-input v-model="formData.fax" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="Tel" prop="tel">
                <el-input v-model="formData.tel" size="mini" clearable/>
              </el-form-item>
            </el-col>
            <el-col v-if="formData.id" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="创建人" prop="createUser">
                <el-input v-model="formData.createUser" disabled size="mini"/>
              </el-form-item>
            </el-col>
            <el-col v-if="formData.id" :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="创建时间" prop="createDate">
                <el-date-picker
                  v-model="formData.createDate"
                  disabled
                  class="max-w"
                  type="datetime"
                  placeholder="选择日期"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="部门" prop="orgIds">
                <DepartmentSelect
                  v-model="formData.orgIds"
                  type="multiple"
                  @changeData="changeDepartment"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import tradeDocumenterServer from './../../../api/tradeDocumenterServer'
import DepartmentSelect from './../department/DepartmentSelect'
import PersonSelect from './../person/PersonSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'

import TradeDocumenterTypeEnumSelect from './../../../components/entity/trade-documenter/TradeDocumenterTypeEnumSelect'
const emptyFormData = {
  id: null,
  name: null,
  userCode: null,
  type: null,
  fax: null,
  tel: null,
  createUser: null,
  createDate: null,
  orgIds: [],
  orgNames: null
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'TradeDocumenterEdit',
  components: {
    DepartmentSelect,
    PersonSelect,
    OperateUnitSelect,
    TradeDocumenterTypeEnumSelect
  },
  props: {
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
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        type: [{ required: true, message: '不能为空', trigger: 'blur' }],
        fax: [
          { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
        ],
        orgIds: [],
        tel: [
          { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' }
        ],
        createUser: [],
        createDate: [],
        orgNames: []
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  watch: {
    id(val) {
      if (val !== this.initFormData.id) {
        this.getData()
      }
    },
    loading(val) {
      this.$emit('loadingChange', val)
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
    changePerson(data) {
      this.formData.userCode = data.userCode
    },
    close() {
      this.$emit('close')
    },
    changeDepartment(res) {
      const orgNames = []
      if (res) {
        res.forEach(element => {
          orgNames.push(element.name)
        })
      }
      this.formData.orgNames = orgNames.join(',')
    },
    async getData() {
      this.loading = true
      try {
        const res = await tradeDocumenterServer.get(this.id)
        initFormData = res
        this.formData = {
          ...res
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.id) {
              const res = await tradeDocumenterServer.put(this.formData)
              if (Number.parseInt(res.data.code) === 200) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
              } else if (res.data.code === 500) {
                this.$message({
                  message: '该单证人员已存在',
                  type: 'warning'
                })
                return
              } else {
                this.$message.error(res.data.msg)
              }
              this.formData.id = res.data.id
            } else {
              this.formData.entid = this.$store.getters.entid
              const ress = await tradeDocumenterServer.post(this.formData)
              if (ress.data.code === 200) {
                this.$message({
                  message: ress.data.msg,
                  type: 'success'
                })
              } else if (ress.data.code === 500) {
                this.$message({
                  message: '该单证人员已存在',
                  type: 'warning'
                })
                return
              } else {
                this.$message.error(ress.data.msg)
              }
            }
            initFormData = {
              ...this.formData
            }
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            resolve({
              ...this.formData
            })
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
}
</style>
