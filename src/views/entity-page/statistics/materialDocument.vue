<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="物料凭证编码">
            <el-input v-model="keyword.mblnr" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <!-- <el-button type="text" size="mini" @click="more = !more">
              {{ more ? '收起' : '更多' }}
            </el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
    <template>
      <el-table
        :data="tableData"
        :loading="loading"
        border
        class="m-t-12"
        style="width: 100%"
      >
        <el-table-column
          show-overflow-tooltip
          prop="werks"
          label="工厂"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="bktxt"
          label="手册和&合同号"
          min-width="150" />   
        <el-table-column
          show-overflow-tooltip
          prop="matnr"
          label="物料号"
          min-width="150" />  
        <el-table-column
          show-overflow-tooltip
          prop="maktx"
          label="物料描述"
          min-width="150" />  
        <el-table-column
          show-overflow-tooltip
          prop="mblnr"
          label="物料凭证编码"
          min-width="150" />  
        <el-table-column
          show-overflow-tooltip
          prop="mblnr"
          label="物料凭证年度"
          min-width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="zeile"
          label="物料凭证行项目"
          min-width="150" />    
        <el-table-column
          show-overflow-tooltip
          prop="budat"
          label="过账日期"
          min-width="150" />    
        <el-table-column
          show-overflow-tooltip
          prop="bwart"
          label="移动类型"
          min-width="150" />   
        <el-table-column
          show-overflow-tooltip
          prop="clklx"
          label="出入库类型"
          min-width="150" />        
        <el-table-column
          show-overflow-tooltip
          prop="menge"
          label="数量"
          min-width="150" /> 
        <el-table-column
          show-overflow-tooltip
          prop="umlgo"
          label="目标库位"
          min-width="150" /> 
        <el-table-column
          show-overflow-tooltip
          prop="lgobe"
          label="目标库位描述"
          min-width="150" />         
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
import PayObjectSelectUtil from './../../../components/enum/expense-record/PayObjectSelectUtil'
import materialDocumentServer from './../../../api/statistics/materialDocumentServer'
const initSearchParams = {
  mblnr: null, 
}
const initExport = [
  '工厂',
  '手册和合同号',
  '物料号',
  '物料描述',
  '物料凭证编码',
  '物料凭证年度',
  '物料凭证行项目',
  '过账日期',
  '移动类型',
  '出入库类型',
  '数量',
  '目标库位',
  '目标库位描述'
]
const filterVal = [
  'werks',
  'bktxt',
  'matnr',
  'maktx',
  'mblnr',
  'mblnr',
  'zeile',
  'budat',
  'bwart',
  'clklx',
  'menge',
  'umlgo',
  'lgobe'
]
export default {
  name: 'MaterialDocument',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
  },
  filters: {
    PayObjectSelectFilter: PayObjectSelectUtil.toTitleFilter,
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
      tableData: [],
      more: false,
      tHeader: [],
      filterVal: [],
      showExportPopup: false
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
      const keyword = {
        ...this.keyword
      }
      const res = await materialDocumentServer.search({
        keyword: keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.data
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
    },
    clickExportBtn() {
      this.tHeader = initExport
      this.filterVal = filterVal
      this.dataExport = JSON.parse(JSON.stringify(this.tableData))
      this.showExportPopup = true
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
      width: 120px;
    }
    /deep/ .el-form-item__content {
      width: calc(100% - 120px);
    }
  }
  .search-btn-item {
    /deep/ .el-form-item__content {
      width: auto;
      float: right;
    }
  }
</style>
