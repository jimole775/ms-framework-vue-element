<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告号">
            <el-input v-model="keyword.warnNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="keyword.startDate"
              value-format="yyyy-MM-dd"
              size="mini"
              class="max-w"
              type="date"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="keyword.endDate"
              value-format="yyyy-MM-dd"
              size="mini"
              class="max-w"
              type="date"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单证阶段">
            <DocumentsPhase v-model="keyword.orderBy" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单证员">
            <el-input v-model="keyword.prover" size="mini" />
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
          prop="warnNo"
          label="出货预告号"
          align="center"
          width="200">
          <template slot-scope="scope">
            <p>{{ scope.row.warnNo }}</p>
            <p>{{ scope.row.checkTime }}</p>
          </template>
        </el-table-column>  
        <el-table-column
          show-overflow-tooltip
          prop="prover"
          label="单证员"
          align="center"
          width="150" />
        <el-table-column
          show-overflow-tooltip
          prop="warnNo"
          label="单证状态路线图" >
          <template slot-scope="scope">
            <div v-if="scope.row.isBg === 1" style="margin:40px 0 20px 10px" >
              <el-steps style="margin-top:20px">
                <div
                  data-v-4b28fce5
                  class="el-step is-horizontal"
                  style="flex-basis: 20%; margin-right: 0px;"
                >
                  <div :class="scope.row.step6.className">
                    <div class="el-step__line" style="margin-right: 0px;">
                      <i
                        class="el-step__line-inner"
                        style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                      />
                    </div>
                    <div class="el-step__icon is-icon">
                      <i class="el-step__icon-inner el-icon-circle-check"/>
                    </div>
                  </div>
                  <div class="el-step__main" style="align: center">
                    <div>商业发票制作</div>
                    <div :class="scope.row.step6.className">{{ scope.row.step6.flowDate }}</div>
                    <div class="el-step__description is-wait"/>
                  </div>
                </div>
              </el-steps>
            </div>    
            <div v-if="scope.row.isBg === 2" style="margin:40px 0 20px 10px" >
              <el-steps style="margin-top:20px">
                <div
                  data-v-4b28fce5
                  class="el-step is-horizontal"
                  style="flex-basis: 20%; margin-right: 0px;"
                >
                  <div :class="scope.row.step1.className">
                    <div class="el-step__line" style="margin-right: 0px;">
                      <i
                        class="el-step__line-inner"
                        style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                      />
                    </div>
                    <div class="el-step__icon is-icon">
                      <i class="el-step__icon-inner el-icon-circle-check"/>
                    </div>
                  </div>
                  <div class="el-step__main" style="align: center">
                    <div>报关</div>
                    <div v-for="(value, index) in scope.row.step1.Date" :key="index">
                      <div :class="scope.row.step1.className">{{ value.flowDate }}</div>
                    </div>   
                    <div class="el-step__description is-wait"/>
                  </div>
                </div>
                <div
                  data-v-4b28fce5
                  class="el-step is-horizontal"
                  style="flex-basis: 20%; margin-right: 0px;"
                >
                  <div :class="scope.row.step2.className">
                    <div class="el-step__line" style="margin-right: 0px;">
                      <i
                        class="el-step__line-inner"
                        style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                      />
                    </div>
                    <div class="el-step__icon is-icon">
                      <i class="el-step__icon-inner el-icon-circle-check"/>
                    </div>
                  </div>
                  <div class="el-step__main" style="align: center">
                    <div>发票制作</div>
                    <div>财务资料上传</div>
                    <div>{{ scope.row.step2.flowDate }}</div>
                    <div class="el-step__description is-wait"/>
                  </div>
                </div>
                <div
                  data-v-4b28fce5
                  class="el-step is-horizontal"
                  style="flex-basis: 20%; margin-right: 0px;"
                >
                  <div :class="scope.row.step3.className">
                    <div class="el-step__line" style="margin-right: 0px;">
                      <i
                        class="el-step__line-inner"
                        style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                      />
                    </div>
                    <div class="el-step__icon is-icon">
                      <i class="el-step__icon-inner el-icon-circle-check"/>
                    </div>
                  </div>
                  <div class="el-step__main" style="align: center">
                    <div>出运申报</div>
                    <div>清关单据确认</div>
                    <div>{{ scope.row.step3.flowDate }}</div>
                    <div class="el-step__description is-wait"/>
                  </div>
                </div>
                <div
                  data-v-4b28fce5
                  class="el-step is-horizontal"
                  style="flex-basis: 20%; margin-right: 0px;"
                >
                  <div :class="scope.row.step4.className">
                    <div class="el-step__line" style="margin-right: 0px;">
                      <i
                        class="el-step__line-inner"
                        style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                      />
                    </div>
                    <div class="el-step__icon is-icon">
                      <i class="el-step__icon-inner el-icon-circle-check"/>
                    </div>
                  </div>
                  <div class="el-step__main" style="align: center">
                    <div>提单交单</div>
                    <div>{{ scope.row.step4.flowDate }}</div>
                    <div class="el-step__description is-wait"/>
                  </div>
                </div>
                <div
                  data-v-4b28fce5
                  class="el-step is-horizontal"
                  style="flex-basis: 20%; margin-right: 0px;"
                >
                  <div :class="scope.row.step5.className">
                    <div class="el-step__line" style="margin-right: 0px;">
                      <i
                        class="el-step__line-inner"
                        style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                      />
                    </div>
                    <div class="el-step__icon is-icon">
                      <i class="el-step__icon-inner el-icon-circle-check"/>
                    </div>
                  </div>
                  <div class="el-step__main" style="align: center">
                    <div>交单登记</div>
                    <div>{{ scope.row.step5.flowDate }}</div>
                    <div class="el-step__description is-wait"/>
                  </div>
                </div>
              </el-steps>
            </div>
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
  </div>
</template>

<script>
import PayObjectSelectUtil from './../../../components/enum/expense-record/PayObjectSelectUtil'
import documentVisualizationServer from './../../../api/statistics/documentVisualizationServer'
import DocumentsPhase from './../../../components/entity/customs-bill/DocumentsPhase'
const initSearchParams = {
  warnNo: null, 
  startDate: null, 
  endDate: null, 
  prover: null, 
  orderBy: null
}
export default {
  name: 'DocumentVisualization',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    DocumentsPhase
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
      const res = await documentVisualizationServer.search({
        keyword: keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.data
      if (this.tableData) {
        for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].isBg !== 1) {
          if (this.tableData[i].node1 && this.tableData[i].node1[0].flowDate !== null && this.tableData[i].node1[0].flowDate !== '') {
            this.tableData[i].step1 = { Date: this.tableData[i].node1, className: 'el-step__head is-success' }
          } else {
            this.tableData[i].step1 = { flowDate: '', className: 'el-step__head is-wait' }
          }
          if (this.tableData[i].node2 && this.tableData[i].node2[0].flowDate !== null && this.tableData[i].node2[0].flowDate !== '') {
            this.tableData[i].step2 = { flowDate: this.tableData[i].node2[0].flowDate, className: 'el-step__head is-success' }
          } else {
            this.tableData[i].step2 = { flowDate: '', className: 'el-step__head is-wait' }
          }
          if (this.tableData[i].node3 && this.tableData[i].node3[0].flowDate !== null && this.tableData[i].node3[0].flowDate !== '') {
            this.tableData[i].step3 = { flowDate: this.tableData[i].node3[0].flowDate, className: 'el-step__head is-success' }
          } else {
            this.tableData[i].step3 = { flowDate: '', className: 'el-step__head is-wait' }
          }
          if (this.tableData[i].node4 && this.tableData[i].node4[0].flowDate !== null && this.tableData[i].node4[0].flowDate !== '') {
            this.tableData[i].step4 = { flowDate: this.tableData[i].node4[0].flowDate, className: 'el-step__head is-success' }
          } else {
            this.tableData[i].step4 = { flowDate: '', className: 'el-step__head is-wait' }
          }
          if (this.tableData[i].node5 && this.tableData[i].node5[0].flowDate !== null && this.tableData[i].node5[0].flowDate !== '') {
            this.tableData[i].step5 = { flowDate: this.tableData[i].node5[0].flowDate, className: 'el-step__head is-success' }
          } else {
            this.tableData[i].step5 = { flowDate: '', className: 'el-step__head is-wait' }
          }
        } else {
          if (this.tableData[i].node6 && this.tableData[i].node6[0].flowDate !== null && this.tableData[i].node6[0].flowDate !== '') {
            this.tableData[i].step6 = { flowDate: this.tableData[i].node6[0].flowDate, className: 'el-step__head is-success' }
          } else {
            this.tableData[i].step6 = { flowDate: '', className: 'el-step__head is-wait' }
          }
        }
      }
      }
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
