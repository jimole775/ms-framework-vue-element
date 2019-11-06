<template>
  <el-dialog
    :visible="true"
    :width="windowWidth < 768 ? 'calc(100% - 24px)' : '60%'"
    title="流水号列表"
    top="10vh"
    @close="close"
  >
    <!-- <div slot="title" class="header-title">
      <el-alert
        :closable="false"
        :title="`已选中 ${multipleSelection.length} 行数据`"
        class="m-b-12"
        type="info"
        show-icon/>
    </div> -->
    <el-form
      :inline="true"
      :model="keyword"
      class="demo-form-inline"
      @keyup.enter.native="commitSearch"
    >
      <el-row>
        <el-col :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="商业发票号">
            <el-input v-model="keyword.commercialInvoiceCode" size="mini" clearable/>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票流水号">
            <el-input v-model="keyword.code" size="mini" clearable/>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.contractCode" size="mini" clearable/>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="8" :sm="12" :xs="24">
          <el-form-item label="PI号">
            <el-input v-model="keyword.piCode" size="mini" clearable/>
          </el-form-item>
        </el-col>
        <el-col :lg="8" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template>
      <el-table
        ref="multipleTable"
        :data="tableData"
        :loading="loading"
        style="width: 100%"
        border
        @row-click="toggleRow"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"/>
        <el-table-column
          type="index"
          label="序号"
          width="50"/>
        <el-table-column
          show-overflow-tooltip
          prop="invoiceNo"
          min-width="150"
          label="拆分流水号"/>
        <el-table-column
          show-overflow-tooltip
          prop="stat"
          min-width="100"
          label="单据状态">
          <template slot-scope="scope">{{ scope.row.stat | CommercialInvoiceStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="noticeNo"
          min-width="120"
          label="通知单号"/>
        <el-table-column
          show-overflow-tooltip
          prop="factInvoiceNo"
          min-width="120"
          label="商业发票号"/>
        <el-table-column
          show-overflow-tooltip
          prop="code"
          min-width="120"
          label="发票流水号"/>
        <el-table-column
          show-overflow-tooltip
          prop="piNo"
          min-width="120"
          label="PI号"/>
        <el-table-column
          show-overflow-tooltip
          prop="contractCode"
          min-width="120"
          label="合同号"/>
        <el-table-column
          show-overflow-tooltip
          prop="lcNo"
          min-width="100"
          label="信用证号"/>
        <el-table-column
          show-overflow-tooltip
          prop="custCode"
          min-width="100"
          label="客户编码"/>
        <el-table-column
          show-overflow-tooltip
          prop="orgName"
          min-width="150"
          label="销售部门"/>
        <el-table-column
          show-overflow-tooltip
          prop="custName"
          min-width="100"
          label="客户名称"/>
        <el-table-column
          show-overflow-tooltip
          prop="salesUserId"
          min-width="100"
          label="业务员"/>
        <el-table-column
          show-overflow-tooltip
          prop="paymentMethod"
          min-width="100"
          label="付款方式"/>
        <el-table-column
          show-overflow-tooltip
          prop="shippingMethod"
          min-width="100"
          label="发运方式">
          <template slot-scope="scope">{{ scope.row.shippingMethod | ShipTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="goodsAmount"
          min-width="100"
          label="发货金额"/>
        <el-table-column
          show-overflow-tooltip
          prop="invoiceAmount"
          min-width="100"
          label="本次发票金额"/>
        <el-table-column
          show-overflow-tooltip
          prop="createUser"
          min-width="150"
          label="制单人"/>
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
  import commercialInvoiceServer from './../../../api/commercialInvoiceServer'
  import CommercialInvoiceStatusEnumUtil from './../../enum/commercial-invoice/CommercialInvoiceStatusEnumUtil'
  import ShipTypeEnumUtil from './../../enum/customs-bill/ShipTypeEnumUtil.js'
  export default {
    name: 'InvoiceModal',
    filters: {
      CommercialInvoiceStatusFilter: CommercialInvoiceStatusEnumUtil.toTitleFilter,
      ShipTypeFilter: ShipTypeEnumUtil.toTitleFilter,
    },
    props: {
      value: {
        type: Number | String | Array,
        default: null
      },
      tbstat: {
        type: Number | String | Array,
        default: null
      },
      type: {
        type: String,
        default: 'single'
      },
      clearable: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      requestStat: {
        type: String | Number,
        default: 5
      },
      iShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        keyword: {
          commercialInvoiceCode: null,
          code: null,
          contractCode: null,
          piCode: null,
          stat: 5,
          isRed: 1
        },
        multipleSelection: [],
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
    created() {
      this.search()
    },
    methods: {
      commitSearch() {
        this.page = 1
        this.search()
      },
      toggleRow(row) {
        if (row) {
          this.$refs.multipleTable.toggleRowSelection(row)
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      async search() {
        this.loading = true
        this.multipleSelection = []
        const params = {
          keyword: this.keyword,
          page: this.page - 1,
          size: this.size
        }
        const { data: { data: { data, page: { total }}}} = await commercialInvoiceServer.search(params)
        this.tableData = this.queryBillTypeOne(data)
        this.count = total
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
      // resetSearch() {
      //   this.keyword = {
      //     commercialInvoiceCode: '',
      //     stat: this.requestStat, // 5 是已审 1 是制单
      //     isRed: 1
      //   }
      //   this.page = 1
      //   this.search()
      // },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      confirm() {
        let tbstat = 'init'
        this.multipleSelection && this.multipleSelection.forEach((selectItem) => {
          if (tbstat === 'init') tbstat = selectItem.tbstat
          if (selectItem.tbstat !== tbstat) {
            tbstat = 'is not in same'
          }
        })
        if (tbstat === 'is not in same') {
          return this.$message({
            message: '投保过的发票和未投保过的发票不能合并',
            type: 'warning'
          })
        }
        this.$emit('changeData', this.multipleSelection)
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
