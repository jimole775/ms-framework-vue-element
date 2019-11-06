<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="手册号">
            <el-input v-model="keyword.manualNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="空调规格型号">
            <el-input v-model="keyword.ktSpec" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="压缩机型号">
            <el-input v-model="keyword.ysjSpec" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="压缩机物料">
            <el-input v-model="keyword.materielCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="标准机型编码">
            <el-input v-model="keyword.productCode" size="mini" />
          </el-form-item>
        </el-col>
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
    <el-button-group>
      <el-button type="primary" icon="el-icon-copy-document" size="mini" @click="clickExportBtn">导出</el-button>
      <el-button type="primary" icon="fa fa-eye-slash" size="mini" @click="showEye = true">过滤</el-button>
    </el-button-group>
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
          v-if="eye.manualNo"
          show-overflow-tooltip
          prop="manualNo"
          sortable
          min-width="130"
          label="手册号" />
        <el-table-column
          v-if="eye.ysjSpec "
          show-overflow-tooltip
          prop="ysjSpec"
          sortable
          min-width="150"
          label="空调规格型号" />
        <el-table-column
          v-if="eye.ktSpec"
          show-overflow-tooltip
          prop="ktSpec"
          sortable
          min-width="140"
          label="压缩机型号" />
        <el-table-column
          v-if="eye.seq"
          show-overflow-tooltip
          prop="seq"
          sortable
          min-width="120"
          label="料件序号" />
        <el-table-column
          v-if="eye.materielCode"
          show-overflow-tooltip
          prop="materielCode"
          sortable
          min-width="140"
          label="压缩机物料" />
        <el-table-column
          v-if="eye.productCode"
          show-overflow-tooltip
          prop="productCode"
          sortable
          min-width="140"
          label="标准机型编码" />
        <el-table-column align="center" label="进口">
          <el-table-column
            v-if="eye.declareQty"
            show-overflow-tooltip
            prop="declareQty"
            sortable
            min-width="120"
            label="手册数量" />
          <el-table-column
            v-if="eye.rksl"
            show-overflow-tooltip
            prop="rksl"
            sortable
            min-width="120"
            label="入库数量" />
          <el-table-column
            v-if="eye.bfsl"
            show-overflow-tooltip
            prop="bfsl"
            sortable
            min-width="120"
            label="报废数量" />
        </el-table-column>
        <el-table-column align="center" label="出口">
          <el-table-column
            v-if="eye.cksl"
            show-overflow-tooltip
            prop="cksl"
            sortable
            min-width="120"
            label="出库数量" />
          <el-table-column
            v-if="eye.fhsl"
            show-overflow-tooltip
            prop="fhsl"
            sortable
            min-width="120"
            label="发货数量" />
          <el-table-column
            v-if="eye.warnQty"
            show-overflow-tooltip
            prop="warnQty"
            sortable
            min-width="130"
            label="出货预告数量" />
          <el-table-column
            v-if="eye.customsQty"
            show-overflow-tooltip
            prop="customsQty"
            sortable
            min-width="120"
            label="报关数量" />
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
    <el-dialog
      :visible="showEye"
      width="360px"
      title="过滤"
      top="10vh"
      @close="showEye = false"
    >
      <div>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="eye.werks">工厂</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bktxt">手册号&amp;合同</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.matnr">物料</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.maktx">物料描述</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.rksl">入库数量</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.cksl">出库数量</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bfsl">报废数量</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.wgsl">完工数量</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.fhsl">发货数量</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.kpsl">开票数量</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.swsl">实物库存</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.jcksl">进出口库存</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.jzsl">结转数量</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.yjz">已结转</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.ynj">已年结</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.handbookCk">结转手册号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.note">备注</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'FeedRegisterViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'FeedRegisterEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'FeedRegisterDeletePopup'"
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
import feedManualServer from './../../../api/feedManualServer'
const initSearchParams = {
  manualNo: null,
  ktSpec: null,
  ysjSpec: null,
  materielCode: null,
  productCode: null
}
const initExport = {
  // werks: '工厂',
  // bktxt: '手册号&amp;合同',
  // matnr: '物料',
  // maktx: '物料描述',
  // rksl: '入库数量',
  // cksl: '出库数量',
  // bfsl: '报废数量',
  // wgsl: '完工数量',
  // fhsl: '发货数量',
  // kpsl: '开票数量',
  // swsl: '实物库存',
  // jcksl: '进出口库存',
  // jzsl: '结转数量',
  // yjz: '已结转',
  // ynj: '已年结',
  // handbookCk: '结转手册号',
  // note: '备注',

  manualNo: '手册号',
  ysjSpec: '空调规格型号',
  ktSpec: '压缩机型号',
  seq: '料件序号',
  materielCode: '压缩机物料',
  productCode: '标准机型编码',
  declareQty: '手册数量',
  rksl: '入库数量',
  bfsl: '报废数量',
  cksl: '出库数量',
  fhsl: '发货数量',
  warnQty: '出货预告数量',
  customsQty: '报关数量',
}
export default {
  name: 'FeedManualManagement',
  components: {
    // ExportPopup: () => import('./../../../../components/excel/ExportPopup.vue'),
    ExportPopup: () => import('./../../../components/excel/ExportPopup'),
    FeedRegisterViewPopup: () => import('./../feed-register/feedRegisterViewPopup'),
    FeedRegisterEditPopup: () => import('./../feed-register/feedRegisterEditPopup.vue'),
    FeedRegisterDeletePopup: () => import('./../feed-register/feedRegisterDeletePopup.vue')
  },
  filters: {
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
      currentClickRow: {},
      multipleSelection: [],
      showViewPopup: false,
      showEditPopup: false,
      showDeletePopup: false,
      showExportPopup: false,
      dataExport: [],
      tHeader: [],
      filterVal: [],
      more: false,
      eye: {
        materielCode: true,
        ktSpec: true,
        ysjSpec: true,
        rksl: true,
        declareQty: true,
        cksl: true,
        customsQty: true,
        productCode: true,
        bfsl: true,
        fhsl: true,
        warnQty: true,
        manualNo: true,
        seq: true
      },
      showEye: false
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
      this.multipleSelection = []
      const keyword = this.keyword     
      const res = await feedManualServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      
      if (Number.parseInt(res.code) === 200) {
        this.tableData = res.data.data
        this.count = res.data.page.total
        this.$nextTick(() => {
          this.setPageSize()
        })
      } else {
        this.tableData = []
        this.count = 0
        this.$message({
          message: res.msg,
          type: 'warning'
        })
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    clickViewBtn(row) {
      this.currentClickRow = row
      this.showViewPopup = true
    },
    clickEditBtn(row) {
      this.currentClickRow = row
      this.showEditPopup = true
    },
    clickAddBtn() {
      this.currentClickRow = {}
      this.showEditPopup = true
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
