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
              <el-form-item label="工厂" prop="werks">
                <el-input v-model="formData.werks" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="手册号&amp;合同" prop="bktxt">
                <el-input v-model="formData.bktxt" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="物料" prop="matnr">
                <el-input v-model="formData.matnr" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="物料描述" prop="maktx">
                <el-input v-model="formData.maktx" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="入库数量" prop="rksl">
                <el-input-number v-model="formData.rksl" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出库数量" prop="cksl">
                <el-input-number v-model="formData.cksl" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="报废数量" prop="bfsl">
                <el-input-number v-model="formData.bfsl" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="完工数量" prop="wgsl">
                <el-input-number v-model="formData.wgsl" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="发货数量" prop="fhsl">
                <el-input-number v-model="formData.fhsl" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开票数量" prop="kpsl">
                <el-input-number v-model="formData.kpsl" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="实物库存" prop="swsl">
                <el-input-number v-model="formData.swsl" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="进出口库存" prop="jcksl">
                <el-input-number v-model="formData.jcksl" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="结转数量" prop="jzsl">
                <el-input-number v-model="formData.jzsl" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="已结转" prop="yjz">
                <el-input v-model="formData.yjz" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="已年结" prop="ynj">
                <el-input v-model="formData.ynj" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="结转手册号" prop="handbookCk">
                <el-input v-model="formData.handbookCk" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="备注" prop="note">
                <el-input v-model="formData.note" size="mini" />
              </el-form-item>
            </el-col>
            
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import feedRegisterServer from './../../../api/feedRegisterServer'

const emptyFormData = {
  werks: null,
  bktxt: null,
  matnr: null,
  maktx: null,
  rksl: null,
  cksl: null,
  bfsl: null,
  wgsl: null,
  fhsl: null,
  kpsl: null,
  swsl: null,
  jcksl: null,
  jzsl: null,
  yjz: null,
  ynj: null,
  handbookCk: null,
  note: null,
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'FeedRegisterEdit',
  components: {
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
        werks: [
        ],
        bktxt: [
        ],
        matnr: [
        ],
        maktx: [
        ],
        rksl: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        cksl: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        bfsl: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        wgsl: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        fhsl: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        kpsl: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        swsl: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        jcksl: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        jzsl: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        yjz: [
        ],
        ynj: [
        ],
        handbookCk: [
        ],
        note: [
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
      const res = await feedRegisterServer.get(this.id)
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
              await feedRegisterServer.put(this.formData)
            } else {
              const res = await feedRegisterServer.post(this.formData)
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
