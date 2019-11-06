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
          <el-form-item label="信用证申请人">
            <el-input v-model="keyword.lcReqMan" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="水单编码">
            <el-input v-model="keyword.code" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="信用证号">
            <el-input v-model="keyword.creditCertificateCode" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单证人员">
            <TradeDocumenterSelect v-model="keyword.tradeDocumenterId"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="销售部门">
            <DepartmentSelect v-model="keyword.saleDepartmentId"/>
          </el-form-item>
        </el-col>
        <el-col v-show="more && keyword.isClaiming" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="是否认领">
            <el-select v-model="keyword.isClaiming" placeholder="请选择">
              <el-option label="是" value="1"/>
              <el-option label="否" value="0"/>
            </el-select>
          </el-form-item>
        </el-col>
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
        <el-table-column fixed="left" type="selection" width="55"/>
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          sortable
          min-width="145"
          label="水单编号"
        />
        <el-table-column
          v-if="eye.creditCertificateDate"
          show-overflow-tooltip
          prop="creditCertificateDate"
          sortable
          min-width="120"
          label="信用证日期"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.creditCertificateDate | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.receivedCreditCertificateDate"
          show-overflow-tooltip
          prop="receivedCreditCertificateDate"
          sortable
          min-width="115"
          label="收证日期"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.receivedCreditCertificateDate | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.status"
          show-overflow-tooltip
          prop="stat"
          sortable
          min-width="80"
          label="状态"
        >
          <template
            slot-scope="scope"
          >{{ parseInt(scope.row.stat) | CreditCertificateStatusFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.creditCertificateCode"
          show-overflow-tooltip
          prop="creditCertificateCode"
          sortable
          min-width="115"
          label="信用证号"
        />
        <el-table-column
          v-if="eye.lcReqMan"
          show-overflow-tooltip
          prop="lcReqMan"
          sortable
          min-width="140"
          label="信用证申请人"
        />
        <el-table-column
          v-if="eye.lastLoadDate"
          show-overflow-tooltip
          prop="lastLoadDate"
          sortable
          min-width="120"
          label="最迟装运日"
        >
          <template slot-scope="scope">{{ scope.row.lastLoadDate | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.periodValidity"
          show-overflow-tooltip
          prop="periodValidity"
          sortable
          min-width="100"
          label="有效期"
        >
          <template slot-scope="scope">{{ scope.row.periodValidity | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.existCreditFile"
          show-overflow-tooltip
          prop="existCreditFile"
          sortable
          min-width="150"
          label="中信保银行档案"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.existCreditFile">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.payWay"
          show-overflow-tooltip
          prop="payWay"
          sortable
          min-width="115"
          label="付款方式"
        >
          <template
            slot-scope="scope"
          >{{ parseInt(scope.row.payWay) | CreditCertificatePayWayFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.isNewVersion"
          show-overflow-tooltip
          prop="isNewVersion"
          sortable
          min-width="115"
          label="是新版本"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isNewVersion">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.introductionFundsSystem"
          show-overflow-tooltip
          prop="introductionFundsSystem"
          sortable
          min-width="130"
          label="引入资金系统"
        />
        <el-table-column
          v-if="eye.amount"
          show-overflow-tooltip
          prop="amount"
          sortable
          min-width="80"
          label="金额"
        />
        <el-table-column
          v-if="eye.upFloatRate"
          show-overflow-tooltip
          prop="upFloatRate"
          sortable
          min-width="120"
          label="上浮比率(%)"
        />
        <el-table-column
          v-if="eye.upFloatedAmount"
          show-overflow-tooltip
          prop="upFloatedAmount"
          sortable
          min-width="120"
          label="上浮后金额"
        />
        <el-table-column
          v-if="eye.actualAmount"
          show-overflow-tooltip
          prop="actualAmount"
          sortable
          min-width="115"
          label="实际金额"
        />
        <el-table-column
          v-if="eye.amountUsedUp"
          show-overflow-tooltip
          prop="amountUsedUp"
          sortable
          min-width="115"
          label="金额用完"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.amountUsedUp">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.allocatedAmount"
          show-overflow-tooltip
          prop="allocatedAmount"
          sortable
          min-width="125"
          label="已分配金额"
        />
        <el-table-column
          v-if="eye.distributableAmount"
          show-overflow-tooltip
          prop="distributableAmount"
          sortable
          min-width="125"
          label="未分配金额"
        />
        <el-table-column
          v-if="eye.deliveredAmount"
          show-overflow-tooltip
          prop="deliveredAmount"
          sortable
          min-width="125"
          label="已发货金额"
        />
        <el-table-column
          v-if="eye.closeBillAmount"
          show-overflow-tooltip
          prop="closeBillAmount"
          sortable
          min-width="125"
          label="已交单金额"
        />
        <el-table-column
          v-if="eye.inBatches"
          show-overflow-tooltip
          prop="inBatches"
          sortable
          min-width="115"
          label="分批装运"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.inBatches">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.transfer"
          show-overflow-tooltip
          prop="transfer"
          sortable
          min-width="80"
          label="转运"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.transfer">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.expireAddress"
          show-overflow-tooltip
          prop="expireAddress"
          sortable
          min-width="115"
          label="到期地点"
        />
        <el-table-column
          v-if="eye.closeBillDeadline"
          show-overflow-tooltip
          prop="closeBillDeadline"
          sortable
          min-width="115"
          label="交单期限"
        />
        <el-table-column
          v-if="eye.placeOfOriginCertificate"
          show-overflow-tooltip
          prop="placeOfOriginCertificate"
          sortable
          min-width="145"
          label="产地证"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.placeOfOriginCertificate | CreditCertificatePlaceOfOriginCertificateFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.returnedMoneyDeadline"
          show-overflow-tooltip
          prop="returnedMoneyDeadline"
          sortable
          min-width="115"
          label="回款期限"
        />
        <el-table-column
          v-if="eye.pointTime"
          show-overflow-tooltip
          prop="pointTime"
          sortable
          min-width="115"
          label="回款时点"
        >
          <template slot-scope="scope">{{ scope.row.pointTime | CreditCertificatePointTimeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.alterCertificateInformation"
          show-overflow-tooltip
          prop="alterCertificateInformation"
          sortable
          min-width="115"
          label="改证信息"
        />
        <el-table-column
          v-if="eye.suggestedModificationInformation"
          show-overflow-tooltip
          prop="suggestedModificationInformation"
          sortable
          min-width="125"
          label="建议修改信息"
        />
        <el-table-column
          v-if="eye.businessFeedback"
          show-overflow-tooltip
          prop="businessFeedback"
          sortable
          min-width="125"
          label="业务反馈信息"
        />
        <el-table-column
          v-if="eye.businessDocuments"
          show-overflow-tooltip
          prop="businessDocuments"
          sortable
          min-width="140"
          label="需业务提供单据"
        />
        <el-table-column
          v-if="eye.consignorName"
          show-overflow-tooltip
          prop="consignorName"
          sortable
          min-width="105"
          label="发货人"
        />
        <el-table-column
          v-if="eye.consignorAddress"
          show-overflow-tooltip
          prop="consignorAddress"
          sortable
          min-width="120"
          label="发货人地址"
        />
        <el-table-column
          v-if="eye.consignorTel"
          show-overflow-tooltip
          prop="consignorTel"
          sortable
          min-width="120"
          label="发货人电话"
        />
        <el-table-column
          v-if="eye.consignorFax"
          show-overflow-tooltip
          prop="consignorFax"
          sortable
          min-width="120"
          label="发货人传真"
        />
        <el-table-column
          v-if="eye.consignorEmail"
          show-overflow-tooltip
          prop="consignorEmail"
          sortable
          min-width="120"
          label="发货人邮箱"
        />
        <el-table-column
          v-if="eye.consignorEnterpriseCode"
          show-overflow-tooltip
          prop="consignorEnterpriseCode"
          sortable
          min-width="140"
          label="发货人企业代码"
        />
        <el-table-column
          v-if="eye.consignorCountryCode"
          show-overflow-tooltip
          prop="consignorCountryCode"
          sortable
          min-width="140"
          label="发货人国家代码"
        />
        <el-table-column
          v-if="eye.consignorAeoCode"
          show-overflow-tooltip
          prop="consignorAeoCode"
          sortable
          min-width="145"
          label="发货人AEO编码"
        />
        <el-table-column
          v-if="eye.consigneeName"
          show-overflow-tooltip
          prop="consigneeName"
          sortable
          min-width="100"
          label="收货人"
        />
        <el-table-column
          v-if="eye.consigneeAddress"
          show-overflow-tooltip
          prop="consigneeAddress"
          sortable
          min-width="120"
          label="收货人地址"
        />
        <el-table-column
          v-if="eye.consigneeTel"
          show-overflow-tooltip
          prop="consigneeTel"
          sortable
          min-width="120"
          label="收货人电话"
        />
        <el-table-column
          v-if="eye.consigneeFax"
          show-overflow-tooltip
          prop="consigneeFax"
          sortable
          min-width="120"
          label="收货人传真"
        />
        <el-table-column
          v-if="eye.consigneeEmail"
          show-overflow-tooltip
          prop="consigneeEmail"
          sortable
          min-width="120"
          label="收货人邮箱"
        />
        <el-table-column
          v-if="eye.consigneeEnterpriseCode"
          show-overflow-tooltip
          prop="consigneeEnterpriseCode"
          sortable
          min-width="140"
          label="收货人企业代码"
        />
        <el-table-column
          v-if="eye.consigneeCountryCode"
          show-overflow-tooltip
          prop="consigneeCountryCode"
          sortable
          min-width="140"
          label="收货人国家代码"
        />
        <el-table-column
          v-if="eye.consigneeAeoCode"
          show-overflow-tooltip
          prop="consigneeAeoCode"
          sortable
          min-width="145"
          label="收货人AEO编码"
        />
        <!--
        <el-table-column
          v-if="eye.consigneeContactName"
          show-overflow-tooltip
          prop="consigneeContactName"
          sortable
          min-width="145"
          label="具体联系人名称" />
        <el-table-column
          v-if="eye.consigneeContactTel"
          show-overflow-tooltip
          prop="consigneeContactTel"
          sortable
          min-width="145"
          label="具体联系人电话" />
        <el-table-column
          v-if="eye.consigneeContactFax"
          show-overflow-tooltip
          prop="consigneeContactFax"
          sortable
          min-width="145"
          label="具体联系人传真" />
        <el-table-column
          v-if="eye.consigneeContactEmail"
          show-overflow-tooltip
          prop="consigneeContactEmail"
          sortable
          min-width="145"
        label="具体联系人邮箱" />-->
        <el-table-column
          v-if="eye.notifyName"
          show-overflow-tooltip
          prop="notifyName"
          sortable
          min-width="100"
          label="通知人"
        />
        <el-table-column
          v-if="eye.notifyAddress"
          show-overflow-tooltip
          prop="notifyAddress"
          sortable
          min-width="120"
          label="通知人地址"
        />
        <el-table-column
          v-if="eye.notifyTel"
          show-overflow-tooltip
          prop="notifyTel"
          sortable
          min-width="120"
          label="通知人电话"
        />
        <el-table-column
          v-if="eye.notifyFax"
          show-overflow-tooltip
          prop="notifyFax"
          sortable
          min-width="120"
          label="通知人传真"
        />
        <el-table-column
          v-if="eye.notifyEmail"
          show-overflow-tooltip
          prop="notifyEmail"
          sortable
          min-width="120"
          label="通知人邮箱"
        />
        <el-table-column
          v-if="eye.notifyEnterpriseCode"
          show-overflow-tooltip
          prop="notifyEnterpriseCode"
          sortable
          min-width="140"
          label="通知人企业代码"
        />
        <el-table-column
          v-if="eye.notifyCountryCode"
          show-overflow-tooltip
          prop="notifyCountryCode"
          sortable
          min-width="140"
          label="通知人国家代码"
        />
        <el-table-column
          v-if="eye.notifyAeoCode"
          show-overflow-tooltip
          prop="notifyAeoCode"
          sortable
          min-width="140"
          label="通知人AEO编码"
        />
        <el-table-column
          v-if="eye.otherNotifyMan"
          show-overflow-tooltip
          prop="otherNotifyMan"
          sortable
          min-width="120"
          label="其它通知人"
        />
        <el-table-column
          v-if="eye.lc"
          show-overflow-tooltip
          prop="lc"
          sortable
          min-width="120"
          label="LC受益人"
        >
          <template slot-scope="scope">{{ scope.row.lc | LCTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.shipCertificate"
          show-overflow-tooltip
          prop="shipCertificate"
          sortable
          min-width="100"
          label="船证明"
        />
        <el-table-column
          v-if="eye.supplementInfo"
          show-overflow-tooltip
          prop="supplementInfo"
          sortable
          min-width="115"
          label="加注信息"
        />
        <el-table-column
          v-if="eye.other"
          show-overflow-tooltip
          prop="other"
          sortable
          min-width="80"
          label="其他"
        />
        <el-table-column
          v-if="eye.businessWay"
          show-overflow-tooltip
          prop="businessWay"
          sortable
          min-width="115"
          label="业务方式"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.businessWay | CreditCertificateBusinessWayFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.creditCertificateType"
          show-overflow-tooltip
          prop="creditCertificateType"
          sortable
          min-width="120"
          label="信用证类型"
        >
          <template
            slot-scope="scope"
          >{{ scope.row.creditCertificateType | CreditCertificateTypeFilter }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.noticeCost"
          show-overflow-tooltip
          prop="noticeCost"
          sortable
          min-width="120"
          label="正本通知费"
        />
        <el-table-column
          v-if="eye.pointTimeNotMatchCost"
          show-overflow-tooltip
          prop="pointTimeNotMatchCost"
          sortable
          min-width="115"
          label="不符点费"
        />
        <el-table-column
          v-if="eye.confirmMan"
          show-overflow-tooltip
          prop="confirmMan"
          sortable
          min-width="100"
          label="确认人"
        />
        <el-table-column
          v-if="eye.confirmTime"
          show-overflow-tooltip
          prop="confirmTime"
          sortable
          min-width="115"
          label="确认时间"
        >
          <template slot-scope="scope">{{ scope.row.confirmTime | parseTime('{y}-{m}-{d}') }}</template>
        </el-table-column>
        <el-table-column
          v-if="eye.isConfirm"
          show-overflow-tooltip
          prop="isConfirm"
          sortable
          min-width="100"
          label="已确认"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isConfirm">是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.noticeBankId"
          show-overflow-tooltip
          prop="noticeBankName"
          sortable
          min-width="115"
          label="通知银行"
        />
        <el-table-column
          v-if="eye.paymentBankId"
          show-overflow-tooltip
          prop="paymentBankName"
          sortable
          min-width="115"
          label="议付银行"
        />
        <el-table-column
          v-if="eye.proveBankId"
          show-overflow-tooltip
          prop="proveBankName"
          sortable
          min-width="115"
          label="开证银行"
        />
        <el-table-column
          v-if="eye.swift"
          show-overflow-tooltip
          prop="swift"
          sortable
          min-width="115"
          label="swift"
        />
        <el-table-column
          v-if="eye.currencyId"
          show-overflow-tooltip
          prop="currencyName"
          sortable
          min-width="80"
          label="币种"
        />
        <el-table-column
          v-if="eye.sendPortId"
          show-overflow-tooltip
          prop="sendPortName"
          sortable
          min-width="100"
          label="出货港"
        />
        <el-table-column
          v-if="eye.targetPortId"
          show-overflow-tooltip
          prop="targetPortName"
          sortable
          min-width="100"
          label="到货港"
        />
        <el-table-column
          v-if="eye.areaId"
          show-overflow-tooltip
          prop="areaName"
          sortable
          min-width="115"
          label="所在国家"
        />
        <el-table-column
          v-if="eye.saleDepartmentId"
          show-overflow-tooltip
          prop="saleDepartmentName"
          sortable
          min-width="115"
          label="销售部门"
        />
        <el-table-column
          v-if="eye.customerId"
          show-overflow-tooltip
          prop="customerName"
          sortable
          min-width="80"
          label="客户"
        />
        <el-table-column
          v-if="eye.tradeDocumenterId"
          show-overflow-tooltip
          prop="tradeDocumenter"
          sortable
          min-width="115"
          label="单证人员"
        />
        <el-table-column
          v-if="eye.forfaitingBankId"
          show-overflow-tooltip
          prop="forfaitingBankId"
          sortable
          min-width="120"
          label="福费廷银行"
        />
        <el-table-column
          v-if="eye.confirmingBankId"
          show-overflow-tooltip
          prop="confirmingBankName"
          sortable
          min-width="115"
          label="保兑银行"
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
    <el-dialog :visible="showEye" width="360px" title="过滤" top="10vh" @close="showEye = false">
      <div>
        <el-row>
          <el-col :span="24">
            <el-checkbox v-model="eye.code">水单编号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.creditCertificateDate">信用证日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.receivedCreditCertificateDate">收证日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.status">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.creditCertificateCode">信用证号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.lcReqMan">信用证申请人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.lastLoadDate">最迟装运日</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.periodValidity">有效期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.existCreditFile">中信保银行档案</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.payWay">付款方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isNewVersion">是新版本</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.introductionFundsSystem">引入资金系统</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.amount">金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.upFloatRate">上浮比率(%)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.upFloatedAmount">上浮后金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.actualAmount">实际金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.amountUsedUp">金额用完</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.allocatedAmount">已分配金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.distributableAmount">未分配金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.deliveredAmount">已发货金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.closeBillAmount">已交单金额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.inBatches">分批装运</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.transfer">转运</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.expireAddress">到期地点</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.closeBillDeadline">交单期限</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.placeOfOriginCertificate">产地证</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.returnedMoneyDeadline">回款期限</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.pointTime">回款时点</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.alterCertificateInformation">改证信息</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.suggestedModificationInformation">建议修改信息</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.businessFeedback">业务反馈信息</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.businessDocuments">需业务提供单据</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consignorName">发货人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consignorAddress">发货人地址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consignorTel">发货人电话</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consignorFax">发货人传真</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consignorEmail">发货人邮箱</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consignorEnterpriseCode">发货人企业代码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consignorCountryCode">发货人国家代码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consignorAeoCode">发货人AEO编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consigneeName">收货人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consigneeAddress">收货人地址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consigneeTel">收货人电话</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consigneeFax">收货人传真</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consigneeEmail">收货人邮箱</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consigneeEnterpriseCode">收货人企业代码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consigneeCountryCode">收货人国家代码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consigneeAeoCode">收货人AEO编码</el-checkbox>
          </el-col>
          <!-- <el-col :span="24">
            <el-checkbox v-model="eye.consigneeContactName">具体联系人名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consigneeContactTel">具体联系人电话</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consigneeContactFax">具体联系人传真</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.consigneeContactEmail">具体联系人邮箱</el-checkbox>
          </el-col>-->
          <el-col :span="24">
            <el-checkbox v-model="eye.notifyName">通知人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.notifyAddress">通知人地址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.notifyTel">通知人电话</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.notifyFax">通知人传真</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.notifyEmail">通知人邮箱</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.notifyEnterpriseCode">通知人企业代码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.notifyCountryCode">通知人国家代码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.notifyAeoCode">通知人AEO编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.otherNotifyMan">其它通知人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.lc">LC受益人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.shipCertificate">船证明</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.supplementInfo">加注信息</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.other">其他</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.businessWay">业务方式</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.creditCertificateType">信用证类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.noticeCost">正本通知费</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.pointTimeNotMatchCost">不符点费</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.confirmMan">确认人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.confirmTime">确认时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isConfirm">已确认</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.noticeBankId">通知银行</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.paymentBankId">议付银行</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.proveBankId">开证银行</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.swift">swift</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.currencyId">币种</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.sendPortId">出货港</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.targetPortId">到货港</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.areaId">所在国家</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.saleDepartmentId">销售部门</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.customerId">客户</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.tradeDocumenterId">单证人员</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.operateUnitId">经营单位</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.forfaitingBankId">福费廷银行</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.confirmingBankId">保兑银行</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showDeletePopup"
      :is="'CreditCertificateDeletePopup'"
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
      v-if="showNoticeBankViewPopup"
      :is="'BankViewPopup'"
      :id="bankId"
      @close="showNoticeBankViewPopup = false"
    />
    <component
      v-if="showPaymentBankViewPopup"
      :is="'BankViewPopup'"
      :id="bankId"
      @close="showPaymentBankViewPopup = false"
    />
    <component
      v-if="showProveBankViewPopup"
      :is="'BankViewPopup'"
      :id="bankId"
      @close="showProveBankViewPopup = false"
    />
    <component
      v-if="showSendPortViewPopup"
      :is="'PortViewPopup'"
      :id="portId"
      @close="showSendPortViewPopup = false"
    />
    <component
      v-if="showTargetPortViewPopup"
      :is="'PortViewPopup'"
      :id="portId"
      @close="showTargetPortViewPopup = false"
    />
    <component
      v-if="showAreaViewPopup"
      :is="'AreaViewPopup'"
      :id="areaId"
      @close="showAreaViewPopup = false"
    />
    <component
      v-if="showTradeDocumenterViewPopup"
      :is="'TradeDocumenterViewPopup'"
      :id="tradeDocumenterId"
      @close="showTradeDocumenterViewPopup = false"
    />
    <component
      v-if="showForfaitingBankViewPopup"
      :is="'BankViewPopup'"
      :id="bankId"
      @close="showForfaitingBankViewPopup = false"
    />
    <component
      v-if="showConfirmingBankViewPopup"
      :is="'BankViewPopup'"
      :id="bankId"
      @close="showConfirmingBankViewPopup = false"
    />
  </div>
</template>

<script>
/* import Validate from './../../../utils/validate.js' */
/* import Datetime from './../../../utils/datetime' */
import BankSelect from './../../../components/entity/bank/BankSelect'
import CurrencySelect from './../../../components/entity/currency/CurrencySelect'
import PortSelect from './../../../components/entity/port/PortSelect'
import AreaSelect from './../../../components/entity/area/AreaSelect'
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
import CustomerSelect from './../../../components/entity/customer/CustomerSelect'
import TradeDocumenterSelect from './../../../components/entity/trade-documenter/TradeDocumenterSelect'
import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import CreditCertificateStatusEnumSelect from './../../../components/entity/credit-certificate/CreditCertificateStatusEnumSelect'
import CreditCertificateStatusEnumUtil from './../../../components/enum/credit-certificate/CreditCertificateStatusEnumUtil'
import CreditCertificatePayWayEnumSelect from './../../../components/entity/credit-certificate/CreditCertificatePayWayEnumSelect'
import CreditCertificatePayWayEnumUtil from './../../../components/enum/credit-certificate/CreditCertificatePayWayEnumUtil'
import CreditCertificatePlaceOfOriginCertificateEnumSelect from './../../../components/entity/credit-certificate/CreditCertificatePlaceOfOriginCertificateEnumSelect'
import CreditCertificatePlaceOfOriginCertificateEnumUtil from './../../../components/enum/credit-certificate/CreditCertificatePlaceOfOriginCertificateEnumUtil'
import CreditCertificatePointTimeEnumSelect from './../../../components/entity/credit-certificate/CreditCertificatePointTimeEnumSelect'
import CreditCertificatePointTimeEnumUtil from './../../../components/enum/credit-certificate/CreditCertificatePointTimeEnumUtil'
import CreditCertificateBusinessWayEnumSelect from './../../../components/entity/credit-certificate/CreditCertificateBusinessWayEnumSelect'
import CreditCertificateBusinessWayEnumUtil from './../../../components/enum/credit-certificate/CreditCertificateBusinessWayEnumUtil'
import CreditCertificateTypeEnumSelect from './../../../components/entity/credit-certificate/CreditCertificateTypeEnumSelect'
import CreditCertificateTypeEnumUtil from './../../../components/enum/credit-certificate/CreditCertificateTypeEnumUtil'
import LCEnumUtil from './../../../components/enum/credit-certificate/LCEnumUtil'
import creditCertificateServer from './../../../api/creditCertificateServer'
const initSearchParams = {
  isClaiming: null,
  saleDepartmentIdsCode: null,
  code: null,
  creditCertificateDateStart: null,
  creditCertificateDateEnd: null,
  receivedCreditCertificateDateStart: null,
  receivedCreditCertificateDateEnd: null,
  status: null,
  creditCertificateCode: null,
  lcReqMan: null,
  lastLoadDateStart: null,
  lastLoadDateEnd: null,
  periodValidityStart: null,
  periodValidityEnd: null,
  existCreditFile: null,
  payWay: null,
  isNewVersion: null,
  introductionFundsSystem: null,
  amount: null,
  upFloatRate: null,
  upFloatedAmount: null,
  actualAmount: null,
  amountUsedUp: null,
  allocatedAmount: null,
  distributableAmount: null,
  deliveredAmount: null,
  closeBillAmount: null,
  inBatches: null,
  transfer: null,
  expireAddress: null,
  closeBillDeadline: null,
  placeOfOriginCertificate: null,
  returnedMoneyDeadline: null,
  pointTime: null,
  alterCertificateInformation: null,
  suggestedModificationInformation: null,
  businessFeedback: null,
  businessDocuments: null,
  consignorName: null,
  consignorAddress: null,
  consignorTel: null,
  consignorFax: null,
  consignorEmail: null,
  consignorEnterpriseCode: null,
  consignorCountryCode: null,
  consignorAeoCode: null,
  consigneeName: null,
  consigneeAddress: null,
  consigneeTel: null,
  consigneeFax: null,
  consigneeEmail: null,
  consigneeEnterpriseCode: null,
  consigneeCountryCode: null,
  consigneeAeoCode: null,
  consigneeContactName: null,
  consigneeContactTel: null,
  consigneeContactFax: null,
  consigneeContactEmail: null,
  notifyName: null,
  notifyAddress: null,
  notifyTel: null,
  notifyFax: null,
  notifyEmail: null,
  notifyEnterpriseCode: null,
  notifyCountryCode: null,
  notifyAeoCode: null,
  otherNotifyMan: null,
  lc: null,
  shipCertificate: null,
  supplementInfo: null,
  other: null,
  businessWay: null,
  creditCertificateType: null,
  noticeCost: null,
  pointTimeNotMatchCost: null,
  confirmMan: null,
  confirmTimeStart: null,
  confirmTimeEnd: null,
  isConfirm: null,
  noticeBankIds: [],
  paymentBankIds: [],
  proveBankIds: [],
  currencyIds: [],
  sendPortIds: [],
  targetPortIds: [],
  areaIds: [],
  saleDepartmentId: null,
  customerIds: [],
  tradeDocumenterId: null,
  operateUnitIds: [],
  forfaitingBankIds: [],
  confirmingBankIds: []
}
const initExport = {
  code: '水单编号',
  creditCertificateDate: '信用证日期',
  receivedCreditCertificateDate: '收证日期',
  status: '状态',
  creditCertificateCode: '信用证号',
  lcReqMan: '信用证申请人',
  lastLoadDate: '最迟装运日',
  periodValidity: '有效期',
  existCreditFile: '中信保银行档案',
  payWay: '付款方式',
  isNewVersion: '是新版本',
  introductionFundsSystem: '引入资金系统',
  amount: '金额',
  upFloatRate: '上浮比率(%)',
  upFloatedAmount: '上浮后金额',
  actualAmount: '实际金额',
  amountUsedUp: '金额用完',
  allocatedAmount: '已分配金额',
  distributableAmount: '未分配金额',
  deliveredAmount: '已发货金额',
  closeBillAmount: '已交单金额',
  inBatches: '分批装运',
  transfer: '转运',
  expireAddress: '到期地点',
  closeBillDeadline: '交单期限',
  placeOfOriginCertificate: '产地证',
  returnedMoneyDeadline: '回款期限',
  pointTime: '回款时点',
  alterCertificateInformation: '改证信息',
  suggestedModificationInformation: '建议修改信息',
  businessFeedback: '业务反馈信息',
  businessDocuments: '需业务提供单据',
  consignorName: '发货人',
  consignorAddress: '发货人地址',
  consignorTel: '发货人电话',
  consignorFax: '发货人传真',
  consignorEmail: '发货人邮箱',
  consignorEnterpriseCode: '发货人企业代码',
  consignorCountryCode: '发货人国家代码',
  consignorAeoCode: '发货人AEO编码',
  consigneeName: '收货人',
  consigneeAddress: '收货人地址',
  consigneeTel: '收货人电话',
  consigneeFax: '收货人传真',
  consigneeEmail: '收货人邮箱',
  consigneeEnterpriseCode: '收货人企业代码',
  consigneeCountryCode: '收货人国家代码',
  consigneeAeoCode: '收货人AEO编码',
  // consigneeContactName: '具体联系人名称',
  // consigneeContactTel: '具体联系人电话',
  // consigneeContactFax: '具体联系人传真',
  // consigneeContactEmail: '具体联系人邮箱',
  notifyName: '通知人',
  notifyAddress: '通知人地址',
  notifyTel: '通知人电话',
  notifyFax: '通知人传真',
  notifyEmail: '通知人邮箱',
  notifyEnterpriseCode: '通知人企业代码',
  notifyCountryCode: '通知人国家代码',
  notifyAeoCode: '通知人AEO编码',
  otherNotifyMan: '其它通知人',
  lc: 'LC受益人',
  shipCertificate: '船证明',
  supplementInfo: '加注信息',
  other: '其他',
  businessWay: '业务方式',
  creditCertificateType: '信用证类型',
  noticeCost: '正本通知费',
  pointTimeNotMatchCost: '不符点费',
  confirmMan: '确认人',
  confirmTime: '确认时间',
  isConfirm: '已确认',
  noticeBankName: '通知银行',
  paymentBankName: '议付银行',
  proveBankName: '开证银行',
  currencyName: '币种',
  swift: 'swift',
  sendPortName: '出货港',
  targetPortName: '到货港',
  areaName: '所在国家',
  saleDepartmentName: '销售部门',
  customer: '客户',
  tradeDocumenter: '单证人员',
  operateUnit: '经营单位',
  forfaitingBank: '福费廷银行',
  confirmingBankName: '保兑银行'
}
export default {
  name: 'CreditCertificateManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    CurrencySelect,
    PortSelect,
    PortViewPopup: () => import('./../port/portViewPopup'),
    AreaSelect,
    AreaViewPopup: () => import('./../area/areaViewPopup'),
    DepartmentSelect,
    CustomerSelect,
    TradeDocumenterSelect,
    TradeDocumenterViewPopup: () =>
      import('./../trade-documenter/tradeDocumenterViewPopup'),
    OperateUnitSelect,
    BankSelect,
    BankViewPopup: () => import('./../bank/bankViewPopup'),
    CreditCertificateStatusEnumSelect,
    CreditCertificatePayWayEnumSelect,
    CreditCertificatePlaceOfOriginCertificateEnumSelect,
    CreditCertificatePointTimeEnumSelect,
    CreditCertificateBusinessWayEnumSelect,
    CreditCertificateTypeEnumSelect,
    CreditCertificateDeletePopup: () =>
      import('./creditCertificateDeletePopup.vue')
  },
  filters: {
    CreditCertificateStatusFilter:
      CreditCertificateStatusEnumUtil.toTitleFilter,
    CreditCertificatePayWayFilter:
      CreditCertificatePayWayEnumUtil.toTitleFilter,
    CreditCertificatePlaceOfOriginCertificateFilter:
      CreditCertificatePlaceOfOriginCertificateEnumUtil.toTitleFilter,
    CreditCertificatePointTimeFilter:
      CreditCertificatePointTimeEnumUtil.toTitleFilter,
    CreditCertificateBusinessWayFilter:
      CreditCertificateBusinessWayEnumUtil.toTitleFilter,
    CreditCertificateTypeFilter: CreditCertificateTypeEnumUtil.toTitleFilter,
    LCTypeFilter: LCEnumUtil.toTitleFilter
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
      multipleSelection: [],
      showDeletePopup: false,
      showExportPopup: false,
      dataExport: [],
      tHeader: [],
      filterVal: [],
      showNoticeBankViewPopup: false,
      showPaymentBankViewPopup: false,
      showProveBankViewPopup: false,
      bankId: null,
      showSendPortViewPopup: false,
      showTargetPortViewPopup: false,
      portId: null,
      showAreaViewPopup: false,
      areaId: null,
      showTradeDocumenterViewPopup: false,
      tradeDocumenterId: null,
      showForfaitingBankViewPopup: false,
      showConfirmingBankViewPopup: false,
      more: false,
      eye: {
        code: true,
        creditCertificateDate: true,
        receivedCreditCertificateDate: true,
        status: true,
        creditCertificateCode: true,
        lcReqMan: true,
        lastLoadDate: true,
        periodValidity: true,
        existCreditFile: true,
        payWay: true,
        isNewVersion: true,
        introductionFundsSystem: true,
        amount: true,
        upFloatRate: true,
        upFloatedAmount: true,
        actualAmount: true,
        amountUsedUp: true,
        allocatedAmount: true,
        distributableAmount: true,
        deliveredAmount: true,
        closeBillAmount: true,
        inBatches: true,
        transfer: true,
        expireAddress: true,
        closeBillDeadline: true,
        placeOfOriginCertificate: true,
        returnedMoneyDeadline: true,
        pointTime: true,
        alterCertificateInformation: true,
        suggestedModificationInformation: true,
        businessFeedback: true,
        businessDocuments: true,
        consignorName: true,
        consignorAddress: true,
        consignorTel: true,
        consignorFax: true,
        consignorEmail: true,
        consignorEnterpriseCode: true,
        consignorCountryCode: true,
        consignorAeoCode: true,
        consigneeName: true,
        consigneeAddress: true,
        consigneeTel: true,
        consigneeFax: true,
        consigneeEmail: true,
        consigneeEnterpriseCode: true,
        consigneeCountryCode: true,
        consigneeAeoCode: true,
        consigneeContactName: true,
        consigneeContactTel: true,
        consigneeContactFax: true,
        consigneeContactEmail: true,
        noticeBankName: true,
        paymentBankName: true,
        proveBankName: true,
        notifyName: true,
        notifyAddress: true,
        notifyTel: true,
        notifyFax: true,
        notifyEmail: true,
        notifyEnterpriseCode: true,
        notifyCountryCode: true,
        notifyAeoCode: true,
        otherNotifyMan: true,
        swift: true,
        lc: true,
        shipCertificate: true,
        supplementInfo: true,
        other: true,
        businessWay: true,
        creditCertificateType: true,
        noticeCost: true,
        pointTimeNotMatchCost: true,
        confirmMan: true,
        confirmTime: true,
        isConfirm: true,
        noticeBankId: true,
        paymentBankId: true,
        proveBankId: true,
        currencyId: true,
        currencyName: true,
        tradeDocumenter: true,
        sendPortId: true,
        targetPortId: true,
        areaId: true,
        saleDepartmentId: true,
        customerId: true,
        tradeDocumenterId: true,
        operateUnitId: true,
        forfaitingBankId: true,
        confirmingBankId: true
      },
      showEye: false
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  watch: {
  },
  created() { 
    this.keyword.isClaiming = this.$route.query.isClaiming || null
    this.search()
  },
  methods: {
    async search() {
      this.loading = true
      this.multipleSelection = []
      const keyword = this.keyword
      const res = await creditCertificateServer.search({
        keyword,
        page: this.page - 1,
        size: this.size
      })
      this.tableData = res.data
      res.data.forEach((item, index) => {
        this.$set(this.tableData, index, item)
      })
      if (res.page) {
        this.count = res.page.total
      }
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
    clickEditBtn(row) {
      this.$router.push({
        path: './credit-certificate/edit/' + row.id
      })
    },
    handleRowDb(row) {
      this.$router.push({
        path: './credit-certificate/edit/' + row.id
      })
    },
    clickAddBtn() {
      this.$router.push({
        path: './credit-certificate/edit/new'
      })
      this.reload()
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
        this.dataExport = JSON.parse(JSON.stringify(this.multipleSelection))
      } else if (this.tableData.length > 0) {
        this.dataExport = JSON.parse(JSON.stringify(this.tableData))
      }
      
      this.dataExport.forEach(item => {
        item.lc = LCEnumUtil.toTitleFilter(item.lc)
        item.status = CreditCertificateStatusEnumUtil.toTitleFilter(item.status)
        item.payWay = CreditCertificatePayWayEnumUtil.toTitleFilter(item.payWay)
        item.placeOfOriginCertificate = CreditCertificatePlaceOfOriginCertificateEnumUtil.toTitleFilter(
          item.placeOfOriginCertificate
        )
        item.pointTime = CreditCertificatePointTimeEnumUtil.toTitleFilter(
          item.pointTime
        )
        item.businessWay = CreditCertificateBusinessWayEnumUtil.toTitleFilter(
          item.businessWay
        )
        item.creditCertificateType = CreditCertificateTypeEnumUtil.toTitleFilter(
          item.creditCertificateType
        )
        item.existCreditFile = item.existCreditFile ? '是' : '否'
        item.isNewVersion = item.isNewVersion ? '是' : '否'
        item.amountUsedUp = item.amountUsedUp ? '是' : '否'
        item.inBatches = item.inBatches ? '是' : '否'
        item.transfer = item.transfer ? '是' : '否'
        item.isConfirm = item.isConfirm ? '是' : '否'
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
    openNoticeBankViewPopup(id) {
      this.bankId = id
      this.showNoticeBankViewPopup = true
    },
    openPaymentBankViewPopup(id) {
      this.bankId = id
      this.showPaymentBankViewPopup = true
    },
    openProveBankViewPopup(id) {
      this.bankId = id
      this.showProveBankViewPopup = true
    },
    openSendPortViewPopup(id) {
      this.portId = id
      this.showSendPortViewPopup = true
    },
    openTargetPortViewPopup(id) {
      this.portId = id
      this.showTargetPortViewPopup = true
    },
    openAreaViewPopup(id) {
      this.areaId = id
      this.showAreaViewPopup = true
    },
    openTradeDocumenterViewPopup(id) {
      this.tradeDocumenterId = id
      this.showTradeDocumenterViewPopup = true
    },
    openForfaitingBankViewPopup(id) {
      this.bankId = id
      this.showForfaitingBankViewPopup = true
    },
    openConfirmingBankViewPopup(id) {
      this.bankId = id
      this.showConfirmingBankViewPopup = true
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
