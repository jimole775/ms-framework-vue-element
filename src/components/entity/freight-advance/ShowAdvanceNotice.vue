<template>
  <div class="shipment-notice-select-popup">
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="内陆包干费详情"
      top="10vh"
      @close="close"
    >
      <div class="max-w">
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
              type="index"
              label="序号"
              width="50" />
            <el-table-column
              show-overflow-tooltip
              prop="warnNo"
              min-width="200"
              label="出货预告编号" />
            <el-table-column
              show-overflow-tooltip
              prop="transitName"
              min-width="150"
              label="协议货代名称" />
            <el-table-column
              show-overflow-tooltip
              prop="orderFeeName"
              min-width="150"
              label="费用项目" />
            <el-table-column
              show-overflow-tooltip
              prop="feeType"
              min-width="150"
              label="费用类型">
              <template slot-scope="scope">
                {{ scope.row.feeType | feeTypeFilter }}
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="boxType"
              min-width="160"
              label="柜型">
              <template slot-scope="scope">
                {{ scope.row.boxType | boxTypeFilter }}
              </template>
            </el-table-column>  
            <el-table-column
              show-overflow-tooltip
              prop="qty"
              min-width="160"
              label="柜量" />
            <el-table-column
              show-overflow-tooltip
              prop="price"
              min-width="150"
              label="单价" />
            <el-table-column
              show-overflow-tooltip
              prop="amt"
              min-width="150"
              label="金额" />  
          </el-table>
        </template>
        <div class="m-w cen-box m-t-12">
          <el-pagination
            :current-page="page"
            :page-sizes="pageSize"
            :page-size="size"
            :total="count"
            :layout="'total, sizes, prev, pager, next, jumper'"
            @size-change="pageSizeChange"
            @current-change="pageNumberChange"
          />
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-loading="loading" size="mini" @click="close">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import Validate from './../../../utils/validate.js'
  import advanceNoticeServer from './../../../api/freightAdvanceNoticeInfo.js'
  import FeeTypeUtil from './../../../components/enum/freight-standard/FeeTypeUtil'
  import boxTypeUtil from './../../../components/enum/freight-standard/boxTypeUtil'
  const initSearchParams = {
    warnId: null,
    piNo: null,
    invoiceNo: null
  }
  export default {
    name: 'ShowAdvanceNotice',
    filters: {
      feeTypeFilter: FeeTypeUtil.toTitleFilter,
      boxTypeFilter: boxTypeUtil.toTitleFilter
    },
    props: {
      warnid: {
        type: Number | String,
        default: 'CNY'
      },
    },
    data() {
      return {
        keyword: {
          ...initSearchParams
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
      async search() {
        this.loading = true
        this.multipleSelection = []
        this.keyword.entid = this.$store.getters.entid
        this.keyword.warnId = this.warnid
        const keyword = this.keyword
        const res = await advanceNoticeServer.search({
          keyword,
          page: this.page - 1,
          size: this.size
        })
        this.tableData = [...res.rows]
        this.count = res.page.total
        this.setPageSize()
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

      close() {
        this.$emit('close')
      },
      resetSearch() {
        this.keyword = {
          ...initSearchParams
        }
        this.page = 1
        this.search()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
  .el-form-item {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
    /deep/ .el-form-item__label {
      width: 135px;
    }
    /deep/ .el-form-item__content {
      width: calc(100% - 135px);
    }
  }
  .search-btn-item {
    /deep/ .el-form-item__content {
      width: auto;
      float: right;
    }
  }
  .el-dialog__header {
    padding: 12px 12px 6px;
  }
  .shipment-notice-select-popup {
    /deep/ .el-dialog__body {
      padding: 12px 20px;
    }
  }

</style>
