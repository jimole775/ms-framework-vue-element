<template>
  <div class="container m-t-not">
    <div class="container m-t-not">
      <el-form
        :model="formData"
        :ref="'formData'"
        :rules="rules"
        class="demo-form-inline"
        label-position="right"
        label-width="120px">
        <el-row>
          <el-col v-if="formData.fk_id" :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="报关单反馈号" prop="fk_no">
              <el-input v-model="formData.fk_no" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="报关流水号" prop="customs_no">
              <CustomsBillSelect v-model="formData.customs_no" :stat="5" :disabled="!!formData.fk_id" @changeData="changeCustoms"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="报关单号" prop="customs_code">
              <el-input v-model="formData.customs_code" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="贸易类型" prop="sale_ent_type">
              <SaleEntTypeEnumSelect v-model="formData.sale_ent_type" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="制单人" prop="create_user">
              <el-input v-model="formData.create_user" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="单据状态" prop="status">
              <StatEnumSelect v-model="formData.status" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="报关状态" prop="customs_status">
              <CustomsStatEnumSelect v-model="formData.customs_status" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="出货预告号" prop="warn_no">
              <WarnNoSelect v-model="formData.warn_no" :disabled="true" @changeData="changeWarnNo"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="AB票" prop="ab_votes">
              <ABVotesEnumSelect v-model="formData.ab_votes" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发运方式" prop="ship_type">
              <ShipTypeEnumSelect v-model="formData.ship_type" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发货通知单号" prop="notice_ids">
              <NoticeNoSelect
                v-model="formData.notice_ids"
                :warn-id="formData.warn_id"
                :type="'multiple'"
                :disabled="true"
                @changeData="changeNoticeNo"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="国家" prop="area_id">
              <AreaSelect v-model="formData.area_id" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="启运港" prop="seaport_out_id">
              <PortSelect v-model="formData.seaport_out_id" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="目的港" prop="seaport_in_id">
              <PortSelect v-model="formData.seaport_in_id" :disabled="true" @changeData="changeSeaportIn"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="销售部门" prop="org_id">
              <DepartmentSelect v-model="formData.org_id" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="客户编码" prop="cust_code">
              <el-input v-model="formData.cust_code" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="客户" prop="cust_name">
              <el-input v-model="formData.cust_name" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="价格条款" prop="price_type_code">
              <PriceTypeEnumSelect v-model="formData.price_type_code" :disabled="true" @changeData="changePriceType"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="币种" prop="currency_code">
              <CurrencySelect v-model="formData.currency_code" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="合同号" prop="cpi_no">
              <el-input v-model="formData.cpi_no" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="品名" prop="brand_name">
              <el-input v-model="formData.brand_name" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="报关日期" prop="customs_date">
              <el-date-picker
                v-model="formData.customs_date"
                size="mini"
                class="max-w"
                disabled
                type="date"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="买家名称" prop="buyer_id">
              <BuyerEnumSelect v-model="formData.buyer_id" :disabled="true" @changeData="changeBuyer"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="总金额" prop="total_amt">
              <el-input v-model="formData.total_amt" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="总数量" prop="total_qty">
              <el-input v-model="formData.total_qty" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="总件数" prop="total_xqty">
              <el-input v-model="formData.total_xqty" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="总体积" prop="total_unit_tj">
              <el-input v-model="formData.total_unit_tj" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="总毛重" prop="total_unit_gw">
              <el-input v-model="formData.total_unit_gw" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="总净重" prop="total_unit_nw">
              <el-input v-model="formData.total_unit_nw" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发货总金额" prop="out_total_amt">
              <el-input v-model="formData.out_total_amt" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发货总数量" prop="out_total_qty">
              <el-input v-model="formData.out_total_qty" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="海运费" prop="y_amt">
              <el-input-number
                v-model="formData.y_amt"
                :step="1"
                :min="0"
                :disabled="true"
                size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="保险费" prop="b_amt">
              <el-input-number
                v-model="formData.b_amt"
                :step="1"
                :min="0"
                :disabled="true"
                size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="FOB保费" prop="fobb_amt">
              <el-input-number v-model="formData.fobb_amt" :step="1" :min="0" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="FOB运费" prop="foby_amt">
              <el-input-number v-model="formData.foby_amt" :step="1" :min="0" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="免费配件金额" prop="part_amt">
              <el-input-number v-model="formData.part_amt" :step="1" :min="0" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="是否检查" prop="is_check">
              <el-switch v-model="formData.is_check" size="mini" disabled />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="检查费用" prop="check_amt">
              <el-input-number v-model="formData.check_amt" :step="1" :min="0" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="含有进口物料" prop="is_imp">
              <el-switch 
                v-model="formData.is_imp" 
                disabled 
                size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="优惠关税" prop="disc_customs_type_id">
              <DiscCustomsTypeEnumSelect v-model="formData.disc_customs_type_id" :disabled="true" @changeData="changeDiscCustoms"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="调价作废" prop="is_new">
              <el-switch v-model="formData.is_new" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="分批报关" prop="is_repeat_customs">
              <el-switch v-model="formData.is_repeat_customs" size="mini" disabled />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="包装类型" prop="package_type">
              <PackageTypeSelect v-model="formData.package_type" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="货代" prop="forwarder_id">
              <ShippingCompanySelect v-model="formData.forwarder_id" :disabled="true" :form="1"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="报关行" prop="application_unit">
              <el-input v-model="formData.application_unit" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="出境关别" prop="customs_house_name">
              <el-input v-model="formData.customs_house_name" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="报关单备注" prop="note">
              <el-input v-model="formData.note" disabled size="mini" />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="备注" prop="note_new">
              <el-input v-model="formData.note_new" size="mini" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-tabs type="border-card">
        <el-tab-pane label="报关数据">
          <el-table
            ref="singleTable"
            :data="items"
            :loading="loading"
            class="m-t-12"
            border
            @current-change="handleCurrentChange"
            @selection-change="selectionChangeItem">
            <el-table-column type="index" fixed="left" label="序号" width="50" />
            <el-table-column
              show-overflow-tooltip
              prop="line_type"
              sortable
              min-width="105"
              label="类型">
              <template slot-scope="scope">
                <span>{{ scope.row.line_type | LineTypeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="ab_votes"
              sortable
              min-width="105"
              label="分票"/>
            <el-table-column
              show-overflow-tooltip
              prop="item_h_name"
              sortable
              min-width="105"
              label="产品名称"/>
            <el-table-column
              show-overflow-tooltip
              prop="item_h_code"
              sortable
              min-width="105"
              label="整机编码"/>
            <el-table-column
              show-overflow-tooltip
              prop="name_yw"
              sortable
              min-width="105"
              label="品名"/>
            <el-table-column
              show-overflow-tooltip
              prop="brand_name_en"
              sortable
              min-width="120"
              label="品名(英文)"/>
            <el-table-column
              show-overflow-tooltip
              prop="hs_code"
              sortable
              min-width="105"
              label="HS编码"/>
            <el-table-column
              show-overflow-tooltip
              prop="brand_name"
              sortable
              min-width="105"
              label="要素品名"/>
            <el-table-column
              show-overflow-tooltip
              prop="brand_name_des"
              sortable
              min-width="135"
              label="要素品名加密"/>
            <el-table-column
              show-overflow-tooltip
              prop="elements_name"
              sortable
              min-width="105"
              label="报关要素"/>
            <el-table-column
              show-overflow-tooltip
              prop="customs_uom"
              sortable
              min-width="105"
              label="报关单位"/>
            <el-table-column
              show-overflow-tooltip
              prop="second_unit"
              sortable
              min-width="105"
              label="第二单位"/>
            <el-table-column
              show-overflow-tooltip
              prop="x_qty"
              sortable
              min-width="155"
              label="件数"/>
            <el-table-column
              show-overflow-tooltip
              prop="customs_qty"
              sortable
              min-width="155"
              label="报关数量"/>
            <el-table-column
              show-overflow-tooltip
              prop="customs_price"
              sortable
              min-width="155"
              label="财务单价"/>
            <el-table-column
              show-overflow-tooltip
              prop="print_price"
              sortable
              min-width="155"
              label="打印价格"/>
            <el-table-column
              show-overflow-tooltip
              prop="customs_amt"
              sortable
              min-width="155"
              label="报关金额"/>
            <el-table-column
              show-overflow-tooltip
              prop="tj"
              sortable
              min-width="155"
              label="单位体积"/>
            <el-table-column
              show-overflow-tooltip
              prop="unit_tj"
              sortable
              min-width="155"
              label="总体积"/>
            <el-table-column
              show-overflow-tooltip
              prop="gw"
              sortable
              min-width="155"
              label="单位毛重"/>
            <el-table-column
              show-overflow-tooltip
              prop="unit_gw"
              sortable
              min-width="155"
              label="总毛重"/>
            <el-table-column
              show-overflow-tooltip
              prop="nw"
              sortable
              min-width="155"
              label="单位净重"/>
            <el-table-column
              show-overflow-tooltip
              prop="unit_nw"
              sortable
              min-width="155"
              label="总净重"/>
            <el-table-column
              show-overflow-tooltip
              prop="note"
              sortable
              min-width="105"
              label="备注"/>
            <el-table-column
              show-overflow-tooltip
              prop="pi_no"
              sortable
              min-width="120"
              label="形式发票号"/>
            <el-table-column
              show-overflow-tooltip
              prop="prod_no"
              sortable
              min-width="105"
              label="生产单号"/>
            <el-table-column
              show-overflow-tooltip
              prop="inspection_batchno"
              sortable
              min-width="105"
              label="商检批号"/>
            <el-table-column
              show-overflow-tooltip
              prop="cust_spec"
              sortable
              min-width="105"
              label="客户机型"/>
            <el-table-column
              show-overflow-tooltip
              prop="qty"
              sortable
              min-width="105"
              label="发货数量"/>
            <el-table-column
              show-overflow-tooltip
              prop="price"
              sortable
              min-width="105"
              label="发货单价"/>
            <el-table-column
              show-overflow-tooltip
              prop="line_amt"
              sortable
              min-width="105"
              label="发货金额"/>
            <el-table-column
              show-overflow-tooltip
              prop="new_row"
              sortable
              min-width="105"
              label="new_row"/>
            <el-table-column
              show-overflow-tooltip
              prop="bg_name"
              sortable
              min-width="105"
              label="报关型号"/>
          </el-table>
          <el-table
            v-if="showDetailView"
            :data="itemDetails"
            :loading="loading"
            class="m-t-12"
            border>
            <el-table-column type="index" fixed="left" label="序号" width="50" />
            <el-table-column
              show-overflow-tooltip
              prop="pro_type"
              sortable
              min-width="105"
              label="类型">
              <template slot-scope="scope">
                <span>{{ scope.row.pro_type | LineTypeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="cust_spec"
              sortable
              min-width="135"
              label="客户产品名称"/>
            <el-table-column
              show-overflow-tooltip
              prop="customs_uom"
              sortable
              min-width="105"
              label="报关单位"/>
            <el-table-column
              show-overflow-tooltip
              prop="second_unit"
              sortable
              min-width="105"
              label="第二单位"/>
            <el-table-column
              show-overflow-tooltip
              prop="customs_qty"
              sortable
              min-width="105"
              label="报关数量"/>
            <el-table-column
              show-overflow-tooltip
              prop="customs_price"
              sortable
              min-width="105"
              label="报关单价"/>
            <el-table-column
              show-overflow-tooltip
              prop="customs_amt"
              sortable
              min-width="105"
              label="报关金额"/>
            <el-table-column
              show-overflow-tooltip
              prop="unit_gw"
              sortable
              min-width="105"
              label="单位毛重"/>
            <el-table-column
              show-overflow-tooltip
              prop="unit_nw"
              sortable
              min-width="105"
              label="单位净重"/>
            <el-table-column
              show-overflow-tooltip
              prop="unit_tj"
              sortable
              min-width="105"
              label="单位体积"/>
            <el-table-column
              show-overflow-tooltip
              prop="note"
              sortable
              min-width="105"
              label="备注"/>
            <el-table-column
              show-overflow-tooltip
              prop="pi_no"
              sortable
              min-width="120"
              label="形式发票号"/>
            <el-table-column
              show-overflow-tooltip
              prop="prod_no"
              sortable
              min-width="105"
              label="生产单号"/>
            <el-table-column
              show-overflow-tooltip
              prop="inspection_batchno"
              sortable
              min-width="105"
              label="商检批号"/>
            <el-table-column
              show-overflow-tooltip
              prop="erp_code"
              sortable
              min-width="125"
              label="ERP产品编码"/>
            <el-table-column
              show-overflow-tooltip
              prop="item_h_code"
              sortable
              min-width="105"
              label="整机编码"/>
            <el-table-column
              show-overflow-tooltip
              prop="cust_item_name"
              sortable
              min-width="105"
              label="客户机型"/>
            <el-table-column
              show-overflow-tooltip
              prop="out_qty"
              sortable
              min-width="105"
              label="发货数量"/>
            <el-table-column
              show-overflow-tooltip
              prop="price"
              sortable
              min-width="105"
              label="发货单价"/>
            <el-table-column
              show-overflow-tooltip
              prop="line_amt"
              sortable
              min-width="105"
              label="发货金额"/>
            <el-table-column
              show-overflow-tooltip
              prop="print_price"
              sortable
              min-width="105"
              label="打印价格"/>
            <el-table-column
              show-overflow-tooltip
              prop="bg_name"
              sortable
              min-width="105"
              label="报关型号"/>
          </el-table>
        </el-tab-pane>
        <!-- <el-tab-pane label="差异金额">
          <el-row>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="clickAddBoxLine" />
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="clickDeleteBoxLine" />
          </el-row>
          <el-table
            :data="BoxLine"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeBoxLine"
          >
            <el-table-column type="selection" />
            <el-table-column type="index" label="序号" width="50" />
          </el-table>
        </el-tab-pane> -->
      </el-tabs>
      <FileUpload
        :id="id"
        :bill-name="'报关单反馈号'"/>
    </div>
  </div>
</template>

<script>
import customsBillServer from './../../../api/customsBillServer'
import customsBillFedServer from './../../../api/customsBillFedServer'
import validate from './../../../utils/validate'
import ABVotesEnumSelect from './../customs-bill/ABVotesEnumSelect'
import BuyerEnumSelect from './../customs-bill/BuyerEnumSelect'
import DiscCustomsTypeEnumSelect from './../customs-bill/DiscCustomsTypeEnumSelect'
import NoticeNoSelect from './../customs-bill/NoticeNoSelect'
import PriceTypeEnumSelect from './../customs-bill/PriceTypeEnumSelect'
import CustomsBillSelect from './../customs-bill/CustomsBillSelect'
import SaleEntTypeEnumSelect from './../customs-bill/SaleEntTypeEnumSelect'
import ShipTypeEnumSelect from './../customs-bill/ShipTypeEnumSelect'
import StatEnumSelect from './../customs-bill/StatEnumSelect'
import CustomsStatEnumSelect from './../customs-bill/CustomsStatEnumSelect'
import WarnNoSelect from './../customs-bill/WarnNoSelect'
import PackageTypeSelect from './../customs-bill/PackageTypeSelect'
import LineTypeSelect from './../customs-bill/LineTypeSelect'
import CustomsUomSelect from './../customs-bill/CustomsUomSelect'
import LineTypeEnumUtil from './../../enum/customs-bill/LineTypeEnumUtil'
import BuyerEnumUtil from './../../enum/customs-bill/BuyerEnumUtil'
import DiscCustomsTypeEnumUtil from './../../enum/customs-bill/DiscCustomsTypeEnumUtil'
import CustomsUomEnumUtil from './../../enum/customs-bill/CustomsUomEnumUtil'
import PortSelect from './../port/PortSelect'
import DepartmentSelect from './../department/DepartmentSelect'
import AreaSelect from './../area/AreaSelect'
import CurrencySelect from './../currency/CurrencySelect'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'

const emptyFormData = {
  fk_id: null,
  customs_id: null,
  customs_no: null,
  customs_code: null,
  sale_ent_type: null,
  create_user: null,
  status: 1,
  customs_status: null,
  warn_id: null,
  warn_no: null,
  ab_votes: null,
  ship_type: null,
  notice_ids: [],
  notice_id: null,
  notice_no: null,
  area_id: null,
  seaport_out_id: null,
  seaport_out_code: null,
  seaport_out_name: null,
  seaport_in_id: null,
  seaport_in_code: null,
  seaport_in_name: null,
  org_id: null,
  org_code: null,
  org_name: null,
  cust_id: null,
  cust_name: null,
  price_type_id: null,
  price_type_code: null,
  price_type_name: null,
  currency_code: null,
  currency_name: null,
  cpi_no: null,
  brand_name: null,
  customs_date: null,
  buyer_id: null,
  buyer_name: null,
  total_amt: null,
  total_qty: null,
  total_xqty: null,
  total_unit_tj: null,
  total_unit_gw: null,
  total_unit_nw: null,
  out_total_amt: null,
  out_total_qty: null,
  y_amt: null,
  b_amt: null,
  fobb_amt: null,
  foby_amt: null,
  part_amt: null,
  is_check: false,
  check_amt: null,
  is_imp: false,
  disc_customs_type_id: null,
  disc_customs_type: null,
  is_new: false,
  is_repeat_customs: false,
  package_type: null,
  note: null,
  forwarder_id: null,
  forwarder_name: null,
  application_unit: null,
  customs_house_code: null,
  customs_house_name: null,
}
const boxLineEmptyData = {
  name: null,
}

const itemRules = {
  line_type: [],
  ab_votes: [],
  item_h_name: [],
  item_h_code: [],
  name_yw: [],
  brand_name_en: [],
  hs_code: [],
  brand_name: [],
  brand_name_des: [],
  elements_name: [],
  customs_uom: [],
  second_unit: [],
  x_qty: [],
  customs_qty: [],
  customs_price: [],
  print_price: [],
  customs_amt: [],
  tj: [],
  unit_tj: [],
  gw: [],
  unit_gw: [],
  nw: [],
  unit_nw: [],
  note: [],
  pi_no: [],
  prod_no: [],
  inspection_batchno: [],
  cust_spec: [],
  qty: [],
  price: [],
  line_amt: [],
  new_row: [],
  bg_name: [],
}
const itemDetailRules = {
  pro_type: [],
  cust_spec: [],
  customs_uom: [],
  second_unit: [],
  customs_qty: [],
  customs_price: [],
  customs_amt: [],
  unit_gw: [],
  unit_nw: [],
  unit_tj: [],
  note: [],
  pi_no: [],
  prod_no: [],
  inspection_batchno: [],
  erp_code: [],
  item_h_code: [],
  cust_item_name: [],
  out_qty: [],
  price: [],
  line_amt: [],
  print_price: [],
  bg_name: [],
}
/*
const boxLineRules = {
  name: [
    { message: '联系人 不能为空', validate: validate.isNotEmpty },
    {
      message: '联系人 长度不能大于64',
      validate: validate.validateStringMaximum,
      param: [64]
    },
  ],
}
*/

let initFormData = {
  ...emptyFormData
}
let initItems = []
// let initItemDetails = []
// let initBoxLine = []

export default {
  name: 'CustomsBillFedSublistEdit',
  components: {
    ABVotesEnumSelect,
    BuyerEnumSelect,
    DiscCustomsTypeEnumSelect,
    NoticeNoSelect,
    PriceTypeEnumSelect,
    CustomsBillSelect,
    SaleEntTypeEnumSelect,
    ShipTypeEnumSelect,
    StatEnumSelect,
    CustomsStatEnumSelect,
    WarnNoSelect,
    PackageTypeSelect,
    LineTypeSelect,
    CustomsUomSelect,
    PortSelect,
    DepartmentSelect,
    AreaSelect,
    CurrencySelect,
    ShippingCompanySelect,
  },
  filters: {
    CustomsUomFilter: CustomsUomEnumUtil.toTitleFilter,
    LineTypeFilter: LineTypeEnumUtil.toTitleFilter,
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
      fkStat: null,
      formData: {
        ...initFormData
      },
      items: [],
      showDetailView: false,
      selectedHId: null,
      deletedList: [],
      itemDetails: [],
      boxLine: [],
      itemsSelection: [],
      boxLineSelection: [],
      rules: {
        fk_id: [],
        customs_no: [],
        customs_code: [],
        sale_ent_type: [],
        create_user: [],
        status: [],
        warn_id: [],
        warn_no: [],
        ab_votes: [],
        ship_type: [],
        notice_id: [],
        notice_no: [],
        area_id: [],
        seaport_out_id: [],
        seaport_out_code: [],
        seaport_out_name: [],
        seaport_in_id: [],
        seaport_in_code: [],
        seaport_in_name: [],
        org_id: [],
        org_code: [],
        org_name: [],
        cust_id: [],
        cust_name: [],
        price_type_id: [],
        price_type_code: [],
        price_type_name: [],
        currency_code: [],
        currency_name: [],
        cpi_no: [],
        brand_name: [],
        customs_date: [],
        buyer_name: [],
        total_amt: [],
        total_qty: [],
        total_xqty: [],
        total_unit_tj: [],
        total_unit_gw: [],
        total_unit_nw: [],
        out_total_amt: [],
        out_total_qty: [],
        y_amt: [],
        b_amt: [],
        fobb_amt: [],
        foby_amt: [],
        part_amt: [],
        is_check: [],
        check_amt: [],
        is_imp: [],
        disc_customs_type: [],
        is_new: [],
        is_repeat_customs: [],
        package_type: [],
        note: [],
        forwarder_id: [],
        application_unit: [],
        customs_house_code: [],
        note_new: [
          { required: true, message: '不能为空', trigger: 'blur' },
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
      if (val !== this.initFormData.fk_id) {
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
      this.formData.create_user = this.$store.getters.userCode
      initFormData = {
        ...emptyFormData
      }
      this.formData = {
        ...emptyFormData
      }
    }
  },
  methods: {
    changeCustoms(res) {
      this.getCustomsDetail(res.customs_id)
    },
    async getCustomsDetail(id) {
      this.loading = true
      const res = await customsBillServer.get(id)
      if (!res) {
        // 清空数据
        this.formData.notice_ids = []
        this.formData.notice_id = null
        this.formData = {
          ...emptyFormData
        }
        return
      }
      res.notice_ids = res.notice_id.split(',')
      res.buyer_id = BuyerEnumUtil.toValue(res.buyer_name)
      res.disc_customs_type_id = DiscCustomsTypeEnumUtil.toValue(res.disc_customs_type)
      initFormData = res
      this.formData = {
        ...res
      }
      this.formData.status = 1
      if (res.sale_customs_h_lineofsale_customs_header) {
        initItems = res.sale_customs_h_lineofsale_customs_header
        this.items = [...initItems]
        this.$refs.singleTable.setCurrentRow(initItems[0])
      }
      this.loading = false
    },
    changeBuyer(res) {
      this.formData.buyer_name = res.title
    },
    changeDiscCustoms(res) {
      this.formData.disc_customs_type = res.title
    },
    changeSeaportIn(name, code) {
      this.formData.seaport_in_code = code
      this.formData.seaport_in_name = name
    },
    changePriceType(res) {
      if (res) {
        this.formData.price_type_name = res.name
      }
    },
    changeWarnNo(res) {
      if (res === undefined) {
        this.formData.notice_ids = []
        this.formData.notice_id = null
        this.formData = {
          ...emptyFormData
        }
        return
      }
      // 清空现有数据
      this.items = []
      this.itemDetails = []
      this.showDetailView = false
      // 根据出货预告号获取的数据更新表单数据
      this.formData.ship_type = parseInt(res.shiptype)
      this.formData.seaport_out_id = parseInt(res.seaportoutid)
      this.formData.seaport_out_name = res.seaportoutname
      this.formData.seaport_out_code = res.seaportoutcode
      this.formData.seaport_in_id = parseInt(res.seaportinid)
      this.formData.seaport_in_name = res.seaportinname
      this.formData.seaport_in_code = res.seaportincode
      this.formData.org_id = parseInt(res.orgid)
      this.formData.org_name = res.orgname
      this.formData.org_code = res.orgcode
      this.formData.area_id = parseInt(res.bgareaid)
      this.formData.area_name = res.bgareaname
      this.formData.area_code = res.bgareacode
      this.formData.cpi_no = res.pino
      this.formData.price_type_id = parseInt(res.pricetypeid)
      this.formData.cust_id = parseInt(res.custid)
      this.formData.cust_code = res.custcode
      this.formData.cust_name = res.custname
      this.formData.brand_name = res.pbrandname
      this.formData.warn_id = parseInt(res.warnid)
      this.formData.sale_ent_type = parseInt(res.saleenttype)
      this.formData.currency_code = res.currencycode
      this.formData.currency_name = res.currencyname
      this.formData.ab_votes = res.abvotes
    },
    changeNoticeNo(list, oldList) {
      const noticeIds = []
      const noticeNos = []
      list.forEach(item => {
        noticeIds.push(item.id)
        noticeNos.push(item.code)
      })
      if (this.items.length > 0) {
        this.items = []
        this.itemDetails = []
        this.showDetailView = false
        this.formData.notice_id = noticeIds.join(',')
        this.formData.notice_no = noticeNos.join(',')
        if (noticeIds.length > 0) {
          this.getNoticeDetail()
        }
      }
      this.formData.notice_id = noticeIds.join(',')
      this.formData.notice_no = noticeNos.join(',')
      if (noticeIds.length > 0 && !this.formData.customs_id) {
        this.getNoticeDetail()
      }
    },
    async getNoticeDetail() {
      const postData = {
        ab_votes: this.formData.ab_votes,
        contract_no: this.formData.cpi_no,
        notice_ids: this.formData.notice_id,
        warn_id: this.formData.warn_id
      }
      const res = await customsBillFedServer.noticeDetail(postData)
      if (res.data) {
        // 赋值第一个表数据
        initItems = [...res.data]
        this.items = []
        let total_amt = 0 // 总金额
        let total_qty = 0 // 总数量
        let total_xqty = 0 // 总件数
        let total_unit_tj = 0 // 总体积
        let total_unit_gw = 0 // 总毛重
        let total_unit_nw = 0 // 总净重
        let out_total_amt = 0 // 发货总金额
        let out_total_qty = 0 // 发货总数量
        res.data.forEach((item, index) => {
          total_amt += item.customs_amt
          total_qty += item.customs_qty
          total_xqty += item.x_qty
          total_unit_tj += item.unit_tj
          total_unit_gw += item.unit_gw
          total_unit_nw += item.unit_nw
          out_total_amt += item.line_amt
          out_total_qty += item.qty
          item.changeable = 0
          if (item.sale_customs_lineofsale_customs_h_lines &&
            item.sale_customs_lineofsale_customs_h_lines.relationData) {
            item.sale_customs_lineofsale_customs_h_lines.relationData.forEach(element => {
              element.changeable = 0
            })
          }
          this.$set(this.items, index, item)
        })
        this.formData.total_amt = total_amt
        this.formData.total_qty = total_qty
        this.formData.total_xqty = total_xqty
        this.formData.total_unit_tj = total_unit_tj
        this.formData.total_unit_gw = total_unit_gw
        this.formData.total_unit_nw = total_unit_nw
        this.formData.out_total_amt = out_total_amt
        this.formData.out_total_qty = out_total_qty
        if (this.items.length > 0) {
          // 选中状态
          this.selectedHId = parseInt(this.items[0].customs_h_id)
          this.$refs.singleTable.setCurrentRow(this.items[0])
        }
      }
    },
    chanageXQTY() {
      let total_xqty = 0 // 总件数
      this.items.forEach(item => {
        total_xqty += item.x_qty
      })
      this.formData.total_xqty = total_xqty
    },
    handleCurrentChange(val) {
      if (this.itemDetails.length > 0) {
        const itemDetails = this.itemDetails
        for (let i = 0; i < itemDetails.length; i++) {
          const error = validate.dataObjectValidate(itemDetails[i], itemDetailRules)
          if (error) {
            this.$message({
              message: `报关商品明细 第 ${i + 1} 行 ` + error[Object.keys(error)[0]][0].message,
              type: 'warning',
              duration: 1000
            })
            return
          }
        }
        if (this.items[this.selectedHId]) {
          // 把数据更新到父表中
          this.items[this.selectedHId].sale_customs_lineofsale_customs_h_lines.relationData = itemDetails
        }
      }
      // 切换商品行
      this.itemDetails = []
      if (!val || val.line_type === null) {
        this.selectedHId = null
        this.showDetailView = false
      } else {
        this.selectedHId = parseInt(val.customs_h_id)
        let itemDetails = []
        this.items.forEach((item, index) => {
          if (item.customs_h_id === val.customs_h_id &&
            item.sale_customs_lineofsale_customs_h_lines &&
            item.sale_customs_lineofsale_customs_h_lines.relationData) {
            itemDetails = item.sale_customs_lineofsale_customs_h_lines.relationData
          }
        })
        if (itemDetails.length > 0) {
          // 更新数据
          this.itemDetails = []
          itemDetails.forEach((item, index) => {
            this.$set(this.itemDetails, index, item)
          })
          this.showDetailView = true
        } else {
          this.showDetailView = false
        }
      }
    },
    close() {
      this.$emit('close')
    },
    async getData() {
      this.loading = true
      try {
        const res = await customsBillFedServer.get(this.id)
        if (!res) {
          this.$message({
            message: '获取数据出错，请联系管理员',
            type: 'error'
          })
          return
        }
        this.fkStat = res.stat
        this.formData.fk_id = this.id
        this.formData.fk_no = res.fk_no
        this.formData.note_new = res.note
        this.formData.is_imp = res.is_imp + ''
        this.getCustomsData(res.customs_id)
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    async getCustomsData(id) {
      const res = await customsBillFedServer.getCustoms(id)
      if (!res) {
        this.$message({
          message: '获取数据出错，请联系管理员',
          type: 'error'
        })
        this.loading = false
        return
      }
      res.notice_ids = res.notice_id.split(',')
      res.buyer_id = BuyerEnumUtil.toValue(res.buyer_name)
      res.disc_customs_type_id = DiscCustomsTypeEnumUtil.toValue(res.disc_customs_type)
      res.fk_id = this.formData.fk_id
      res.fk_no = this.formData.fk_no
      res.note_new = this.formData.note_new
      initFormData = res
      this.formData = {
        ...res
      }
      this.formData.status = this.fkStat
      if (res.sale_customs_h_lineofsale_customs_header) {
        initItems = res.sale_customs_h_lineofsale_customs_header
        this.items = [...initItems]
        this.$refs.singleTable.setCurrentRow(initItems[0])
      }
      this.loading = false
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            const items = this.items
            for (let i = 0; i < items.length; i++) {
              const error = validate.dataObjectValidate(items[i], itemRules)
              if (error) {
                this.$message({
                  message: `报关商品 第 ${i + 1} 行 ` + error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            try {
              this.formData.sale_customs_h_lineofsale_customs_header = items
              if (this.formData.fk_id) {
                const postData = {
                  fk_id: this.formData.fk_id,
                  customs_id: this.formData.customs_id,
                  customs_no: this.formData.customs_no,
                  note: this.formData.note_new
                }
                await customsBillFedServer.put(postData)
              } else {
                const postData = {
                  entid: this.$store.getters.entid,
                  customs_id: this.formData.customs_id,
                  customs_no: this.formData.customs_no,
                  note: this.formData.note_new
                }
                const res = await customsBillFedServer.post(postData)
                if (Number.parseInt(res.data.code) === 200) {
                  // 新增保存成功后清空表单数据
                  this.formData = { ...emptyFormData }
                }
                this.$router.push({
                  path: './' + res.data.data.dataSet.rows[0].fk_id
                })
              }
              initFormData = {
                ...this.formData
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
            this.$emit('emitEvent', {
              key: 'update',
              params: {
                id: this.formData.fk_id
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
        customsBillFedServer.delete(this.formData.fk_id).then(() => {
          this.$message({
            message: `删除 ${this.formData.fk_id} 成功`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'CustomsBillFedEditPage')
        })
      })
    },
    resetData() {
      if (this.id) {
        this.formData = { ...emptyFormData }
        // this.items = [...initItems]
        this.$refs.singleTable.setCurrentRow(initItems[0])
        this.getData()
      } else {
        this.formData = { ...emptyFormData }
        this.items = [...initItems]
        this.$refs.singleTable.setCurrentRow(initItems[0])
      }
    },
    selectionChangeItem(val) {
      this.itemsSelection = val
    },
    clickAddBoxLine() {
      this.boxLine.push({
        $index: this.boxLine.length,
        ...boxLineEmptyData
      })
    },
    selectionChangeBoxLine(val) {
      this.boxLineSelection = val
    },
    clickDeleteBoxLine() {
      if (this.boxLineSelection.length > 0) {
        // 删除提示
        this.$confirm('确定要删除选中数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const deleteIds = []
          this.boxLineSelection.forEach(item => {
            if (item.boxLineId) {
              deleteIds.push(item.boxLineId)
            }
          })
          customsBillFedServer.deleteDetail(deleteIds).then(() => {
            this.deletedBoxLine()
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
    emitEvent({ key }) {
      switch (key) {
        case 'saveFormData':
          this.save()
          break
        case 'resetData':
          this.resetData()
          break
        case 'update':
          this.getData()
          break
        default:
          break
      }
    },
    deletedBoxLine() {
      this.boxLineSelection.forEach(item => {
        for (let i = 0; i < this.sboxLine.length; i++) {
          if (this.boxLine[i] === item) {
            this.boxLine.splice(i, 1)
            break
          }
        }
      })
      this.boxLineSelection = []
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
  /deep/.el-form-item__error{
    padding-top: 0;
  }
</style>
