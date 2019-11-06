<template>
  <div class="container dispatch-but-undeclare">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="12" :md="16" :sm="24" :xs="24">
          <el-form-item label="日期">
            <el-date-picker
              v-model="keyword.dateRange"
              type="daterange" 
              size="mini"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="test"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发货通知">
            <el-input v-model="keyword.noticeNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="报关单">
            <el-input v-model="keyword.customsNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template>
      <el-tabs type="border-card">
        <el-table
          :data="tableData"
          :loading="loading"
          border
          class="m-t-12"
          style="width: 100%"
        > 
          <el-table-column
            sortable
            type="index"
            label="序号" />
          <el-table-column
            prop="noticeNo"
            sortable
            label="发货通知" />
          <el-table-column
            sortable
            prop="customsNo"
            label="报关单" />
          <el-table-column
            sortable
            prop="acturalShipDate"
            label="实际出货日期" />
        </el-table>         
      </el-tabs>  
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
  import dispatchButUndeclareServer from '@/api/dispatchButUndeclareServer'
  const initSearchParams = {
    noticeNo: '', // 发货通知单号
    customsNo: '', // 报关单号
    isCustoms: 0, // 是否报关 0-全部 1-否 2-是
    actualShipDateStart: '', // 时间出货时间开始
    actualShipDateEnd: '', // 实际出货时间结束
    dateRange: [], // 实际出货时间
  }
  const initExport = {
    noticeNo: '发货通知',
    customsNo: '报关单',
    acturalShipDate: '实际出货日期'
  }
  export default {
    name: 'DispatchButUndeclarePage',
    components: {
      ExportPopup: () => import('./../../../components/excel/ExportPopup.vue')
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
        showExportPopup: false,
        dataExport: [],
        tHeader: [],
        filterVal: []
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
      test() { 
        // console.log('')
      },
      async search() {
        this.loading = true
        this.multipleSelection = []
        this.keyword.actualShipDateStart = this.keyword.dateRange[0] // 时间出货时间开始
        this.keyword.actualShipDateEnd = this.keyword.dateRange[1] // 实际出货时间结束
        const keyword = this.keyword
        const { data: { data: { data, page }}} = await dispatchButUndeclareServer.search({
          keyword,
          page: this.page - 1,
          size: this.size
        })
//         endRow: 10
// startRow: 0
// total: 35
        this.tableData = data.slice()
        this.count = page.total
        this.$nextTick(() => {
          this.setPageSize()
        })
        this.loading = false
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
          this.filterVal.push(key)
          this.tHeader.push(initExport[key])
        }
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
      }
    }
  }
  
  </script>
  
  <style rel="stylesheet/scss" lang="scss">
    .dispatch-but-undeclare{
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
      .container {
        /deep/ .yellow{
            background: yellow;
          }
      }
      .el-date-editor .el-range-separator{
        padding: 0;
      }
    }
  </style>
  
