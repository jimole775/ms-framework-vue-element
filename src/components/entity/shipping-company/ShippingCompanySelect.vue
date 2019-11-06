<template>
  <el-select
    :remote-method="remoteMethod"
    :loading="loading"
    :multiple="type === 'multiple'"
    :clearable="clearable"
    v-model="selectedValue"
    :disabled="disabled"
    size="mini"
    filterable
    remote
    class="max-w"
    @focus="blurFocus"
    @change="change"
    @clear="clearInfos"
  >
    <el-option
      v-for="item in list"
      :key="item.supplierId"
      :label="item[field]"
      :value="item.supplierId">
      <span style="float: left">{{ item[field] }}</span>
      <span v-if="isShipCompany === false" style="float: right; color: #8492a6; font-size: 13px">[{{ item.entid | OperaUnitFilter }}]</span>
      <span v-if="isShipCompany === false" style="float: right; color: #8492a6; font-size: 13px">{{ item.hdTypeShow }}</span>
    </el-option>  
  </el-select>
</template>

<script>
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
import shippingCompanyServer from './../../../api/shippingCompanyServer'
import ShippingCompanyProxyTypeEnumUtil from './../../enum/shipping-company/ShippingCompanyProxyTypeEnumUtil'
export default {
  name: 'ShippingCompanySelect',
  filters: {
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
  },
  props: {
    value: {
      type: Number | String | Array,
      default: null
    },
    type: {
      type: String,
      default: 'single'
    },
    form: {
      type: Number | String | Array,
      default: null
    },
    clearable: {
      type: Boolean,
      default: true
    },
    isShipCompany: {
      type: Boolean,
      default: false
    },
    hdType: {
      type: Number,
      default: null
    },
    isShippingPrice: {
      type: Number,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number | String,
      default: null
    },
    test: {
      type: Object,
      default: null
    },
    showField: {
      type: String,
      default: 'supplierName'
    }
  },
  data() {
    return {
      // showField: 'supplierName',
      list: [],
      selectedValue: null,
      loading: false,
    }
  },
  computed: {
    field() {
      return this.showField
    }
  },
  watch: {
    value(value) {
      if (value !== this.selectedValue) {
        this.changeValue(value)
      }
    }
  },
  created() {
    if (this.type === 'multiple') {
      this.selectedValue = []
    }
    this.changeValue(this.value)
  },
  mounted() {
    /** 为没有下拉箭头的框体添加一个固定的箭头
     ** 这是由于组件添加了 remote 属性造成的 */
    const arrows = document.querySelectorAll('.el-input__icon.el-icon-')
    Array.prototype.forEach.call(arrows, (arrow) => {
      arrow.className = 'el-input__icon el-icon-arrow-down'
    })
  },
  methods: {
    clearInfos() {
      this.selectedValue = null
      this.$emit('changeData', '')
    },
    async changeValue(value) {
      if (value != null && value !== '' && value.length !== 0) {
        let query = null
        if (this.type === 'single' && (typeof value === 'number' || typeof value === 'string')) {
          query = value
        } else if (this.type === 'multiple' && typeof value === 'object' && value.length && value.length > 0) {
          // query = value
        }
        if (query !== null) {
          const data = {
            keyword: {
              id: query
            },
            page: 0,
            size: 20
          }
          const res = await shippingCompanyServer.search2(data)
          this.list = res.rows
          this.list.forEach(item => {
            item.hdTypeShow = ShippingCompanyProxyTypeEnumUtil.toTitle(item.hdType)
          })
        } else {
          this.list = []
        }
      } else {
        const parm = {}
        if (this.form) {
          parm['shippingCompanyType'] = this.form
          parm['shippingCompanyProxyType'] = this.hdType
          parm['entid'] = this.$store.getters.entid
          parm['usable'] = 2
          parm['flag'] = 1
        }
        const data = {
          keyword: parm,
          page: 0,
          size: 20
        }
        const res = await shippingCompanyServer.search(data)
        this.list = res.rows
        this.list.forEach(item => {
          item.hdTypeShow = ShippingCompanyProxyTypeEnumUtil.toTitle(item.hdType)
        })
      }
      this.selectedValue = value
    },
    async remoteMethod(keyword) {
      this.loading = true
      const parm = {}
      if (keyword) {
        if (this.field === 'shortName') {
          parm['simplifyName'] = keyword
        } else {
          parm['name'] = keyword
        }
      }
      if (this.hdType !== '' && this.hdType !== null) {
        parm['shippingCompanyProxyType'] = this.hdType
      }
      if (this.isShippingPrice !== '' && this.isShippingPrice !== null) {
        parm['isShippingPrice'] = this.isShippingPrice
      }
      if (this.form) {
        parm['shippingCompanyType'] = this.form
      }
      parm['usable'] = 2
      parm['flag'] = 1
      const data = {
        keyword: parm,
        page: 0,
        size: 20
      }
      const res = await shippingCompanyServer.searchNew(data)
      this.list = res.rows
      this.list.forEach(item => {
        item.hdTypeShow = ShippingCompanyProxyTypeEnumUtil.toTitle(item.hdType)
      })
      this.list = this.list.filter(item => item.isBlacklist === 1)
      this.loading = false
    },
    blurFocus() {
      this.remoteMethod('')
    },
    change(event) {
      let res
      this.list.forEach(item => {
        if (item.id === this.selectedValue) {
          res = item
        }
      })
      if (this.index != null) {
        res = {
          ...res,
          $index: this.index
        }
      }
      this.$emit('changeData', res)
      this.$emit('input', event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
