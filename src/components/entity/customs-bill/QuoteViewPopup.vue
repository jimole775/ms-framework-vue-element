<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="报关单查询"
      top="10vh"
      @close="close">
      <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
        <el-row>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="匹配词">
              <el-input v-model="keyword.condition" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
            <el-form-item class="search-btn-item">
              <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template>
        <el-table
          :data="tableData"
          :loading="loading"
          border
          style="width: 100%"
          @row-dblclick="updateInfo">
          <el-table-column
            type="index"
            width="55"
            label="序号"/>
          <el-table-column
            show-overflow-tooltip
            prop="stat"
            sortable
            min-width="80"
            label="状态">
            <template slot-scope="scope">
              {{ scope.row.stat | CustomsBillStatusFilter }}
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="prover"
            sortable
            min-width="100"
            label="单证员" />
          <el-table-column
            show-overflow-tooltip
            prop="customs_no"
            sortable
            min-width="120"
            label="报关单编码" />
          <el-table-column
            show-overflow-tooltip
            prop="warn_no"
            sortable
            min-width="115"
            label="出货预告"/>
          <el-table-column
            show-overflow-tooltip
            prop="notice_no"
            sortable
            min-width="115"
            label="发货单号"/>
          <el-table-column
            show-overflow-tooltip
            prop="cpi_no"
            sortable
            min-width="100"
            label="合同号"/>
          <el-table-column
            show-overflow-tooltip
            prop="ab_votes"
            sortable
            min-width="100"
            label="AB票"/>
          <el-table-column
            show-overflow-tooltip
            prop="seaport_out_name"
            sortable
            min-width="100"
            label="出货港"/>
          <el-table-column
            show-overflow-tooltip
            prop="seaport_in_name"
            sortable
            min-width="100"
            label="到货港"/>
          <el-table-column
            show-overflow-tooltip
            prop="cust_name"
            sortable
            min-width="115"
            label="客户名称"/>
          <el-table-column
            show-overflow-tooltip
            prop="areaName"
            sortable
            min-width="115"
            label="所在国家"/>
          <el-table-column
            show-overflow-tooltip
            prop="customs_date"
            sortable
            min-width="115"
            label="截关日期"/>
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
    </el-dialog>
  </div>
</template>

<script>
import customsBillServer from './../../../api/customsBillServer'
import CustomsBillStatusEnumUtil from './../../enum/customs-bill/CustomsBillStatusEnumUtil'

export default {
  name: 'QuoteViewPopup',
  components: {},
  filters: {
    CustomsBillStatusFilter: CustomsBillStatusEnumUtil.toTitleFilter,
  },
  props: {
    custId: {
      type: Number | String | Array,
      default: null
    },
    cpiNo: {
      type: Number | String | Array,
      default: null
    },
  },
  data() {
    return {
      loading: true,
      tableData: [],
      keyword: {
        condition: null,
      },
      page: 1,
      size: 10,
      count: 0,
      pageSize: [10, 20, 30, 40, 50],
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
    this.viewData = {}
    this.search()
  },
  methods: {
    async search() {
      this.loading = true
      const keyword = this.keyword
      keyword.stat = 99
      keyword.cust_id = this.custId
      keyword.cpi_no = this.cpiNo
      this.multipleSelection = []
      const res = await customsBillServer.searchQuote({
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
    commitSearch() {
      this.page = 1
      this.search()
    },
    updateInfo(row) {
      this.$emit('updateInfo', row)
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
