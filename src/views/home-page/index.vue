<template>
  <div class="block-container">
    <el-row :gutter="12">
      <el-col :span="15">
        <el-card class="box-card process-card">
          <div slot="header" class="clearfix">
            <span>工作流</span>
            <div class="f-r">
              <el-button-group>
                <el-button
                  v-loading="loading"
                  :class="{'type-btn-on': workFlowStatusType === 'todoTaskList'}"
                  class="type-btn"
                  type="text"
                  @click="changeWorkFlowType('todoTaskList')"
                >待审批</el-button>
                <el-button
                  v-loading="loading"
                  :class="{'type-btn-on': workFlowStatusType === 'applyTaskList'}"
                  class="type-btn"
                  type="text"
                  @click="changeWorkFlowType('applyTaskList')"
                >我启动的</el-button>
                <!--<el-button class="type-btn" type="text" @click="changeWorkFlowType('todoTaskList')">未达成</el-button>-->
                <el-button
                  v-loading="loading"
                  :class="{'type-btn-on': workFlowStatusType === 'approveList'}"
                  class="type-btn"
                  type="text"
                  @click="changeWorkFlowType('approveList')"
                >已完成</el-button>
              </el-button-group>
            </div>
          </div>
          <el-collapse v-for="key in Object.keys(workFlowMap)" :key="key">
            <el-collapse-item
              :title="billTypeMap[key] == null ? key : billTypeMap[key].title + ` (${workFlowMap[key].length})`"
              :name="key"
            >
              <el-table
                v-loading="loading"
                :data="workFlowMap[key]"
                border
                style="width: 100%"
                @row-dblclick="workFlowGotoDetail"
              >
                <el-table-column prop="subject" sortable min-width="220" label="主题"/>
                <el-table-column prop="creator" sortable min-width="120" label="启动者"/>
                <el-table-column prop="nodeName" sortable min-width="120" label="当前过程"/>
                <el-table-column prop="createTime" sortable min-width="150" label="启动时间"/>
                <el-table-column prop="approveTime" sortable min-width="150" label="到达时间"/>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-card>
        <el-row :gutter="12" class="notice-box">
          <el-col :span="12" class="notice-box-item">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>通知公告</span>
              </div>
              <el-table
                :data="noticeData"
                :loading="loading"
                highlight-current-row
                style="width: 100%"
              >
                <el-table-column
                  prop="fileName"
                  show-overflow-tooltip
                  sortable
                  min-width="95"
                  label="主题"
                >
                  <template slot-scope="scope">
                    <a
                      :href="'/file/api/1.0.0/file/down?fileCode=' + scope.row.fileCode"
                      class="file-name"
                      target="_self"
                      download
                    >{{ scope.row.fileName }}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" sortable min-width="95" label="发布时间">
                  <template slot-scope="scope">{{ scope.row.createTime | parseTime('{y}-{m}-{d}') }}</template>
                </el-table-column>
              </el-table>
              <div v-if="noticeData.length" class="m-w cen-box m-t-12">
                <el-pagination
                  :current-page="page"
                  :total="count"
                  :page-size="size"
                  small
                  layout="prev, pager, next"
                  @current-change="pageNumberChange"
                />
              </div>
            </el-card>
          </el-col>
          <el-col :span="12" class="notice-box-item">
            <systemNotice/>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="9">
        <el-card class="box-card notice-info-data">
          <div slot="header" class="clearfix">
            <el-badge :value="noticeInfoDataTotal" :max="99" class="item">
              <span>工作提醒：</span>
            </el-badge>
          </div>
          <el-table
            :show-header="false"
            :data="noticeInfoData"
            :loading="loading"
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column prop="reminderContent" show-overflow-tooltip sortable label="内容">
              <template slot-scope="scope">
                <el-badge :value="scope.row.result" :max="99" class="item">
                  <span
                    class="notice-content"
                    @click="reminderClick(scope.row.reminderType, scope.row.rwId, scope.row.reminderTitle)"
                  >{{ scope.row.reminderTitle + scope.row.reminderContent }}</span>
                </el-badge>
              </template>
            </el-table-column>
          </el-table>
          <div class="m-w cen-box m-t-12">
            <el-pagination
              :current-page="pageInfo"
              :total="countInfo"
              :page-size="sizeInfo"
              small
              layout="prev, pager, next"
              @current-change="pageNumberChangeInfo"
            />
          </div>
        </el-card>
        <el-row :gutter="12" class="notice-box">
          <el-col :span="24" class="notice-box-item">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>消息</span>
              </div>
              <el-table
                :data="noticeBookData"
                :loading="loading"
                highlight-current-row
                style="width: 100%"
              >
                <el-table-column
                  prop="fileName"
                  show-overflow-tooltip
                  sortable
                  min-width="95"
                  label="内容"
                >
                  <template slot-scope="scope">
                    <a :href="scope.row.url" target="_blank">{{ scope.row.content }}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" fixed="right" width="70" sortable label="操作">
                  <template slot-scope="scope">
                    <span class="read" @click="readClick(scope.row.id)">已读</span>
                  </template>
                </el-table-column>
              </el-table>
              <div v-if="noticeBookData.length" class="m-w cen-box m-t-12">
                <el-pagination
                  :current-page="page"
                  :total="countBook"
                  :page-size="size"
                  small
                  layout="prev, pager, next"
                  @current-change="pageNumberChangeBook"
                />
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import fileServer from './../../api/fileServer'
import homePageServer from './../../api/homePageServer'
import processServer from './../../api/processServer'
import systemNotice from './systemNotice'
const billTypeMap = {
  '40075': {
    title: '信用证录入',
    url: '/DZ-manage/letter-of-credit/credit-certificate/edit'
  },
  '40077': {
    title: '内陆包干费预提',
    url: '/CW-manage/fee-manage/freight-advance/edit-sublist'
  },
  '40079': {
    title: '信用证变更',
    url: '/DZ-manage/letter-of-credit/credit-change/edit'
  },
  '40080': {
    title: '信用证合并流水号',
    url: '/DZ-manage/letter-of-credit/credit-merge/edit'
  },
  '40104': {
    title: '额外费用登记',
    url: '/CW-manage/fee-manage/extra-fee/edit'
  },
  '40081': {
    title: '出运申报',
    url: '/DZ-manage/citic-is-protected/deliver-report/edit'
  },
  '40082': {
    title: '出运申报变更',
    url: '/DZ-manage/citic-is-protected/declare-change/edit'
  },
  '40083': {
    title: '可损通知',
    url: '/DZ-manage/citic-is-protected/damage-notice/edit'
  },
  '40074': {
    title: '包干费费用标准',
    url: '/CW-manage/fee-manage/freight-standard/edit-sublist'
  },
  '40086': {
    title: '可损结案',
    url: '/DZ-manage/citic-is-protected/damage-close/edit'
  },
  '40085': {
    title: '报关单申请',
    url: '/DZ-manage/customs-manage/customs-bill/edit'
  },
  '40087': {
    title: '交单登记',
    url: '/DZ-manage/liquidation-surrender-bill/submit-order/edit'
  },
  '40088': {
    title: '海运费支付',
    url: '/CW-manage/fee-manage/freight-pay-edit'
  },
  '40089': {
    title: '费用登记',
    url: '/CW-manage/fee-manage/expense-record/edit-sublist'
  },
  '40091': {
    title: '内陆包干费支付',
    url: '/CW-manage/fee-manage/fee-pay-edit'
  },
  '40092': {
    title: '订舱单',
    url: '/CW-manage/ship-cabin-order/edit'
  },
  '40107': {
    title: '订舱单变更',
    url: '/CW-manage/ship-cabin-order-change/detail'
  },
  '40093': {
    title: '提单放单',
    url: '/DZ-manage/submit-amend/order-notice/edit'
  },
  '40106': {
    title: '制作提单',
    url: '/DZ-manage/submit-amend/make-order/edit'
  },
  '40094': {
    title: '改单申请',
    url: '/DZ-manage/submit-amend/change-order/edit'
  },
  '40095': {
    title: '清关单确认',
    url: '/DZ-manage/liquidation-surrender-bill/custorm-confirm/edit'
  },
  '40096': {
    title: '融资登记',
    url: '/DZ-manage/invoice-manage/financing-registration/edit'
  },
  '40097': {
    title: '商业发票',
    url: '/DZ-manage/invoice-manage/commercial-invoice/edit'
  },
  '40076': {
    title: '海运费预提',
    url: '/CW-manage/fee-manage/shipping-advance/edit'
  },
  '40099': {
    title: '特殊单据申请',
    url: '/DZ-manage/invoice-manage/irregular-invoice/edit'
  },
  '40102': {
    title: '报关单反馈号',
    url: '/DZ-manage/customs-manage/customs-bill-fed/edit'
  },
  '40103': {
    title: '船公司及货代公司',
    url: '/basic-info/CW-basic-info/shipping-company/edit'
  },
  '40078': {
    title: '海运费询价',
    url: '/CW-manage/marine-price-consultation/edit'
  },
  '40105': {
    title: '商业发票红冲',
    url: '/DZ-manage/invoice-manage/commercial-invoice-neutralize/edit'
  }
}

export default {
  name: '',
  components: { systemNotice },
  filters: {
    billType(val) {
      return billTypeMap[val] || val
    }
  },
  data() {
    return {
      loading: false,
      workFlowMap: {},
      page: 1,
      size: 5,
      count: 0,
      pageInfo: 1,
      sizeInfo: 8,
      countInfo: 0,
      noticeInfoData: [],
      noticeInfoDataTotal: 0,
      pageBook: 1,
      sizeBook: 5,
      countBook: 0,
      noticeBookData: [],
      billTypeMap,
      workFlowStatusType: 'todoTaskList',
      noticeData: [],
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
    this.getWaitMyCheck()
    this.searchNotice()
    this.searchNoticeInfo()
    this.searchNoticeBook()
  },
  methods: {
    getWaitMyCheck() {
      this.loading = true
      processServer
        .getUserWorkFlowData({
          methodType: this.workFlowStatusType
        })
        .then(res => {
          const map = {}
          if (res.data != null) {
            res.data.forEach(item => {
              if (item.billTypeId !== undefined) {
                if (item.billTypeId === '40092' && item.remark !== '3') {
                  item.billTypeId = '40107'
                }
                if (map[item.billTypeId] == null) {
                  map[item.billTypeId] = []
                }
                map[item.billTypeId].push(item)
              }
            })
          }
          this.workFlowMap = map
        })
        .finally(() => {
          this.loading = false
        })
    },
    changeWorkFlowType(type) {
      this.workFlowStatusType = type
      this.getWaitMyCheck()
    },
    workFlowGotoDetail(item) {
      this.$router.push({
        path: `${billTypeMap[item.billTypeId].url}/${item.billId}`
      })
    },
    async searchNotice() {
      const keyWord = {
        busCode: 50000, // 单据类型id
        busNo: 1 // 单据id
      }
      const data = {
        keyWord,
        page: {
          startRow: (this.page - 1) * this.size,
          endRow: this.page * this.size
        }
      }
      const res = await fileServer.checkFile(data)
      res.data = res.data.filter(item => item.tabNo === 0)
      this.noticeData = res.data
      res.data.forEach((item, index) => {
        this.$set(this.noticeData, index, item)
      })
      this.count = res.page.total
    },
    async searchNoticeInfo() {
      const res = await homePageServer.search({
        page: this.pageInfo - 1,
        size: this.sizeInfo
      })
      this.noticeInfoData = res.data.data.data.wordList
      this.noticeInfoDataTotal = res.data.data.data.totalNum
      this.noticeInfoData.forEach((item, index) => {
        this.$set(this.noticeInfoData, index, item)
      })
      this.countInfo = res.data.data.page.total
    },
    async searchNoticeBook() {
      const res = await homePageServer.searchBook({
        page: this.pageBook - 1,
        size: this.sizeBook
      })
      this.noticeBookData = res.data.data.dataSet.rows
      this.noticeBookData.forEach((item, index) => {
        this.$set(this.noticeBookData, index, item)
      })
      this.countBook = res.data.data.dataSet.page.total
    },
    pageNumberChange(val) {
      this.page = val
      this.searchNotice()
    },
    pageNumberChangeInfo(val) {
      this.pageInfo = val
      this.searchNoticeInfo()
    },
    pageNumberChangeBook(val) {
      this.pageBook = val
      this.searchNoticeBook()
    },
    async readClick(id) {
      const res = await homePageServer.noticeRead(id)
      if (Number.parseInt(res.data.code) === 200) {
        this.searchNoticeBook()
      } else {
        this.$message({
          message: '接口调用失败',
          type: 'warning'
        })
      }
    },
    reminderClick(reminderType, rwId, reminderTitle) {
      let url = null
      switch (reminderType) {
        case '1':
          url = 'CW-manage/get-container-project'
          break
        case '2':
          url = 'CW-manage/ship-cabin-order'
          break
        case '3':
          url = 'DZ-manage/customs-manage/customs-bill'
          break
        case '4':
          url = 'report-manage/report-DZ/document-early-warning'
          break
        case '5':
          url = 'DZ-manage/liquidation-surrender-bill/custom-confirm'
          break
        default:
          break
      }

      if (url) {
        const jumpParam = {
          path: url
        }
        if (reminderTitle === '【制作提单】') {
          jumpParam.query = { isMakeBill: 1 }
        } else {
          jumpParam.query = { reminderType: rwId }
        }        
        // 如果是主页跳转的，【待分配货代的订舱单】必须带一个标识参数，服务器要用
        if (Number.parseInt(rwId) === 9) {
          jumpParam.query.waitAllotTran = 1
        }
        this.$router.push(jumpParam)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.block-container {
  width: calc(100% - 24px);
  margin: 12px;
  /deep/ .el-card__header {
    padding: 12px;
  }
  /deep/ .el-card__body {
    padding: 12px;
  }
}
.blocks {
  padding: 12px;
  background-color: #fff;
}
.process-card {
  // height: calc(50vh - 84px - 18px);
  height: 340px;
  overflow-y: auto;
  .type-btn {
    margin-left: 12px;
    padding-top: 0px;
    padding-bottom: 0px;
    color: #c0c4cc;
  }
  .type-btn:hover {
    color: #66b1ff;
  }
  .type-btn-on {
    color: #409eff;
  }
}
.notice-box {
  margin-top: 10px;
}
.notice-content {
  cursor: pointer;
}
.notice-box-item .el-card.box-card{
  height: 288px;
}
.notice-info-data {
  height: 340px;
}
.read {
  cursor: pointer;
}
</style>
