<template>
  <div class="shipment-notice-select-popup">
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="选择商业发票"
      top="10vh"
      @close="close"
    >
      <div class="max-w">
        <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="商业发票号">
                <el-input v-model="keyword.commercialInvoiceCode" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="pi号">
                <el-input v-model="keyword.piCode" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="合同号">
                <el-input v-model="keyword.contractCode" size="mini" />
              </el-form-item>
            </el-col>
            <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制单部门">
                <el-input v-model="keyword.saleDepartmentName" size="mini" />
              </el-form-item>
            </el-col> -->
            <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="客户名称">
                <el-input v-model="keyword.customer" size="mini" />
              </el-form-item>
            </el-col> -->
            <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="制单人">
                <el-input v-model="keyword.createUser" size="mini" />
              </el-form-item>
            </el-col> -->
            <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
              <el-form-item class="search-btn-item">
                <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
                <el-button size="mini" @click="resetSearch">重置</el-button>
                <el-button type="text" size="mini" @click="more = !more">
                  {{ more ? '收起' : '更多' }}
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
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
            <el-table-column
              type="index"
              label="序号"
              width="50" />
            <el-table-column
              show-overflow-tooltip
              prop="commercialInvoiceCode"
              sortable
              min-width="180"
              label="商业发票号" />
            <el-table-column
              show-overflow-tooltip
              prop="custName"
              sortable
              min-width="150"
              label="客户名称" />
            <el-table-column
              show-overflow-tooltip
              prop="custCode"
              sortable
              min-width="150"
              label="客户编码" />
            <el-table-column
              show-overflow-tooltip
              prop="pinoNew"
              sortable
              min-width="150"
              label="合同号" />
            <el-table-column
              show-overflow-tooltip
              prop="invoiceRegistrationTime"
              sortable
              min-width="150"
              label="账期" />
            <el-table-column
              show-overflow-tooltip
              prop="invoiceAmount"
              sortable
              min-width="150"
              label="金额" />
            <el-table-column
              show-overflow-tooltip
              prop="paymentTypeName"
              sortable
              min-width="150"
              label="付款方式" />
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
        <el-button v-loading="loading" size="mini" @click="close">取消</el-button>
        <el-button v-loading="loading" type="primary" size="mini" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import commercialInvoiceServer from './../../../api/commercialInvoiceServer'
  const initSearchParams = {
    seaportInName: null
  }
  export default {
    name: 'CommercialInvoiceSelectPopup',
    filters: {
      shiptypeFilter(val) {
        switch (val) {
          case 1:
            return 'BY TRAIN'
          case 2:
            return 'BY SEA'
          case 3:
            return '自提'
          case 4:
            return 'BY AIR'
          case 5:
            return 'BYTRUCK'
          case 6:
            return 'BY EXPRESS'
          case 7:
            return 'Y LCL'
          default:
            break
        }
      }
    },
    props: {
      condition: {
        type: Object,
        default: () => { return {} }
      }
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
        const keyword = {
          ...this.keyword,
          ...this.condition
        }
        // const query = {}
        // Object.keys(keyword).forEach(key => {
        //   if (Validate.isNotEmpty(keyword[key])) {
        //     query[key] = keyword[key]
        //   }
        // })
        try {
          const res = await commercialInvoiceServer.search({
            keyword,
            page: this.page - 1,
            size: this.size
          })
          this.tableData = res.data.data.data
          this.count = res.data.data.page.total
          // this.count = res.pagination.count
          this.setPageSize(res.pagination.count)
        } catch (e) {
          console.log(e)
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
      },
      confirm() {
        this.$emit('confirm', this.multipleSelection)
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
