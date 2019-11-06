<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="截关日期起始">
            <el-date-picker
              v-model="keyword.customs_date_start"
              size="mini"
              class="max-w"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="截关日期结束">
            <el-date-picker
              v-model="keyword.customs_date_end"
              size="mini"
              class="max-w"
              type="date"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="报关状态">
            <CustomsStatEnumSelectForCustMgr v-model="keyword.customs_status" :disabled="false"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.cpi_no" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="报关单号">
            <el-input v-model="keyword.customs_no" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发货单号">
            <el-input v-model="keyword.notice_no" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单证员">
            <TradeDocumenterSelect v-model="keyword.proverId" @changeData="changeProver"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告号">
            <el-input v-model="keyword.warn_no" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="大区">
            <DepartmentSelect v-model="keyword.org_id"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="协议货代">
            <ShippingCompanySelect v-model="keyword.forwarder_id" :form="1"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <el-button type="text" size="mini" @click="more = !more">{{ more ? '收起' : '更多' }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        @click="clickAddBtn"
      >新增</el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini" @click="clickBatchDeleteBtn">删除</el-button>
    </el-button-group>
    <el-button-group>
      <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
      <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">过滤</el-button>
    </el-button-group>
    <el-alert
      :closable="false"
      :title="`已选中 ${multipleSelection.length} 行数据`"
      class="m-t-12"
      type="info"
      show-icon
    />
    <template>
      <el-table
        :data="tableData"
        :loading="loading"
        border
        class="m-t-12"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @row-dblclick="handleRowDb"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column type="index" width="55" label="序号"/>
        <el-table-column
          v-if="eye.stat"
          show-overflow-tooltip
          prop="stat"
          sortable
          min-width="80"
          label="状态"
        >
          <template slot-scope="scope">{{ scope.row.stat | CustomsBillStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.stat"
          show-overflow-tooltip
          prop="customs_status"
          sortable
          min-width="120"
          label="报关状态"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.customs_status | CustomsBillCustomsStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.operator_man"
          show-overflow-tooltip
          prop="prover"
          sortable
          min-width="100"
          label="单证员"
        />
        <el-table-column
          v-if="eye.customs_no"
          show-overflow-tooltip
          prop="customs_no"
          sortable
          min-width="120"
          label="报关单编码"
        />
        <el-table-column
          v-if="eye.warn_no"
          show-overflow-tooltip
          prop="warn_no"
          sortable
          min-width="115"
          label="出货预告"
        />
        <el-table-column
          v-if="eye.notice_no"
          show-overflow-tooltip
          prop="notice_no"
          sortable
          min-width="115"
          label="发货单号"
        />
        <el-table-column
          v-if="eye.cpi_no"
          show-overflow-tooltip
          prop="cpi_no"
          sortable
          min-width="100"
          label="合同号"
        />
        <el-table-column
          v-if="eye.ab_votes"
          show-overflow-tooltip
          prop="ab_votes"
          sortable
          min-width="100"
          label="AB票"
        />
        <el-table-column
          v-if="eye.seaport_out_name"
          show-overflow-tooltip
          prop="seaport_out_name"
          sortable
          min-width="100"
          label="出货港"
        />
        <el-table-column
          v-if="eye.seaport_in_name"
          show-overflow-tooltip
          prop="seaport_in_name"
          sortable
          min-width="100"
          label="到货港"
        />
        <el-table-column
          v-if="eye.cust_name"
          show-overflow-tooltip
          prop="cust_name"
          sortable
          min-width="115"
          label="客户名称"
        />
        <el-table-column
          v-if="eye.area_name"
          show-overflow-tooltip
          prop="areaName"
          sortable
          min-width="115"
          label="所在国家"
        />
        <el-table-column
          v-if="eye.cut_date"
          show-overflow-tooltip
          prop="cut_date"
          sortable
          min-width="115"
          label="截关日期"
        >
          <template slot-scope="scope">
            {{ scope.row.cut_date | parseTime('{y}-{m}-{d}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.entid"
          show-overflow-tooltip
          prop="entid"
          sortable
          min-width="115"
          label="经营单位"
        >
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
    <el-dialog :visible="showEye" width="360px" title="过滤" top="10vh" @close="showEye = false">
      <div>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="eye.stat">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.operator_man">单证员</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.customs_no">报关单编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.warn_no">出货预告</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.notice_no">发货单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.cpi_no">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.ab_votes">AB票</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.seaport_out_name">出货港</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.seaport_in_name">到货港</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.cust_name">客户名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.area_name">所在国家</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.cut_date">截关日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.entid">经营单位</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showDeletePopup"
      :is="'CustomsBillDeletePopup'"
      :list="multipleSelection"
      @close="showDeletePopup = false"
      @update="update"
    />
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
import TradeDocumenterSelect from './../../../components/entity/trade-documenter/TradeDocumenterSelect'
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
import ShippingCompanySelect from './../../../components/entity/shipping-company/ShippingCompanySelect'
import CustomsBillStatusEnumUtil from './../../../components/enum/customs-bill/CustomsBillStatusEnumUtil'
import CustomsBillCustomsStatusEnumUtil from './../../../components/enum/customs-bill/CustomsBillCustomsStatusEnumUtil'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
import customsBillServer from './../../../api/customsBillServer'
import CustomsStatEnumSelectForCustMgr from './../../../components/entity/customs-bill/CustomsStatEnumSelectForCustMgr'

const initSearchParams = {
  warn_no: null,
  org_id: null,
  forwarder_id: null,
  customs_date_start: null,
  customs_date_end: null,
  cpi_no: null,
  customs_no: null,
  notice_no: null,
  proverId: null,
  prover: null,
  customs_status: null
}
const initExport = {
  stat: '状态',
  customs_status: '报关状态',
  prover: '单证员',
  customs_no: '报关单编码',
  warn_no: '出货预告',
  notice_no: '发货单号',
  cpi_no: '合同号',
  ab_votes: 'AB票',
  seaport_out_name: '出货港',
  seaport_in_name: '到货港',
  cust_name: '客户名称',
  areaName: '所在国家',
  cut_date: '截关日期',
  entid: '经营单位'
}
export default {
  name: 'CustomsBillManagement',
  components: {
    DepartmentSelect,
    ShippingCompanySelect,
    TradeDocumenterSelect,
    CustomsStatEnumSelectForCustMgr,
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    CustomsBillDeletePopup: () => import('./customsBillDeletePopup.vue')
  },
  filters: {
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
    CustomsBillStatusFilter: CustomsBillStatusEnumUtil.toTitleFilter,
    CustomsBillCustomsStatusFilter:
      CustomsBillCustomsStatusEnumUtil.toTitleFilter
  },
  inject: ['reload'],
  data() {
    return {
      loading: false,
      keyword: {
        ...initSearchParams
      },
      page: 1,
      size: 10,
      count: 0,
      pageSize: [10, 20, 30, 40, 50],
      sort: null,
      tableData: [],
      multipleSelection: [],
      showDeletePopup: false,
      showExportPopup: false,
      dataExport: [],
      tHeader: [],
      filterVal: [],
      more: false,
      eye: {
        stat: true,
        operator_man: true,
        customs_no: true,
        warn_no: true,
        notice_no: true,
        cpi_no: true,
        ab_votes: true,
        seaport_out_name: true,
        seaport_in_name: true,
        cust_name: true,
        area_name: true,
        cut_date: true,
        entid: true
      },
      showEye: false
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
    // 如果是路由带参数的，就对 customs_status 做特殊处理
    if (this.$route.query.reminderType && this.$route.query.reminderType === 6) {
      // 未报关预警
      this.keyword.customs_status = '-1'
    }
    this.search()
  },
  methods: {
    changeProver(name) {
      this.keyword.prover = name
    },
    async search() {
      this.loading = true
      this.multipleSelection = []
      const keyword = this.keyword
      const res = await customsBillServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.sdpSaleCustomsVos
      res.sdpSaleCustomsVos.forEach((item, index) => {
        this.$set(this.tableData, index, item)
      })
      this.count = res.page.total
      this.$nextTick(() => {
        this.setPageSize()
      })
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
    handleRowDb(row) {
      this.$router.push({
        path: './customs-bill/edit/' + row.customs_id
      })
    },
    clickAddBtn() {
      this.$router.push({
        path: './customs-bill/edit/new'
      })
      this.reload()
    },
    clickBatchDeleteBtn() {
      if (this.multipleSelection.length > 0) {
        this.showDeletePopup = true
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
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
        this.dataExport = JSON.parse(JSON.stringify(this.multipleSelection))
      } else if (this.tableData.length > 0) {
        this.dataExport = JSON.parse(JSON.stringify(this.tableData))
      }
      this.dataExport.forEach(item => {
        item.stat = CustomsBillStatusEnumUtil.toTitleFilter(item.stat)
        item.customs_status = CustomsBillCustomsStatusEnumUtil.toTitleFilter(
          item.customs_status
        )
        item.entid = Number.parseInt(item.entid) === 101 ? '家用组织' : '商用组织'
      })
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
      this.keyword = {
        ...initSearchParams
      }
      this.page = 1
      this.search()
    },
    update() {
      // 关闭弹窗
      this.showDeletePopup = false
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
    width: 100px;
  }
  /deep/ .el-form-item__content {
    width: calc(100% - 100px);
  }
}
.search-btn-item {
  /deep/ .el-form-item__content {
    width: auto;
    float: right;
  }
}
</style>
