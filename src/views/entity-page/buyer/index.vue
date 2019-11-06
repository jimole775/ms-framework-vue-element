<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单号">
            <el-input v-model="keyword.code" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="创建人">
            <el-input v-model="keyword.createMan" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="创建时间起始">
            <el-date-picker
              v-model="keyword.createTimeStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="创建时间结束">
            <el-date-picker
              v-model="keyword.createTimeEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="单据状态">
            <ChangeOrderOrderStatusEnumSelect v-model="keyword.orderStatus" type="multiple" />            
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="地址">
            <el-input v-model="keyword.registerAddress" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="英文名称">
            <el-input v-model="keyword.englishName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="买方简称">
            <el-input v-model="keyword.simplifyName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="联系人">
            <el-input v-model="keyword.contact" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="英文地址">
            <el-input v-model="keyword.englishAddress" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="电话">
            <el-input v-model="keyword.phone" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="中文名称">
            <el-input v-model="keyword.name" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="传真">
            <el-input v-model="keyword.fax" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="中文地址">
            <el-input v-model="keyword.address" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="注册登记号">
            <el-input v-model="keyword.registerCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="CFO">
            <el-input v-model="keyword.cfo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="CEO">
            <el-input v-model="keyword.ceo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="Email">
            <el-input v-model="keyword.email" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="网络地址">
            <el-input v-model="keyword.url" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="法人代表">
            <el-input v-model="keyword.legalPerson" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="年销售额">
            <el-input v-model="keyword.yearSalesAmount" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="成立日期起始">
            <el-date-picker
              v-model="keyword.companyRegisterDateStart"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="成立日期结束">
            <el-date-picker
              v-model="keyword.companyRegisterDateEnd"
              size="mini"
              class="max-w"
              type="datetime"
            />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="资产净值">
            <el-input v-model="keyword.netWorth" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="备注">
            <el-input v-model="keyword.remark" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="驳回原因">
            <el-input v-model="keyword.rejectReason" size="mini" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="销售区域">
            <DepartmentSelect v-model="keyword.salesDepartmentIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="客户">
            <CustomerSelect v-model="keyword.customerIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="所属国家地区">
            <AreaSelect v-model="keyword.countryIds" type="multiple" />
          </el-form-item>
        </el-col>
        <el-col v-show="more" :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="注册区域">
            <AreaSelect v-model="keyword.registerAreaIds" type="multiple" />
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
          v-if="eye.createMan"
          show-overflow-tooltip
          prop="createMan"
          sortable
          label="创建人" />
        <el-table-column
          v-if="eye.createTime"
          show-overflow-tooltip
          prop="createTime"
          sortable
          label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.orderStatus"
          show-overflow-tooltip
          prop="orderStatus"
          sortable
          label="单据状态">
          <template slot-scope="scope">
            {{ scope.row.orderStatus | ChangeOrderOrderStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.registerAddress"
          show-overflow-tooltip
          prop="registerAddress"
          sortable
          label="地址" />
        <el-table-column
          v-if="eye.englishName"
          show-overflow-tooltip
          prop="englishName"
          sortable
          label="英文名称" />
        <el-table-column
          v-if="eye.simplifyName"
          show-overflow-tooltip
          prop="simplifyName"
          sortable
          label="买方简称" />
        <el-table-column
          v-if="eye.contact"
          show-overflow-tooltip
          prop="contact"
          sortable
          label="联系人" />
        <el-table-column
          v-if="eye.englishAddress"
          show-overflow-tooltip
          prop="englishAddress"
          sortable
          label="英文地址" />
        <el-table-column
          v-if="eye.phone"
          show-overflow-tooltip
          prop="phone"
          sortable
          label="电话" />
        <el-table-column
          v-if="eye.name"
          show-overflow-tooltip
          prop="name"
          sortable
          label="中文名称" />
        <el-table-column
          v-if="eye.fax"
          show-overflow-tooltip
          prop="fax"
          sortable
          label="传真" />
        <el-table-column
          v-if="eye.address"
          show-overflow-tooltip
          prop="address"
          sortable
          label="中文地址" />
        <el-table-column
          v-if="eye.registerCode"
          show-overflow-tooltip
          prop="registerCode"
          sortable
          label="注册登记号" />
        <el-table-column
          v-if="eye.cfo"
          show-overflow-tooltip
          prop="cfo"
          sortable
          label="CFO" />
        <el-table-column
          v-if="eye.ceo"
          show-overflow-tooltip
          prop="ceo"
          sortable
          label="CEO" />
        <el-table-column
          v-if="eye.email"
          show-overflow-tooltip
          prop="email"
          sortable
          label="Email" />
        <el-table-column
          v-if="eye.url"
          show-overflow-tooltip
          prop="url"
          sortable
          label="网络地址" />
        <el-table-column
          v-if="eye.legalPerson"
          show-overflow-tooltip
          prop="legalPerson"
          sortable
          label="法人代表" />
        <el-table-column
          v-if="eye.yearSalesAmount"
          show-overflow-tooltip
          prop="yearSalesAmount"
          sortable
          label="年销售额" />
        <el-table-column
          v-if="eye.isGovernment"
          show-overflow-tooltip
          prop="isGovernment"
          sortable
          label="是政府机构">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isGovernment === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.isGovernment }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.companyRegisterDate"
          show-overflow-tooltip
          prop="companyRegisterDate"
          sortable
          label="成立日期">
          <template slot-scope="scope">
            {{ scope.row.companyRegisterDate | parseTime('{y}-{m}-{d} {h}:{i}') }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.netWorth"
          show-overflow-tooltip
          prop="netWorth"
          sortable
          label="资产净值" />
        <el-table-column
          v-if="eye.isListedCompany"
          show-overflow-tooltip
          prop="isListedCompany"
          sortable
          label="是上市公司">
          <template slot-scope="scope">
            <el-tag :type="scope.row.isListedCompany === true ? 'success' : 'danger'" disable-transitions>
              {{ scope.row.isListedCompany }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.remark"
          show-overflow-tooltip
          prop="remark"
          sortable
          label="备注" />
        <el-table-column
          v-if="eye.rejectReason"
          show-overflow-tooltip
          prop="rejectReason"
          sortable
          label="驳回原因" />
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
          v-if="eye.salesDepartmentId"
          show-overflow-tooltip
          prop="salesDepartmentId"
          sortable
          label="销售区域">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openSalesDepartmentViewPopup(scope.row.salesDepartmentId)">{{ scope.row.salesDepartment ? scope.row.salesDepartment.name : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.customerId"
          show-overflow-tooltip
          prop="customerId"
          sortable
          label="客户">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openCustomerViewPopup(scope.row.customerId)">{{ scope.row.customer ? scope.row.customer.name : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.countryId"
          show-overflow-tooltip
          prop="countryId"
          sortable
          label="所属国家地区">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openCountryViewPopup(scope.row.countryId)">{{ scope.row.country ? scope.row.country.name : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.registerAreaId"
          show-overflow-tooltip
          prop="registerAreaId"
          sortable
          label="注册区域">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openRegisterAreaViewPopup(scope.row.registerAreaId)">{{ scope.row.registerArea ? scope.row.registerArea.name : '' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="eye.departmentId"
          show-overflow-tooltip
          prop="departmentId"
          sortable
          label="经营单位">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="openDepartmentViewPopup(scope.row.departmentId)">{{ scope.row.department ? scope.row.department.name : '' }}</el-button>
          </template>
        </el-table-column>
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
            <el-checkbox v-model="eye.createMan">创建人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.createTime">创建时间</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.orderStatus">单据状态</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.registerAddress">地址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.englishName">英文名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.simplifyName">买方简称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.contact">联系人</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.englishAddress">英文地址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.phone">电话</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.name">中文名称</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.fax">传真</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.address">中文地址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.registerCode">注册登记号</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.cfo">CFO</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.ceo">CEO</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.email">Email</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.url">网络地址</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.legalPerson">法人代表</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.yearSalesAmount">年销售额</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isGovernment">是政府机构</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.companyRegisterDate">成立日期</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.netWorth">资产净值</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isListedCompany">是上市公司</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.remark">备注</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.rejectReason">驳回原因</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.isDelete">是否删除</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.salesDepartmentId">salesDepartmentId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.customerId">customerId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.countryId">countryId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.registerAreaId">registerAreaId</el-checkbox>
          </el-col>
          <el-col :span="24">
            <el-checkbox v-model="eye.departmentId">departmentId</el-checkbox>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
    <component
      v-if="showViewPopup"
      :is="'BuyerViewPopup'"
      :id="currentClickRow.id"
      @close="showViewPopup = false"
    />
    <component
      v-if="showEditPopup"
      :is="'BuyerEditPopup'"
      :id="currentClickRow.id"
      @close="showEditPopup = false"
      @update="update"
    />
    <component
      v-if="showDeletePopup"
      :is="'BuyerDeletePopup'"
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
      v-if="showSalesDepartmentViewPopup"
      :is="'DepartmentViewPopup'"
      :id="salesDepartmentId"
      @close="showSalesDepartmentViewPopup = false"
    />
    <component
      v-if="showCustomerViewPopup"
      :is="'CustomerViewPopup'"
      :id="customerId"
      @close="showCustomerViewPopup = false"
    />
    <component
      v-if="showCountryViewPopup"
      :is="'AreaViewPopup'"
      :id="countryId"
      @close="showCountryViewPopup = false"
    />
    <component
      v-if="showRegisterAreaViewPopup"
      :is="'AreaViewPopup'"
      :id="registerAreaId"
      @close="showRegisterAreaViewPopup = false"
    />
    <component
      v-if="showDepartmentViewPopup"
      :is="'DepartmentViewPopup'"
      :id="departmentId"
      @close="showDepartmentViewPopup = false"
    />
  </div>
</template>

<script>
import Validate from './../../../utils/validate.js'
import Datetime from './../../../utils/datetime'
import DepartmentSelect from './../../../components/entity/department/DepartmentSelect'
import CustomerSelect from './../../../components/entity/customer/CustomerSelect'
import AreaSelect from './../../../components/entity/area/AreaSelect'
import ChangeOrderOrderStatusEnumSelect from './../../../components/entity/buyer/ChangeOrderOrderStatusEnumSelect'
import ChangeOrderOrderStatusEnumUtil from './../../../components/enum/buyer/ChangeOrderOrderStatusEnumUtil'
import buyerServer from './../../../api/buyerServer'
const initSearchParams = {
  code: null,
  createMan: null,
  createTimeStart: null,
  createTimeEnd: null,
  orderStatus: null,
  registerAddress: null,
  englishName: null,
  simplifyName: null,
  contact: null,
  englishAddress: null,
  phone: null,
  name: null,
  fax: null,
  address: null,
  registerCode: null,
  cfo: null,
  ceo: null,
  email: null,
  url: null,
  legalPerson: null,
  yearSalesAmount: null,
  isGovernment: null,
  companyRegisterDateStart: null,
  companyRegisterDateEnd: null,
  netWorth: null,
  isListedCompany: null,
  remark: null,
  rejectReason: null,
  isDelete: null,
  salesDepartmentIds: [],
  customerIds: [],
  countryIds: [],
  registerAreaIds: [],
  departmentIds: [],
}
const initExport = {
  code: '单号',
  createMan: '创建人',
  createTime: '创建时间',
  orderStatus: '单据状态',
  registerAddress: '地址',
  englishName: '英文名称',
  simplifyName: '买方简称',
  contact: '联系人',
  englishAddress: '英文地址',
  phone: '电话',
  name: '中文名称',
  fax: '传真',
  address: '中文地址',
  registerCode: '注册登记号',
  cfo: 'CFO',
  ceo: 'CEO',
  email: 'Email',
  url: '网络地址',
  legalPerson: '法人代表',
  yearSalesAmount: '年销售额',
  isGovernment: '是政府机构',
  companyRegisterDate: '成立日期',
  netWorth: '资产净值',
  isListedCompany: '是上市公司',
  remark: '备注',
  rejectReason: '驳回原因',
  isDelete: '是否删除',
  salesDepartment: '销售区域',
  customer: '客户',
  country: '所属国家地区',
  registerArea: '注册区域',
  department: '经营单位',
}
export default {
  name: 'BuyerManagement',
  components: {
    ExportPopup: () => import('./../../../components/excel/ExportPopup.vue'),
    DepartmentSelect,
    DepartmentViewPopup: () => import('./../department/departmentViewPopup'),
    CustomerSelect,
    CustomerViewPopup: () => import('./../customer/customerViewPopup'),
    AreaSelect,
    AreaViewPopup: () => import('./../area/areaViewPopup'),
    ChangeOrderOrderStatusEnumSelect,
    BuyerViewPopup: () => import('./buyerViewPopup.vue'),
    BuyerEditPopup: () => import('./buyerEditPopup.vue'),
    BuyerDeletePopup: () => import('./buyerDeletePopup.vue')
  },
  filters: {
    ChangeOrderOrderStatusFilter: ChangeOrderOrderStatusEnumUtil.toTitleFilter,
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
      showSalesDepartmentViewPopup: false,
      salesDepartmentId: null,
      showCustomerViewPopup: false,
      customerId: null,
      showCountryViewPopup: false,
      countryId: null,
      showRegisterAreaViewPopup: false,
      registerAreaId: null,
      showDepartmentViewPopup: false,
      departmentId: null,
      more: false,
      eye: {
        code: true,
        createMan: true,
        createTime: true,
        orderStatus: true,
        registerAddress: true,
        englishName: true,
        simplifyName: true,
        contact: true,
        englishAddress: true,
        phone: true,
        name: true,
        fax: true,
        address: true,
        registerCode: true,
        cfo: true,
        ceo: true,
        email: true,
        url: true,
        legalPerson: true,
        yearSalesAmount: true,
        isGovernment: true,
        companyRegisterDate: true,
        netWorth: true,
        isListedCompany: true,
        remark: true,
        rejectReason: true,
        isDelete: true,
        salesDepartmentId: true,
        customerId: true,
        countryId: true,
        registerAreaId: true,
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
      if (Validate.isNotEmpty(keyword.createMan)) {
        query += ` AND createMan:${keyword.createMan}`
      }
      if (keyword.createTimeStart) {
        query += ` AND createTime:[${Datetime.dateToDateStr(keyword.createTimeStart)} TO *]`
      }
      if (keyword.createTimeEnd) {
        query += ` AND createTime:[* TO ${Datetime.dateToDateStr(keyword.createTimeEnd)}]`
      }
      if (keyword.orderStatus && keyword.orderStatus.length > 0) {
        query += ' AND ('
        keyword.orderStatus.forEach((str, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `orderStatus:${str}`
        })
        query += ')'
      }
      if (Validate.isNotEmpty(keyword.registerAddress)) {
        query += ` AND registerAddress:${keyword.registerAddress}`
      }
      if (Validate.isNotEmpty(keyword.englishName)) {
        query += ` AND englishName:${keyword.englishName}`
      }
      if (Validate.isNotEmpty(keyword.simplifyName)) {
        query += ` AND simplifyName:${keyword.simplifyName}`
      }
      if (Validate.isNotEmpty(keyword.contact)) {
        query += ` AND contact:${keyword.contact}`
      }
      if (Validate.isNotEmpty(keyword.englishAddress)) {
        query += ` AND englishAddress:${keyword.englishAddress}`
      }
      if (Validate.isNotEmpty(keyword.phone)) {
        query += ` AND phone:${keyword.phone}`
      }
      if (Validate.isNotEmpty(keyword.name)) {
        query += ` AND name:${keyword.name}`
      }
      if (Validate.isNotEmpty(keyword.fax)) {
        query += ` AND fax:${keyword.fax}`
      }
      if (Validate.isNotEmpty(keyword.address)) {
        query += ` AND address:${keyword.address}`
      }
      if (Validate.isNotEmpty(keyword.registerCode)) {
        query += ` AND registerCode:${keyword.registerCode}`
      }
      if (Validate.isNotEmpty(keyword.cfo)) {
        query += ` AND cfo:${keyword.cfo}`
      }
      if (Validate.isNotEmpty(keyword.ceo)) {
        query += ` AND ceo:${keyword.ceo}`
      }
      if (Validate.isNotEmpty(keyword.email)) {
        query += ` AND email:${keyword.email}`
      }
      if (Validate.isNotEmpty(keyword.url)) {
        query += ` AND url:${keyword.url}`
      }
      if (Validate.isNotEmpty(keyword.legalPerson)) {
        query += ` AND legalPerson:${keyword.legalPerson}`
      }
      if (Validate.isNotEmpty(keyword.yearSalesAmount)) {
        query += ` AND yearSalesAmount:${keyword.yearSalesAmount}`
      }
      if (keyword.companyRegisterDateStart) {
        query += ` AND companyRegisterDate:[${Datetime.dateToDateStr(keyword.companyRegisterDateStart)} TO *]`
      }
      if (keyword.companyRegisterDateEnd) {
        query += ` AND companyRegisterDate:[* TO ${Datetime.dateToDateStr(keyword.companyRegisterDateEnd)}]`
      }
      if (Validate.isNotEmpty(keyword.netWorth)) {
        query += ` AND netWorth:${keyword.netWorth}`
      }
      if (Validate.isNotEmpty(keyword.remark)) {
        query += ` AND remark:${keyword.remark}`
      }
      if (Validate.isNotEmpty(keyword.rejectReason)) {
        query += ` AND rejectReason:${keyword.rejectReason}`
      }
      if (keyword.salesDepartmentIds && keyword.salesDepartmentIds.length > 0) {
        query += ' AND ('
        keyword.salesDepartmentIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `salesDepartment.id:${id}`
        })
        query += ')'
      }
      if (keyword.customerIds && keyword.customerIds.length > 0) {
        query += ' AND ('
        keyword.customerIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `customer.id:${id}`
        })
        query += ')'
      }
      if (keyword.countryIds && keyword.countryIds.length > 0) {
        query += ' AND ('
        keyword.countryIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `country.id:${id}`
        })
        query += ')'
      }
      if (keyword.registerAreaIds && keyword.registerAreaIds.length > 0) {
        query += ' AND ('
        keyword.registerAreaIds.forEach((id, index) => {
          if (index > 0) {
            query += ' OR '
          }
          query += `registerArea.id:${id}`
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
      const res = await buyerServer.search({
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
    openSalesDepartmentViewPopup(id) {
      this.salesDepartmentId = id
      this.showSalesDepartmentViewPopup = true
    },
    openCustomerViewPopup(id) {
      this.customerId = id
      this.showCustomerViewPopup = true
    },
    openCountryViewPopup(id) {
      this.countryId = id
      this.showCountryViewPopup = true
    },
    openRegisterAreaViewPopup(id) {
      this.registerAreaId = id
      this.showRegisterAreaViewPopup = true
    },
    openDepartmentViewPopup(id) {
      this.departmentId = id
      this.showDepartmentViewPopup = true
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
