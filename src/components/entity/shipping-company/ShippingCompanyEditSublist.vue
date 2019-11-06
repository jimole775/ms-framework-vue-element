<template>
  <div class="max-w back">
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
            <el-form-item label="公司编码" prop="code">
              <el-input v-model="formData.code" :disabled="disEditable" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="公司名称" prop="name">
              <el-input v-model="formData.name" :disabled="disEditable" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="公司简称" prop="simplifyName">
              <el-input v-model="formData.simplifyName" :disabled="disEditable" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="状态" prop="shippingCompanyStatus">
              <ShippingCompanyStatusEnumSelect
                v-model="formData.shippingCompanyStatus"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="类型" prop="shippingCompanyType">
              <ShippingCompanyTypeEnumSelect v-model="formData.shippingCompanyType" :disabled="disEditable"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item
              v-if="formData.shippingCompanyType === 1 || formData.shippingCompanyType === null"
              label="货代类型"
              prop="shippingCompanyProxyType"
            >
              <ShippingCompanyProxyTypeEnumSelect v-model="formData.shippingCompanyProxyType" :disabled="disEditable" @changeData="copChange"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="报关行" prop="customsLine">
              <el-input v-model="formData.customsLine" :disabled="disEditable" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="资格证书号" prop="certificateCode">
              <el-input v-model="formData.certificateCode" :disabled="disEditable" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="账户名" prop="accountName">
              <el-input v-model="formData.accountName" :disabled="disEditable" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="账户号" prop="account">
              <el-input v-model="formData.account" :disabled="disEditable" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="证书到期" prop="certificateValidityTime">
              <el-date-picker
                v-model="formData.certificateValidityTime"
                :disabled="disEditable" 
                size="mini"
                class="max-w"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="地址" prop="address">
              <el-input v-model="formData.address" :disabled="disEditable" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="电子邮件" prop="email">
              <el-input v-model="formData.email" :disabled="disEditable" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="formData.remark" :disabled="disEditable" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="经营单位" prop="entid">
              <OperateUnitSelect v-model="formData.entid" :disabled="disEditable"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="关联用户" prop="userSuplierList">
              <PersonCodeSelect v-model="formData.userSuplierList" :disabled="disEditable"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="列入黑名单" prop="blacklist">
              <el-switch 
                v-model="formData.blacklist" 
                :disabled="!(checkPermission(['ROLE_QT_ZUZHANG']) || checkPermission(['ROLE_QT_KEZHANG']) || checkPermission(['ROLE_SHIPING_CHARGE']))" 
                size="mini" 
                @change="changeBlackList"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="是否有效" prop="usable">
              <el-switch v-model="formData.usable" :disabled="disEditable" size="mini" @change="changeUsable"/>
            </el-form-item>
          </el-col>
          <el-col v-show="formData.blacklist === true" :xs="24">
            <el-form-item label="拉黑原因" prop="blackCause">
              <el-input v-model="formData.blackCause" :disabled="disEditable" type="textarea" size="mini" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-tabs type="border-card" @tab-click="tabClick">
        <el-tab-pane label="联系方式">
          <el-row>
            <el-button              
              :disabled="disEditable"
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="clickAddShippingCompanyContact"
            />
            <el-button              
              :disabled="disEditable"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="clickDeleteShippingCompanyContact"
            />
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${shippingCompanyContactsSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="shippingCompanyContacts"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeShippingCompanyContact"
          >
            <el-table-column type="selection"/>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop="name" sortable min-width="105" label="* 联系人">
              <template slot-scope="scope">
                <el-input v-model="scope.row.name" :disabled="disEditable" maxlength="64" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column
              prop="type"
              sortable
              min-width="115"
              label="* 联系人类型"
            >
              <template slot-scope="scope">
                <LinkTypeSelect
                  v-model="scope.row.type"
                />
              </template>
            </el-table-column>
            <el-table-column prop="phone" sortable min-width="80" label="电话">
              <template slot-scope="scope">
                <el-input v-model="scope.row.phone" :disabled="disEditable" maxlength="24" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="fax" sortable min-width="80" label="传真">
              <template slot-scope="scope">
                <el-input v-model="scope.row.fax" :disabled="disEditable" maxlength="32" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="email" sortable min-width="80" label="* 邮箱">
              <template slot-scope="scope">
                <el-input v-model="scope.row.email" :disabled="disEditable" maxlength="128" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column prop="isDefault" sortable min-width="120" label="是否默认">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.isDefault"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  size="mini"
                  @change="changeDefault(scope.$index)"
                />
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="按柜费用">
          <el-row>
            <el-button              
              :disabled="disEditable"
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="clickAddShippingCompanyBoxLine"
            />
            <el-button              
              :disabled="disEditable"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="clickDeleteShippingCompanyBoxLine"
            />
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${shippingCompanyBoxLineSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="shippingCompanyBoxLine"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeShippingCompanyBoxLine"
          >
            <el-table-column type="selection"/>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop="shippingCompanyProxyType" sortable min-width="115" label="货代类型">
              <template slot-scope="scope">
                <ShippingCompanyProxyTypeEnumSelect
                  v-model="scope.row.shippingCompanyProxyType"
                  :disabled="true"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="freightStandardContainerCostDetail"
              sortable
              min-width="115"
              label="* 费用明细"
            >
              <template slot-scope="scope">
                <CostProjectSelect
                  v-model="scope.row.freightStandardTicketCostDetail"
                  :from="1"
                  :index="scope.$index"
                  :search="1"
                  @changeData="changeCostDetailBox"
                />
              </template>
            </el-table-column>
            <el-table-column prop="normFee" sortable min-width="165" label="费用标准"/>
            <!-- <el-table-column prop="startTime" sortable min-width="165" label="有效期开始时间">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.startTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  size="mini"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </template>
            </el-table-column>
            <el-table-column prop="endTime" sortable min-width="165" label="有效期结束时间">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.endTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  size="mini"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </template>
            </el-table-column>-->
            <el-table-column prop="specGp20" sortable min-width="145" label="20GP">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.specGp20"
                  :disabled="disEditable"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="specGp40" sortable min-width="145" label="40GP">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.specGp40"
                  :disabled="disEditable"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="specHq40" sortable min-width="145" label="40HQ">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.specHq40"
                  :disabled="disEditable"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column prop="specHq45" sortable min-width="145" label="45HQ">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.specHq45"
                  :disabled="disEditable"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <!-- <el-table-column
              prop="mergeContainer"
              sortable
              min-width="145"
              label="拼箱">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.mergeContainer"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="airTransportation"
              sortable
              min-width="145"
              label="空运">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.airTransportation"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="oneContainer"
              sortable
              min-width="145"
              label="一卡一车">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.oneContainer"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="towContainer"
              sortable
              min-width="145"
              label="两卡一车">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.towContainer"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="threeContainer"
              sortable
              min-width="145"
              label="三卡一车">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.threeContainer"
                  :precision="2"
                  :step="0.1"
                  size="mini"
                />
              </template>
            </el-table-column>-->
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="按票费用">
          <el-row>
            <el-button              
              :disabled="disEditable"
              type="primary"
              icon="el-icon-plus"
              circle
              size="mini"
              @click="clickAddShippingCompanyDocLine"
            />
            <el-button              
              :disabled="disEditable"
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="clickDeleteShippingCompanyDocLine"
            />
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${shippingCompanyDocLineSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="shippingCompanyDocLine"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeShippingCompanyDocLine"
          >
            <el-table-column type="selection"/>
            <el-table-column type="index" label="序号" width="50"/>
            <el-table-column prop="shippingCompanyProxyType" sortable min-width="115" label="货代类型">
              <template slot-scope="scope">
                <ShippingCompanyProxyTypeEnumSelect
                  v-model="scope.row.shippingCompanyProxyType"
                  :disabled="true"
                />
              </template>
            </el-table-column>
            <el-table-column
              prop="freightStandardTicketCostDetail"
              sortable
              min-width="115"
              label="* 费用明细"
            >
              <template slot-scope="scope">
                <CostProjectSelect
                  v-model="scope.row.freightStandardTicketCostDetail"
                  :from="2"
                  :index="scope.$index"
                  :search="1"
                  @changeData="changeCostDetailDoc"
                />
              </template>
            </el-table-column>
            <el-table-column prop="normFee" sortable min-width="165" label="费用标准"/>
            <!-- <el-table-column prop="startTime" sortable min-width="165" label="有效期开始时间">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.startTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  size="mini"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </template>
            </el-table-column>
            <el-table-column prop="endTime" sortable min-width="165" label="有效期结束时间">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.endTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  size="mini"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </template>
            </el-table-column>-->
            <el-table-column prop="price" sortable min-width="145" label="金额">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.price" :disabled="disEditable" :precision="2" :step="0.1" size="mini"/>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <FileUpload :id="id" :bill-name="'船公司及货代公司'"/>
    </div>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission' // 权限判断函数
import shippingCompanyServer from './../../../api/shippingCompanyServer'
import validate from './../../../utils/validate'
import ContainerSelect from './../container/ContainerSelect'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import PersonCodeSelect from './../person/PersonCodeSelect'
import CostProjectSelect from './../cost-project/CostProjectSelect'
import ShippingCompanyStatusEnumSelect from './../../../components/entity/shipping-company/ShippingCompanyStatusEnumSelect'
import LinkTypeSelect from './../../../components/entity/shipping-company/LinkTypeSelect'
import ShippingCompanyTypeEnumSelect from './../../../components/entity/shipping-company/ShippingCompanyTypeEnumSelect'
import ShippingCompanyProxyTypeEnumSelect from './../../../components/entity/shipping-company/ShippingCompanyProxyTypeEnumSelect'
import costProjectServer from './../../../api/costProjectServer'
const emptyFormData = {
  code: null,
  name: null,
  simplifyName: null,
  shippingCompanyStatus: 1,
  shippingCompanyType: null,
  shippingCompanyProxyType: null,
  customsLine: null,
  certificateCode: null,
  entid: null,
  userSuplierList: null,
  accountName: null,
  account: null,
  certificateValidityTime: null,
  address: null,
  remark: null,
  email: null,
  blacklist: false,
  usable: true
}
const shippingCompanyContactEmptyData = {
  supplierLineId: null,
  name: null,
  phone: null,
  fax: null,
  email: null,
  type: null,
  isDefault: null,
  shippingCompany: null
}
const shippingCompanyBoxLineEmptyData = {
  boxLineId: null,
  shippingCompanyProxyType: null,
  freightStandardContainerCostDetail: null,
  normFee: null,
  startTime: null,
  endTime: null,
  specGp20: null,
  specGp40: null,
  specHq40: null,
  specHq45: null,
  mergeContainer: null,
  airTransportation: null,
  oneContainer: null,
  towContainer: null,
  threeContainer: null
}
const shippingCompanyDocLineEmptyData = {
  docLineId: null,
  shippingCompanyProxyType: null,
  freightStandardTicketCostDetail: null,
  normFee: null,
  startTime: null,
  endTime: null,
  price: null
}

const shippingCompanyContactRules = {
  name: [
    { message: '联系人 不能为空', validate: validate.isNotEmpty },
    {
      message: '联系人 长度不能大于64',
      validate: validate.validateStringMaximum,
      param: [64]
    }
  ],
  type: [
    { message: '联系人类型 不能为空', validate: validate.isNotEmpty },
  ],
  phone: [],
  fax: [],
  email: [
  { message: '邮箱 不能为空', validate: validate.isNotEmpty }]
}
const shippingCompanyBoxLineRules = {
  shippingCompanyProxyType: [],
  freightStandardTicketCostDetail: [
    { message: '费用明细 不能为空', validate: validate.isNotEmpty }
  ],
  startTime: [],
  endTime: [],
  specGp20: [
    { message: '20GP 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  specGp40: [
    { message: '40GP 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  specHq40: [
    { message: '40HQ 必须为数字', validate: validate.isNumberOrEmpty }
  ],
  specHq45: [{ message: '45HQ 必须为数字', validate: validate.isNumberOrEmpty }]
  // mergeContainer: [
  //   { message: '拼箱 必须为数字', validate: validate.isNumberOrEmpty },
  // ],
  // airTransportation: [
  //   { message: '空运 必须为数字', validate: validate.isNumberOrEmpty },
  // ],
  // oneContainer: [
  //   { message: '一卡一车 必须为数字', validate: validate.isNumberOrEmpty },
  // ],
  // towContainer: [
  //   { message: '两卡一车 必须为数字', validate: validate.isNumberOrEmpty },
  // ],
  // threeContainer: [
  //   { message: '三卡一车 必须为数字', validate: validate.isNumberOrEmpty },
  // ],
}
const shippingCompanyDocLineRules = {
  shippingCompanyProxyType: [],
  freightStandardTicketCostDetail: [
    { message: '费用明细 不能为空', validate: validate.isNotEmpty }
  ],
  startTime: [],
  endTime: [],
  price: [{ message: '金额 必须为数字', validate: validate.isNumberOrEmpty }]
}

let initFormData = {
  ...emptyFormData
}
let initShippingCompanyContacts = []
let initShippingCompanyBoxLine = []
let initShippingCompanyDocLine = []

export default {
  name: 'ShippingCompanySublistEdit',
  components: {
    ContainerSelect,
    CostProjectSelect,
    OperateUnitSelect,
    PersonCodeSelect,
    ShippingCompanyStatusEnumSelect,
    ShippingCompanyTypeEnumSelect,
    LinkTypeSelect,
    ShippingCompanyProxyTypeEnumSelect
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      disEditable: false, // 到审批节点，所有的输入框都禁止操作
      loading: false,
      formData: {
        ...initFormData
      },
      boxDefaultLines: [],
      docDefaultLines: [],
      shippingCompanyContacts: [],
      shippingCompanyBoxLine: [],
      shippingCompanyDocLine: [],
      shippingCompanyContactsSelection: [],
      shippingCompanyBoxLineSelection: [],
      shippingCompanyDocLineSelection: [],
      rules: {
        code: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        simplifyName: [
        ],
        shippingCompanyStatus: [],
        customsLine: [],
        shippingCompanyType: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        shippingCompanyProxyType: [],
        certificateCode: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        entid: [{ required: true, message: '不能为空', trigger: 'blur' }],
        userSuplierList: [],
        accountName: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        account: [
          { min: 0, max: 64, message: '长度在 0 到 64 个字符', trigger: 'blur' }
        ],
        certificateValidityTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        address: [
          {
            min: 0,
            max: 256,
            message: '长度在 0 到 256 个字符',
            trigger: 'blur'
          }
        ],
        remark: [
          {
            min: 0,
            max: 1024,
            message: '长度在 0 到 1024 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          {
            trigger: 'blur',
            // message: '开船日期必须大于等于预计货好日期',
            validator: (rule, value, callback) => {
              if (this.formData.email) {
                const isEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i.test(this.formData.email)
                if (isEmail === false) {
                  return callback(new Error('请输入正确的邮箱信息'))
                }
              } 
              callback()
            }
          }  
        ],
        blacklist: []
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
  // activated() {
  //   if (!this.id) {
  //     this.formData = {
  //       ...emptyFormData
  //     }
  //   }
  // },
  async created() {
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
    const data1 = {
      keyword: {
        costProjectProjectType: 1,
        isDefault: 1,
      },
      page: 0,
      size: 99
    }
    const res1 = await costProjectServer.search(data1)
    this.boxDefaultLines = res1.rows
    const data2 = {
      keyword: {
        costProjectProjectType: 2,
        isDefault: 1,
      },
      page: 0,
      size: 99
    }
    const res2 = await costProjectServer.search(data2)
    this.docDefaultLines = res2.rows
  },
  methods: {
    copChange(val) {
      // 协议货代 就清空默认的货代公司
      if (val === 1) {
        // temp 属性来确定货代数据是否有保存
        if (this.shippingCompanyBoxLine[0] && this.shippingCompanyBoxLine[0].temp) {
          this.shippingCompanyBoxLine = []
        }
        if (this.shippingCompanyDocLine[0] && this.shippingCompanyDocLine[0].temp) {
          this.shippingCompanyDocLine = []
        }
      } else {
        // 指定货代 就添加默认货代公司
        if (this.shippingCompanyBoxLine.length === 0) this.tabClick({ index: '1' })
        if (this.shippingCompanyDocLine.length === 0) this.tabClick({ index: '2' })
      }
      
      if (this.shippingCompanyBoxLine.length) {
        this.shippingCompanyBoxLine.forEach((item) => {
          item.shippingCompanyProxyType = this.formData.shippingCompanyProxyType
        })
      }
      if (this.shippingCompanyDocLine.length) {
        this.shippingCompanyDocLine.forEach((item) => {
          item.shippingCompanyProxyType = this.formData.shippingCompanyProxyType
        })
      }      
    },
    tabClick(tabObj) {
      // 如果shippingCompanyBoxLine没有数据，就拉取 【按柜费用】 isDefault 为 1 的数据
      if (tabObj.index === '1' && this.shippingCompanyBoxLine.length === 0 && this.formData.shippingCompanyProxyType === 2) {
        if (this.boxDefaultLines.length) {
          this.boxDefaultLines.forEach((item, index) => {
            this.clickAddShippingCompanyBoxLine()
            this.shippingCompanyBoxLine[index].normFee = item.normFee
            this.shippingCompanyBoxLine[index].orderFeeId = item.orderFeeId
            this.shippingCompanyBoxLine[index].freightStandardTicketCostDetail = item.orderFeeId
            this.shippingCompanyBoxLine[index].temp = true
            this.shippingCompanyBoxLine.forEach((item, index) => {
              this.$set(this.shippingCompanyBoxLine, index, item)
            })
          })
        }
      } 

      // 如果shippingCompanyDocLine没有数据，就拉取 【按票费用】 isDefault 为 1 的数据
      if (tabObj.index === '2' && this.shippingCompanyDocLine.length === 0 && this.formData.shippingCompanyProxyType === 2) {
        if (this.docDefaultLines.length) {
          this.docDefaultLines.forEach((item, index) => {
            this.clickAddShippingCompanyDocLine()
            this.shippingCompanyDocLine[index].normFee = item.normFee
            this.shippingCompanyDocLine[index].orderFeeId = item.orderFeeId
            this.shippingCompanyDocLine[index].freightStandardTicketCostDetail = item.orderFeeId
            this.shippingCompanyDocLine[index].temp = true
            this.shippingCompanyDocLine.forEach((item, index) => {
              this.$set(this.shippingCompanyDocLine, index, item)
            })
          })
        }
      }
    },
    checkPermission,
    changeBlackList() {
      if (this.formData.blacklist === true) {
        this.formData.usable = false
        this.rules.blackCause = [{
          required: true,
          message: '不能为空',
          trigger: 'blur',
        }, { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }]
      } else {
        this.rules.blackCause = [{}]
      }
    },
    changeUsable() {
      if (this.formData.usable === true) {
        this.formData.blacklist = false
      }
    },
    changeCostDetailBox(res) {
      if (res) {
        this.shippingCompanyBoxLine[res.$index].normFee = res.normFee
        this.shippingCompanyBoxLine[res.$index].orderFeeId = res.orderFeeId
        this.shippingCompanyBoxLine.forEach((item, index) => {
          this.$set(this.shippingCompanyBoxLine, index, item)
        })
      }
    },
    changeCostDetailDoc(res) {
      if (res) {
        this.shippingCompanyDocLine[res.$index].normFee = res.normFee
        this.shippingCompanyDocLine[res.$index].orderFeeId = res.orderFeeId
        this.shippingCompanyDocLine.forEach((item, index) => {
          this.$set(this.shippingCompanyDocLine, index, item)
        })
      }
    },
    close() {
      this.$emit('close')
    },
    changeDefault(index) {
      if (this.shippingCompanyContacts[index].isDefault) {
        this.shippingCompanyContacts.forEach((item, i) => {
          if (i !== index) {
            item.isDefault = false
          }
          this.$set(this.shippingCompanyContacts, i, item)
        })
      }
    },
    async getData() {
      this.loading = true
      const res = await shippingCompanyServer.get(this.formData.id)
      initFormData = res.data
      this.formData = {
        ...res.data
      }
      this.formData.id = res.data.supplierId 
      if (this.formData.shippingCompanyStatus === 5 && (checkPermission(['ROLE_SHIPING_CHARGE']) || checkPermission(['ROLE_QT_ZUZHANG']) || checkPermission(['ROLE_QT_KEZHANG']))) {
        this.$emit('showSaveBtn')
      }
      initShippingCompanyContacts = res.data.supplierInis
      this.shippingCompanyContacts = [...initShippingCompanyContacts]
      initShippingCompanyBoxLine = res.data.boxLine
      this.shippingCompanyBoxLine = [...initShippingCompanyBoxLine]
      initShippingCompanyDocLine = res.data.docLine
      this.shippingCompanyDocLine = [...initShippingCompanyDocLine]
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            const shippingCompanyContacts = this.shippingCompanyContacts
            for (let i = 0; i < shippingCompanyContacts.length; i++) {
              const error = validate.dataObjectValidate(
                shippingCompanyContacts[i],
                shippingCompanyContactRules
              )
              if (error) {
                this.$message({
                  message:
                    `联系方式 第 ${i + 1} 行 ` +
                    error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
              if (shippingCompanyContacts[i].email) {
                const isEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i.test(shippingCompanyContacts[i].email)
                if (isEmail === false) {
                  this.$message({
                    message:
                      `联系方式 第 ${i + 1} 行 ` + '邮箱格式错误！',
                    type: 'warning',
                    duration: 5000
                  })
                  reject('error submit!!')
                  return
                }
              }
              if (shippingCompanyContacts[i].phone) {
                const isPhone = /^1[3456789]\d{9}$/.test(shippingCompanyContacts[i].phone)
                const isHomePhone = /^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/.test(shippingCompanyContacts[i].phone)
                if (isPhone === false && isHomePhone === false) {
                  this.$message({
                    message:
                      `联系方式 第 ${i + 1} 行 ` + '手机号或座机号格式错误！',
                    type: 'warning',
                    duration: 5000
                  })
                  reject('error submit!!')
                  return
                }
              }
            }
            
            const shippingCompanyBoxLine = this.shippingCompanyBoxLine
            for (let i = 0; i < shippingCompanyBoxLine.length; i++) {
              const error = validate.dataObjectValidate(
                shippingCompanyBoxLine[i],
                shippingCompanyBoxLineRules
              )
              if (error) {
                this.$message({
                  message:
                    `按柜费用 第 ${i + 1} 行 ` +
                    error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            const shippingCompanyDocLine = this.shippingCompanyDocLine
            for (let i = 0; i < shippingCompanyDocLine.length; i++) {
              const error = validate.dataObjectValidate(
                shippingCompanyDocLine[i],
                shippingCompanyDocLineRules
              )
              if (error) {
                this.$message({
                  message:
                    `按票费用 第 ${i + 1} 行 ` +
                    error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            this.formData.supplierInis = shippingCompanyContacts
            this.formData.boxLine = shippingCompanyBoxLine
            this.formData.docLine = shippingCompanyDocLine
            if (this.formData.id) {
              await shippingCompanyServer.put(this.formData)
              this.getData()
            } else {
              const res = await shippingCompanyServer.post(this.formData)
              if (Number.parseInt(res.data.code) === 200) {
                // 新增保存成功后清空表单数据
                this.formData = { ...emptyFormData }
              }
              this.formData.id = res.data.data
              this.getData()
            }
            initFormData = {
              ...this.formData
            }
            this.$emit('emitEvent', {
              key: 'update',
              params: {
                id: this.formData.id
              }
            })
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
        shippingCompanyServer.delete(this.formData.id).then(() => {
          this.$message({
            message: `删除 ${this.formData.id} 成功`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'ShippingCompanySublistEdit')
        })
      })
    },
    resetData() {
      if (this.id) {
        this.formData = {
          ...initFormData
        }
        this.shippingCompanyContacts = []
        this.shippingCompanyBoxLine = []
        this.shippingCompanyDocLine = []
        this.getData()
      } else {
        this.formData = {
          ...initFormData
        }
        this.shippingCompanyContacts = []
        this.shippingCompanyBoxLine = []
        this.shippingCompanyDocLine = []
      }
    },
    clickAddShippingCompanyContact() {
      this.shippingCompanyContacts.push({
        $index: this.shippingCompanyContacts.length,
        ...shippingCompanyContactEmptyData
      })
    },
    selectionChangeShippingCompanyContact(val) {
      this.shippingCompanyContactsSelection = val
    },
    clickDeleteShippingCompanyContact() {
      if (this.shippingCompanyContactsSelection.length > 0) {
        // 删除提示
        this.$confirm('确定要删除选中数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const deleteIds = []
          const indexList = []
          this.shippingCompanyContactsSelection.forEach(item => {
            indexList.push(item.$index)
            if (item.supplierLineId) {
              deleteIds.push(item.supplierLineId)
            }
          })
          const arr = {
            supplierLineId: deleteIds.join(','),
            boxLineId: '',
            docLineId: ''
          }
          shippingCompanyServer.deleteDetail(arr).then(() => {
            const newList = this.shippingCompanyContacts.filter(
              x => indexList.indexOf(x.$index) === -1
            )
            this.shippingCompanyContacts = []
            newList.forEach((item, index) => {
              item.$index = index
              this.$set(this.shippingCompanyContacts, index, item)
            })
            this.$message({
              message: `删除成功`,
              type: 'success'
            })
          })
        })
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedShippingCompanyContact() {
      this.shippingCompanyContactsSelection.forEach(item => {
        for (let i = 0; i < this.shippingCompanyContacts.length; i++) {
          if (this.shippingCompanyContacts[i] === item) {
            this.shippingCompanyContacts.splice(i, 1)
            break
          }
        }
      })
      this.shippingCompanyContactsSelection = []
    },
    clickAddShippingCompanyBoxLine() {
      this.shippingCompanyBoxLine.push({
        $index: this.shippingCompanyBoxLine.length,
        ...shippingCompanyBoxLineEmptyData
      })
      for (var i = 0; i < this.shippingCompanyBoxLine.length; i++) {
        this.shippingCompanyBoxLine[
          i
        ].shippingCompanyProxyType = this.formData.shippingCompanyProxyType
      }
    },
    selectionChangeShippingCompanyBoxLine(val) {
      this.shippingCompanyBoxLineSelection = val
    },
    clickDeleteShippingCompanyBoxLine() {
      if (this.shippingCompanyBoxLineSelection.length > 0) {
        // 删除提示
        this.$confirm('确定要删除选中数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const deleteIds = []
          const indexList = []
          this.shippingCompanyBoxLineSelection.forEach(item => {
            indexList.push(item.$index)
            if (item.boxLineId) {
              deleteIds.push(item.boxLineId)
            }
          })
          const arr = {
            supplierLineId: '',
            boxLineId: deleteIds.join(','),
            docLineId: ''
          }
          shippingCompanyServer.deleteDetail(arr).then(() => {
            const newList = this.shippingCompanyBoxLine.filter(
              x => indexList.indexOf(x.$index) === -1
            )
            this.shippingCompanyBoxLine = []
            newList.forEach((item, index) => {
              item.$index = index
              this.$set(this.shippingCompanyBoxLine, index, item)
            })
            this.$message({
              message: `删除成功`,
              type: 'success'
            })
          })
        })
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedShippingCompanyBoxLine() {
      this.shippingCompanyBoxLineSelection.forEach(item => {
        for (let i = 0; i < this.shippingCompanyBoxLine.length; i++) {
          if (this.shippingCompanyBoxLine[i] === item) {
            this.shippingCompanyBoxLine.splice(i, 1)
            break
          }
        }
      })
      this.shippingCompanyBoxLineSelection = []
    },
    clickAddShippingCompanyDocLine() {
      this.shippingCompanyDocLine.push({
        $index: this.shippingCompanyDocLine.length,
        ...shippingCompanyDocLineEmptyData
      })
      for (var i = 0; i < this.shippingCompanyDocLine.length; i++) {
        this.shippingCompanyDocLine[
          i
        ].shippingCompanyProxyType = this.formData.shippingCompanyProxyType
      }
    },
    selectionChangeShippingCompanyDocLine(val) {
      this.shippingCompanyDocLineSelection = val
    },
    clickDeleteShippingCompanyDocLine() {
      if (this.shippingCompanyDocLineSelection.length > 0) {
        // 删除提示
        this.$confirm('确定要删除选中数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const deleteIds = []
          const indexList = []
          this.shippingCompanyDocLineSelection.forEach(item => {
            indexList.push(item.$index)
            if (item.docLineId) {
              deleteIds.push(item.docLineId)
            }
          })
          const arr = {
            supplierLineId: '',
            boxLineId: '',
            docLineId: deleteIds.join(',')
          }
          shippingCompanyServer.deleteDetail(arr).then(() => {
            const newList = this.shippingCompanyDocLine.filter(
              x => indexList.indexOf(x.$index) === -1
            )
            this.shippingCompanyDocLine = []
            newList.forEach((item, index) => {
              item.$index = index
              this.$set(this.shippingCompanyDocLine, index, item)
            })
            this.$message({
              message: `删除成功`,
              type: 'success'
            })
          })
        })
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    async newStartProcess() {
      return new Promise(async(resolve, reject) => {
        await this.save()
        resolve()
      })
    },
    async valiAgreeProcess() {
      return new Promise(async(resolve, reject) => {
        await this.save()
        resolve()
      })
    },
    
    shareProcessInfo(info) {
      this.processInfo = info
      if (
        this.processInfo &&
        this.processInfo.nodeInfo &&
        this.processInfo.nodeInfo.length
      ) {
        this.processInfo.nodeInfo.forEach(processNode => {
          if (processNode.status && (processNode.status === 'awaiting_check' || processNode.status === 'end')) {
            this.curProcessOrder = processNode.nodeOrder
            const eventName = 'processStep' + this.curProcessOrder
            this[eventName] && this[eventName]()
          }
        })
      }
    },
    processStep3() {
      this.disEditable = true
    },
    processStep4() {
      this.disEditable = false
    },
    emitEvent({ key, params }) {
      switch (key) {
        case 'saveFormData':
          this.save()
          break
        case 'resetData':
          this.resetData()
          break
        case 'startProcess':
          return this.newStartProcess()  
        case 'agreeProcess':
          return this.valiAgreeProcess()    
        case 'update':
          this.getData()
          break
        case 'shareProcessInfo':
          this.shareProcessInfo(params.info)
          break
        case 'del':
          this.del()
          break
        default:
          this[key] && this[key](params)
          break
      }
    },
    deletedShippingCompanyDocLine() {
      this.shippingCompanyDocLineSelection.forEach(item => {
        for (let i = 0; i < this.shippingCompanyDocLine.length; i++) {
          if (this.shippingCompanyDocLine[i] === item) {
            this.shippingCompanyDocLine.splice(i, 1)
            break
          }
        }
      })
      this.shippingCompanyDocLineSelection = []
    }
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
/deep/.el-form-item__error {
  padding-top: 0;
}
</style>
