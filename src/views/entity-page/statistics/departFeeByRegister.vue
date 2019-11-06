<template>
  <div class="container">
    <el-form :inline="true" :model="keyWord" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="组织">
            <EntidTypeEnumSelect v-model="keyWord.entid"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="登记单号">
            <el-input v-model="keyWord.regNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告">
            <el-input v-model="keyWord.warnNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="!more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyWord.piNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="!more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="币种">
            <el-input v-model="keyWord.currencyCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="!more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票号">
            <el-input v-model="keyWord.invoiceNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="!more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="开票区间">
            <el-date-picker
              v-model="keyWord.createDateStart"
              size="mini"
              class="max-w"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="!more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item >
            <el-date-picker
              v-model="keyWord.createDateEnd"
              size="mini"
              class="max-w"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="!more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="业务部门">
            <el-input v-model="keyWord.orgName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="!more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="额外费用">
            <el-select v-model="keyWord.isAdditionalFee" placeholder="请选择" >
              <el-option
                v-for="item in options"
                :key="item.isAdditionalFee"
                :label="item.label"
                :value="item.isAdditionalFee"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col v-show="!more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="收票区间">
            <el-date-picker
              v-model="keyWord.reciveDateStart"
              size="mini"
              class="max-w"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="!more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item >
            <el-date-picker
              v-model="keyWord.reciveDateEnd"
              size="mini"
              class="max-w"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <el-button type="text" size="mini" @click="more = !more">
              {{ more ? '更多' : '收起' }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button-group>
      <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
      <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">过滤</el-button>
    </el-button-group>
    <el-alert
      :closable="false"
      :title="`已选中 ${multipleSelection.length} 行数据`"
      class="m-t-12"
      type="info"
      show-icon />
    <template>

      <el-table
        :data="tableData"
        :loading="loading"
        border
        class="m-t-12"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55" />
        <el-table-column type="index" label="序号" fixed="left"/>
        <el-table-column
          v-if="eye.entid"
          show-overflow-tooltip
          prop="entid"
          sortable
          label="组织"
          min-width="80"
        >
          <template slot-scope="scope">
            {{ scope.row.entid | EntidTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.regNo"
          show-overflow-tooltip
          prop="regNo"
          sortable
          label="费用登记单号"
          min-width="150"
        />
        <el-table-column
          v-if="eye.piNo"
          show-overflow-tooltip
          prop="piNo"
          sortable
          label="合同号"
          min-width="150"
        />
        <el-table-column
          v-if="eye.warnNo"
          show-overflow-tooltip
          prop="warnNo"
          sortable
          label="出货预告"
          min-width="150"
        />
        <el-table-column
          v-if="eye.orgName"
          show-overflow-tooltip
          prop="orgName"
          sortable
          label="业务部门"
          min-width="100"
        />
        <el-table-column
          v-if="eye.transitName"
          show-overflow-tooltip
          prop="transitName"
          sortable
          label="协议货代"
          min-width="150"
        />
        <el-table-column
          v-if="eye.hdType"
          show-overflow-tooltip
          prop="hdType"
          sortable
          label="货代类型"
          min-width="100"
        />
        <el-table-column
          v-if="eye.seaportInName"
          show-overflow-tooltip
          prop="seaportInName"
          sortable
          label="目的港"
          min-width="150"
        />
        <el-table-column
          v-if="eye.invoiceNo"
          show-overflow-tooltip
          prop="invoiceNo"
          sortable
          label="发票号"
          min-width="150"
        />
        <el-table-column
          v-if="eye.boxType"
          show-overflow-tooltip
          prop="boxType"
          sortable
          label="柜型"
          min-width="150"
        />
        <el-table-column
          v-if="eye.boxQty"
          show-overflow-tooltip
          prop="boxQty"
          sortable
          label="柜量"
          min-width="150"
        />
        <el-table-column
          v-if="eye.currencyCode"
          show-overflow-tooltip
          prop="currencyCode"
          sortable
          label="币种"
          min-width="100"
        />
        <el-table-column
          v-if="eye.orderFeeCode"
          show-overflow-tooltip
          prop="orderFeeCode"
          sortable
          label="费用编码"
          min-width="100"
        />
        <el-table-column
          v-if="eye.orderFeeName"
          show-overflow-tooltip
          prop="orderFeeName"
          sortable
          label="费用名称"
          min-width="150"
        />
        <el-table-column
          v-if="eye.boxPrice"
          show-overflow-tooltip
          prop="boxPrice"
          sortable
          label="单价"
          min-width="100"
        />
        <el-table-column
          v-if="eye.AMT"
          show-overflow-tooltip
          prop="AMT"
          sortable
          label="金额"
          min-width="100"
        />
        <el-table-column
          v-if="eye.AMTRMB"
          show-overflow-tooltip
          prop="AMTRMB"
          sortable
          label="金额(RMB)"
          min-width="150"
        />
        <el-table-column
          v-if="eye.isAdditionalFee"
          show-overflow-tooltip
          prop="isAdditionalFee"
          sortable
          label="是否额外费用"
          min-width="150"
        />
        <el-table-column
          v-if="eye.approveTime"
          show-overflow-tooltip
          prop="approveTime"
          sortable
          label="开票时间"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.approveTime | parseTime('{y}/{m}/{d}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.reciveTime"
          show-overflow-tooltip
          prop="reciveTime"
          sortable
          label="收票时间"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.reciveTime | parseTime('{y}/{m}/{d}') }}
          </template>
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
    <el-dialog
      :visible="showEye"
      width="360px"
      title="show-field"
      top="10vh"
      @close="showEye = false"
    >
      <div>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="eye.entid">组织</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.regNo">费用登记单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.piNo">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.warnNo">出货预告</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orgName">业务部门</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.transitName">协议货代</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.hdType">货代类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.seaportInName">目的港</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceNo">发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.boxQty">柜量</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.currencyCode">币种</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orderFeeCode">费用编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orderFeeName">费用名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.boxPrice">单价</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.AMT">金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.AMTRMB">总金额(RMB)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isAdditionalFee">额外费用</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.approveTime">开票时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.reciveTime">收票时间</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showExportPopup"
      :is="'ExportPopup'"
      :list="dataExport"
      :t-header="tHeader"
      :filter-val="filterVal"
      @close="showExportPopup = false"
    />
  </div>
</template>

<script>
  import EntidTypeEnumSelect from './../../../components/entity/statistics/act-sale-booking-delivery-report-select/EntidTypeEnumSelect'
  import departFeeByRegisterServer from '../../../api/statistics/departFeeByRegisterServer'
  const initSearchParams = {
    entid: null,
    warnNo: null,
    orgName: null,
    regNo: null,
    piNo: null,
    transitName: null,
    currencyCode: null,
    invoiceNo: null,
    createDateStart: null,
    createDateEnd: null,
    reciveDateStart: null,
    reciveDateEnd: null,
    value1: ''
  }
  const initExport = {
    entid: '组织',
    regNo: '费用登记单号',
    piNo: '合同号',
    warnNo: '出货预告',
    orgName: '业务部门',
    hdType: '货代类型',
    transitName: '协议货代',
    seaportInName: '目的港',
    invoiceNo: '发票号',
    boxQty: '柜量',
    currencyCode: '币种',
    orderFeeCode: '费用编码',
    orderFeeName: '费用名称',
    boxPrice: '单价',
    AMT: '金额',
    AMTRMB: '金额RMB',
    isAdditionalFee: '是否额外费用',
    approveTime: '开票时间',
    reciveTime: '收票时间'
  }
  export default {
    name: 'DepartFeeByRegister',
    components: {
      ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
      EntidTypeEnumSelect
    },
    data() {
      return {

        loading: false,
        keyWord: {
          ...initSearchParams
        },
        page: 1,
        size: 10,
        count: 0,
        pageSize: [10, 20, 30, 40, 50, 2000],
        multipleSelection: [],
        dataExport: [],
        tHeader: [],
        filterVal: [],
        showExportPopup: false,
        more: true,
        eye: {
          entid: true,
          warnNo: true,
          orgName: true,
          regNo: true,
          piNo: true,
          transitName: true,
          hdType: true,
          seaportInName: true,
          currencyCode: true,
          invoiceNo: true,
          boxQty: true,
          approveTime: true,
          boxPrice: true,
          AMT: true,
          AMTRMB: true,
          orderFeeCode: true,
          orderFeeName: true,
          createDate: true,
          isAdditionalFee: true,
          reciveTime: true
        },
        showEye: false,
        options: [{
          isAdditionalFee: '2',
          label: '是'
        }, {
          isAdditionalFee: '1',
          label: '否'
        }]
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
      async search() {
        this.loading = true
        this.multipleSelection = []
        const keyWord = {
          ...this.keyWord
        }

        const res = await departFeeByRegisterServer.search({
          query: keyWord,
          page: this.page - 1,
          size: this.size
        })
        this.tableData = res.data
        this.count = res.pagination.count
        this.$nextTick(() => {
          this.setPageSize()
        })
        this.loading = false
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
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      clickExportBtn() {
        if (this.multipleSelection.length === 0 && this.tableData.length === 0) {
          this.$message({
            message: '请选择要导出的数据',
            showClose: true,
            type: 'warning'
          })
          return false
        }
        if (this.multipleSelection.length > 0) {
          this.dataExport = this.multipleSelection
        } else if (this.tableData.length > 0) {
          this.dataExport = this.tableData
        }
        this.setExportData()
        this.showExportPopup = true
      },
      setExportData() {
        // 设置要导出数据的表头和对应的字段
        // 清空已有表头和对应的字段
        this.tHeader = []
        this.filterVal = []
        // 遍历初始化的导出字段数据
        for (const key in initExport) {
          // 如果这个字段还在展示，就添加到要导出的字段里
          if (this.eye[key]) {
            this.filterVal.push(key)
            this.tHeader.push(initExport[key])
          }
        }
      },
      commitSearch() {
        this.page = 1
        this.search()
      },
      resetSearch() {
        this.keyWord = {
          ...initSearchParams
        }
        this.page = 1
        this.search()
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
