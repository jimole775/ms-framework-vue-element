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
          <el-form-item label="登记单号">
            <el-input v-model="keyword.code" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单据状态">
            <CommercialInvoiceSplitOrderStatusEnumSelect v-model="keyword.orderStatus"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="发票流水号">
            <el-input v-model="keyword.commercialInvoiceCode" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="商业发票号">
            <el-input v-model="keyword.factInvoiceNo" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单人">
            <el-input v-model="keyword.createOrderMan" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.contractCode" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="融资类型">
            <FinancingRegistrationFinancingTypeEnumSelect v-model="keyword.financingType"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单时间">
            <el-date-picker
              v-model="keyword.createOrderTime"
              type="daterange"
              range-separator="-"
              size="mini"
              class="max-w"
            />
          </el-form-item>
        </el-col>

        <!--<el-col :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="制单时间起始">-->
        <!--<el-date-picker-->
        <!--v-model="keyword.createOrderTimeStart"-->
        <!--size="mini"-->
        <!--class="max-w"-->
        <!--type="datetime"-->
        <!--/>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="制单时间结束">-->
        <!--<el-date-picker-->
        <!--v-model="keyword.createOrderTimeEnd"-->
        <!--size="mini"-->
        <!--class="max-w"-->
        <!--type="datetime"-->
        <!--/>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="信用证号">-->
        <!--<el-input v-model="keyword.creditCertificateCode" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="付款方式">-->
        <!--<el-input v-model="keyword.paymentMethod" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="业务部门">-->
        <!--<el-input v-model="keyword.salesDepartment" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="客户">-->
        <!--<el-input v-model="keyword.custName" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="预计收汇日期起始">-->
        <!--<el-date-picker-->
        <!--v-model="keyword.estimatedReceivedRemittanceDateStart"-->
        <!--size="mini"-->
        <!--class="max-w"-->
        <!--type="datetime"-->
        <!--/>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="预计收汇日期结束">-->
        <!--<el-date-picker-->
        <!--v-model="keyword.estimatedReceivedRemittanceDateEnd"-->
        <!--size="mini"-->
        <!--class="max-w"-->
        <!--type="datetime"-->
        <!--/>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="融资金额">-->
        <!--<el-input v-model="keyword.financingAmount" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="融资利率">-->
        <!--<el-input v-model="keyword.financingInterestRate" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="融资日期起始">-->
        <!--<el-date-picker-->
        <!--v-model="keyword.financingDateStart"-->
        <!--size="mini"-->
        <!--class="max-w"-->
        <!--type="datetime"-->
        <!--/>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="融资日期结束">-->
        <!--<el-date-picker-->
        <!--v-model="keyword.financingDateEnd"-->
        <!--size="mini"-->
        <!--class="max-w"-->
        <!--type="datetime"-->
        <!--/>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="融资天数">-->
        <!--<el-input v-model="keyword.financingDay" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="融资利息">-->
        <!--<el-input v-model="keyword.financingInterest" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="手续费利率">-->
        <!--<el-input v-model="keyword.serviceChargeInterestRate" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="手续费">-->
        <!--<el-input v-model="keyword.serviceCharge" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="发票金额">-->
        <!--<el-input v-model="keyword.invoiceAmount" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="备注">-->
        <!--<el-input v-model="keyword.remark" size="mini" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="融资银行">-->
        <!--<BankInfoSelect v-model="keyword.financingBankIds" type="multiple" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">-->
        <!--<el-form-item label="经营单位">-->
        <!--<OperateUnitSelect v-model="keyword.operateUnitIds" type="multiple" />-->
        <!--</el-form-item>-->
        <!--</el-col>-->

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
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          width="180"
          sortable
          label="登记单号"
        />
        <el-table-column
          v-if="eye.createOrderTime"
          show-overflow-tooltip
          prop="createOrderTime"
          width="180"
          sortable
          label="制单时间"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.createOrderTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.createOrderMan"
          show-overflow-tooltip
          prop="createOrderMan"
          width="180"
          sortable
          label="制单人"
        />
        <el-table-column
          v-if="eye.orderStatus"
          show-overflow-tooltip
          prop="orderStatus"
          width="100"
          sortable
          label="单据状态"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.orderStatus | CommercialInvoiceSplitOrderStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.factInvoiceNo"
          show-overflow-tooltip
          prop="factInvoiceNo"
          width="180"
          sortable
          label="商业发票号"
        />
        <el-table-column
          v-if="eye.creditCertificateCode"
          show-overflow-tooltip
          prop="creditCertificateCode"
          width="180"
          sortable
          label="信用证号"
        />
        <el-table-column
          v-if="eye.paymentMethod"
          show-overflow-tooltip
          prop="paymentMethod"
          width="100"
          sortable
          label="付款方式"
        />
        <el-table-column
          v-if="eye.salesDepartment"
          show-overflow-tooltip
          prop="salesDepartment"
          width="100"
          sortable
          label="业务部门"
        />
        <el-table-column
          v-if="eye.custName"
          show-overflow-tooltip
          prop="custName"
          width="180"
          sortable
          label="客户"
        />
        <el-table-column
          v-if="eye.contractCode"
          show-overflow-tooltip
          prop="contractCode"
          width="180"
          sortable
          label="合同号"
        />
        <el-table-column
          v-if="eye.estimatedReceivedRemittanceDate"
          show-overflow-tooltip
          prop="estimatedReceivedRemittanceDate"
          width="150"
          sortable
          label="预计收汇日期"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.estimatedReceivedRemittanceDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.financingType"
          show-overflow-tooltip
          prop="financingType"
          width="100"
          sortable
          label="融资类型"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.financingType | FinancingRegistrationFinancingTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.financingAmount"
          show-overflow-tooltip
          prop="financingAmount"
          width="100"
          sortable
          label="融资金额"
        />
        <el-table-column
          v-if="eye.financingInterestRate"
          show-overflow-tooltip
          prop="financingInterestRate"
          width="100"
          sortable
          label="融资利率"
        />
        <el-table-column
          v-if="eye.financingDate"
          show-overflow-tooltip
          prop="financingDate"
          width="100"
          sortable
          label="融资日期"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.financingDate | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.financingDay"
          show-overflow-tooltip
          prop="financingDay"
          width="100"
          sortable
          label="融资天数"
        />
        <el-table-column
          v-if="eye.financingInterest"
          show-overflow-tooltip
          prop="financingInterest"
          width="100"
          sortable
          label="融资利息"
        />
        <el-table-column
          v-if="eye.serviceChargeInterestRate"
          show-overflow-tooltip
          prop="serviceChargeInterestRate"
          width="110"
          sortable
          label="手续费利率"
        />
        <el-table-column
          v-if="eye.serviceCharge"
          show-overflow-tooltip
          prop="serviceCharge"
          width="100"
          sortable
          label="手续费"
        />
        <el-table-column
          v-if="eye.invoiceAmount"
          show-overflow-tooltip
          prop="invoiceAmount"
          width="100"
          sortable
          label="发票金额"
        />
        <el-table-column
          v-if="eye.libor"
          show-overflow-tooltip
          prop="libor"
          width="100"
          sortable
          label="libor"
        />
        <el-table-column
          v-if="eye.costingRate"
          show-overflow-tooltip
          prop="costingRate"
          width="100"
          sortable
          label="成本利率"
        />
        <el-table-column
          v-if="eye.alsoDatetime"
          show-overflow-tooltip
          prop="alsoDatetime"
          width="150"
          sortable
          label="还押汇日期"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.alsoDatetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          width="200"
          sortable
          label="备注"
        />
        <el-table-column
          v-if="eye.commercialInvoiceCode"
          show-overflow-tooltip
          prop="commercialInvoiceCode"
          width="180"
          sortable
          label="发票流水号"
        />
        <el-table-column
          v-if="eye.financingBankId"
          show-overflow-tooltip
          prop="rongzi_bank"
          width="180"
          sortable
          label="融资银行"
        />
        <!--<el-table-column-->
        <!--v-if="eye.financingBankId"-->
        <!--show-overflow-tooltip-->
        <!--prop="financingBankId"-->
        <!--width="180"-->
        <!--sortable-->
        <!--label="融资银行">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button type="text" size="mini" @click="openFinancingBankViewPopup(scope.row.financingBankId)">{{ scope.row.rongzi_bank }}</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          v-if="eye.operateUnitId"
          show-overflow-tooltip
          prop="operateUnitId"
          width="100"
          sortable
          label="经营单位"
        >
          <template slot-scope="scope">
            <!--<el-button type="text" size="mini" @click="openOperateUnitViewPopup(scope.row.operateUnitId)">{{ scope.row.operateUnit ? scope.row.operateUnit.id : '' }}</el-button>-->
            <span>{{ scope.row.operateUnitId | OperaUnitFilter }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column-->
        <!--fixed="right"-->
        <!--label="操作"-->
        <!--width="100">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button type="text" size="mini" @click="clickViewBtn(scope.row)">查看</el-button>-->
        <!--<el-button type="text" size="mini" @click="clickEditBtn(scope.row)">编辑</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </template>
    <div class="m-w cen-box m-t-12">
      <el-pagination
        :current-page="page"
        :page-sizes="[10, 20, 30, 40, 50]"
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
            <el-checkbox v-model="eye.code">登记单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createOrderTime">制单时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createOrderMan">制单人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orderStatus">单据状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.factInvoiceNo">商业发票号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.creditCertificateCode">信用证号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.paymentMethod">付款方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.salesDepartment">业务部门</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.custName">客户</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.contractCode">合同号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.estimatedReceivedRemittanceDate">预计收汇日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.financingType">融资类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.financingAmount">融资金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.financingInterestRate">融资利率</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.financingDate">融资日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.financingDay">融资天数</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.financingInterest">融资利息</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.serviceChargeInterestRate">手续费利率</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.serviceCharge">手续费</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.invoiceAmount">发票金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.libor">放款利率</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.costingRate">成本利率</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.alsoDatetime">还押汇日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <!--<el-col :span="24">-->
          <!--<el-checkbox v-model="eye.commercialInvoiceId">commercialInvoiceId</el-checkbox>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
          <!--<el-checkbox v-model="eye.financingBankId">financingBankId</el-checkbox>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
          <!--<el-checkbox v-model="eye.operateUnitId">operateUnitId</el-checkbox>-->
          <!--</el-col>-->
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'FinancingRegistrationViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'FinancingRegistrationEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'FinancingRegistrationDeletePopup'"
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
      v-if="showCommercialInvoiceViewPopup"
      :is="'CommercialInvoiceViewPopup'"
      :id="commercialInvoiceId"
      @close="showCommercialInvoiceViewPopup = false"
    />
    <component
      v-if="showFinancingBankViewPopup"
      :is="'BankInfoViewPopup'"
      :id="bankInfoId"
      @close="showFinancingBankViewPopup = false"
    />
    <component
      v-if="showOperateUnitViewPopup"
      :is="'OperateUnitViewPopup'"
      :id="operateUnitId"
      @close="showOperateUnitViewPopup = false"
    />
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
// import Datetime from './../../../utils/datetime'
import CommercialInvoiceSelect from './../../../components/entity/commercial-invoice/CommercialInvoiceSelect'
import BankInfoSelect from './../../../components/entity/bank-info/BankInfoSelect'
import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import CommercialInvoiceSplitOrderStatusEnumSelect from './../../../components/entity/financing-registration/CommercialInvoiceSplitOrderStatusEnumSelect'
import CommercialInvoiceSplitOrderStatusEnumUtil from './../../../components/enum/financing-registration/CommercialInvoiceSplitOrderStatusEnumUtil'
import FinancingRegistrationFinancingTypeEnumSelect from './../../../components/entity/financing-registration/FinancingRegistrationFinancingTypeEnumSelect'
import FinancingRegistrationFinancingTypeEnumUtil from './../../../components/enum/financing-registration/FinancingRegistrationFinancingTypeEnumUtil'
import financingRegistrationServer from './../../../api/financingRegistrationServer'
import OperaUnitEnumUtil from './../../../components/enum/opera-unit/OperaUnitEnumUtil'
const initSearchParams = {
  code: null,
  createOrderTime: null,
  createOrderTimeStart: null,
  createOrderTimeEnd: null,
  createOrderMan: null,
  orderStatus: null,
  invoiceCode: null,
  commercialInvoiceCode: null,
  creditCertificateCode: null,
  paymentMethod: null,
  salesDepartment: null,
  custName: null,
  contractCode: null,
  estimatedReceivedRemittanceDateStart: null,
  estimatedReceivedRemittanceDateEnd: null,
  financingType: null,
  financingAmount: null,
  financingInterestRate: null,
  financingDateStart: null,
  financingDateEnd: null,
  financingDay: null,
  financingInterest: null,
  serviceChargeInterestRate: null,
  serviceCharge: null,
  invoiceAmount: null,
  remark: null,
  isDelete: null,
  commercialInvoiceIds: [],
  financingBankIds: [],
  operateUnitIds: [],
  factInvoiceNo: null
}
const initExport = {
  code: '登记单号',
  createOrderTime: '制单时间',
  createOrderMan: '制单人',
  orderStatus: '单据状态',
  factInvoiceNo: '商业发票号',
  creditCertificateCode: '信用证号',
  paymentMethod: '付款方式',
  salesDepartment: '业务部门',
  custName: '客户',
  contractCode: '合同号',
  estimatedReceivedRemittanceDate: '预计收汇日期',
  financingType: '融资类型',
  financingAmount: '融资金额',
  financingInterestRate: '融资利率',
  financingDate: '融资日期',
  financingDay: '融资天数',
  financingInterest: '融资利息',
  serviceChargeInterestRate: '手续费利率',
  serviceCharge: '手续费',
  invoiceAmount: '发票金额',
  remark: '备注',
  isDelete: '是否删除',
  commercialInvoice: '发票流水号',
  financingBank: '融资银行',
  operateUnit: '经营单位'
}
export default {
  name: 'FinancingRegistrationManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    CommercialInvoiceSelect,
    CommercialInvoiceViewPopup: () =>
      import('./../commercial-invoice/commercialInvoiceViewPopup'),
    BankInfoSelect,
    BankInfoViewPopup: () => import('./../bank-info/bankInfoViewPopup'),
    OperateUnitSelect,
    OperateUnitViewPopup: () =>
      import('./../operate-unit/operateUnitViewPopup'),
    CommercialInvoiceSplitOrderStatusEnumSelect,
    FinancingRegistrationFinancingTypeEnumSelect,
    FinancingRegistrationViewPopup: () =>
      import('./financingRegistrationViewPopup.vue'),
    FinancingRegistrationEditPopup: () =>
      import('./financingRegistrationEditPopup.vue'),
    FinancingRegistrationDeletePopup: () =>
      import('./financingRegistrationDeletePopup.vue')
  },
  filters: {
    CommercialInvoiceSplitOrderStatusFilter:
      CommercialInvoiceSplitOrderStatusEnumUtil.toTitleFilter,
    FinancingRegistrationFinancingTypeFilter:
      FinancingRegistrationFinancingTypeEnumUtil.toTitleFilter,
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter
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
      showCommercialInvoiceViewPopup: false,
      commercialInvoiceId: null,
      showFinancingBankViewPopup: false,
      bankInfoId: null,
      showOperateUnitViewPopup: false,
      operateUnitId: null,
      more: false,
      eye: {
        code: true,
        createOrderTime: true,
        createOrderMan: true,
        orderStatus: true,
        commercialInvoiceCode: true,
        creditCertificateCode: true,
        paymentMethod: true,
        salesDepartment: true,
        custName: true,
        contractCode: true,
        estimatedReceivedRemittanceDate: true,
        financingType: true,
        financingAmount: true,
        financingInterestRate: true,
        financingDate: true,
        financingDay: true,
        financingInterest: true,
        serviceChargeInterestRate: true,
        serviceCharge: true,
        invoiceAmount: true,
        remark: true,
        isDelete: true,
        commercialInvoiceId: true,
        financingBankId: true,
        operateUnitId: true,
        costingRate: true,
        libor: true,
        alsoDatetime: true,
        factInvoiceNo: true
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
      const query = {}
      Object.keys(keyword).forEach(key => {
        // if (key === 'commercialInvoiceCode') {
        //   this.tableData.forEach((row) => {
        //     if (row.commercialInvoiceCode === keyword[key]) {
        //       query['commercialInvoiceId'] = row.commercialInvoiceId
        //     }
        //   })
        // }
        if (Validate.isNotEmpty(keyword[key])) {
          query[key] = keyword[key]
        }
      })
      // console.log('query:', this.tableData)
      const res = await financingRegistrationServer.search({
        query,
        page: this.page - 1,
        size: this.size
      })
      // console.log('query end:', res.data)
      this.tableData = res.data
      this.count = res.pagination.count
      this.loading = false
    },
    // setPageSize() {
    //   // 重新设定分页条件
    //   this.pageSize = []
    //   for (let i = 1; i < 6; i++) {
    //     if (this.count > 10 * i) {
    //       this.pageSize.push(10 * i)
    //     }
    //   }
    //   this.pageSize.push(this.count)
    // },
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
        path: './financing-registration/edit/' + row.id
      })
    },
    clickAddBtn() {
      // this.currentClickRow = {}
      // this.showEditPopup = true
      this.$router.push({
        path: './financing-registration/edit/new'
      })
      this.reload()
    },
    handleRowDb(val) {
      this.$router.push({
        path: './financing-registration/edit/' + val.id
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
      this.dataExport.forEach((item) => {
        item.financingType = FinancingRegistrationFinancingTypeEnumUtil.toTitleFilter(item.financingType)
      })
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
    openCommercialInvoiceViewPopup(id) {
      this.commercialInvoiceId = id
      this.showCommercialInvoiceViewPopup = true
    },
    openFinancingBankViewPopup(id) {
      this.bankInfoId = id
      this.showFinancingBankViewPopup = true
    },
    openOperateUnitViewPopup(id) {
      this.operateUnitId = id
      this.showOperateUnitViewPopup = true
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
