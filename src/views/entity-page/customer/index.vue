<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="申请单号">
            <el-input v-model="keyword.orderNumber" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单时间起始">
            <el-date-picker
              v-model="keyword.createOrderTimeStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单时间结束">
            <el-date-picker
              v-model="keyword.createOrderTimeEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单人">
            <el-input v-model="keyword.createOrderMan" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="状态">
            <CustomerStatusEnumSelect v-model="keyword.status" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="编码">
            <el-input v-model="keyword.code" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="名称">
            <el-input v-model="keyword.name" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="简称">
            <el-input v-model="keyword.simplifyName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="地址">
            <el-input v-model="keyword.address" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户描述">
            <el-input v-model="keyword.customerDescribe" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="负责人">
            <el-input v-model="keyword.thoseResponsible" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="信用等级">
            <CustomerCreditEnumSelect v-model="keyword.credit" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="注册名称">
            <el-input v-model="keyword.registerName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="网址">
            <el-input v-model="keyword.url" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="注册资本(美元)">
            <el-input v-model="keyword.registerCapital" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户类别">
            <CustomerCategoryEnumSelect v-model="keyword.category" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="电话">
            <el-input v-model="keyword.phone" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="Email">
            <el-input v-model="keyword.email" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="OA实际额度">
            <el-input v-model="keyword.oaCredit" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="贸易名称">
            <el-input v-model="keyword.tradeName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="法人代表">
            <el-input v-model="keyword.legalRepresentative" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="银行账号">
            <el-input v-model="keyword.bankAccount" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户配件比例%">
            <el-input v-model="keyword.accessoriesProportion" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户性质">
            <CustomerNatureEnumSelect v-model="keyword.nature" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="信保比例%">
            <el-input v-model="keyword.creditProportion" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户等级">
            <CustomerLevelEnumSelect v-model="keyword.level" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="返利率">
            <el-input v-model="keyword.rebateProportion" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="区域等级">
            <CustomerAreaLevelEnumSelect v-model="keyword.areaLevel" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="贸易类型">
            <CustomerTradeTypeEnumSelect v-model="keyword.tradeType" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="注册地址">
            <el-input v-model="keyword.registeredAddress" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="纳税人识别号">
            <el-input v-model="keyword.TaxpayerNumber" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户类型">
            <CustomerTypeEnumSelect v-model="keyword.type" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.remark" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="币种">
            <CurrencySelect v-model="keyword.currencyIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="银行">
            <BankInfoSelect v-model="keyword.bankInfoIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="所在国家">
            <AreaSelect v-model="keyword.areaIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="业务部门">
            <DepartmentSelect v-model="keyword.departmentIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="经营单位">
            <OperateUnitSelect v-model="keyword.operateUnitIds" type="multiple" />
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
          v-if="eye.orderNumber"
          show-overflow-tooltip
          prop="orderNumber"
          sortable
          label="申请单号" />
        <el-table-column
          v-if="eye.createOrderTime"
          show-overflow-tooltip
          prop="createOrderTime"
          sortable
          label="制单时间">
          <template slot-scope="scope">
            {{ scope.row.createOrderTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.createOrderMan"
          show-overflow-tooltip
          prop="createOrderMan"
          sortable
          label="制单人" />
        <el-table-column
          v-if="eye.status"
          show-overflow-tooltip
          prop="status"
          sortable
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | CustomerStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.code"
          show-overflow-tooltip
          prop="code"
          sortable
          label="编码" />
        <el-table-column
          v-if="eye.name"
          show-overflow-tooltip
          prop="name"
          sortable
          label="名称" />
        <el-table-column
          v-if="eye.simplifyName"
          show-overflow-tooltip
          prop="simplifyName"
          sortable
          label="简称" />
        <el-table-column
          v-if="eye.address"
          show-overflow-tooltip
          prop="address"
          sortable
          label="地址" />
        <el-table-column
          v-if="eye.customerDescribe"
          show-overflow-tooltip
          prop="customerDescribe"
          sortable
          label="客户描述" />
        <el-table-column
          v-if="eye.thoseResponsible"
          show-overflow-tooltip
          prop="thoseResponsible"
          sortable
          label="负责人" />
        <el-table-column
          v-if="eye.credit"
          show-overflow-tooltip
          prop="credit"
          sortable
          label="信用等级">
          <template slot-scope="scope">
            {{ scope.row.credit | CustomerCreditFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.registerName"
          show-overflow-tooltip
          prop="registerName"
          sortable
          label="注册名称" />
        <el-table-column
          v-if="eye.url"
          show-overflow-tooltip
          prop="url"
          sortable
          label="网址" />
        <el-table-column
          v-if="eye.registerCapital"
          show-overflow-tooltip
          prop="registerCapital"
          sortable
          label="注册资本(美元)" />
        <el-table-column
          v-if="eye.category"
          show-overflow-tooltip
          prop="category"
          sortable
          label="客户类别">
          <template slot-scope="scope">
            {{ scope.row.category | CustomerCategoryFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.phone"
          show-overflow-tooltip
          prop="phone"
          sortable
          label="电话" />
        <el-table-column
          v-if="eye.email"
          show-overflow-tooltip
          prop="email"
          sortable
          label="Email" />
        <el-table-column
          v-if="eye.oaCredit"
          show-overflow-tooltip
          prop="oaCredit"
          sortable
          label="OA实际额度" />
        <el-table-column
          v-if="eye.tradeName"
          show-overflow-tooltip
          prop="tradeName"
          sortable
          label="贸易名称" />
        <el-table-column
          v-if="eye.legalRepresentative"
          show-overflow-tooltip
          prop="legalRepresentative"
          sortable
          label="法人代表" />
        <el-table-column
          v-if="eye.bankAccount"
          show-overflow-tooltip
          prop="bankAccount"
          sortable
          label="银行账号" />
        <el-table-column
          v-if="eye.accessoriesProportion"
          show-overflow-tooltip
          prop="accessoriesProportion"
          sortable
          label="客户配件比例%" />
        <el-table-column
          v-if="eye.authorizationDocument"
          show-overflow-tooltip
          prop="authorizationDocument"
          sortable
          label="授权书">
          <template slot-scope="scope">
            <el-tag :type="scope.row.authorizationDocument === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.authorizationDocument }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.registrationDocument"
          show-overflow-tooltip
          prop="registrationDocument"
          sortable
          label="注册书">
          <template slot-scope="scope">
            <el-tag :type="scope.row.registrationDocument === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.registrationDocument }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.nature"
          show-overflow-tooltip
          prop="nature"
          sortable
          label="客户性质">
          <template slot-scope="scope">
            {{ scope.row.nature | CustomerNatureFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.creditProportion"
          show-overflow-tooltip
          prop="creditProportion"
          sortable
          label="信保比例%" />
        <el-table-column
          v-if="eye.level"
          show-overflow-tooltip
          prop="level"
          sortable
          label="客户等级">
          <template slot-scope="scope">
            {{ scope.row.level | CustomerLevelFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.rebateProportion"
          show-overflow-tooltip
          prop="rebateProportion"
          sortable
          label="返利率" />
        <el-table-column
          v-if="eye.areaLevel"
          show-overflow-tooltip
          prop="areaLevel"
          sortable
          label="区域等级">
          <template slot-scope="scope">
            {{ scope.row.areaLevel | CustomerAreaLevelFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.tradeType"
          show-overflow-tooltip
          prop="tradeType"
          sortable
          label="贸易类型">
          <template slot-scope="scope">
            {{ scope.row.tradeType | CustomerTradeTypeFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.registeredAddress"
          show-overflow-tooltip
          prop="registeredAddress"
          sortable
          label="注册地址" />
        <el-table-column
          v-if="eye.TaxpayerNumber"
          show-overflow-tooltip
          prop="TaxpayerNumber"
          sortable
          label="纳税人识别号" />
        <el-table-column
          v-if="eye.type"
          show-overflow-tooltip
          prop="type"
          sortable
          label="客户类型">
          <template slot-scope="scope">
            {{ scope.row.type | CustomerTypeFilter }}
          </template>
        </el-table-column>
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
          v-if="eye.currencyId"
          show-overflow-tooltip
          prop="currencyId"
          sortable
          label="币种"/>
        <el-table-column
          v-if="eye.bankInfoId"
          show-overflow-tooltip
          prop="bankInfoId"
          sortable
          label="银行">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openBankInfoViewPopup(scope.row.bankInfoId)">{{ scope.row.bankInfo ? scope.row.bankInfo.name : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.areaId"
          show-overflow-tooltip
          prop="areaId"
          sortable
          label="所在国家">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openAreaViewPopup(scope.row.areaId)">{{ scope.row.area ? scope.row.area.name : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.departmentId"
          show-overflow-tooltip
          prop="departmentId"
          sortable
          label="业务部门"/>
        <el-table-column
          v-if="eye.operateUnitId"
          show-overflow-tooltip
          prop="operateUnitId"
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
            <el-checkbox v-model="eye.orderNumber">申请单号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createOrderTime">制单时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createOrderMan">制单人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.status">状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.code">编码</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.name">名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.simplifyName">简称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.address">地址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.customerDescribe">客户描述</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.thoseResponsible">负责人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.credit">信用等级</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.registerName">注册名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.url">网址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.registerCapital">注册资本(美元)</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.category">客户类别</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.phone">电话</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.email">Email</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.oaCredit">OA实际额度</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.tradeName">贸易名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.legalRepresentative">法人代表</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bankAccount">银行账号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.accessoriesProportion">客户配件比例%</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.authorizationDocument">授权书</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.registrationDocument">注册书</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.nature">客户性质</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.creditProportion">信保比例%</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.level">客户等级</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.rebateProportion">返利率</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.areaLevel">区域等级</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.tradeType">贸易类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.registeredAddress">注册地址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.TaxpayerNumber">纳税人识别号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.type">客户类型</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.currencyId">currencyId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.bankInfoId">bankInfoId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.areaId">areaId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.departmentId">departmentId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.operateUnitId">operateUnitId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'CustomerViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'CustomerEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'CustomerDeletePopup'"
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
      v-if="showBankInfoViewPopup"
      :is="'BankInfoViewPopup'"
      :id="bankInfoId"
      @close="showBankInfoViewPopup = false"
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
import CurrencySelect from './../../../components/entity/currency/CurrencySelect'
import BankInfoSelect from './../../../components/entity/bank-info/BankInfoSelect'
import AreaSelect from './../../../components/entity/area/AreaSelect'
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
import OperateUnitSelect from './../../../components/entity/operate-unit/OperateUnitSelect'
import CustomerStatusEnumSelect from './../../../components/entity/customer/CustomerStatusEnumSelect'
import CustomerStatusEnumUtil from './../../../components/enum/customer/CustomerStatusEnumUtil'
import CustomerCreditEnumSelect from './../../../components/entity/customer/CustomerCreditEnumSelect'
import CustomerCreditEnumUtil from './../../../components/enum/customer/CustomerCreditEnumUtil'
import CustomerCategoryEnumSelect from './../../../components/entity/customer/CustomerCategoryEnumSelect'
import CustomerCategoryEnumUtil from './../../../components/enum/customer/CustomerCategoryEnumUtil'
import CustomerNatureEnumSelect from './../../../components/entity/customer/CustomerNatureEnumSelect'
import CustomerNatureEnumUtil from './../../../components/enum/customer/CustomerNatureEnumUtil'
import CustomerLevelEnumSelect from './../../../components/entity/customer/CustomerLevelEnumSelect'
import CustomerLevelEnumUtil from './../../../components/enum/customer/CustomerLevelEnumUtil'
import CustomerAreaLevelEnumSelect from './../../../components/entity/customer/CustomerAreaLevelEnumSelect'
import CustomerAreaLevelEnumUtil from './../../../components/enum/customer/CustomerAreaLevelEnumUtil'
import CustomerTradeTypeEnumSelect from './../../../components/entity/customer/CustomerTradeTypeEnumSelect'
import CustomerTradeTypeEnumUtil from './../../../components/enum/customer/CustomerTradeTypeEnumUtil'
import CustomerTypeEnumSelect from './../../../components/entity/customer/CustomerTypeEnumSelect'
import CustomerTypeEnumUtil from './../../../components/enum/customer/CustomerTypeEnumUtil'
import customerServer from './../../../api/customerServer'
const initSearchParams = {
  orderNumber: null,
  createOrderTimeStart: null,
  createOrderTimeEnd: null,
  createOrderMan: null,
  status: null,
  code: null,
  name: null,
  simplifyName: null,
  address: null,
  customerDescribe: null,
  thoseResponsible: null,
  credit: null,
  registerName: null,
  url: null,
  registerCapital: null,
  category: null,
  phone: null,
  email: null,
  oaCredit: null,
  tradeName: null,
  legalRepresentative: null,
  bankAccount: null,
  accessoriesProportion: null,
  authorizationDocument: null,
  registrationDocument: null,
  nature: null,
  creditProportion: null,
  level: null,
  rebateProportion: null,
  areaLevel: null,
  tradeType: null,
  registeredAddress: null,
  TaxpayerNumber: null,
  type: null,
  remark: null,
  isDelete: null,
  currencyIds: [],
  bankInfoIds: [],
  areaIds: [],
  departmentIds: [],
  operateUnitIds: [],
}
const initExport = {
  orderNumber: '申请单号',
  createOrderTime: '制单时间',
  createOrderMan: '制单人',
  status: '状态',
  code: '编码',
  name: '名称',
  simplifyName: '简称',
  address: '地址',
  customerDescribe: '客户描述',
  thoseResponsible: '负责人',
  credit: '信用等级',
  registerName: '注册名称',
  url: '网址',
  registerCapital: '注册资本(美元)',
  category: '客户类别',
  phone: '电话',
  email: 'Email',
  oaCredit: 'OA实际额度',
  tradeName: '贸易名称',
  legalRepresentative: '法人代表',
  bankAccount: '银行账号',
  accessoriesProportion: '客户配件比例%',
  authorizationDocument: '授权书',
  registrationDocument: '注册书',
  nature: '客户性质',
  creditProportion: '信保比例%',
  level: '客户等级',
  rebateProportion: '返利率',
  areaLevel: '区域等级',
  tradeType: '贸易类型',
  registeredAddress: '注册地址',
  TaxpayerNumber: '纳税人识别号',
  type: '客户类型',
  remark: '备注',
  isDelete: '是否删除',
  currency: '币种',
  bankInfo: '银行',
  area: '所在国家',
  department: '业务部门',
  operateUnit: '经营单位',
}
export default {
  name: 'CustomerManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    CurrencySelect,
    BankInfoSelect,
    BankInfoViewPopup: () => import('./../bank-info/bankInfoViewPopup'),
    AreaSelect,
    AreaViewPopup: () => import('./../area/areaViewPopup'),
    DepartmentSelect,
    OperateUnitSelect,
    CustomerStatusEnumSelect,
    CustomerCreditEnumSelect,
    CustomerCategoryEnumSelect,
    CustomerNatureEnumSelect,
    CustomerLevelEnumSelect,
    CustomerAreaLevelEnumSelect,
    CustomerTradeTypeEnumSelect,
    CustomerTypeEnumSelect,
    CustomerViewPopup: () => import('./customerViewPopup.vue'),
    CustomerEditPopup: () => import('./customerEditPopup.vue'),
    CustomerDeletePopup: () => import('./customerDeletePopup.vue')
  },
  filters: {
    CustomerStatusFilter: CustomerStatusEnumUtil.toTitleFilter,
    CustomerCreditFilter: CustomerCreditEnumUtil.toTitleFilter,
    CustomerCategoryFilter: CustomerCategoryEnumUtil.toTitleFilter,
    CustomerNatureFilter: CustomerNatureEnumUtil.toTitleFilter,
    CustomerLevelFilter: CustomerLevelEnumUtil.toTitleFilter,
    CustomerAreaLevelFilter: CustomerAreaLevelEnumUtil.toTitleFilter,
    CustomerTradeTypeFilter: CustomerTradeTypeEnumUtil.toTitleFilter,
    CustomerTypeFilter: CustomerTypeEnumUtil.toTitleFilter,
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
      showBankInfoViewPopup: false,
      bankInfoId: null,
      showAreaViewPopup: false,
      areaId: null,
      more: false,
      eye: {
        orderNumber: true,
        createOrderTime: true,
        createOrderMan: true,
        status: true,
        code: true,
        name: true,
        simplifyName: true,
        address: true,
        customerDescribe: true,
        thoseResponsible: true,
        credit: true,
        registerName: true,
        url: true,
        registerCapital: true,
        category: true,
        phone: true,
        email: true,
        oaCredit: true,
        tradeName: true,
        legalRepresentative: true,
        bankAccount: true,
        accessoriesProportion: true,
        authorizationDocument: true,
        registrationDocument: true,
        nature: true,
        creditProportion: true,
        level: true,
        rebateProportion: true,
        areaLevel: true,
        tradeType: true,
        registeredAddress: true,
        TaxpayerNumber: true,
        type: true,
        remark: true,
        isDelete: true,
        currencyId: true,
        bankInfoId: true,
        areaId: true,
        departmentId: true,
        operateUnitId: true,
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
      if (Validate.isNotEmpty(keyword.orderNumber)) {
        query += ` AND orderNumber:${keyword.orderNumber}`
      }
      if (keyword.createOrderTimeStart) {
        query += ` AND createOrderTime:[${Datetime.dateToDateStr(keyword.createOrderTimeStart)} TO *]`
      }
      if (keyword.createOrderTimeEnd) {
        query += ` AND createOrderTime:[* TO ${Datetime.dateToDateStr(keyword.createOrderTimeEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.createOrderMan)) {
        query += ` AND createOrderMan:${keyword.createOrderMan}`
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
      if (Validate.isNotEmpty(keyword.code)) {
        query += ` AND code:${keyword.code}`
      }
      if (Validate.isNotEmpty(keyword.name)) {
        query += ` AND name:${keyword.name}`
      }
      if (Validate.isNotEmpty(keyword.simplifyName)) {
        query += ` AND simplifyName:${keyword.simplifyName}`
      }
      if (Validate.isNotEmpty(keyword.address)) {
        query += ` AND address:${keyword.address}`
      }
      if (Validate.isNotEmpty(keyword.customerDescribe)) {
        query += ` AND customerDescribe:${keyword.customerDescribe}`
      }
      if (Validate.isNotEmpty(keyword.thoseResponsible)) {
        query += ` AND thoseResponsible:${keyword.thoseResponsible}`
      }
      if (keyword.credit && keyword.credit.length > 0) {
        query += ' AND ('
        keyword.credit.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `credit:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.registerName)) {
        query += ` AND registerName:${keyword.registerName}`
      }
      if (Validate.isNotEmpty(keyword.url)) {
        query += ` AND url:${keyword.url}`
      }
      if (Validate.isNotEmpty(keyword.registerCapital)) {
        query += ` AND registerCapital:${keyword.registerCapital}`
      }
      if (keyword.category && keyword.category.length > 0) {
        query += ' AND ('
        keyword.category.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `category:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.phone)) {
        query += ` AND phone:${keyword.phone}`
      }
      if (Validate.isNotEmpty(keyword.email)) {
        query += ` AND email:${keyword.email}`
      }
      if (Validate.isNotEmpty(keyword.oaCredit)) {
        query += ` AND oaCredit:${keyword.oaCredit}`
      }
      if (Validate.isNotEmpty(keyword.tradeName)) {
        query += ` AND tradeName:${keyword.tradeName}`
      }
      if (Validate.isNotEmpty(keyword.legalRepresentative)) {
        query += ` AND legalRepresentative:${keyword.legalRepresentative}`
      }
      if (Validate.isNotEmpty(keyword.bankAccount)) {
        query += ` AND bankAccount:${keyword.bankAccount}`
      }
      if (Validate.isNotEmpty(keyword.accessoriesProportion)) {
        query += ` AND accessoriesProportion:${keyword.accessoriesProportion}`
      }
      if (keyword.nature && keyword.nature.length > 0) {
        query += ' AND ('
        keyword.nature.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `nature:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.creditProportion)) {
        query += ` AND creditProportion:${keyword.creditProportion}`
      }
      if (keyword.level && keyword.level.length > 0) {
        query += ' AND ('
        keyword.level.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `level:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.rebateProportion)) {
        query += ` AND rebateProportion:${keyword.rebateProportion}`
      }
      if (keyword.areaLevel && keyword.areaLevel.length > 0) {
        query += ' AND ('
        keyword.areaLevel.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `areaLevel:${str}`
        })
        query += ')'
      }
      if (keyword.tradeType && keyword.tradeType.length > 0) {
        query += ' AND ('
        keyword.tradeType.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `tradeType:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.registeredAddress)) {
        query += ` AND registeredAddress:${keyword.registeredAddress}`
      }
      if (Validate.isNotEmpty(keyword.TaxpayerNumber)) {
        query += ` AND TaxpayerNumber:${keyword.TaxpayerNumber}`
      }
      if (keyword.type && keyword.type.length > 0) {
        query += ' AND ('
        keyword.type.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `type:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.remark)) {
        query += ` AND remark:${keyword.remark}`
      }
      if (keyword.currencyIds && keyword.currencyIds.length > 0) {
        query += ' AND ('
        keyword.currencyIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `currency.id:${id}`
        })
        query += ')'
      }
      if (keyword.bankInfoIds && keyword.bankInfoIds.length > 0) {
        query += ' AND ('
        keyword.bankInfoIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `bankInfo.id:${id}`
        })
        query += ')'
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
      if (keyword.operateUnitIds && keyword.operateUnitIds.length > 0) {
        query += ' AND ('
        keyword.operateUnitIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `operateUnit.id:${id}`
        })
        query += ')'
      }
      const res = await customerServer.search({
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
      // this.currentClickRow = row
      // this.showEditPopup = true
      this.$router.push({
        path: './customer/edit-sublist',
        query: { id: row.id }
      })
    },
    clickAddBtn() {
      // this.currentClickRow = {}
      // this.showEditPopup = true
      this.$router.push({
        path: './customer/edit-sublist'
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
    openBankInfoViewPopup(id) {
      this.bankInfoId = id
      this.showBankInfoViewPopup = true
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
