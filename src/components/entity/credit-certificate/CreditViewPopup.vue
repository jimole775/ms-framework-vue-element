<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="信用证选择-view"
      top="10vh"
      @close="close"
    >
      <el-form
        :inline="true"
        :model="keyword"
        class="demo-form-inline"
        @keyup.enter.native="commitSearch"
      >
        <el-row>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="信用证起始">
              <el-date-picker
                v-model="keyword.beginDate"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="信用证结束">
              <el-date-picker
                v-model="keyword.endDate"
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="信用证号">
              <el-input v-model="keyword.creditCertificateCode" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="单证员">
              <TradeDocumenterSelect v-model="keyword.tradeDocumenterId"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="业务员">
              <PersonSelect v-model="keyword.salesUserId"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="信用证申请人">
              <el-input v-model="keyword.lcReqMan"/>
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
          @row-dblclick="updateInfo"
        >
          <el-table-column type="index" width="55" label="序号"/>
          <el-table-column show-overflow-tooltip prop="lcNo" sortable min-width="130" label="信用证号"/>
          <el-table-column show-overflow-tooltip prop="incAmt" sortable min-width="80" label="金额"/>
          <el-table-column
            show-overflow-tooltip
            prop="amtDist"
            sortable
            min-width="130"
            label="已分配金额"
          />
          <el-table-column
            show-overflow-tooltip
            prop="prover"
            sortable
            min-width="100"
            label="单证员"
          />
          <el-table-column
            show-overflow-tooltip
            prop="salesUserId"
            sortable
            min-width="100"
            label="业务员"
          />
          <el-table-column
            show-overflow-tooltip
            prop="lcBillDate"
            sortable
            min-width="125"
            label="信用证日期"
          >
            <template slot-scope="scope">{{ scope.row.lcBillDate | parseTime('{y}-{m}-{d}') }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="lcActiveDate"
            sortable
            min-width="115"
            label="失效时间"
          >
            <template slot-scope="scope">{{ scope.row.lcActiveDate | parseTime('{y}-{m}-{d}') }}</template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="lcReqMan"
            sortable
            min-width="120"
            label="开证申请人"
          />
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
import creditCertificateServer from './../../../api/creditCertificateServer'
import PersonSelect from './../person/PersonSelect'
import TradeDocumenterSelect from './../trade-documenter/TradeDocumenterSelect'
import CreditCertificateSelect from './../credit-certificate/CreditCertificateSelect'

export default {
  name: 'CreditViewPopup',
  components: {
    PersonSelect,
    CreditCertificateSelect,
    TradeDocumenterSelect
  },
  data() {
    return {
      loading: true,
      tableData: [],
      stat: 5,
      keyword: {
        beginDate: null,
        endDate: null,
        creditCertificateCode: null,
        proverId: null,
        tradeDocumenterId: null,
        salesUserId: null
      },
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
    this.viewData = {}
    this.search()
  },
  methods: {
    async search() {
      this.loading = true
      const keyword = this.keyword
      const dataItem = this.stat
      this.multipleSelection = []
      const res = await creditCertificateServer.search({
        keyword,
        dataItem,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = []
      res.data.forEach((item, index) => {
        // if (item.stat === 5) {
        //   this.tableData.push(item)
        // }
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
    width: 110px;
  }
  /deep/ .el-form-item__content {
    width: calc(100% - 110px);
  }
}
.search-btn-item {
  /deep/ .el-form-item__content {
    width: auto;
    float: right;
  }
}
</style>
