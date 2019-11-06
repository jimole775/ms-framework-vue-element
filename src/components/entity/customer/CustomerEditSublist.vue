<template>
  <div class="max-w back">
    <div class="container">
      <el-button type="primary" icon="el-icon-check" size="mini" @click="save">保存</el-button>
      <el-button icon="el-icon-refresh" size="mini" @click="resetData">重置</el-button>
      <el-button v-show="formData.id" type="danger" icon="el-icon-delete" size="mini" @click="del">删除</el-button>
      <el-button v-show="formData.id" type="primary" size="mini" icon="el-icon-check">提交</el-button>
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
            <el-form-item label="申请单号" required prop="orderNumber">
              <el-input v-model="formData.orderNumber" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="制单时间" prop="createOrderTime">
              <el-date-picker
                v-model="formData.createOrderTime"
                size="mini"
                class="max-w"
                type="datetime"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="制单人" required prop="createOrderMan">
              <el-input v-model="formData.createOrderMan" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="状态" required prop="status">
              <CustomerStatusEnumSelect v-model="formData.status" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="编码" prop="code">
              <el-input v-model="formData.code" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="名称" required prop="name">
              <el-input v-model="formData.name" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="简称" prop="simplifyName">
              <el-input v-model="formData.simplifyName" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="地址" required prop="address">
              <el-input v-model="formData.address" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="客户描述" prop="customerDescribe">
              <el-input v-model="formData.customerDescribe" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="负责人" prop="thoseResponsible">
              <el-input v-model="formData.thoseResponsible" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="信用等级" required prop="credit">
              <CustomerCreditEnumSelect v-model="formData.credit" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="注册名称" prop="registerName">
              <el-input v-model="formData.registerName" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="网址" prop="url">
              <el-input v-model="formData.url" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="注册资本(美元)" prop="registerCapital">
              <el-input-number v-model="formData.registerCapital" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="客户类别" required prop="category">
              <CustomerCategoryEnumSelect v-model="formData.category" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="电话" required prop="phone">
              <el-input v-model="formData.phone" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="Email" required prop="email">
              <el-input v-model="formData.email" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="OA实际额度" prop="oaCredit">
              <el-input-number v-model="formData.oaCredit" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="贸易名称" prop="tradeName">
              <el-input v-model="formData.tradeName" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="法人代表" required prop="legalRepresentative">
              <el-input v-model="formData.legalRepresentative" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="银行账号" required prop="bankAccount">
              <el-input v-model="formData.bankAccount" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="客户配件比例%" required prop="accessoriesProportion">
              <el-input-number v-model="formData.accessoriesProportion" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="授权书" prop="authorizationDocument">
              <el-switch v-model="formData.authorizationDocument" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="注册书" prop="registrationDocument">
              <el-switch v-model="formData.registrationDocument" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="客户性质" required prop="nature">
              <CustomerNatureEnumSelect v-model="formData.nature" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="信保比例%" prop="creditProportion">
              <el-input-number v-model="formData.creditProportion" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="客户等级" required prop="level">
              <CustomerLevelEnumSelect v-model="formData.level" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="返利率" required prop="rebateProportion">
              <el-input-number v-model="formData.rebateProportion" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="区域等级" required prop="areaLevel">
              <CustomerAreaLevelEnumSelect v-model="formData.areaLevel" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="贸易类型" required prop="tradeType">
              <CustomerTradeTypeEnumSelect v-model="formData.tradeType" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="注册地址" required prop="registeredAddress">
              <el-input v-model="formData.registeredAddress" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="纳税人识别号" prop="TaxpayerNumber">
              <el-input v-model="formData.TaxpayerNumber" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="客户类型" required prop="type">
              <CustomerTypeEnumSelect v-model="formData.type" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="是否删除" prop="isDelete">
              <el-switch v-model="formData.isDelete" size="mini" />
            </el-form-item>
          </el-col>
          
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="币种" required prop="currencyId">
              <CurrencySelect v-model="formData.currencyId" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="银行" prop="bankInfoId">
              <BankInfoSelect v-model="formData.bankInfoId" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="所在国家" required prop="areaId">
              <AreaSelect v-model="formData.areaId" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="业务部门" required prop="departmentId">
              <DepartmentSelect v-model="formData.departmentId" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="经营单位" prop="operateUnitId">
              <OperateUnitSelect v-model="formData.operateUnitId" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-tabs type="border-card">
        <el-tab-pane label="客户银行账号">
          <el-row>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="clickAddCustomerBankAccount" />
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="clickDeleteCustomerBankAccount" />
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${customerBankAccountsSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="customerBankAccounts"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeCustomerBankAccount"
          >
            <el-table-column type="selection" />
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column
              prop="code"
              sortable
              width="180"
              label="编码">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.code"
                  maxlength="64"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="account"
              sortable
              width="180"
              label="账号">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.account"
                  maxlength="64"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              sortable
              width="180"
              label="备注">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.remark"
                  maxlength="1024"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="isDefault"
              sortable
              label="默认">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isDefault"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="isDelete"
              sortable
              label="是否删除">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isDelete"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="bankInfoId"
              sortable
              width="210"
              label="银行">
              <template slot-scope="scope">
                <BankInfoSelect v-model="scope.row.bankInfoId" />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="客户联系方式">
          <el-row>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="clickAddCustomerContact" />
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="clickDeleteCustomerContact" />
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${customerContactsSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="customerContacts"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeCustomerContact"
          >
            <el-table-column type="selection" />
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column
              prop="duty"
              sortable
              width="180"
              label="职务">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.duty"
                  maxlength="64"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              sortable
              width="180"
              label="联系人">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  maxlength="64"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="tel"
              sortable
              width="180"
              label="电话">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.tel"
                  maxlength="24"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="email"
              sortable
              width="180"
              label="电子邮件">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.email"
                  maxlength="64"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="phone"
              sortable
              width="180"
              label="手机号码">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.phone"
                  maxlength="24"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              sortable
              width="180"
              label="备注">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.remark"
                  maxlength="1024"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="isDelete"
              sortable
              label="是否删除">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isDelete"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="客户品牌">
          <el-row>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="clickAddCustomerBrand" />
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="clickDeleteCustomerBrand" />
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${customerBrandsSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="customerBrands"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeCustomerBrand"
          >
            <el-table-column type="selection" />
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column
              prop="name"
              sortable
              width="180"
              label="品牌名">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name"
                  maxlength="64"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="registeredAddress"
              sortable
              width="180"
              label="注册地">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.registeredAddress"
                  maxlength="512"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="periodValidity"
              sortable
              width="240"
              label="有效期">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.periodValidity"
                  type="datetime"
                  placeholder="选择日期时间"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              sortable
              width="180"
              label="备注">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.remark"
                  maxlength="1024"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="isDelete"
              sortable
              label="是否删除">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isDelete"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

    </div>

    <component
      v-if="showCustomerBankAccountDeletePopup"
      :is="'CustomerBankAccountDeletePopup'"
      :list="customerBankAccountsSelection"
      @close="showCustomerBankAccountDeletePopup = false"
      @update="deletedCustomerBankAccount"
    />
    <component
      v-if="showCustomerContactDeletePopup"
      :is="'CustomerContactDeletePopup'"
      :list="customerContactsSelection"
      @close="showCustomerContactDeletePopup = false"
      @update="deletedCustomerContact"
    />
    <component
      v-if="showCustomerBrandDeletePopup"
      :is="'CustomerBrandDeletePopup'"
      :list="customerBrandsSelection"
      @close="showCustomerBrandDeletePopup = false"
      @update="deletedCustomerBrand"
    />

  </div>
</template>

<script>
import customerServer from './../../../api/customerServer'
import customerBankAccountServer from './../../../api/customerBankAccountServer'
import customerContactServer from './../../../api/customerContactServer'
import customerBrandServer from './../../../api/customerBrandServer'
import validate from './../../../utils/validate'
import CurrencySelect from './../currency/CurrencySelect'
import BankInfoSelect from './../bank-info/BankInfoSelect'
import AreaSelect from './../area/AreaSelect'
import DepartmentSelect from './../department/DepartmentSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import CustomerSelect from './../customer/CustomerSelect'
import CustomerStatusEnumSelect from './../../../components/entity/customer/CustomerStatusEnumSelect'
import CustomerCreditEnumSelect from './../../../components/entity/customer/CustomerCreditEnumSelect'
import CustomerCategoryEnumSelect from './../../../components/entity/customer/CustomerCategoryEnumSelect'
import CustomerNatureEnumSelect from './../../../components/entity/customer/CustomerNatureEnumSelect'
import CustomerLevelEnumSelect from './../../../components/entity/customer/CustomerLevelEnumSelect'
import CustomerAreaLevelEnumSelect from './../../../components/entity/customer/CustomerAreaLevelEnumSelect'
import CustomerTradeTypeEnumSelect from './../../../components/entity/customer/CustomerTradeTypeEnumSelect'
import CustomerTypeEnumSelect from './../../../components/entity/customer/CustomerTypeEnumSelect'

const emptyFormData = {
  orderNumber: null,
  createOrderTime: null,
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
  currencyId: null,
  bankInfoId: null,
  areaId: null,
  departmentId: null,
  operateUnitId: null,
}
const customerBankAccountEmptyData = {
  code: null,
  account: null,
  remark: null,
  isDefault: null,
  isDelete: null,
  customer: null,
  bankInfo: null,
}
const customerContactEmptyData = {
  duty: null,
  name: null,
  tel: null,
  email: null,
  phone: null,
  remark: null,
  isDelete: null,
  customer: null,
}
const customerBrandEmptyData = {
  name: null,
  registeredAddress: null,
  periodValidity: null,
  remark: null,
  isDelete: null,
  customer: null,
}

const customerBankAccountRules = {
  code: [
    { message: '编码 不能为空', validate: validate.isNotEmpty },
    {
      message: '编码 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
  ],
  account: [
    { message: '账号 不能为空', validate: validate.isNotEmpty },
    {
      message: '账号 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
  ],
  remark: [
    {
      message: '备注 长度不能大于1024',
      validate: validate.validateStringMinimum,
      param: [1024]
    },
  ],
  isDefault: [
  ],
  isDelete: [
  ],
  bankInfoId: [
  ],
}
const customerContactRules = {
  duty: [
    {
      message: '职务 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
  ],
  name: [
    { message: '联系人 不能为空', validate: validate.isNotEmpty },
    {
      message: '联系人 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
  ],
  tel: [
    { message: '电话 不能为空', validate: validate.isNotEmpty },
    {
      message: '电话 长度不能大于24',
      validate: validate.validateStringMinimum,
      param: [24]
    },
  ],
  email: [
    { message: '电子邮件 不能为空', validate: validate.isNotEmpty },
    {
      message: '电子邮件 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
  ],
  phone: [
    { message: '手机号码 不能为空', validate: validate.isNotEmpty },
    {
      message: '手机号码 长度不能大于24',
      validate: validate.validateStringMinimum,
      param: [24]
    },
  ],
  remark: [
    {
      message: '备注 长度不能大于1024',
      validate: validate.validateStringMinimum,
      param: [1024]
    },
  ],
  isDelete: [
  ],
}
const customerBrandRules = {
  name: [
    { message: '品牌名 不能为空', validate: validate.isNotEmpty },
    {
      message: '品牌名 长度不能大于64',
      validate: validate.validateStringMinimum,
      param: [64]
    },
  ],
  registeredAddress: [
    { message: '注册地 不能为空', validate: validate.isNotEmpty },
    {
      message: '注册地 长度不能大于512',
      validate: validate.validateStringMinimum,
      param: [512]
    },
  ],
  periodValidity: [
  ],
  remark: [
    {
      message: '备注 长度不能大于1024',
      validate: validate.validateStringMinimum,
      param: [1024]
    },
  ],
  isDelete: [
  ],
}

let initFormData = {
  ...emptyFormData
}
let initCustomerBankAccounts = []
let initCustomerContacts = []
let initCustomerBrands = []

export default {
  name: 'CustomerSublistEdit',
  components: {
    CurrencySelect,
    BankInfoSelect,
    AreaSelect,
    DepartmentSelect,
    OperateUnitSelect,
    CustomerSelect,
    CustomerStatusEnumSelect,
    CustomerCreditEnumSelect,
    CustomerCategoryEnumSelect,
    CustomerNatureEnumSelect,
    CustomerLevelEnumSelect,
    CustomerAreaLevelEnumSelect,
    CustomerTradeTypeEnumSelect,
    CustomerTypeEnumSelect,
    CustomerBankAccountDeletePopup: () => import('./../../../views/entity-page/customer-bank-account/customerBankAccountDeletePopup.vue'),
    CustomerContactDeletePopup: () => import('./../../../views/entity-page/customer-contact/customerContactDeletePopup.vue'),
    CustomerBrandDeletePopup: () => import('./../../../views/entity-page/customer-brand/customerBrandDeletePopup.vue'),
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
      customerBankAccounts: [],
      customerContacts: [],
      customerBrands: [],
      customerBankAccountsSelection: [],
      showCustomerBankAccountDeletePopup: false,
      customerContactsSelection: [],
      showCustomerContactDeletePopup: false,
      customerBrandsSelection: [],
      showCustomerBrandDeletePopup: false,
      rules: {
        orderNumber: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        createOrderTime: [
        ],
        createOrderMan: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        code: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        simplifyName: [
          { min: 0, max: 32, message: '长度在 0 到 32 个字符', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 512, message: '长度在 0 到 512 个字符', trigger: 'blur' },
        ],
        customerDescribe: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        thoseResponsible: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        credit: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        registerName: [
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' },
        ],
        url: [
          { min: 0, max: 128, message: '长度在 0 到 128 个字符', trigger: 'blur' },
        ],
        registerCapital: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        category: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 24, message: '长度在 0 到 24 个字符', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 32, message: '长度在 0 到 32 个字符', trigger: 'blur' },
        ],
        oaCredit: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        tradeName: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        legalRepresentative: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        bankAccount: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        accessoriesProportion: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        authorizationDocument: [
        ],
        registrationDocument: [
        ],
        nature: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        creditProportion: [
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        level: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        rebateProportion: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { type: 'number', message: '必须为数字', trigger: 'blur' },
        ],
        areaLevel: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        tradeType: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        registeredAddress: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 512, message: '长度在 0 到 512 个字符', trigger: 'blur' },
        ],
        TaxpayerNumber: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '不能为空', trigger: 'blur' },
        ],
        remark: [
          { min: 0, max: 1024, message: '长度在 0 到 1024 个字符', trigger: 'blur' },
        ],
        isDelete: [
        ],
        currencyId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        bankInfoId: [
        ],
        areaId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        departmentId: [
          { required: true, message: '不能为空', trigger: 'change' },
        ],
        operateUnitId: [
        ],
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  watch: {
    id(val) {
      if (val !== this.initFormData.id) {
        this.getData()
      }
    },
    loading(val) {
      this.$emit('loadingChange', val)
    }
  },
  created() {
    if (this.id) {
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
      const res = await customerServer.get(this.id)
      const customerBankAccountRes = await customerBankAccountServer.search({
        query: `customer.id:${this.id}`,
        page: 0,
        size: 999
      })
      const customerContactRes = await customerContactServer.search({
        query: `customer.id:${this.id}`,
        page: 0,
        size: 999
      })
      const customerBrandRes = await customerBrandServer.search({
        query: `customer.id:${this.id}`,
        page: 0,
        size: 999
      })
      initFormData = res.data
      this.formData = {
        ...res.data
      }
      initCustomerBankAccounts = customerBankAccountRes.data
      this.customerBankAccounts = [...initCustomerBankAccounts]
      initCustomerContacts = customerContactRes.data
      this.customerContacts = [...initCustomerContacts]
      initCustomerBrands = customerBrandRes.data
      this.customerBrands = [...initCustomerBrands]
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            const customerBankAccounts = this.customerBankAccounts
            for (let i = 0; i < customerBankAccounts.length; i++) {
              const error = validate.dataObjectValidate(customerBankAccounts[i], customerBankAccountRules)
              if (error) {
                this.$message({
                  message: `客户银行账号 第 ${i + 1} 行 ` + error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            const customerContacts = this.customerContacts
            for (let i = 0; i < customerContacts.length; i++) {
              const error = validate.dataObjectValidate(customerContacts[i], customerContactRules)
              if (error) {
                this.$message({
                  message: `客户联系方式 第 ${i + 1} 行 ` + error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            const customerBrands = this.customerBrands
            for (let i = 0; i < customerBrands.length; i++) {
              const error = validate.dataObjectValidate(customerBrands[i], customerBrandRules)
              if (error) {
                this.$message({
                  message: `客户品牌 第 ${i + 1} 行 ` + error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            try {
              if (this.formData.id) {
                await customerServer.put(this.formData)
              } else {
                const res = await customerServer.post(this.formData)
                this.formData.id = res.data.id
              }
              initFormData = {
                ...this.formData
              }
              for (let i = 0; i < customerBankAccounts.length; i++) {
                const item = customerBankAccounts[i]
                item.customerId = initFormData.id
                if (item.id) {
                  await customerBankAccountServer.put(item)
                } else {
                  await customerBankAccountServer.post(item)
                }
              }
              for (let i = 0; i < customerContacts.length; i++) {
                const item = customerContacts[i]
                item.customerId = initFormData.id
                if (item.id) {
                  await customerContactServer.put(item)
                } else {
                  await customerContactServer.post(item)
                }
              }
              for (let i = 0; i < customerBrands.length; i++) {
                const item = customerBrands[i]
                item.customerId = initFormData.id
                if (item.id) {
                  await customerBrandServer.put(item)
                } else {
                  await customerBrandServer.post(item)
                }
              }
            } catch (e) {
              this.$message({
                message: '保存失败 ' + e.message,
                type: 'error',
                duration: 5000
              })
              reject('error submit!!')
              return
            }
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            resolve({
              ...this.formData
            })
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
        customerServer.delete(this.formData.id).then(() => {
          this.$message({
            message: `删除 ${this.formData.id} 成功`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'CustomerSublistEdit')
        })
      })
    },
    resetData() {
      this.formData = {
        ...initFormData
      }
      this.customerBankAccounts = [...initCustomerBankAccounts]
      this.customerContacts = [...initCustomerContacts]
      this.customerBrands = [...initCustomerBrands]
    },
    clickAddCustomerBankAccount() {
      this.customerBankAccounts.push({
        ...customerBankAccountEmptyData
      })
    },
    selectionChangeCustomerBankAccount(val) {
      this.customerBankAccountsSelection = val
    },
    clickDeleteCustomerBankAccount() {
      if (this.customerBankAccountsSelection.length > 0) {
        this.showCustomerBankAccountDeletePopup = true
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedCustomerBankAccount() {
      this.customerBankAccountsSelection.forEach(item => {
        for (let i = 0; i < this.customerBankAccounts.length; i++) {
          if (this.customerBankAccounts[i] === item) {
            this.customerBankAccounts.splice(i, 1)
            break
          }
        }
      })
      this.customerBankAccountsSelection = []
    },
    clickAddCustomerContact() {
      this.customerContacts.push({
        ...customerContactEmptyData
      })
    },
    selectionChangeCustomerContact(val) {
      this.customerContactsSelection = val
    },
    clickDeleteCustomerContact() {
      if (this.customerContactsSelection.length > 0) {
        this.showCustomerContactDeletePopup = true
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedCustomerContact() {
      this.customerContactsSelection.forEach(item => {
        for (let i = 0; i < this.customerContacts.length; i++) {
          if (this.customerContacts[i] === item) {
            this.customerContacts.splice(i, 1)
            break
          }
        }
      })
      this.customerContactsSelection = []
    },
    clickAddCustomerBrand() {
      this.customerBrands.push({
        ...customerBrandEmptyData
      })
    },
    selectionChangeCustomerBrand(val) {
      this.customerBrandsSelection = val
    },
    clickDeleteCustomerBrand() {
      if (this.customerBrandsSelection.length > 0) {
        this.showCustomerBrandDeletePopup = true
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedCustomerBrand() {
      this.customerBrandsSelection.forEach(item => {
        for (let i = 0; i < this.customerBrands.length; i++) {
          if (this.customerBrands[i] === item) {
            this.customerBrands.splice(i, 1)
            break
          }
        }
      })
      this.customerBrandsSelection = []
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form-item {
    width: 100%;
    margin-right: 0;
  }
  .el-table__body {
    padding-bottom: 12px;
  }
</style>
