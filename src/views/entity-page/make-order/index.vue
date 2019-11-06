<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="keyword"
      class="demo-form-inline"
      @keyup.enter.native="commitSearch"
    >
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单号">
            <el-input v-model="keyword.makingOrderNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="订舱单">
            <ShipCabinOrderSelect v-model="keyword.bookingNo"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单人">
            <!-- <PersonSelect v-model="keyword.createUser"/> -->
            <el-input v-model="keyword.createUser"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户">
            <!-- <CustomerSelect v-model="keyword.custId" @changeData="changeCust"/> -->
            <el-input v-model="keyword.custName"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.piNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单状态">
            <MakingStatusEnumSelect v-model="keyword.makingStatus"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出运方式">
            <ShipTypeEnumSelect v-model="keyword.shipType"/>
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
        v-if="isInnerUser" 
        type="primary" 
        icon="el-icon-delete" 
        size="mini" 
        @click="clickBatchDeleteBtn"
      >删除</el-button>
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
        <el-table-column
          v-if="eye.makingStatus"
          show-overflow-tooltip
          prop="makingStatus"
          sortable
          min-width="115"
          label="制单状态"
        >
          <template slot-scope="scope">{{ scope.row.makingStatus | MakingStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.makingOrderNo"
          show-overflow-tooltip
          prop="makingOrderNo"
          sortable
          min-width="125"
          label="制单号"
        />
        <el-table-column
          v-if="eye.changeNo"
          show-overflow-tooltip
          prop="changeNo"
          sortable
          min-width="125"
          label="改单申请号"
        />
        <el-table-column
          v-if="eye.bookingNo"
          show-overflow-tooltip
          prop="bookingNo"
          sortable
          min-width="115"
          label="订舱单"
        />
        <el-table-column
          v-if="eye.piNo"
          show-overflow-tooltip
          prop="piNo"
          sortable
          min-width="115"
          label="合同号"
        />
        <el-table-column
          v-if="eye.billNo"
          show-overflow-tooltip
          prop="billNo"
          sortable
          min-width="115"
          label="提单号"
        />
        <el-table-column
          v-if="eye.shipType"
          show-overflow-tooltip
          prop="shipType"
          sortable
          min-width="115"
          label="出运方式"
        >
          <template slot-scope="scope">{{ scope.row.shipType | ShipTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.custCode"
          show-overflow-tooltip
          prop="custCode"
          sortable
          min-width="120"
          label="客户编码"
        />
        <el-table-column
          v-if="eye.custName"
          show-overflow-tooltip
          prop="custName"
          sortable
          min-width="120"
          label="客户名称"
        />
        <el-table-column
          v-if="eye.destination"
          show-overflow-tooltip
          prop="destination"
          sortable
          min-width="100"
          label="目的地"
        />
        <el-table-column
          v-if="eye.createUser"
          show-overflow-tooltip
          prop="createUser"
          sortable
          min-width="100"
          label="制单人"
        />
        <el-table-column
          v-if="eye.createDate"
          show-overflow-tooltip
          prop="createDate"
          sortable
          min-width="100"
          label="制单时间"
        >
          <template slot-scope="scope">{{ scope.row.createDate | parseTime('{y}-{m}-{d}') }}</template>
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
            <el-checkbox v-model="eye.makingStatus">制单状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.makingOrderNo">制单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.changeNo">改单申请号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bookingNo">订舱单</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.piNo">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.billNo">提单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shipType">出运方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.custCode">客户编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.custName">客户名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.destination">目的地</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createUser">制单人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createDate">制单时间</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showDeletePopup"
      :is="'MakeOrderDeletePopup'"
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
import ShipCabinOrderSelect from './../../../components/entity/ship-cabin-order/ShipCabinOrderSelect'
import PersonSelect from './../../../components/entity/person/PersonSelect'
import CustomerSelect from './../../../components/entity/customer/CustomerSelect'
import ChangeOrderSelect from './../../../components/entity/change-order/ChangeOrderSelect'
import PortSelect from './../../../components/entity/port/PortSelect'
import ShipTypeEnumSelect from './../../../components/entity/make-order/ShipTypeEnumSelect'
import ShipTypeEnumUtil from './../../../components/enum/make-order/ShipTypeEnumUtil'
import MakingStatusEnumSelect from './../../../components/entity/make-order/MakingStatusEnumSelect'
import MakingStatusEnumUtil from './../../../components/enum/make-order/MakingStatusEnumUtil'
import makeOrderServer from './../../../api/makeOrderServer'
import { getAccount } from '@/api/login'
const initSearchParams = {
  makingOrderNo: null,
  bookingNo: null,
  createUser: null,
  // custCode: null,
  custName: null,
  piNo: null,
  makingStatus: null,
  shipType: null
}
const initExport = {
  makingStatus: '制单状态',
  makingOrderNo: '制单号',
  changeNo: '改单申请号',
  bookingNo: '订舱单',
  piNo: '合同号',
  billNo: '提单号',
  shipType: '出运方式',
  custCode: '客户编码',
  custName: '客户名称',
  destination: '目的地',
  createUser: '制单人',
  createDate: '制单时间'
}
export default {
  name: 'MakeOrderManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    MakeOrderDeletePopup: () => import('./makeOrderDeletePopup.vue'),
    ShipCabinOrderSelect,
    PersonSelect,
    CustomerSelect,
    ChangeOrderSelect,
    PortSelect,
    ShipTypeEnumSelect,
    MakingStatusEnumSelect
  },
  filters: {
    ShipTypeFilter: ShipTypeEnumUtil.toTitleFilter,
    MakingStatusFilter: MakingStatusEnumUtil.toTitleFilter
  },
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
      userTypeTo: null, // 用户类型
      tableData: [],
      multipleSelection: [],
      showDeletePopup: false,
      showExportPopup: false,
      dataExport: [],
      tHeader: [],
      filterVal: [],
      more: false,
      eye: {
        makingStatus: true,
        makingOrderNo: true,
        changeNo: true,
        bookingNo: true,
        piNo: true,
        billNo: true,
        shipType: true,
        custCode: true,
        custName: true,
        destination: true,
        createUser: true,
        createDate: true
      },
      showEye: false
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    },
    isInnerUser() {      
      return this.$store.getters.userType !== '外部用户'
    }
  },
  created() {
    this.search()
  },
  methods: {
    changeCust(name, code) {
      this.keyword.custCode = code
      this.keyword.custName = name
    },
    async search() {
      this.loading = true
      this.multipleSelection = []
      const keyword = this.keyword
      await getAccount().then(response => {
        this.userTypeTo = response.data.data.userType
      })
      keyword.userType = this.userTypeTo
      const res = await makeOrderServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.data
      res.data.forEach((item, index) => {
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
        path: './make-order/edit/' + row.id
      })
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
        item.makingStatus = MakingStatusEnumUtil.toTitleFilter(
          item.makingStatus
        )
        item.shipType = ShipTypeEnumUtil.toTitleFilter(item.shipType)
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
      this.showEditPopup = false
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
