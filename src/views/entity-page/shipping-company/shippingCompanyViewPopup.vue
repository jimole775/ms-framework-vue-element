<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="船公司及货代公司-view"
      top="10vh"
      @close="close"
    >
      <div>
        <el-tabs v-loading="loading" :tab-position="windowWidth < 768 ? 'top' : 'left'">
          <el-tab-pane label="基础">
            <el-form :inline="true" class="demo-form-inline">
              <el-row>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  公司编码:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.code }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  公司名称:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.name }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  公司简称:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.simplifyName }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  到期时间:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.validityTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  状态:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.shippingCompanyStatus | ShippingCompanyStatusFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  审核状态:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.shippingCompanyDataStatus | ShippingCompanyDataStatusFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  类型:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.shippingCompanyType | ShippingCompanyTypeFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  货代类型:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.shippingCompanyProxyType | ShippingCompanyProxyTypeFilter }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  资格证书号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.certificateCode }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  账户名:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.accountName }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  账户号:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.account }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  证书到期:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.certificateValidityTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  订舱费:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.charterFee }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  安保费:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.securityCost }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  VGM费用:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.vgmCost }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  操作费用:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.operationCost }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  电子邮件:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.email }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  地址:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.address }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  备注:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  {{ viewData.remark }}
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  列入黑名单:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-tag :type="viewData.blacklist === true ? 'success' : 'danger'">
                    {{ viewData.blacklist === true ? '是' : '否' }}
                  </el-tag>
                </el-col>
                <el-col :lg="2" :md="3" :sm="4" :xs="7" class="data-col-title">
                  是否删除:
                </el-col>
                <el-col :lg="4" :md="5" :sm="8" :xs="17" class="data-col-content">
                  <el-tag :type="viewData.isDelete === true ? 'success' : 'danger'">
                    {{ viewData.isDelete === true ? '是' : '否' }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="openEdit">编辑</el-button>
      </div>
    </el-dialog>
    <component v-if="showEdit" :is="'ShippingCompanyEditPopup'" :id="id" @close="showEdit = false" />
  </div>
</template>

<script>
import shippingCompanyServer from './../../../api/shippingCompanyServer'
import ShippingCompanyStatusEnumUtil from './../../../components/enum/shipping-company/ShippingCompanyStatusEnumUtil'
import ShippingCompanyDataStatusEnumUtil from './../../../components/enum/shipping-company/ShippingCompanyDataStatusEnumUtil'
import ShippingCompanyTypeEnumUtil from './../../../components/enum/shipping-company/ShippingCompanyTypeEnumUtil'
import ShippingCompanyProxyTypeEnumUtil from './../../../components/enum/shipping-company/ShippingCompanyProxyTypeEnumUtil'

export default {
  name: 'ShippingCompanyViewPopup',
  components: {
    ShippingCompanyEditPopup: () => import('./shippingCompanyEditPopup.vue')
  },
  filters: {
    ShippingCompanyStatusFilter: ShippingCompanyStatusEnumUtil.toTitleFilter,
    ShippingCompanyDataStatusFilter: ShippingCompanyDataStatusEnumUtil.toTitleFilter,
    ShippingCompanyTypeFilter: ShippingCompanyTypeEnumUtil.toTitleFilter,
    ShippingCompanyProxyTypeFilter: ShippingCompanyProxyTypeEnumUtil.toTitleFilter,
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      loading: true,
      showEdit: false,
      viewData: {}
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
    this.viewData = {}
    if (this.id) {
      this.getData()
    }
  },
  methods: {
    openEdit() {
      this.showEdit = true
    },
    close() {
      this.$emit('close')
    },
    async getData() {
      const res = await shippingCompanyServer.get(this.id)
      this.viewData = res.data
      this.loading = false
    },
  }
}
</script>

<style scoped>
</style>
