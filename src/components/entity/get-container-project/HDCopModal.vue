<template>
  <el-dialog
    :visible="true"
    :width="windowWidth < 768 ? 'calc(100% - 24px)' : '60%'"
    title="货代公司"
    top="10vh"
    @close="close"
  >
    <el-form
      :inline="true"
      :model="keyword"
      class="demo-form-inline"
      @keyup.enter.native="commitSearch"
    >
      <el-row>
        <el-col :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="公司名称">
            <el-input v-model="keyword.supplierName" size="mini" clearable/>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="公司编码">
            <el-input v-model="keyword.supplierCode" size="mini" clearable/>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="简称">
            <el-input v-model="keyword.shortName" size="mini" clearable/>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="8" :sm="12" :xs="24" style="float:right">
          <el-form-item class="search-btn-item" style="float:right">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template>
      <el-table
        :data="tableData"
        :loading="loading"
        style="width: 100%"
        border
        @row-click="toggleRow"
        @row-dblclick="toggleRow1"
      >
        <el-table-column
          type="index"
          label="序号"
          width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="selectIndex" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="50"/>
        <el-table-column
          show-overflow-tooltip
          prop="supplierName"
          min-width="150"
          label="公司名称"/>
        <el-table-column
          show-overflow-tooltip
          prop="supplierCode"
          min-width="100"
          label="公司编码"/>
        <el-table-column
          show-overflow-tooltip
          prop="shortName"
          min-width="120"
          label="简称"/>
        <el-table-column
          show-overflow-tooltip
          min-width="120"
          label="类型">
          <template slot-scope="scope">{{ scope.row.hdType | ShippingCompanyFilter }}</template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          min-width="120"
          label="组织">
          <template slot-scope="scope">{{ scope.row.entid | OperaUnitFilter }}</template>
        </el-table-column>
      </el-table>
    </template>
    <div class="m-w cen-box m-t-12">
      <el-pagination
        :current-page="page"
        :page-sizes="pageSize"
        :page-size="size"
        :total="count"
        :layout="windowWidth < 768 ? 'total, jumper' : 'total, sizes, prev, pager, next, jumper'"
        @size-change="pageSizeChange"
        @current-change="pageNumberChange"
      />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button v-loading="loading" size="mini" @click="close">取消</el-button>
      <el-button v-loading="loading" type="primary" size="mini" @click="confirm">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
  import shippingCompanyServer from './../../../api/shippingCompanyServer'
  import ShippingCompanyProxyTypeEnumUtil from './../../enum/shipping-company/ShippingCompanyProxyTypeEnumUtil'
  export default {
    name: 'HDCopModal',
    filters: {
      OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
      ShippingCompanyFilter: ShippingCompanyProxyTypeEnumUtil.toTitleFilter,
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
      disabled: {
        type: Boolean,
        default: false
      },
      inputData: {
        type: Object,
        default: null
      },
    },
    data() {
      return {
        keyword: {
          supplierName: null,
          supplierCode: null,
          shortName: null,
        },
        selectRow: {},
        selectIndex: null,
        loading: false,
        tableData: [],
        more: false,
        page: 1,
        size: 10,
        count: 0,
        pageSize: [10, 20, 30, 40, 50]
      }
    },
    computed: {
      windowWidth() {
        return this.$store.getters.width
      }
    },
    watch: {
      inputData() {
        console.log('load:', this.inputData)
      }
    },
    created() {
      this.search()
    },
    methods: {
      test1() {
        console.log('test1:', arguments)
      },
      getTemplateRow(a, b) {
        console.log('getTemplateRow:', arguments)
      },
      commitSearch() {
        this.page = 1
        this.search()
      },
      toggleRow1(row, b) {
        if (row) { this.selectRow = row }
        this.confirm()
      },
      toggleRow(row, b) {
        if (row) { this.selectRow = row }
        this.selectRow.checked = true
      },
      async search() {
        this.loading = true
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
          page: this.page,
          size: this.size
        }
        const res = await shippingCompanyServer.search2(data)
        this.tableData = res.rows
        this.count = res.page.total
        this.setPageSize()
        this.loading = false
      },
      queryBillTypeOne(origin) {
        const result = []
        origin.forEach(element => {
          if (element.billType !== 2 && result.indexOf(element) === -1) {
            result.push(element)
          }
        })
        return result
      },
      setPageSize() {
        // 重新设定分页条件
        this.pageSize = []
        for (let i = 1; i < 6; i++) {
          if (this.count > 10 * i) {
            this.pageSize.push(10 * i)
          }
        }
        this.pageSize.push(this.count)
      },
      pageSizeChange(val) {
        this.size = val
        this.page = 1
        this.search()
      },
      pageNumberChange(val) {
        this.page = val
        this.search()
      },
      close() {
        this.$emit('close')
      },
      confirm() {
        this.$emit('confirm', this.selectRow)
        this.close()
      }
    }
  }
</script>

<style>
  .el-form--inline .el-form-item__label {
    width: 40%;
  }
  .el-form--inline .el-form-item__content {
    width: 60%;
  }
  .el-dialog-custom-- {
    overflow: hidden;    
    margin-top: 10vh;
    width: 80%;
    height: 80%;
    display: flex;
    flex-direction: column;
  }

  .el-dialog__body{
    padding: 10px 20px;
    flex-grow: 1;
    flex-shrink: 1;
    height: 90%;
    overflow: hidden;
  }
  .el-dialog__header {
    padding: 10px 20px 0px;
  }
  .el-dialog-custom-- .el-dialog__body .el-table{
    height: 100% !important;
  }

  .el-dialog-custom-- .content-box{
    height:100%;
  }
 .el-table__body td {
    line-height: 100%
  }
  .f-r {
    /* margin-left: 20px; */
    float: left !important;
  }
  .el-icon-arrow-left:before {
    content: '';
  }
</style>
