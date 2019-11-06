<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="预警类型">
            <el-select
              v-model="keyword.remindType"
              size="mini"
              class="max-w">
              <el-option
                v-for="item in remindTypeList"
                :key="item"
                :label="item"
                :value="item"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="业务员">
            <el-input v-model="keyword.userName" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="交单人">
            <el-input v-model="keyword.jdName" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票号">
            <el-input v-model="keyword.invoiceNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="业务部门">
            <DepartmentSelect v-model="keyword.orgId" @changeDataRes="changeDepartment"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户">
            <CustomerSelect v-model="keyword.custId" @changeData="changeCustomer"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
            <!--<el-button type="text" size="mini" @click="more = !more">-->
            <!--{{ more ? '收起' : '更多' }}-->
            <!--</el-button>-->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- <el-button-group>
    <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">过滤</el-button>
    </el-button-group> -->
    <template>
      <el-tabs v-model="tabName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="明细" name="first">
          <el-table
            :data="tableData1"
            :loading="loading"
            border
            class="m-t-12"
            style="width: 100%">
            <el-table-column type="index" label="序号"/>
            <el-table-column
              show-overflow-tooltip
              prop="remindType"
              sortable
              label="预警类型"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="invoiceNo"
              sortable
              label="商业发票号"
              min-width="150"
            />
            <el-table-column
              v-if="isHide2 === false"
              show-overflow-tooltip
              prop="billNo"
              sortable
              label="交单登记号"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="orgName"
              sortable
              label="销售部门"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="userName"
              sortable
              label="业务员"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="jdName"
              sortable
              label="交单人"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="custCode"
              sortable
              label="客户编码"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="custName"
              sortable
              label="客户名称"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="currencyCode"
              sortable
              label="币种"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="paymentTypeName"
              sortable
              label="付款方式"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="overDay"
              sortable
              label="逾期天数"
              min-width="150"
            />
            <el-table-column
              v-if="isHide2 === false"
              show-overflow-tooltip
              prop="jdBank"
              sortable
              label="交单行"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="checkTime"
              sortable
              label="发票审核日期"
              min-width="150"
            >
              <template slot-scope="scope">
                {{ scope.row.checkTime | parseTime('{y}-{m}-{d}') }}
              </template>
            </el-table-column>
            <el-table-column
              v-if="isHide2 === false"
              show-overflow-tooltip
              prop="jdDate"
              sortable
              label="交单日期"
              min-width="150"
            >
              <template slot-scope="scope">
                {{ scope.row.jdDate | parseTime('{y}-{m}-{d}') }}
              </template>
            </el-table-column>
            <el-table-column
              v-if="isHide1 === false"
              show-overflow-tooltip
              prop="cdDate"
              sortable
              label="承兑日期"
              min-width="150"
            >
              <template slot-scope="scope">
                {{ scope.row.cdDate | parseTime('{y}-{m}-{d}') }}
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="invoiceAmt"
              sortable
              label="发票金额"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="isCheckOver"
              sortable
              label="是否核销完成"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="orderDate"
              sortable
              label="单据日期"
              min-width="150"
            >
              <template slot-scope="scope">
                {{ scope.row.orderDate | parseTime('{y}-{m}-{d}') }}
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="remindBeginDate"
              sortable
              label="开始提醒日期"
              min-width="150"
            >
              <template slot-scope="scope">
                {{ scope.row.remindBeginDate | parseTime('{y}-{m}-{d}') }}
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="note"
              sortable
              label="备注"
              min-width="150"
            />
          </el-table>
          <div class="m-w cen-box m-t-12">
            <el-pagination
              :current-page="page1"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="size1"
              :total="count1"
              :layout="windowWidth < 768 ? 'total, jumper' : 'total, sizes, prev, pager, next, jumper'"
              @size-change="pageSizeChange1"
              @current-change="pageNumberChange1"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="汇总" name="second">
          <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">汇总筛选</el-button>
          <el-table
            :data="tableData2"
            :loading="loading"
            border
            class="m-t-12"
            style="width: 100%">
            <el-table-column type="index" label="序号"/>
            <el-table-column
              v-if="eye.remindType"
              show-overflow-tooltip
              prop="remindType"
              sortable
              label="预警类型"
              min-width="150"
            />
            <el-table-column
              v-if="eye.orgName"
              show-overflow-tooltip
              prop="orgName"
              sortable
              label="销售部门"
              min-width="150"
            />
            <el-table-column
              v-if="eye.orderType"
              show-overflow-tooltip
              prop="orderType"
              sortable
              label="单据类型"
              min-width="150"
            />
            <el-table-column
              v-if="eye.userName"
              show-overflow-tooltip
              prop="userName"
              sortable
              label="业务员"
              min-width="150"
            />
            <el-table-column
              v-if="eye.jd_name"
              show-overflow-tooltip
              prop="jd_name"
              sortable
              label="交单人"
              min-width="150"
            />
            <el-table-column
              v-if="eye.custName"
              show-overflow-tooltip
              prop="custName"
              sortable
              label="客户"
              min-width="150"
            />
            <el-table-column
              show-overflow-tooltip
              prop="amount"
              sortable
              label="统计"
              min-width="150"
            />
          </el-table>
          <div class="m-w cen-box m-t-12">
            <el-pagination
              :current-page="page2"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="size2"
              :total="count2"
              :layout="windowWidth < 768 ? 'total, jumper' : 'total, sizes, prev, pager, next, jumper'"
              @size-change="pageSizeChange2"
              @current-change="pageNumberChange2"
            />
          </div>
          <el-dialog :visible="showEye" width="360px" title="汇总筛选" top="10vh" @close="showEye = false">
            <div>
              <el-row>
                <el-col :span="24">
                  <el-checkbox v-model="eye.remindType">预警类型</el-checkbox>
                </el-col>
                <el-col :span="24">
                  <el-checkbox v-model="eye.orgName">销售部门</el-checkbox>
                </el-col>
                <el-col :span="24">
                  <el-checkbox v-model="eye.orderType">单据类型</el-checkbox>
                </el-col>
                <el-col :span="24">
                  <el-checkbox v-model="eye.userName">业务员</el-checkbox>
                </el-col>
                <el-col :span="24">
                  <el-checkbox v-model="eye.jd_name">交单人</el-checkbox>
                </el-col>
                <el-col :span="24">
                  <el-checkbox v-model="eye.custName">客户</el-checkbox>
                </el-col>
              </el-row>
            </div>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </template>
    <component
      v-if="showExportPopup"
      :is="'ExportPopup'"
      :list="dataExport"
      :t-header="tHeader"
      :filter-val="filterVal"
      @close="showExportPopup = false"/>
  </div>
</template>

<script>
  import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
  import CustomerSelect from './../../../components/entity/customer/CustomerSelect'
  import documentEarlyWarningStatisticsServer from './../../../api/statistics/documentEarlyWarningStatisticsServer'

  const initSearchParams = {
    remindType: null,
    userName: null,
    jdName: null,
    invoiceNo: null,
    orgId: null,
    orgName: null,
    orderType: null,
    custCode: null,
    custId: null,
    custName: null,
    billNo: null,
    jdBank: null,
    jdDate: null,
    cdDate: null
  }
  // const initExport = {
  //   remindType: '预警类型',
  // }
  export default {
    name: 'DocumentEarlyWarningStatistics',
    components: {
      DepartmentSelect,
      CustomerSelect,
      ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    },
    filters: {},
    data() {
      return {
        loading: false,
        keyword: {
          ...initSearchParams
        },
        isHide1: false,
        isHide2: false,
        page1: 1,
        size1: 10,
        count1: 0,
        tableData1: [],
        page2: 1,
        size2: 10,
        count2: 0,
        tableData2: [],
        remindTypeList: [
          '未发起交单登记',
          '逾期未承兑',
          '未买断提醒',
          '寄单快递单号提醒',
          '逾期未收汇-远期信用证',
          '逾期未收汇-即期信用证',
        ],
        tabName: 'first',
        sort: null,
        currentClickRow: {},
        multipleSelection: [],
        showViewPopup: false,
        showEditPopup: false,
        showDeletePopup: false,
        showExportPopup: false,
        dataExport: [],
        tHeader: [],
        filterVal: [],
        eye: {
          remindType: true,
          orgName: true,
          orderType: true,
          userName: true,
          jd_name: true,
          custName: true,
        },
        showEye: false,
        more: true,
      }
    },
    computed: {
      windowWidth() {
        return this.$store.getters.width
      }
    },
    created() {
      // 首页跳转过来设置筛选条件
      if (this.$route.query.reminderType) {
        switch (parseInt(this.$route.query.reminderType)) {
          case 7:
            this.keyword.remindType = '逾期未收汇-远期信用证'
            break
          case 8:
            this.keyword.remindType = '逾期未收汇-即期信用证'
            break
          case 10:
            this.keyword.remindType = '未发起交单登记'
            break
          case 11:
            this.keyword.remindType = '逾期未承兑'
            break
          case 12:
            this.keyword.remindType = '未买断提醒'
            break
          case 13:
            this.keyword.remindType = '寄单快递单号提醒'
            break
          default:
            break
        }
      }
      this.search()
    },
    methods: {
      clickExportBtn() {
        const headMap = {
          'head_first': [['预警类型', '商业发票号', '交单登记号', '销售部门', '业务员', '交单人', '客户编码', '客户名称', '币种', '付款方式', '逾期天数', '交单行', '发票审核日期', '交单日期', '承兑日期', '发票金额', '是否核销完成', '单据日期', '开始提醒日期', '备注']],
          'field_first': ['remindType', 'invoiceNo', 'billNo', 'orgName', 'userName', 'jdName', 'custCode', 'custName', 'currencyCode', 'paymentTypeName', 'overDay', 'jdBank', 'checkTime', 'jdDate', 'cdDate', 'invoiceAmt', 'isCheckOver', 'orderDate', 'remindBeginDate', 'note'],
          'head_second': [['预警类型', '销售部门', '单据类型', '业务员', '交单人', '客户', '统计']],
          'field_second': ['remindType', 'orgName', 'orderType', 'userName', 'jd_name', 'custName', 'amount']
        }
        switch (this.tabName) {
          case 'first':
            this.dataExport = JSON.parse(JSON.stringify(this.tableData1))
            break
          case 'second':
            this.dataExport = JSON.parse(JSON.stringify(this.tableData2))
            break
          default:
            this.dataExport = []
            break
        }
        if (this.dataExport.length === 0) {
          return this.$message({
            message: '没有数据可导出',
            type: 'warning'
          })
        }
        this.tHeader = headMap['head_' + this.tabName]
        this.filterVal = headMap['field_' + this.tabName]
        this.setExportData()
        this.showExportPopup = true
      },
      setExportData() {
      },

      async search() {
        this.loading = true
        this.multipleSelection = []
        let url = '/auxhome/rpt/api/1.0.0/saleBillsWarningRpt/billsWarningRpt'
        let page = this.page1 - 1
        let size = this.size1
        if (this.tabName === 'second') {
          page = this.page2 - 1
          size = this.size2
          url = '/auxhome/rpt/api/1.0.0/saleBillsWarningRpt/billsWarningSummaryRpt'
        }
        const res = await documentEarlyWarningStatisticsServer.search({
          query: this.keyword,
          url,
          page,
          size
        })
        if (this.tabName === 'second') {
          if (res !== 0) {
            this.tableData2 = res.data
            res.data.forEach((item, index) => {
              this.$set(this.tableData2, index, item)
            })
            this.count2 = res.pagination.count
          } else {
            this.tableData2 = []
          }
        } else {
          if (res !== 0) {
            this.tableData1 = res.data
            res.data.forEach((item, index) => {
              this.$set(this.tableData1, index, item)
            })
            this.count1 = res.pagination.count
          } else {
            this.tableData1 = []
          }
        }
        if (this.keyword.remindType === '未发起交单登记') {
          this.isHide1 = true
          this.isHide2 = true
        } else if (this.keyword.remindType === '逾期未承兑') {
          this.isHide1 = true
          this.isHide2 = false
        } else if (this.keyword.remindType === '未买断提醒') {
          this.isHide1 = true
          this.isHide2 = false
        } else {
          this.isHide1 = false
          this.isHide2 = false
        }
        this.loading = false
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
      handleClick(tab, event) {
        this.tabName = tab.name
        this.search()
      },
      pageSizeChange1(val) {
        this.size1 = val
        this.page1 = 1
        this.search()
      },
      pageNumberChange1(val) {
        this.page1 = val
        this.search()
      },
      pageSizeChange2(val) {
        this.size2 = val
        this.page2 = 1
        this.search()
      },
      pageNumberChange2(val) {
        this.page2 = val
        this.search()
      },
      changeDepartment(res) {
        this.keyword.orgName = res.name
      },
      changeCustomer(name, code) {
        console.log(name)
        console.log(code)
        this.keyword.custCode = code
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      commitSearch() {
        this.page = 1
        this.search()
      },
      resetSearch() {
        this.keyword = {
          ...initSearchParams
        }
        this.page = 1
        this.search()
      },
      update() {
        setTimeout(() => {
          this.search()
        }, 1000)
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form-item {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;

    /deep/ .el-form-item__label {
      width: 90px;
    }

    /deep/ .el-form-item__content {
      width: calc(100% - 90px);
    }
  }

  .search-btn-item {
    /deep/ .el-form-item__content {
      width: auto;
      float: right;
    }
  }
</style>

