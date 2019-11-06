<template>
  <div class="container">
    <el-form
      :inline="true"
      :model="keyword"
      class="demo-form-inline"
      @keyup.enter.native="commitSearch"
    >
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="手册编号">
            <el-input v-model="keyword.manualNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备案资料库编号">
            <el-input v-model="keyword.recordDatabaseCode" size="mini"/>
          </el-form-item>
        </el-col>
        <!-- <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="手册类型">
            <ManualTypeEnumSelect v-model="keyword.manualType" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="主管海关">
            <el-input v-model="keyword.CompetentCustoms" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="主管外经贸">
            <el-input v-model="keyword.manageFTrad" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="经营单位">
            <ManagementNameEnumSelect v-model="keyword.managementName" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="加工单位">
            <ProcessNameEnumSelect v-model="keyword.processName" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="内销比">
            <el-input v-model="keyword.imsRatio" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="协议号">
            <el-input v-model="keyword.agreementCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="批准文号">
            <el-input v-model="keyword.approvalNumber" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="进口合同号">
            <el-input v-model="keyword.importedPiNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出口合同号">
            <el-input v-model="keyword.exportPiNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备案进口总值">
            <el-input v-model="keyword.recordImportValue" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="进口币制">
            <ImportCurrencyEnumSelect v-model="keyword.importCurrency" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备案出口总值">
            <el-input v-model="keyword.recordExportValue" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出口币制">
            <ExportCurrencyEnumSelect v-model="keyword.exportCurrency" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="加工种类">
            <ProcessTypeEnumSelect v-model="keyword.processType" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="保税方式">
            <BondedTypeEnumSelect v-model="keyword.bondedType" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="结束有效期起始">
            <el-date-picker
              v-model="keyword.endDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="结束有效期结束">
            <el-date-picker
              v-model="keyword.endDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="处理标志">
            <DueTypeEnumSelect v-model="keyword.dueType" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="管理对象">
            <el-input v-model="keyword.manager" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="录入日期起始">
            <el-date-picker
              v-model="keyword.inputDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="录入日期结束">
            <el-date-picker
              v-model="keyword.inputDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="申报日期起始">
            <el-date-picker
              v-model="keyword.declareDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="申报日期结束">
            <el-date-picker
              v-model="keyword.declareDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单耗申报环节">
            <el-input v-model="keyword.costDeclare" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.note" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="台账银行">
            <BankSelect v-model="keyword.ledgerBankIds" type="multiple" />
          </el-form-item>
        </el-col>-->
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <el-button type="text" size="mini" @click="more = !more">{{ more ? '收起' : '更多' }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        @click="clickAddBtn"
      >新增</el-button>
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
      show-icon
    />
    <template>
      <el-table
        :data="tableData"
        :loading="loading"
        border
        class="m-t-12"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        @row-dblclick="handleRowDb"
      >
        <el-table-column type="selection" width="55"/>
        <el-table-column
          v-if="eye.manualNo"
          show-overflow-tooltip
          prop="manualNo"
          sortable
          min-width="140"
          label="手册编号"
        />
        <el-table-column
          v-if="eye.recordDatabaseCode"
          show-overflow-tooltip
          prop="recordDatabaseCode"
          sortable
          min-width="150"
          label="备案资料库编号"
        />
        <el-table-column
          v-if="eye.manualType"
          show-overflow-tooltip
          prop="manualType"
          sortable
          min-width="120"
          label="手册类型"
        >
          <template slot-scope="scope">{{ scope.row.manualType | ManualTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.CompetentCustoms"
          show-overflow-tooltip
          prop="CompetentCustoms"
          sortable
          min-width="120"
          label="主管海关"
        />
        <el-table-column
          v-if="eye.manageFTrad"
          show-overflow-tooltip
          prop="manageFTrad"
          sortable
          min-width="130"
          label="主管外经贸"
        />
        <el-table-column
          v-if="eye.managementName"
          show-overflow-tooltip
          prop="managementName"
          sortable
          min-width="140"
          label="经营单位"
        >
          <template slot-scope="scope">{{ scope.row.managementName | ManagementNameFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.processName"
          show-overflow-tooltip
          prop="processName"
          sortable
          min-width="160"
          label="加工单位"
        >
          <template slot-scope="scope">{{ scope.row.processName | ProcessNameFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.imsRatio"
          show-overflow-tooltip
          prop="imsRatio"
          sortable
          min-width="110"
          label="内销比"
        />
        <el-table-column
          v-if="eye.agreementCode"
          show-overflow-tooltip
          prop="agreementCode"
          sortable
          min-width="140"
          label="协议号"
        />
        <el-table-column
          v-if="eye.approvalNumber"
          show-overflow-tooltip
          prop="approvalNumber"
          sortable
          min-width="140"
          label="批准文号"
        />
        <el-table-column
          v-if="eye.importedPiNo"
          show-overflow-tooltip
          prop="importedPiNo"
          sortable
          min-width="140"
          label="进口合同号"
        />
        <el-table-column
          v-if="eye.exportPiNo"
          show-overflow-tooltip
          prop="exportPiNo"
          sortable
          min-width="140"
          label="出口合同号"
        />
        <el-table-column
          v-if="eye.recordImportValue"
          show-overflow-tooltip
          prop="recordImportValue"
          sortable
          min-width="140"
          label="备案进口总值"
        />
        <el-table-column
          v-if="eye.importCurrency"
          show-overflow-tooltip
          prop="importCurrency"
          sortable
          min-width="110"
          label="进口币制"
        >
          <template slot-scope="scope">{{ scope.row.importCurrency | ImportCurrencyFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.recordExportValue"
          show-overflow-tooltip
          prop="recordExportValue"
          sortable
          min-width="130"
          label="备案出口总值"
        />
        <el-table-column
          v-if="eye.exportCurrency"
          show-overflow-tooltip
          prop="exportCurrency"
          sortable
          min-width="120"
          label="出口币制"
        >
          <template slot-scope="scope">{{ scope.row.exportCurrency | ExportCurrencyFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.processType"
          show-overflow-tooltip
          prop="processType"
          sortable
          min-width="120"
          label="加工种类"
        >
          <template slot-scope="scope">{{ scope.row.processType | ProcessTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.bondedType"
          show-overflow-tooltip
          prop="bondedType"
          sortable
          min-width="120"
          label="保税方式"
        >
          <template slot-scope="scope">{{ scope.row.bondedType | BondedTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.endDate"
          show-overflow-tooltip
          prop="endDate"
          sortable
          min-width="150"
          label="结束有效期"
        >
          <template slot-scope="scope">{{ scope.row.endDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.dueType"
          show-overflow-tooltip
          prop="dueType"
          sortable
          min-width="120"
          label="处理标志"
        >
          <template slot-scope="scope">{{ scope.row.dueType | DueTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.manager"
          show-overflow-tooltip
          prop="manager"
          sortable
          min-width="120"
          label="管理对象"
        />
        <el-table-column
          v-if="eye.inputDate"
          show-overflow-tooltip
          prop="inputDate"
          sortable
          min-width="150"
          label="录入日期"
        >
          <template slot-scope="scope">{{ scope.row.inputDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.declareDate"
          show-overflow-tooltip
          prop="declareDate"
          sortable
          min-width="150"
          label="申报日期"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.declareDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.costDeclare"
          show-overflow-tooltip
          prop="costDeclare"
          sortable
          min-width="130"
          label="单耗申报环节"
        />
        <el-table-column
          v-if="eye.note"
          show-overflow-tooltip
          prop="note"
          sortable
          min-width="130"
          label="备注"
        />
        <el-table-column
          v-if="eye.ledgerBankId"
          show-overflow-tooltip
          prop="ledgerBankId"
          sortable
          min-width="130"
          label="台账银行"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="openLedgerBankViewPopup(scope.row.ledgerBankId)"
            >{{ scope.row.ledgerBank ? scope.row.ledgerBank.id : '' }}</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="clickViewBtn(scope.row)">查看</el-button>
            <el-button type="text" size="mini" @click="clickEditBtn(scope.row)">编辑</el-button>
          </template>
        </el-table-column>-->
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
    <el-dialog :visible="showEye" width="360px" title="过滤" top="10vh" @close="showEye = false">
      <div>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="eye.manualNo">手册编号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.recordDatabaseCode">备案资料库编号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.manualType">手册类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.CompetentCustoms">主管海关</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.manageFTrad">主管外经贸</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.managementName">经营单位</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.processName">加工单位</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.imsRatio">内销比</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.agreementCode">协议号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.approvalNumber">批准文号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.importedPiNo">进口合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.exportPiNo">出口合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.recordImportValue">备案进口总值</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.importCurrency">进口币制</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.recordExportValue">备案出口总值</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.exportCurrency">出口币制</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.processType">加工种类</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bondedType">保税方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.endDate">结束有效期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.dueType">处理标志</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.manager">管理对象</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.inputDate">录入日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.declareDate">申报日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.costDeclare">单耗申报环节</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.note">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.ledgerBankId">ledgerBankId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'ClearanceManualViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'ClearanceManualEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'ClearanceManualDeletePopup'"
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
      v-if="showLedgerBankViewPopup"
      :is="'BankViewPopup'"
      :id="ledgerBankId"
      @close="showLedgerBankViewPopup = false"
    />
  </div>
</template>

<script>
// import Validate from './../../../utils/validate.js'
// import Datetime from './../../../utils/datetime'
import BankSelect from './../../../components/entity/bank/BankSelect'
import ManualTypeEnumSelect from './../../../components/entity/clearance-manual/ManualTypeEnumSelect'
import ManualTypeEnumUtil from './../../../components/enum/clearance-manual/ManualTypeEnumUtil'
import ManagementNameEnumSelect from './../../../components/entity/clearance-manual/ManagementNameEnumSelect'
import ManagementNameEnumUtil from './../../../components/enum/clearance-manual/ManagementNameEnumUtil'
import ProcessNameEnumSelect from './../../../components/entity/clearance-manual/ProcessNameEnumSelect'
import ProcessNameEnumUtil from './../../../components/enum/clearance-manual/ProcessNameEnumUtil'
import ImportCurrencyEnumSelect from './../../../components/entity/clearance-manual/ImportCurrencyEnumSelect'
import ImportCurrencyEnumUtil from './../../../components/enum/clearance-manual/ImportCurrencyEnumUtil'
import ExportCurrencyEnumSelect from './../../../components/entity/clearance-manual/ExportCurrencyEnumSelect'
import ExportCurrencyEnumUtil from './../../../components/enum/clearance-manual/ExportCurrencyEnumUtil'
import ProcessTypeEnumSelect from './../../../components/entity/clearance-manual/ProcessTypeEnumSelect'
import ProcessTypeEnumUtil from './../../../components/enum/clearance-manual/ProcessTypeEnumUtil'
import BondedTypeEnumSelect from './../../../components/entity/clearance-manual/BondedTypeEnumSelect'
import BondedTypeEnumUtil from './../../../components/enum/clearance-manual/BondedTypeEnumUtil'
import DueTypeEnumSelect from './../../../components/entity/clearance-manual/DueTypeEnumSelect'
import DueTypeEnumUtil from './../../../components/enum/clearance-manual/DueTypeEnumUtil'
import clearanceManualServer from './../../../api/clearanceManualServer'
const initSearchParams = {
  manualNo: null,
  recordDatabaseCode: null,
  manualType: null,
  CompetentCustoms: null,
  manageFTrad: null,
  managementName: null,
  processName: null,
  imsRatio: null,
  agreementCode: null,
  approvalNumber: null,
  importedPiNo: null,
  exportPiNo: null,
  recordImportValue: null,
  importCurrency: null,
  recordExportValue: null,
  exportCurrency: null,
  processType: null,
  bondedType: null,
  endDateStart: null,
  endDateEnd: null,
  dueType: null,
  manager: null,
  inputDateStart: null,
  inputDateEnd: null,
  declareDateStart: null,
  declareDateEnd: null,
  costDeclare: null,
  note: null,
  ledgerBankIds: []
}
const initExport = {
  manualNo: '手册编号',
  recordDatabaseCode: '备案资料库编号',
  manualType: '手册类型',
  CompetentCustoms: '主管海关',
  manageFTrad: '主管外经贸',
  managementName: '经营单位',
  processName: '加工单位',
  imsRatio: '内销比',
  agreementCode: '协议号',
  approvalNumber: '批准文号',
  importedPiNo: '进口合同号',
  exportPiNo: '出口合同号',
  recordImportValue: '备案进口总值',
  importCurrency: '进口币制',
  recordExportValue: '备案出口总值',
  exportCurrency: '出口币制',
  processType: '加工种类',
  bondedType: '保税方式',
  endDate: '结束有效期',
  dueType: '处理标志',
  manager: '管理对象',
  inputDate: '录入日期',
  declareDate: '申报日期',
  costDeclare: '单耗申报环节',
  note: '备注',
  ledgerBank: '台账银行'
}
export default {
  name: 'ClearanceManualManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    BankSelect,
    BankViewPopup: () => import('./../bank/bankViewPopup'),
    ManualTypeEnumSelect,
    ManagementNameEnumSelect,
    ProcessNameEnumSelect,
    ImportCurrencyEnumSelect,
    ExportCurrencyEnumSelect,
    ProcessTypeEnumSelect,
    BondedTypeEnumSelect,
    DueTypeEnumSelect,
    ClearanceManualViewPopup: () => import('./clearanceManualViewPopup.vue'),
    ClearanceManualEditPopup: () => import('./clearanceManualEditPopup.vue'),
    ClearanceManualDeletePopup: () => import('./clearanceManualDeletePopup.vue')
  },
  filters: {
    ManualTypeFilter: ManualTypeEnumUtil.toTitleFilter,
    ManagementNameFilter: ManagementNameEnumUtil.toTitleFilter,
    ProcessNameFilter: ProcessNameEnumUtil.toTitleFilter,
    ImportCurrencyFilter: ImportCurrencyEnumUtil.toTitleFilter,
    ExportCurrencyFilter: ExportCurrencyEnumUtil.toTitleFilter,
    ProcessTypeFilter: ProcessTypeEnumUtil.toTitleFilter,
    BondedTypeFilter: BondedTypeEnumUtil.toTitleFilter,
    DueTypeFilter: DueTypeEnumUtil.toTitleFilter
  },
  inject: ['reload'],
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
      showLedgerBankViewPopup: false,
      ledgerBankId: null,
      more: false,
      eye: {
        manualNo: true,
        recordDatabaseCode: true,
        manualType: true,
        CompetentCustoms: true,
        manageFTrad: true,
        managementName: true,
        processName: true,
        imsRatio: true,
        agreementCode: true,
        approvalNumber: true,
        importedPiNo: true,
        exportPiNo: true,
        recordImportValue: true,
        importCurrency: true,
        recordExportValue: true,
        exportCurrency: true,
        processType: true,
        bondedType: true,
        endDate: true,
        dueType: true,
        manager: true,
        inputDate: true,
        declareDate: true,
        costDeclare: true,
        note: true,
        ledgerBankId: true
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

      const res = await clearanceManualServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      if (Number.parseInt(res.code) === 200) {
        this.tableData = res.data.dataSet.rows
        this.count = res.data.dataSet.page.total
        this.$nextTick(() => {
          this.setPageSize()
        })
      } else {
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
      // this.currentClickRow = row
      // this.showEditPopup = true
      this.$router.push({
        path: './clearance-manual-edit',
        query: { id: row.id }
      })
    },
    clickAddBtn() {
      const code = 'new'
      this.$router.push({
        path: './clearance-manual-edit/' + code
      })
      this.reload()
    },
    handleRowDb(val) {
      const code = val.manualId
      this.$router.push({
        path: './clearance-manual-edit/' + code
      })
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
    openLedgerBankViewPopup(id) {
      this.ledgerBankId = id
      this.showLedgerBankViewPopup = true
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
    width: 115px;
  }
  /deep/ .el-form-item__content {
    width: calc(100% - 115px);
  }
}
.search-btn-item {
  /deep/ .el-form-item__content {
    width: auto;
    float: right;
  }
}
</style>
