<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="企业代码选择-view"
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
          <el-col :lg="8" :md="8" :sm="12" :xs="24">
            <el-form-item label="国家（地区）名称">
              <el-input v-model="keyword.countryName" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="8" :sm="12" :xs="24">
            <el-form-item label="国家（地区）英文名称">
              <el-input v-model="keyword.countryEnName" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="8" :sm="12" :xs="24">
            <el-form-item label="国家（地区）代码">
              <el-input v-model="keyword.countryCode" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :md="8" :sm="12" :xs="24">
            <el-form-item label="企业代码类型">
              <el-input v-model="keyword.companyCode" size="mini"/>
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
          <el-table-column show-overflow-tooltip prop="countryName" sortable min-width="130" label="国家（地区）名称"/>
          <el-table-column show-overflow-tooltip prop="countryEnName" sortable min-width="80" label="国家（地区）英文名称"/>
          <el-table-column
            show-overflow-tooltip
            prop="countryCode"
            sortable
            min-width="130"
            label="国家（地区）代码"
          />
          <el-table-column
            show-overflow-tooltip
            prop="companyCode"
            sortable
            min-width="100"
            label="企业代码类型"
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

export default {
  name: 'CreditViewPopup',
  components: {},
  props: {
    code: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      loading: true,
      tableData: [],
      keyword: {
        countryName: null,
        countryEnName: null,
        countryCode: null,
        companyCode: null
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
      this.multipleSelection = []
      const res = await creditCertificateServer.getCompanyInfo({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = []
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
      if (this.code === 1) {
        this.$emit('updateInfo', row)
      } else {
        this.$emit('editInfo', row)
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
    width: 150px;
  }
  /deep/ .el-form-item__content {
    width: calc(100% - 150px);
  }
}
.search-btn-item {
  /deep/ .el-form-item__content {
    width: auto;
    float: right;
  }
}
</style>
