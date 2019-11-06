<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单号">
            <el-input v-model="keyword.code" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="状态">
            <BankArchiveStatusEnumSelect v-model="keyword.status" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="银行编号(Swift)">
            <el-input v-model="keyword.swiftCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="联系人">
            <el-input v-model="keyword.contact" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="银行名称(英文)">
            <el-input v-model="keyword.bankNameEn" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="银行名称(中文)">
            <el-input v-model="keyword.bankNameZh" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="银行地址(英文)">
            <el-input v-model="keyword.address" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="邮编">
            <el-input v-model="keyword.postcode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="电话">
            <el-input v-model="keyword.tel" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="传真">
            <el-input v-model="keyword.fax" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="网址">
            <el-input v-model="keyword.url" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="法人代表">
            <el-input v-model="keyword.legalRepresentative" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="成立日期起始">
            <el-date-picker
              v-model="keyword.registrationDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="成立日期结束">
            <el-date-picker
              v-model="keyword.registrationDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="营业额">
            <el-input v-model="keyword.turnover" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="利润">
            <el-input v-model="keyword.profit" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="总利润">
            <el-input v-model="keyword.totalAssets" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="自有资本(USD)">
            <el-input v-model="keyword.theirOwnCapital" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="股东">
            <el-input v-model="keyword.shareholder" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="员工人数">
            <el-input v-model="keyword.employeeNumber" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="分支数目(个)">
            <el-input v-model="keyword.forkNumber" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="自有资本比例(%)">
            <el-input v-model="keyword.theirOwnCapitalRatio" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="所属银行集团名">
            <el-input v-model="keyword.belongBankName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="所属银行集团swift">
            <el-input v-model="keyword.belongBankSwift" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="国际排名">
            <el-input v-model="keyword.internationalRank" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="国内排名">
            <el-input v-model="keyword.inlandRank" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.remark" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="国家">
            <AreaSelect v-model="keyword.areaIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="经营单位">
            <DepartmentSelect v-model="keyword.departmentIds" type="multiple" />
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
      <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="clickAddBtn">新增</el-button>
      <el-button type="primary" icon="el-icon-delete" size="mini" @click="clickBatchDeleteBtn">删除</el-button>
    </el-button-group>
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
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          sortable
          label="单号" />
        <el-table-column
          v-if="eye.status"
          show-overflow-tooltip
          prop="status"
          sortable
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | BankArchiveStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.swiftCode"
          show-overflow-tooltip
          prop="swiftCode"
          sortable
          label="银行编号(Swift)" />
        <el-table-column
          v-if="eye.contact"
          show-overflow-tooltip
          prop="contact"
          sortable
          label="联系人" />
        <el-table-column
          v-if="eye.bankNameEn"
          show-overflow-tooltip
          prop="bankNameEn"
          sortable
          label="银行名称(英文)" />
        <el-table-column
          v-if="eye.bankNameZh"
          show-overflow-tooltip
          prop="bankNameZh"
          sortable
          label="银行名称(中文)" />
        <el-table-column
          v-if="eye.address"
          show-overflow-tooltip
          prop="address"
          sortable
          label="银行地址(英文)" />
        <el-table-column
          v-if="eye.postcode"
          show-overflow-tooltip
          prop="postcode"
          sortable
          label="邮编" />
        <el-table-column
          v-if="eye.tel"
          show-overflow-tooltip
          prop="tel"
          sortable
          label="电话" />
        <el-table-column
          v-if="eye.fax"
          show-overflow-tooltip
          prop="fax"
          sortable
          label="传真" />
        <el-table-column
          v-if="eye.url"
          show-overflow-tooltip
          prop="url"
          sortable
          label="网址" />
        <el-table-column
          v-if="eye.legalRepresentative"
          show-overflow-tooltip
          prop="legalRepresentative"
          sortable
          label="法人代表" />
        <el-table-column
          v-if="eye.registrationDate"
          show-overflow-tooltip
          prop="registrationDate"
          sortable
          label="成立日期">
          <template slot-scope="scope">
            {{ scope.row.registrationDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.turnover"
          show-overflow-tooltip
          prop="turnover"
          sortable
          label="营业额" />
        <el-table-column
          v-if="eye.profit"
          show-overflow-tooltip
          prop="profit"
          sortable
          label="利润" />
        <el-table-column
          v-if="eye.totalAssets"
          show-overflow-tooltip
          prop="totalAssets"
          sortable
          label="总利润" />
        <el-table-column
          v-if="eye.theirOwnCapital"
          show-overflow-tooltip
          prop="theirOwnCapital"
          sortable
          label="自有资本(USD)" />
        <el-table-column
          v-if="eye.shareholder"
          show-overflow-tooltip
          prop="shareholder"
          sortable
          label="股东" />
        <el-table-column
          v-if="eye.employeeNumber"
          show-overflow-tooltip
          prop="employeeNumber"
          sortable
          label="员工人数" />
        <el-table-column
          v-if="eye.forkNumber"
          show-overflow-tooltip
          prop="forkNumber"
          sortable
          label="分支数目(个)" />
        <el-table-column
          v-if="eye.theirOwnCapitalRatio"
          show-overflow-tooltip
          prop="theirOwnCapitalRatio"
          sortable
          label="自有资本比例(%)" />
        <el-table-column
          v-if="eye.belongBankName"
          show-overflow-tooltip
          prop="belongBankName"
          sortable
          label="所属银行集团名" />
        <el-table-column
          v-if="eye.belongBankSwift"
          show-overflow-tooltip
          prop="belongBankSwift"
          sortable
          label="所属银行集团swift" />
        <el-table-column
          v-if="eye.internationalRank"
          show-overflow-tooltip
          prop="internationalRank"
          sortable
          label="国际排名" />
        <el-table-column
          v-if="eye.inlandRank"
          show-overflow-tooltip
          prop="inlandRank"
          sortable
          label="国内排名" />
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          sortable
          label="备注" />
        <el-table-column
          v-if="eye.isDelete"
          show-overflow-tooltip
          prop="isDelete"
          sortable
          label="是否删除">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isDelete === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.isDelete }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.areaId"
          show-overflow-tooltip
          prop="areaId"
          sortable
          label="国家">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openAreaViewPopup(scope.row.areaId)">{{ scope.row.area ? scope.row.area.id : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.departmentId"
          show-overflow-tooltip
          prop="departmentId"
          sortable
          label="经营单位"/>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="clickViewBtn(scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="clickEditBtn(scope.row)">编辑</el-button>
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
            <el-checkbox v-model="eye.code">单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.status">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.swiftCode">银行编号(Swift)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.contact">联系人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bankNameEn">银行名称(英文)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bankNameZh">银行名称(中文)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.address">银行地址(英文)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.postcode">邮编</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.tel">电话</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.fax">传真</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.url">网址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.legalRepresentative">法人代表</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.registrationDate">成立日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.turnover">营业额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.profit">利润</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.totalAssets">总利润</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.theirOwnCapital">自有资本(USD)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shareholder">股东</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.employeeNumber">员工人数</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.forkNumber">分支数目(个)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.theirOwnCapitalRatio">自有资本比例(%)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.belongBankName">所属银行集团名</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.belongBankSwift">所属银行集团swift</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.internationalRank">国际排名</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.inlandRank">国内排名</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.areaId">areaId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.departmentId">departmentId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'BankArchiveViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'BankArchiveEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'BankArchiveDeletePopup'"
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
    <component
      v-if="showAreaViewPopup"
      :is="'AreaViewPopup'"
      :id="areaId"
      @close="showAreaViewPopup = false"
    />
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
import Datetime from './../../../utils/datetime'
import AreaSelect from './../../../components/entity/area/AreaSelect'
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
import BankArchiveStatusEnumSelect from './../../../components/entity/bank-archive/BankArchiveStatusEnumSelect'
import BankArchiveStatusEnumUtil from './../../../components/enum/bank-archive/BankArchiveStatusEnumUtil'
import bankArchiveServer from './../../../api/bankArchiveServer'
const initSearchParams = {
  code: null,
  status: null,
  swiftCode: null,
  contact: null,
  bankNameEn: null,
  bankNameZh: null,
  address: null,
  postcode: null,
  tel: null,
  fax: null,
  url: null,
  legalRepresentative: null,
  registrationDateStart: null,
  registrationDateEnd: null,
  turnover: null,
  profit: null,
  totalAssets: null,
  theirOwnCapital: null,
  shareholder: null,
  employeeNumber: null,
  forkNumber: null,
  theirOwnCapitalRatio: null,
  belongBankName: null,
  belongBankSwift: null,
  internationalRank: null,
  inlandRank: null,
  remark: null,
  isDelete: null,
  areaIds: [],
  departmentIds: [],
}
const initExport = {
  code: '单号',
  status: '状态',
  swiftCode: '银行编号(Swift)',
  contact: '联系人',
  bankNameEn: '银行名称(英文)',
  bankNameZh: '银行名称(中文)',
  address: '银行地址(英文)',
  postcode: '邮编',
  tel: '电话',
  fax: '传真',
  url: '网址',
  legalRepresentative: '法人代表',
  registrationDate: '成立日期',
  turnover: '营业额',
  profit: '利润',
  totalAssets: '总利润',
  theirOwnCapital: '自有资本(USD)',
  shareholder: '股东',
  employeeNumber: '员工人数',
  forkNumber: '分支数目(个)',
  theirOwnCapitalRatio: '自有资本比例(%)',
  belongBankName: '所属银行集团名',
  belongBankSwift: '所属银行集团swift',
  internationalRank: '国际排名',
  inlandRank: '国内排名',
  remark: '备注',
  isDelete: '是否删除',
  area: '国家',
  department: '经营单位',
}
export default {
  name: 'BankArchiveManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    AreaSelect,
    AreaViewPopup: () => import('./../area/areaViewPopup'),
    DepartmentSelect,
    BankArchiveStatusEnumSelect,
    BankArchiveViewPopup: () => import('./bankArchiveViewPopup.vue'),
    BankArchiveEditPopup: () => import('./bankArchiveEditPopup.vue'),
    BankArchiveDeletePopup: () => import('./bankArchiveDeletePopup.vue')
  },
  filters: {
    BankArchiveStatusFilter: BankArchiveStatusEnumUtil.toTitleFilter,
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
      showAreaViewPopup: false,
      areaId: null,
      more: false,
      eye: {
        code: true,
        status: true,
        swiftCode: true,
        contact: true,
        bankNameEn: true,
        bankNameZh: true,
        address: true,
        postcode: true,
        tel: true,
        fax: true,
        url: true,
        legalRepresentative: true,
        registrationDate: true,
        turnover: true,
        profit: true,
        totalAssets: true,
        theirOwnCapital: true,
        shareholder: true,
        employeeNumber: true,
        forkNumber: true,
        theirOwnCapitalRatio: true,
        belongBankName: true,
        belongBankSwift: true,
        internationalRank: true,
        inlandRank: true,
        remark: true,
        isDelete: true,
        areaId: true,
        departmentId: true,
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
      let query = '*:*'
      if (Validate.isNotEmpty(keyword.code)) {
        query += ` AND code:${keyword.code}`
      }
      if (keyword.status && keyword.status.length > 0) {
        query += ' AND ('
        keyword.status.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `status:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.swiftCode)) {
        query += ` AND swiftCode:${keyword.swiftCode}`
      }
      if (Validate.isNotEmpty(keyword.contact)) {
        query += ` AND contact:${keyword.contact}`
      }
      if (Validate.isNotEmpty(keyword.bankNameEn)) {
        query += ` AND bankNameEn:${keyword.bankNameEn}`
      }
      if (Validate.isNotEmpty(keyword.bankNameZh)) {
        query += ` AND bankNameZh:${keyword.bankNameZh}`
      }
      if (Validate.isNotEmpty(keyword.address)) {
        query += ` AND address:${keyword.address}`
      }
      if (Validate.isNotEmpty(keyword.postcode)) {
        query += ` AND postcode:${keyword.postcode}`
      }
      if (Validate.isNotEmpty(keyword.tel)) {
        query += ` AND tel:${keyword.tel}`
      }
      if (Validate.isNotEmpty(keyword.fax)) {
        query += ` AND fax:${keyword.fax}`
      }
      if (Validate.isNotEmpty(keyword.url)) {
        query += ` AND url:${keyword.url}`
      }
      if (Validate.isNotEmpty(keyword.legalRepresentative)) {
        query += ` AND legalRepresentative:${keyword.legalRepresentative}`
      }
      if (keyword.registrationDateStart) {
        query += ` AND registrationDate:[${Datetime.dateToDateStr(keyword.registrationDateStart)} TO *]`
      }
      if (keyword.registrationDateEnd) {
        query += ` AND registrationDate:[* TO ${Datetime.dateToDateStr(keyword.registrationDateEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.turnover)) {
        query += ` AND turnover:${keyword.turnover}`
      }
      if (Validate.isNotEmpty(keyword.profit)) {
        query += ` AND profit:${keyword.profit}`
      }
      if (Validate.isNotEmpty(keyword.totalAssets)) {
        query += ` AND totalAssets:${keyword.totalAssets}`
      }
      if (Validate.isNotEmpty(keyword.theirOwnCapital)) {
        query += ` AND theirOwnCapital:${keyword.theirOwnCapital}`
      }
      if (Validate.isNotEmpty(keyword.shareholder)) {
        query += ` AND shareholder:${keyword.shareholder}`
      }
      if (Validate.isNotEmpty(keyword.employeeNumber)) {
        query += ` AND employeeNumber:${keyword.employeeNumber}`
      }
      if (Validate.isNotEmpty(keyword.forkNumber)) {
        query += ` AND forkNumber:${keyword.forkNumber}`
      }
      if (Validate.isNotEmpty(keyword.theirOwnCapitalRatio)) {
        query += ` AND theirOwnCapitalRatio:${keyword.theirOwnCapitalRatio}`
      }
      if (Validate.isNotEmpty(keyword.belongBankName)) {
        query += ` AND belongBankName:${keyword.belongBankName}`
      }
      if (Validate.isNotEmpty(keyword.belongBankSwift)) {
        query += ` AND belongBankSwift:${keyword.belongBankSwift}`
      }
      if (Validate.isNotEmpty(keyword.internationalRank)) {
        query += ` AND internationalRank:${keyword.internationalRank}`
      }
      if (Validate.isNotEmpty(keyword.inlandRank)) {
        query += ` AND inlandRank:${keyword.inlandRank}`
      }
      if (Validate.isNotEmpty(keyword.remark)) {
        query += ` AND remark:${keyword.remark}`
      }
      if (keyword.areaIds && keyword.areaIds.length > 0) {
        query += ' AND ('
        keyword.areaIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `area.id:${id}`
        })
        query += ')'
      }
      if (keyword.departmentIds && keyword.departmentIds.length > 0) {
        query += ' AND ('
        keyword.departmentIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `department.id:${id}`
        })
        query += ')'
      }
      const res = await bankArchiveServer.search({
        query,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.data
      this.count = res.pagination.count
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
    openAreaViewPopup(id) {
      this.areaId = id
      this.showAreaViewPopup = true
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
