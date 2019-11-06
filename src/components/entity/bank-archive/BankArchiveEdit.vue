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
              <el-form-item label="单号" required prop="code">
                <el-input v-model="formData.code" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="状态" prop="status">
                <BankArchiveStatusEnumSelect v-model="formData.status" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="银行编号(Swift)" prop="swiftCode">
                <el-input v-model="formData.swiftCode" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="联系人" prop="contact">
                <el-input v-model="formData.contact" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="银行名称(英文)" required prop="bankNameEn">
                <el-input v-model="formData.bankNameEn" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="银行名称(中文)" prop="bankNameZh">
                <el-input v-model="formData.bankNameZh" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="银行地址(英文)" required prop="address">
                <el-input v-model="formData.address" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="邮编" prop="postcode">
                <el-input v-model="formData.postcode" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="电话" prop="tel">
                <el-input v-model="formData.tel" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="传真" prop="fax">
                <el-input v-model="formData.fax" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="网址" prop="url">
                <el-input v-model="formData.url" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="法人代表" prop="legalRepresentative">
                <el-input v-model="formData.legalRepresentative" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="成立日期" prop="registrationDate">
                <el-date-picker
                  v-model="formData.registrationDate"
                  size="mini"
                  class="max-w"
                  type="datetime"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="营业额" prop="turnover">
                <el-input-number v-model="formData.turnover" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="利润" prop="profit">
                <el-input-number v-model="formData.profit" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="总利润" prop="totalAssets">
                <el-input-number v-model="formData.totalAssets" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="自有资本(USD)" prop="theirOwnCapital">
                <el-input-number v-model="formData.theirOwnCapital" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="股东" prop="shareholder">
                <el-input v-model="formData.shareholder" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="员工人数" prop="employeeNumber">
                <el-input-number v-model="formData.employeeNumber" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="分支数目(个)" prop="forkNumber">
                <el-input-number v-model="formData.forkNumber" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="自有资本比例(%)" prop="theirOwnCapitalRatio">
                <el-input-number v-model="formData.theirOwnCapitalRatio" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="所属银行集团名" prop="belongBankName">
                <el-input v-model="formData.belongBankName" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="所属银行集团swift" prop="belongBankSwift">
                <el-input v-model="formData.belongBankSwift" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="国际排名" prop="internationalRank">
                <el-input-number v-model="formData.internationalRank" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="国内排名" prop="inlandRank">
                <el-input-number v-model="formData.inlandRank" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="remark">
                <el-input v-model="formData.remark" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="是否删除" prop="isDelete">
                <el-switch v-model="formData.isDelete" size="mini" />
              </el-form-item>
            </el-col>
            
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="国家" prop="areaId">
                <AreaSelect v-model="formData.areaId" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="经营单位" prop="departmentId">
                <DepartmentSelect v-model="formData.departmentId" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import bankArchiveServer from './../../../api/bankArchiveServer'
import AreaSelect from './../area/AreaSelect'
import DepartmentSelect from './../department/DepartmentSelect'

import BankArchiveStatusEnumSelect from './../../../components/entity/bank-archive/BankArchiveStatusEnumSelect'
const emptyFormData = {
  code: null,
  status: null,
  swiftCode: null,
  contact: null,
  bankNameEn: null,
  bankNameZh: null,
  address: null,
  postcode: null,
  tel: null,
  fax: null,
  url: null,
  legalRepresentative: null,
  registrationDate: null,
  turnover: null,
  profit: null,
  totalAssets: null,
  theirOwnCapital: null,
  shareholder: null,
  employeeNumber: null,
  forkNumber: null,
  theirOwnCapitalRatio: null,
  belongBankName: null,
  belongBankSwift: null,
  internationalRank: null,
  inlandRank: null,
  remark: null,
  isDelete: null,
  areaId: null,
  departmentId: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'BankArchiveEdit',
  components: {
    AreaSelect,
    DepartmentSelect,
    BankArchiveStatusEnumSelect,
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
        code: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        status: [
        ],
        swiftCode: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        contact: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        bankNameEn: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        bankNameZh: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 512, message: '长度在 0 到 512 个字符', trigger: 'blur' },
        ],
        postcode: [
          { min: 0, max: 12, message: '长度在 0 到 12 个字符', trigger: 'blur' },
        ],
        tel: [
          { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' },
        ],
        fax: [
          { min: 0, max: 32, message: '长度在 0 到 32 个字符', trigger: 'blur' },
        ],
        url: [
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' },
        ],
        legalRepresentative: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        registrationDate: [
        ],
        turnover: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        profit: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        totalAssets: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        theirOwnCapital: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        shareholder: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        employeeNumber: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        forkNumber: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        theirOwnCapitalRatio: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        belongBankName: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        belongBankSwift: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        internationalRank: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        inlandRank: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        areaId: [
        ],
        departmentId: [
        ],
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
    close() {
      this.$emit('close')
    },
    async getData() {
      this.loading = true
      const res = await bankArchiveServer.get(this.id)
      initFormData = res.data
      this.formData = {
        ...res.data
      }
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.formData.id) {
              await bankArchiveServer.put(this.formData)
            } else {
              const res = await bankArchiveServer.post(this.formData)
              this.formData.id = res.data.id
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
