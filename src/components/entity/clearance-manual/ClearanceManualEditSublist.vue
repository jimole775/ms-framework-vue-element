<template>
  <div class="max-w back">
    <div class="container">
      <el-button type="primary" icon="el-icon-check" size="mini" @click="save">保存</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
      <el-button
        v-show="formData.manualId"
        type="danger"
        icon="el-icon-delete"
        size="mini"
        @click="del"
      >删除</el-button>
      <el-button v-show="formData.manualId" type="primary" size="mini" icon="el-icon-check">提交</el-button>
    </div>
    <div class="container m-t-not">
      <el-form
        :model="formData"
        :ref="'formData'"
        :rules="rules"
        class="demo-form-inline"
        label-position="right"
        label-width="120px"
      >
        <el-row>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="手册编号" prop="manualNo">
              <el-input v-model="formData.manualNo" size="mini" clearable/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="备案资料库编号" prop="recordDatabaseCode">
              <el-input v-model="formData.recordDatabaseCode" size="mini" clearable/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="手册类型" prop="manualType">
              <!-- <ManualTypeEnumSelect v-model="formData.manualType" /> -->
              <el-input v-model="formData.manualType" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="主管海关" prop="competentCustoms">
              <el-input v-model="formData.competentCustoms" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="主管外经贸" prop="manageFTrad">
              <el-input v-model="formData.manageFTrad" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="经营单位" prop="managementName">
              <!-- <ManagementNameEnumSelect v-model="formData.managementName" /> -->
              <el-input v-model="formData.managementName" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="加工单位" prop="processName">
              <!-- <ProcessNameEnumSelect v-model="formData.processName" /> -->
              <el-input v-model="formData.processName" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="内销比" prop="imsRatio">
              <el-input v-model="formData.imsRatio" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="协议号" prop="agreementCode">
              <el-input v-model="formData.agreementCode" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="批准文号" prop="approvalNumber">
              <el-input v-model="formData.approvalNumber" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="进口合同号" prop="importedPiNo">
              <el-input v-model="formData.importedPiNo" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="出口合同号" prop="exportPiNo">
              <el-input v-model="formData.exportPiNo" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="备案进口总值" prop="recordImportValue">
              <el-input-number v-model="formData.recordImportValue" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="进口币制" prop="importCurrency">
              <!-- <ImportCurrencyEnumSelect v-model="formData.importCurrency" /> -->
              <el-input v-model="formData.importCurrency" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="备案出口总值" prop="recordExportValue">
              <el-input-number v-model="formData.recordExportValue" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="出口币制" prop="exportCurrency">
              <!-- <ExportCurrencyEnumSelect v-model="formData.exportCurrency" /> -->
              <el-input v-model="formData.exportCurrency" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="加工种类" prop="processType">
              <!-- <ProcessTypeEnumSelect v-model="formData.processType" /> -->
              <el-input v-model="formData.processType" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="保税方式" prop="bondedType">
              <!-- <BondedTypeEnumSelect v-model="formData.bondedType" /> -->
              <el-input v-model="formData.bondedType" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="结束有效期" prop="endDate">
              <el-date-picker
                v-model="formData.endDate"
                :disabled="false"
                value-format="yyyy-MM-dd"
                size="mini"
                class="max-w"
                type="date"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="处理标志" prop="dueType">
              <!-- <DueTypeEnumSelect v-model="formData.dueType" /> -->
              <el-input v-model="formData.dueType" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="管理对象" prop="manager">
              <el-input v-model="formData.manager" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="录入日期" prop="inputDate">
              <el-date-picker
                v-model="formData.inputDate"
                :disabled="false"
                value-format="yyyy-MM-dd"
                size="mini"
                class="max-w"
                type="date"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="申报日期" prop="declareDate">
              <el-date-picker
                v-model="formData.declareDate"
                :disabled="false"
                value-format="yyyy-MM-dd"
                size="mini"
                class="max-w"
                type="date"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="单耗申报环节" prop="costDeclare">
              <el-input v-model="formData.costDeclare" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="备注" prop="note">
              <el-input v-model="formData.note" size="mini"/>
            </el-form-item>
          </el-col>

          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="台账银行" prop="ledgerBank">
              <!-- <BankSelect v-model="formData.ledgerBank" /> -->
              <el-input v-model="formData.ledgerBank" size="mini"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs type="border-card">
        <el-tab-pane label="料件信息">
          <el-row>
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="clickAddClearanceManualItem"
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="clickDeleteClearanceManualItem"
            />
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${clearanceManualItemsSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="clearanceManualItems"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeClearanceManualItem"
          >
            <el-table-column type="selection"/>
            <el-table-column sortable width="190" label="序号">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.seq" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="recordNo" sortable width="190" label="记录号">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.recordNo" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="itemHCode" sortable width="180" label="商品编码">
              <template slot-scope="scope">
                <el-input v-model="scope.row.itemHCode" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="itemHName" sortable width="180" label="商品名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.itemHName" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="code" sortable width="180" label="物料编码">
              <template slot-scope="scope">
                <el-input v-model="scope.row.code" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="spec" sortable width="180" label="规格型号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.spec" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="isMainMaterial" sortable min-width="120" label="主料标志">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isMainMaterial"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="uom" sortable width="210" label="计量单位">
              <template slot-scope="scope">
                <el-input v-model="scope.row.uom" size="mini"/>
                <!-- <UomEnumSelect v-model="scope.row.uom" /> -->
              </template>
            </el-table-column>
            <el-table-column prop="stdUom" sortable width="210" label="法定计量单位">
              <template slot-scope="scope">
                <!-- <StdUomEnumSelect v-model="scope.row.stdUom" /> -->
                <el-input v-model="scope.row.stdUom" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="declareQty" sortable width="190" label="申报数量">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.declareQty" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="declarePrice" sortable width="190" label="申报单价">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.declarePrice"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="declareAmt" sortable width="190" label="申报总价">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.declareAmt"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="cny" sortable width="210" label="币值">
              <template slot-scope="scope">
                <!-- <CnyEnumSelect v-model="scope.row.cny" /> -->
                <el-input v-model="scope.row.cny" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="dollarAmt" sortable width="190" label="美元总价">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.dollarAmt"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="stdUomFactor" sortable width="180" label="比例因子">
              <template slot-scope="scope">
                <el-input v-model="scope.row.stdUomFactor" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="exemptionScheme" sortable width="180" label="免征方案">
              <template slot-scope="scope">
                <el-input v-model="scope.row.exemptionScheme" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="note" sortable width="180" label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.note" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="proMarkingCountry" sortable width="210" label="产销国">
              <template slot-scope="scope">
                <!-- <AreaSelect v-model="scope.row.proMarkingCountry" /> -->
                <el-input v-model="scope.row.proMarkingCountry" size="mini"/>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="成品信息">
          <el-row>
            <el-button
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="clickAddClearanceManualProduct"
            />
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="clickDeleteClearanceManualProduct"
            />
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${clearanceManualProductsSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="clearanceManualProducts"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeClearanceManualProduct"
          >
            <el-table-column type="selection"/>
            <el-table-column sortable width="190" label="序号">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.seq" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="recordNo" sortable width="190" label="记录号">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.recordNo" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="itemHCode" sortable width="180" label="商品编码">
              <template slot-scope="scope">
                <el-input v-model="scope.row.itemHCode" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="itemHName" sortable width="180" label="商品名称">
              <template slot-scope="scope">
                <el-input v-model="scope.row.itemHName" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="spec" sortable width="180" label="规格型号">
              <template slot-scope="scope">
                <el-input v-model="scope.row.spec" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="isMainMaterial" sortable min-width="120" label="主料标志">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isMainMaterial"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="uom" sortable width="210" label="计量单位">
              <template slot-scope="scope">
                <!-- <UomEnumSelect v-model="scope.row.uom" /> -->
                <el-input v-model="scope.row.uom" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="stdUom" sortable width="210" label="法定计量单位">
              <template slot-scope="scope">
                <!-- <StdUomEnumSelect v-model="scope.row.stdUom" /> -->
                <el-input v-model="scope.row.stdUom" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="declareQty" sortable width="190" label="申报数量">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.declareQty" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="declarePrice" sortable width="190" label="申报单价">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.declarePrice"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="declareAmt" sortable width="190" label="申报总价">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.declareAmt"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="cny" sortable width="210" label="币值">
              <template slot-scope="scope">
                <!-- <CnyEnumSelect v-model="scope.row.cny" /> -->
                <el-input v-model="scope.row.cny" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="dollarAmt" sortable width="190" label="美元总价">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.dollarAmt"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="stdUomFactor" sortable width="180" label="比例因子">
              <template slot-scope="scope">
                <el-input v-model="scope.row.stdUomFactor" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="exemptionScheme" sortable width="180" label="免征方案">
              <template slot-scope="scope">
                <el-input v-model="scope.row.exemptionScheme" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="note" sortable width="180" label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.note" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="proMarkingCountry" sortable width="210" label="产销国">
              <template slot-scope="scope">
                <!-- <AreaSelect v-model="scope.row.proMarkingCountry" /> -->
                <el-input v-model="scope.row.proMarkingCountry" size="mini"/>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <component
      v-if="showClearanceManualItemDeletePopup"
      :is="'ClearanceManualItemDeletePopup'"
      :list="clearanceManualItemsSelection"
      @close="showClearanceManualItemDeletePopup = false"
      @update="deletedClearanceManualItem"
    />
    <component
      v-if="showClearanceManualProductDeletePopup"
      :is="'ClearanceManualProductDeletePopup'"
      :list="clearanceManualProductsSelection"
      @close="showClearanceManualProductDeletePopup = false"
      @update="deletedClearanceManualProduct"
    />
  </div>
</template>

<script>
import clearanceManualServer from './../../../api/clearanceManualServer'
// import clearanceManualItemServer from './../../../api/clearanceManualItemServer'
// import clearanceManualProductServer from './../../../api/clearanceManualProductServer'
import validate from './../../../utils/validate'
import BankSelect from './../bank/BankSelect'
import AreaSelect from './../area/AreaSelect'
import ManualTypeEnumSelect from './../../../components/entity/clearance-manual/ManualTypeEnumSelect'
import ManagementNameEnumSelect from './../../../components/entity/clearance-manual/ManagementNameEnumSelect'
import ProcessNameEnumSelect from './../../../components/entity/clearance-manual/ProcessNameEnumSelect'
import ImportCurrencyEnumSelect from './../../../components/entity/clearance-manual/ImportCurrencyEnumSelect'
import ExportCurrencyEnumSelect from './../../../components/entity/clearance-manual/ExportCurrencyEnumSelect'
import ProcessTypeEnumSelect from './../../../components/entity/clearance-manual/ProcessTypeEnumSelect'
import BondedTypeEnumSelect from './../../../components/entity/clearance-manual/BondedTypeEnumSelect'
import DueTypeEnumSelect from './../../../components/entity/clearance-manual/DueTypeEnumSelect'
import UomEnumSelect from './../../../components/entity/clearance-manual-item/UomEnumSelect'
import StdUomEnumSelect from './../../../components/entity/clearance-manual-item/StdUomEnumSelect'
import CnyEnumSelect from './../../../components/entity/clearance-manual-item/CnyEnumSelect'

const emptyFormData = {
  manualNo: null,
  recordDatabaseCode: null,
  manualType: null,
  competentCustoms: null,
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
  endDate: null,
  dueType: null,
  manager: null,
  inputDate: null,
  declareDate: null,
  costDeclare: null,
  note: null,
  ledgerBank: null
}
const clearanceManualItemEmptyData = {
  recordNo: null,
  itemHCode: null,
  itemHName: null,
  code: null,
  spec: null,
  isMainMaterial: null,
  uom: null,
  stdUom: null,
  declareQty: null,
  declarePrice: null,
  declareAmt: null,
  cny: null,
  dollarAmt: null,
  stdUomFactor: null,
  exemptionScheme: null,
  note: null,
  proMarkingCountry: null,
  manualId: null,
  informationType: null
}
const clearanceManualProductEmptyData = {
  recordNo: null,
  itemHCode: null,
  itemHName: null,
  spec: null,
  isMainMaterial: null,
  uom: null,
  stdUom: null,
  declareQty: null,
  declarePrice: null,
  declareAmt: null,
  cny: null,
  dollarAmt: null,
  stdUomFactor: null,
  exemptionScheme: null,
  note: null,
  proMarkingCountry: null,
  manualId: null,
  informationType: null
}

const clearanceManualItemRules = {
  recordNo: [
    { message: '记录号 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  itemHCode: [{ message: '商品编码不能为空', validate: validate.isNotEmpty }],
  itemHName: [{ message: '商品名称不能为空', validate: validate.isNotEmpty }],
  code: [],
  spec: [],
  isMainMaterial: [],
  uom: [],
  stdUom: [],
  declareQty: [
    { message: '申报数量 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  declarePrice: [
    { message: '申报单价 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  declareAmt: [
    { message: '申报总价 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  cny: [],
  dollarAmt: [
    { message: '美元总价 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  stdUomFactor: [],
  exemptionScheme: [],
  note: [],
  proMarkingCountry: []
}
const clearanceManualProductRules = {
  recordNo: [
    { message: '记录号 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  itemHCode: [{ message: '商品编码不能为空', validate: validate.isNotEmpty }],
  itemHName: [{ message: '商品名称不能为空', validate: validate.isNotEmpty }],
  spec: [],
  isMainMaterial: [],
  uom: [],
  stdUom: [],
  declareQty: [
    { message: '申报数量 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  declarePrice: [
    { message: '申报单价 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  declareAmt: [
    { message: '申报总价 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  cny: [],
  dollarAmt: [
    { message: '美元总价 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  stdUomFactor: [],
  exemptionScheme: [],
  note: [],
  proMarkingCountry: []
}

let initFormData = {
  ...emptyFormData
}
// const initClearanceManualItems = []
// const initClearanceManualProducts = []

export default {
  name: 'ClearanceManualSublistEdit',
  components: {
    BankSelect,
    AreaSelect,
    ManualTypeEnumSelect,
    ManagementNameEnumSelect,
    ProcessNameEnumSelect,
    ImportCurrencyEnumSelect,
    ExportCurrencyEnumSelect,
    ProcessTypeEnumSelect,
    BondedTypeEnumSelect,
    DueTypeEnumSelect,
    CnyEnumSelect,
    UomEnumSelect,
    StdUomEnumSelect,
    ClearanceManualItemDeletePopup: () =>
      import('./../../../views/entity-page/clearance-manual-item/clearanceManualItemDeletePopup.vue'),
    ClearanceManualProductDeletePopup: () =>
      import('./../../../views/entity-page/clearance-manual-product/clearanceManualProductDeletePopup.vue')
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      formData: {
        ...initFormData
      },
      clearanceManualItems: [],
      clearanceManualProducts: [],
      clearanceManualItemsSelection: [],
      showClearanceManualItemDeletePopup: false,
      clearanceManualProductsSelection: [],
      showClearanceManualProductDeletePopup: false,
      rules: {
        manualNo: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        recordDatabaseCode: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        manualType: [],
        competentCustoms: [],
        manageFTrad: [],
        managementName: [],
        processName: [],
        imsRatio: [
          // { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        agreementCode: [],
        approvalNumber: [],
        importedPiNo: [],
        exportPiNo: [],
        recordImportValue: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        importCurrency: [],
        recordExportValue: [
          { type: 'number', message: '必须为数字', trigger: 'blur' }
        ],
        exportCurrency: [],
        processType: [],
        bondedType: [],
        endDate: [],
        dueType: [],
        manager: [],
        inputDate: [],
        declareDate: [],
        costDeclare: [],
        note: [],
        ledgerBank: []
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  watch: {
    // id(val) {
    //   if (val !== this.initFormData.id) {
    //     this.getData()
    //   }
    // },
    loading(val) {
      this.$emit('loadingChange', val)
    }
  },
  created() {
    if (this.id) {
      this.formData.id = this.id
      this.getData()
    } else {
      initFormData = {
        ...emptyFormData
      }
      this.formData = {
        ...emptyFormData
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async getData() {
      this.loading = true
      const res = await clearanceManualServer.get(this.formData.id)
      if (Number.parseInt(res.data.code) === 200) {
        initFormData = res.data.data
        this.formData = {
          ...res.data.data
        }
        this.formData.id = res.data.data.manualId
        const clearanceManualItemRes = []
        const clearanceManualProductRes = []
        res.data.data.customsItem.forEach(item => {
          if (item.informationType === 1) {
            // 料件信息
            clearanceManualItemRes.push(item)
          } else {
            // 成品信息
            clearanceManualProductRes.push(item)
          }
        })
        this.clearanceManualItems = [...clearanceManualItemRes]
        this.clearanceManualProducts = [...clearanceManualProductRes]
        this.loading = false
      }

      // const clearanceManualItemRes = await clearanceManualItemServer.search({
      //   query: `.id:${this.id}`,
      //   page: 0,
      //   size: 999
      // })
      // const clearanceManualProductRes = await clearanceManualProductServer.search({
      //   query: `.id:${this.id}`,
      //   page: 0,
      //   size: 999
      // })
      // initFormData = res.data
      // this.formData = {
      //   ...res.data
      // }
      // initClearanceManualItems = clearanceManualItemRes.data
      // this.clearanceManualItems = [...initClearanceManualItems]
      // initClearanceManualProducts = clearanceManualProductRes.data
      // this.clearanceManualProducts = [...initClearanceManualProducts]
      // this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            const clearanceManualItems = this.clearanceManualItems
            for (let i = 0; i < clearanceManualItems.length; i++) {
              const error = validate.dataObjectValidate(
                clearanceManualItems[i],
                clearanceManualItemRules
              )
              if (error) {
                this.$message({
                  message:
                    `料件信息 第 ${i + 1} 行 ` +
                    error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            const clearanceManualProducts = this.clearanceManualProducts
            for (let i = 0; i < clearanceManualProducts.length; i++) {
              const error = validate.dataObjectValidate(
                clearanceManualProducts[i],
                clearanceManualProductRules
              )
              if (error) {
                this.$message({
                  message:
                    `成品信息 第 ${i + 1} 行 ` +
                    error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            // try {
            if (this.formData.id) {
              // 编辑
              this.formData.manualType = parseInt(this.formData.manualType)
              this.formData.$state = 2
              this.formData.customsItem = []
              clearanceManualItems.forEach(item => {
                item.informationType = 1
                item.deleted = 0
                this.formData.customsItem.push(item)
              })
              clearanceManualProducts.forEach(item => {
                item.informationType = 2
                item.deleted = 0
                this.formData.customsItem.push(item)
              })
              const res = await clearanceManualServer.edit(this.formData)
              if (Number.parseInt(res.data.code) === 200) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                resolve({
                  ...this.formData
                })
                await this.getData()
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning',
                  duration: 2000
                })
                reject('error submit!!')
              }
            } else {
              // 新增
              this.formData.manualType = parseInt(this.formData.manualType)
              this.formData.deleted = 0
              this.formData.customsItem = []
              clearanceManualItems.forEach(item => {
                item.informationType = 1
                item.deleted = 0
                this.formData.customsItem.push(item)
              })
              clearanceManualProducts.forEach(item => {
                item.informationType = 2
                item.deleted = 0
                this.formData.customsItem.push(item)
              })
              const res = await clearanceManualServer.add(this.formData)
              if (Number.parseInt(res.data.code) === 200) {
                // 新增保存成功后清空表单数据
                this.formData = { ...emptyFormData }
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.formData.id = res.data.data.manualId
                await this.getData()
                resolve({
                  ...this.formData
                })
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning',
                  duration: 2000
                })
                reject('error submit!!')
              }
            }

            // if (this.formData.id) {
            //   await clearanceManualServer.put(this.formData)
            // } else {
            //   const res = await clearanceManualServer.post(this.formData)
            //   this.formData.id = res.data.id
            // }
            // initFormData = {
            //   ...this.formData
            // }
            // for (let i = 0; i < clearanceManualItems.length; i++) {
            //   const item = clearanceManualItems[i]
            //   item.Id = initFormData.id
            //   if (item.id) {
            //     await clearanceManualItemServer.put(item)
            //   } else {
            //     await clearanceManualItemServer.post(item)
            //   }
            // }
            // for (let i = 0; i < clearanceManualProducts.length; i++) {
            //   const item = clearanceManualProducts[i]
            //   item.Id = initFormData.id
            //   if (item.id) {
            //     await clearanceManualProductServer.put(item)
            //   } else {
            //     await clearanceManualProductServer.post(item)
            //   }
            // }
            // } catch (e) {
            // this.$message({
            //   message: '保存失败 ' + e.message,
            //   type: 'error',
            //   duration: 5000
            // })
            // reject('error submit!!')
            //   return
            // }
            // this.$message({
            //   message: '修改成功',
            //   type: 'success'
            // })
            // resolve({
            //   ...this.formData
            // })
          } else {
            this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
            reject('error submit!!')
          }
        })
      })
    },
    del() {
      this.$confirm('确定要删除当前表单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = false
        clearanceManualServer.delete(this.formData.manualId).then(() => {
          this.$message({
            message: `删除 ${this.formData.id} 成功`,
            type: 'success'
          })
          if (this.id) {
            window.eventBus.$emit(
              'closePagePath',
              '/DZ-manage/feed-manual-ledger/clearance-manual-edit/' + this.id
            )
          } else {
            window.eventBus.$emit(
              'closePagePath',
              '/DZ-manage/feed-manual-ledger/clearance-manual-edit/new'
            )
          }
          // window.eventBus.$emit('closePage', 'ClearanceManualSublistEdit')
        })
      })
    },
    resetData() {
      if (this.formData.id !== null && this.formData.id !== '') {
        this.getData()
      } else {
        this.formData = { ...emptyFormData }
        this.clearanceManualItems = []
        this.clearanceManualProducts = []
      }
    },
    clickAddClearanceManualItem() {
      this.clearanceManualItems.push({
        ...clearanceManualItemEmptyData
      })
      this.clearanceManualItems[
        this.clearanceManualItems.length - 1
      ].manualId = this.formData.manualId
      this.clearanceManualItems[
        this.clearanceManualItems.length - 1
      ].informationType = 1
    },
    selectionChangeClearanceManualItem(val) {
      this.clearanceManualItemsSelection = val
    },
    clickDeleteClearanceManualItem() {
      if (this.clearanceManualItemsSelection.length > 0) {
        this.showClearanceManualItemDeletePopup = true
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedClearanceManualItem() {
      this.clearanceManualItemsSelection.forEach(item => {
        for (let i = 0; i < this.clearanceManualItems.length; i++) {
          if (this.clearanceManualItems[i] === item) {
            this.clearanceManualItems.splice(i, 1)
            break
          }
        }
      })
      this.clearanceManualItemsSelection = []
    },
    clickAddClearanceManualProduct() {
      this.clearanceManualProducts.push({
        ...clearanceManualProductEmptyData
      })
      this.clearanceManualProducts[
        this.clearanceManualProducts.length - 1
      ].manualId = this.formData.manualId
      this.clearanceManualProducts[
        this.clearanceManualProducts.length - 1
      ].informationType = 1
    },
    selectionChangeClearanceManualProduct(val) {
      this.clearanceManualProductsSelection = val
    },
    clickDeleteClearanceManualProduct() {
      if (this.clearanceManualProductsSelection.length > 0) {
        this.showClearanceManualProductDeletePopup = true
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedClearanceManualProduct() {
      this.clearanceManualProductsSelection.forEach(item => {
        for (let i = 0; i < this.clearanceManualProducts.length; i++) {
          if (this.clearanceManualProducts[i] === item) {
            this.clearanceManualProducts.splice(i, 1)
            break
          }
        }
      })
      this.clearanceManualProductsSelection = []
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-form-item {
  width: 100%;
  margin-right: 0;
  /deep/ .el-form-item__label {
    width: 125px;
  }
  /deep/ .el-form-item__content {
    width: calc(100% - 125px);
  }
  /deep/ .el-input-number {
    width: 100%;
  }
}

.el-table__body {
  padding-bottom: 12px;
}
</style>
