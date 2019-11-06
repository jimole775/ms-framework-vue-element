<template>
  <div class="container m-t-not">
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
          <el-col v-if="formData.customs_id" :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="报关流水号" prop="customs_no">
              <el-input v-model="formData.customs_no" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col v-if="formData.customs_id" :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="报关单号" prop="customs_code">
              <el-input v-model="formData.customs_code" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="贸易类型" prop="sale_ent_type">
              <SaleEntTypeEnumSelect v-model="formData.sale_ent_type" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col v-if="formData.customs_id" :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="制单人" prop="create_user">
              <el-input v-model="formData.create_user" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="单据状态" prop="stat">
              <StatEnumSelect v-model="formData.stat" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="报关状态" prop="customs_status">
              <CustomsStatEnumSelect v-model="formData.customs_status" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="出货预告号" prop="warn_no">
              <WarnNoSelect v-model="formData.warn_no" @changeData="changeWarnNo"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="AB票" prop="ab_votes">
              <ABVotesEnumSelect v-model="formData.ab_votes"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发运方式" prop="ship_type">
              <ShipTypeEnumSelect v-model="formData.ship_type"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发货通知单号" prop="notice_id">
              <NoticeNoSelect
                v-if="showNoticeNoSelect"
                v-model="formData.notice_ids"
                :warn-id="formData.warn_id"
                :type="'multiple'"
                :disabled="isEdit"
                @isEmpty="hideNoticeNoSelect"
                @changeData="changeNoticeNo"
              />
              <el-input
                v-if="!showNoticeNoSelect"
                v-model="formData.notice_no"
                :disabled="isEdit"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="国家" prop="area_id">
              <AreaSelect v-model="formData.area_id"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="启运港" prop="seaport_out_id">
              <PortSelect v-model="formData.seaport_out_id" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="目的港" prop="seaport_in_id">
              <PortSelect v-model="formData.seaport_in_id" @changeData="changeSeaportIn"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="销售部门" prop="org_id">
              <DepartmentSelect v-model="formData.org_id" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="客户编码" prop="cust_code">
              <el-input v-model="formData.cust_code" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="客户" prop="cust_name">
              <el-input v-model="formData.cust_name" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="价格条款" prop="price_type_code">             
              <PriceTypeEnumSelect
                v-model="formData.price_type_code"
                @changeData="changePriceType"
              />     
              <el-checkbox 
                v-if="authForPriceType('CIF')" 
                v-model="formData.price_type2" 
                :true-label="priceType2Default1" 
                :false-label="priceType2Default0" 
                @change="priceTypeChecked">FOB+I+F</el-checkbox>
              <el-checkbox 
                v-if="authForPriceType('CFR')" 
                v-model="formData.price_type2" 
                :true-label="priceType2Default2" 
                :false-label="priceType2Default0"
                @change="priceTypeChecked">FOB+F</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24"> 
            <el-form-item :required="formData.price_type2 == 1 || formData.price_type2 == 2" label="唛号" prop="label_no"> 
              <el-input :disabled="!formData.price_type2" v-model="formData.label_no" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="币种" prop="currency_code">
              <CurrencySelect v-model="formData.currency_code" :disabled="true"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="合同号" prop="cpi_no">
              <el-input v-model="formData.cpi_no" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="品名" prop="brand_name">
              <el-input v-model="formData.brand_name" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col v-if="formData.customs_id" :lg="6" :md="8" :sm="12" :xs="24">
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
          <el-col :lg="12" :md="12" :sm="12" :xs="24">
            <el-form-item label="买家名称" prop="buyer_id">
              <BuyerEnumSelect v-model="formData.buyer_id" style="margin-left: 0" @changeData="changeBuyer"/>
              <el-input v-model="formData.buyer_name" style="position: absolute; width: calc(100% - 35px)" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="总金额" prop="total_amt">
              <el-input v-model="formData.total_amt" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="总数量" prop="total_qty">
              <el-input v-model="formData.total_qty" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="总件数" prop="total_xqty">
              <el-input v-model="formData.total_xqty" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="总体积" prop="total_unit_tj">
              <el-input v-model="formData.total_unit_tj" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="总毛重" prop="total_unit_gw">
              <el-input v-model="formData.total_unit_gw" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="总净重" prop="total_unit_nw">
              <el-input v-model="formData.total_unit_nw" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发货总金额" prop="out_total_amt">
              <el-input v-model="formData.out_total_amt" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="发货总数量" prop="out_total_qty">
              <el-input v-model="formData.out_total_qty" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="海运费" prop="y_amt">
              <el-input-number
                v-model="formData.y_amt"
                :step="1"
                :min="0"
                :disabled="formData.price_type_code !== 'CIF'"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="保险费" prop="b_amt">
              <el-input-number
                v-model="formData.b_amt"
                :step="1"
                :min="0"
                :disabled="formData.price_type_code !== 'CIF'"
                size="mini"
              />
            </el-form-item>
          </el-col>      
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="FOB保费" prop="fobb_amt">
              <el-input-number v-model="formData.fobb_amt" :step="1" :min="0" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="FOB运费" prop="foby_amt">
              <el-input-number v-model="formData.foby_amt" :step="1" :min="0" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="免费配件金额" prop="part_amt">
              <el-input-number
                v-model="formData.part_amt"
                :disabled="changePriceBtn"
                :step="1"
                :min="0"
                size="mini"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="是否检查" prop="is_check">
              <el-switch v-model="formData.is_check" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="检查费用" prop="check_amt">
              <el-input-number v-model="formData.check_amt" :step="1" :min="0" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="含有进口物料" prop="is_imp">
              <el-switch 
                v-model="formData.is_imp"
                size="mini"
                @change="isContainImportedMaterial"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="优惠关税" prop="disc_customs_type_id">
              <DiscCustomsTypeEnumSelect
                v-model="formData.disc_customs_type_id"
                :title="formData.disc_customs_type"
                @changeData="changeDiscCustoms"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="调价作废" prop="is_new">
              <el-switch v-model="formData.is_new" disabled size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="分批报关" prop="is_repeat_customs">
              <el-switch v-model="formData.is_repeat_customs" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="包装类型" prop="package_type">
              <PackageTypeSelect v-model="formData.package_type"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="货代" prop="transit_id">
              <ShippingCompanySelect
                v-model="formData.transit_id"
                :form="1"
                @changeData="changeShip"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="报关行" prop="application_unit">
              <el-input v-model="formData.application_unit" size="mini"/>
            </el-form-item>
          </el-col>          
          <el-col :lg="6" :md="8" :sm="12" :xs="24">            
            <el-form-item label="是否线上报关" prop="is_apply_online">               
              <el-switch 
                v-model="formData.is_apply_online"
                :disabled="diseditApplyOnline()"
                :active-value="applyOnlineActive"
                :inactive-value="applyOnlineUnActive"
                size="mini"
                @change="isApplyOnlineChange"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="申报地海关" prop="customs_house_name">
              <el-input
                v-model="formData.customs_house_name"
                size="mini"
                @focus="showCustomsHouse"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24">
            <el-form-item label="备案号" prop="record_no">
              <el-input v-model="formData.record_no" :disabled="formData.is_imp === false" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="12" :sm="12" :xs="24">
            <el-form-item label="备注" prop="note">
              <el-input v-model="formData.note" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="12" :md="12" :sm="12" :xs="24">
            <el-form-item label="标记唛码及备注" prop="mark_label_no">
              <el-input v-model="formData.mark_label_no" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :lg="6" :md="8" :sm="12" :xs="24" class="price-btn-box">
            <el-button
              :disabled="changePriceBtn"
              type="primary"
              size="mini"
              @click="changePrice"
            >调整价格</el-button>
            <el-button
              :disabled="recoverPriceBtn"
              type="primary"
              size="mini"
              @click="recoverPrice"
            >恢复价格</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-tabs type="border-card">
        <el-tab-pane label="报关数据">
          <el-row>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="clickAddItem"/>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="clickDeleteItem"
            />
            <el-button type="primary" icon="el-icon-caret-top" size="mini" @click="dataUp">数据上移</el-button>
            <el-button type="primary" icon="el-icon-caret-bottom" size="mini" @click="dataDown">数据下移</el-button>
            <el-button type="primary" size="mini" @click="quote">引用作废</el-button>
            <el-button type="primary" size="mini" @click="checkProductType">获取工厂型号</el-button>
            <el-button type="primary" size="mini" @click="encryption">要素品名加密</el-button>
            <el-button type="primary" size="mini" @click="cancelEncryption">取消要素品名加密</el-button>
          </el-row>
          <el-table
            ref="singleTable"
            :data="items"
            :loading="loading"
            class="m-t-12"
            height="400"
            border
            @current-change="handleCurrentChange"
            @selection-change="selectionChangeItem"
          >
            <el-table-column type="selection"/>
            <el-table-column type="index" fixed="left" label="序号" width="50"/>
            <el-table-column
              show-overflow-tooltip
              prop="line_type"
              sortable
              min-width="105"
              label="类型"
            >
              <template slot-scope="scope">
                <LineTypeSelect v-if="scope.row.changeable === 1" v-model="scope.row.line_type"/>
                <span v-else>{{ scope.row.line_type | LineTypeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="ab_votes"
              sortable
              min-width="105"
              label="分票"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.ab_votes"
                  size="mini"
                />
                <span v-else>{{ scope.row.ab_votes }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="item_h_name"
              sortable
              min-width="105"
              label="产品名称"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.item_h_name"
                  size="mini"
                />
                <span v-else>{{ scope.row.item_h_name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="item_h_code"
              sortable
              min-width="105"
              label="整机编码"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.item_h_code"
                  size="mini"
                />
                <span v-else>{{ scope.row.item_h_code }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="name_yw"
              sortable
              min-width="105"
              label="品名"
            >
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.name_yw"
                  size="mini"
                  @focus="showNameYw(scope.$index)"
                />
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="brand_name_en"
              sortable
              min-width="120"
              label="品名(英文)"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.brand_name_en" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="hs_code"
              sortable
              min-width="105"
              label="HS编码"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.hs_code" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="brand_name"
              sortable
              min-width="105"
              label="要素品名"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.brand_name" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="brand_name_des"
              sortable
              min-width="135"
              label="要素品名加密"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.brand_name_des"
                  size="mini"
                />
                <span v-else>{{ scope.row.brand_name_des }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="elements_name"
              sortable
              min-width="105"
              label="报关要素"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.elements_name" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="customs_uom"
              sortable
              min-width="105"
              label="报关单位"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.customs_uom" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="second_unit"
              sortable
              min-width="105"
              label="第二单位"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.second_unit" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="x_qty" sortable min-width="155" label="件数">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.x_qty"
                  :step="1"
                  :min="0"
                  size="mini"
                  @change="chanageXQTY"
                />
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="customs_qty"
              sortable
              min-width="155"
              label="报关数量"
            >
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.customs_qty"
                  :step="1"
                  :min="0"
                  size="mini"
                  @change="changeQty(scope.$index)"
                />
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="customs_price"
              sortable
              min-width="155"
              label="财务单价"
            >
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.customs_price"
                  :step="0.01"
                  :min="0"
                  size="mini"
                  @change="changCprice(scope.$index)"
                />
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="print_price"
              sortable
              min-width="155"
              label="打印价格"
            >
              <template slot-scope="scope">
                <el-input-number
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.print_price"
                  :step="0.01"
                  :min="0"
                  size="mini"
                />
                <span v-else>{{ scope.row.print_price }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="customs_amt"
              sortable
              min-width="155"
              label="报关金额"
            >
              <template slot-scope="scope">
                <el-input-number
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.customs_amt"
                  :step="0.01"
                  :min="0"
                  size="mini"
                  @change="changeAmt"
                />
                <span v-else>{{ scope.row.customs_amt }}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="tj" sortable min-width="155" label="单位体积">
              <template slot-scope="scope">
                <el-input-number
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.tj"
                  :step="1"
                  :min="0"
                  size="mini"
                  @change="changeUnitTj(scope.$index)"
                />
                <span v-else>{{ scope.row.tj }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="unit_tj"
              sortable
              min-width="155"
              label="总体积"
            >
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.unit_tj"
                  :step="0.01"
                  :min="0"
                  size="mini"
                  @change="changeTj"
                />
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="gw" sortable min-width="155" label="单位毛重">
              <template slot-scope="scope">
                <el-input-number
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.gw"
                  :step="0.01"
                  :min="0"
                  size="mini"
                  @change="changeUnitGw(scope.$index)"
                />
                <span v-else>{{ scope.row.gw }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="unit_gw"
              sortable
              min-width="155"
              label="总毛重"
            >
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.unit_gw"
                  :step="0.01"
                  :min="0"
                  size="mini"
                  @change="changeGw"
                />
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="nw" sortable min-width="155" label="单位净重">
              <template slot-scope="scope">
                <el-input-number
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.nw"
                  :step="0.01"
                  :min="0"
                  size="mini"
                  @change="changeUnitNw(scope.$index)"
                />
                <span v-else>{{ scope.row.nw }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="unit_nw"
              sortable
              min-width="155"
              label="总净重"
            >
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.unit_nw"
                  :step="0.01"
                  :min="0"
                  size="mini"
                  @change="changeNw"
                />
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="note" sortable min-width="105" label="备注">
              <template slot-scope="scope">
                <el-input v-model="scope.row.note" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="pi_no"
              sortable
              min-width="120"
              label="形式发票号"
            >
              <template slot-scope="scope">
                <el-input v-if="scope.row.changeable === 1" v-model="scope.row.pi_no" size="mini"/>
                <span v-else>{{ scope.row.pi_no }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="prod_no"
              sortable
              min-width="105"
              label="生产单号"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.prod_no"
                  size="mini"
                />
                <span v-else>{{ scope.row.prod_no }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="inspection_batchno"
              sortable
              min-width="105"
              label="商检批号"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.inspection_batchno"
                  size="mini"
                />
                <span v-else>{{ scope.row.inspection_batchno }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="cust_spec"
              sortable
              min-width="105"
              label="客户机型"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.cust_spec"
                  size="mini"
                />
                <span v-else>{{ scope.row.cust_spec }}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="qty" sortable min-width="155" label="发货数量">
              <template slot-scope="scope">
                <el-input-number
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.qty"
                  size="mini"
                  @change="changeQTy"
                />
                <span v-else>{{ scope.row.qty }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="price"
              sortable
              min-width="105"
              label="发货单价"
            >
              <template slot-scope="scope">
                <el-input v-if="scope.row.changeable === 1" v-model="scope.row.price" size="mini"/>
                <span v-else>{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="line_amt"
              sortable
              min-width="155"
              label="发货金额"
            >
              <template slot-scope="scope">
                <el-input-number
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.line_amt"
                  size="mini"
                  @change="changeLineAmt"
                />
                <span v-else>{{ scope.row.line_amt }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="new_row"
              sortable
              min-width="105"
              label="new_row"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.new_row"
                  size="mini"
                />
                <span v-else>{{ scope.row.new_row }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="bg_name"
              sortable
              min-width="105"
              label="报关型号"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.bg_name"
                  size="mini"
                />
                <span v-else>{{ scope.row.bg_name }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-row>
            <el-col :lg="24" :md="24" :sm="24" :xs="24">
              <el-tag type="danger" style="margin-top: 10px">合计</el-tag>
              <span class="spanRight">件数： {{ formData.total_xqty }}</span>
              <span class="spanRight">报关数量： {{ formData.total_qty }}</span>
              <span class="spanRight">报关金额： {{ formData.total_amt }}</span>
              <span class="spanRight">总毛重： {{ formData.total_unit_gw }}</span>
              <span class="spanRight">总净重： {{ formData.total_unit_nw }}</span>
              <span class="spanRight">总体积： {{ formData.total_unit_tj }}</span>
            </el-col>
          </el-row>    
          <!-- <el-table
            v-if="showDetailView"
            :data="itemDetails"
            :loading="loading"
            class="m-t-12"
            border
          >
            <el-table-column type="index" fixed="left" label="序号" width="50"/>
            <el-table-column
              show-overflow-tooltip
              prop="pro_type"
              sortable
              min-width="105"
              label="类型"
            >
              <template slot-scope="scope">
                <LineTypeSelect v-if="scope.row.changeable === 1" v-model="scope.row.pro_type"/>
                <span v-else>{{ scope.row.pro_type | LineTypeFilter }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="cust_spec"
              sortable
              min-width="135"
              label="客户产品名称"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.cust_spec"
                  size="mini"
                />
                <span v-else>{{ scope.row.cust_spec }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="customs_uom"
              sortable
              min-width="105"
              label="报关单位"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.customs_uom"
                  size="mini"
                />
                <span v-else>{{ scope.row.customs_uom }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="second_unit"
              sortable
              min-width="105"
              label="第二单位"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.second_unit" size="mini"/>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="customs_qty"
              sortable
              min-width="105"
              label="报关数量"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.customs_qty"
                  size="mini"
                />
                <span v-else>{{ scope.row.customs_qty }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="customs_price"
              sortable
              min-width="105"
              label="报关单价"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.customs_price"
                  size="mini"
                />
                <span v-else>{{ scope.row.customs_price }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="customs_amt"
              sortable
              min-width="105"
              label="报关金额"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.customs_amt"
                  size="mini"
                />
                <span v-else>{{ scope.row.customs_amt }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="unit_gw"
              sortable
              min-width="105"
              label="单位毛重"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.unit_gw"
                  size="mini"
                />
                <span v-else>{{ scope.row.unit_gw }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="unit_nw"
              sortable
              min-width="105"
              label="单位净重"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.unit_nw"
                  size="mini"
                />
                <span v-else>{{ scope.row.unit_nw }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="unit_tj"
              sortable
              min-width="105"
              label="单位体积"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.unit_tj"
                  size="mini"
                />
                <span v-else>{{ scope.row.unit_tj }}</span>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip prop="note" sortable min-width="105" label="备注">
              <template slot-scope="scope">
                <el-input v-if="scope.row.changeable === 1" v-model="scope.row.note" size="mini"/>
                <span v-else>{{ scope.row.note }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="pi_no"
              sortable
              min-width="120"
              label="形式发票号"
            >
              <template slot-scope="scope">
                <el-input v-if="scope.row.changeable === 1" v-model="scope.row.pi_no" size="mini"/>
                <span v-else>{{ scope.row.pi_no }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="prod_no"
              sortable
              min-width="105"
              label="生产单号"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.prod_no"
                  size="mini"
                />
                <span v-else>{{ scope.row.prod_no }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="inspection_batchno"
              sortable
              min-width="105"
              label="商检批号"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.inspection_batchno"
                  size="mini"
                />
                <span v-else>{{ scope.row.inspection_batchno }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="erp_code"
              sortable
              min-width="125"
              label="ERP产品编码"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.erp_code"
                  size="mini"
                />
                <span v-else>{{ scope.row.erp_code }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="item_h_code"
              sortable
              min-width="105"
              label="整机编码"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.item_h_code"
                  size="mini"
                />
                <span v-else>{{ scope.row.item_h_code }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="cust_item_name"
              sortable
              min-width="105"
              label="客户机型"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.cust_item_name"
                  size="mini"
                />
                <span v-else>{{ scope.row.cust_item_name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="out_qty"
              sortable
              min-width="105"
              label="发货数量"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.out_qty"
                  size="mini"
                />
                <span v-else>{{ scope.row.out_qty }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="price"
              sortable
              min-width="105"
              label="发货单价"
            >
              <template slot-scope="scope">
                <el-input v-if="scope.row.changeable === 1" v-model="scope.row.price" size="mini"/>
                <span v-else>{{ scope.row.price }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="line_amt"
              sortable
              min-width="105"
              label="发货金额"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.line_amt"
                  size="mini"
                />
                <span v-else>{{ scope.row.line_amt }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="print_price"
              sortable
              min-width="105"
              label="打印价格"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.print_price"
                  size="mini"
                />
                <span v-else>{{ scope.row.print_price }}</span>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              prop="bg_name"
              sortable
              min-width="105"
              label="报关型号"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="scope.row.changeable === 1"
                  v-model="scope.row.bg_name"
                  size="mini"
                />
                <span v-else>{{ scope.row.bg_name }}</span>
              </template>
            </el-table-column>
          </el-table> -->
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
        </el-tab-pane>-->
      </el-tabs>
      <el-tabs type="border-card" class="file-div">
        <el-tab-pane label="基础附件">
          <FileUpload 
            :id="id" 
            :tab="1" 
            :is-custom-bill="true"
            :bill-name="'报关单流水号'"/>
        </el-tab-pane>
        <el-tab-pane label="报关单附件">
          <CustomsBillUpload 
            ref="CustomsBillUpload"
            :id="id" 
            :title="'报关单附件'" 
            :tab="2" 
            :delfiles="delFiles"
            :cpi-no="formData.cpi_no"/>
        </el-tab-pane>
      </el-tabs>
    </div>
    <component
      v-if="showCustomsHouseView"
      :is="'CustomsHouseViewPopup'"
      @updateInfo="updateCustomsHouseInfo"
      @close="showCustomsHouseView = false"
    />
    <component
      v-if="showNameYwView"
      :is="'NameYwViewPopup'"
      @updateInfo="updateNameYwInfo"
      @close="showNameYwView = false"
    />
    <component
      v-if="showQuoteViewPopup"
      :is="'QuoteViewPopup'"
      :cust-id="formData.cust_id"
      :cpi-no="formData.cpi_no"
      @updateInfo="updateQuoteInfo"
      @close="showQuoteViewPopup = false"
    />
    <component
      v-if="showAddDetailViewPopup"
      :is="'AddDetailViewPopup'"
      :warn-id="formData.warn_id"
      :ab-votes="formData.ab_votes"
      :notice-ids="formData.notice_ids"
      @updateInfo="updateAddDetailInfo"
      @close="showAddDetailViewPopup = false"
    />
  </div>
</template>

<script>
import customsBillServer from './../../../api/customsBillServer'
import processServer from './../../../api/processServer'
import validate from './../../../utils/validate'
import ABVotesEnumSelect from './ABVotesEnumSelect'
import BuyerEnumSelect from './BuyerEnumSelect'
import DiscCustomsTypeEnumSelect from './DiscCustomsTypeEnumSelect'
import NoticeNoSelect from './NoticeNoSelect'
import PriceTypeEnumSelect from './PriceTypeEnumSelect'
import containerServer from './../../../api/containerServer'
import SaleEntTypeEnumSelect from './SaleEntTypeEnumSelect'
import ShipTypeEnumSelect from './ShipTypeEnumSelect'
import StatEnumSelect from './StatEnumSelect'
import CustomsStatEnumSelect from './CustomsStatEnumSelect'
import WarnNoSelect from './WarnNoSelect'
import PackageTypeSelect from './PackageTypeSelect'
import LineTypeSelect from './LineTypeSelect'
import CustomsUomSelect from './CustomsUomSelect'
import LineTypeEnumUtil from './../../enum/customs-bill/LineTypeEnumUtil'
import BuyerEnumUtil from './../../enum/customs-bill/BuyerEnumUtil'
import DiscCustomsTypeEnumUtil from './../../enum/customs-bill/DiscCustomsTypeEnumUtil'
import CustomsUomEnumUtil from './../../enum/customs-bill/CustomsUomEnumUtil'
import PortSelect from './../port/PortSelect'
import DepartmentSelect from './../department/DepartmentSelect'
import AreaSelect from './../area/AreaSelect'
import CurrencySelect from './../currency/CurrencySelect'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import CustomsBillUpload from './CustomsBillUpload'
const emptyFormData = {
  customs_id: null,
  customs_no: null,
  customs_code: null,
  sale_ent_type: null,
  create_user: null,
  stat: 1,
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
  is_imp: '0',
  disc_customs_type_id: null,
  disc_customs_type: null,
  is_new: false,
  is_repeat_customs: false,
  package_type: null,
  note: null,
  record_no: null,
  mark_label_no: null,
  transit_id: null,
  forwarder_name: null,
  application_unit: null,
  customs_house_code: null,
  customs_house_name: null,
  is_apply_online: 0,
  price_type2: 0,
  prover: null
}
/*
const itemDetailEmptyData = {
  changeable: 1,
  pro_type: 4,
  cust_spec: null,
  customs_uom: null,
  second_unit: null,
  customs_qty: null,
  customs_price: null,
  customs_amt: null,
  unit_gw: null,
  unit_nw: null,
  unit_tj: null,
  note: null,
  pi_no: null,
  prod_no: null,
  inspection_batchno: null,
  erp_code: null,
  item_h_code: null,
  cust_item_name: null,
  out_qty: null,
  price: null,
  line_amt: null,
  print_price: null,
  bg_name: null,
}
*/
const itemEmptyData = {
  changeable: 1,
  line_type: 4,
  ab_votes: null,
  item_h_name: null,
  item_h_code: null,
  name_yw: null,
  brand_name_en: null,
  hs_code: null,
  brand_name: null,
  brand_name_des: null,
  elements_name: null,
  customs_uom: null,
  second_unit: null,
  x_qty: 0,
  customs_qty: null,
  customs_price: null,
  print_price: null,
  customs_amt: null,
  tj: null,
  unit_tj: null,
  gw: null,
  unit_gw: null,
  nw: null,
  unit_nw: null,
  note: null,
  pi_no: null,
  prod_no: null,
  inspection_batchno: null,
  cust_spec: null,
  qty: null,
  price: null,
  line_amt: null,
  new_row: null,
  bg_name: null,
  sale_customs_lineofsale_customs_h_lines: {}
}
const boxLineEmptyData = {
  name: null
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
  bg_name: []
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
  bg_name: []
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
const Base64 = require('js-base64').Base64
// let initItemDetails = []
// let initBoxLine = []

export default {
  name: 'CustomsBillSublistEdit',
  components: {
    ABVotesEnumSelect,
    BuyerEnumSelect,
    DiscCustomsTypeEnumSelect,
    NoticeNoSelect,
    PriceTypeEnumSelect,
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
    QuoteViewPopup: () => import('./QuoteViewPopup.vue'),
    AddDetailViewPopup: () => import('./AddDetailViewPopup.vue'),
    NameYwViewPopup: () => import('./NameYwViewPopup.vue'),
    CustomsHouseViewPopup: () => import('./CustomsHouseViewPopup.vue'),
    CustomsBillUpload
  },
  filters: {
    CustomsUomFilter: CustomsUomEnumUtil.toTitleFilter,
    LineTypeFilter: LineTypeEnumUtil.toTitleFilter
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      showNoticeNoSelect: true,
      loading: false,
      isEdit: false,
      delFiles: false,
      isClickBreak: false,
      formData: {
        ...initFormData
      },
      items: [],
      downExcel: null,
      showCustomsHouseView: false,
      showNameYwView: false,
      nameYwIndex: null,
      showDetailView: false,
      showQuoteViewPopup: false,
      showAddDetailViewPopup: false,
      changePriceBtn: false,
      recoverPriceBtn: true,
      selectedHId: null,
      deletedList: [],
      itemDetails: [],
      boxLine: [],
      itemsSelection: [],
      boxLineSelection: [],
      firstProcessNodeInfo: {},
      curProcessNodeInfo: {},
      applyOnlineActive: 0,
      applyOnlineUnActive: 1,
      priceType2Default0: 0,
      priceType2Default1: 1,
      priceType2Default2: 2,
      rules: {
        customs_id: [],
        customs_no: [],
        customs_code: [],
        sale_ent_type: [],
        create_user: [],
        stat: [],
        warn_id: [{ required: true, message: '不能为空', trigger: 'blur' }],
        warn_no: [{ required: true, message: '不能为空', trigger: 'change' }],
        ab_votes: [{ required: true, message: '不能为空', trigger: 'change' }],
        ship_type: [{ required: true, message: '不能为空', trigger: 'change' }],
        notice_id: [{ required: true, message: '不能为空', trigger: 'change' }],
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
        price_type_code: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
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
        disc_customs_type_id: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        is_repeat_customs: [],
        package_type: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        note: [],
        transit_id: [],
        application_unit: [],
        customs_house_code: []
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    },
  },
  watch: {
    id(val) {
      if (val !== this.initFormData.customs_id) {
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
    // 数据上移
    dataUp() {
      if (this.itemsSelection.length > 0) {
        const i = (this.itemsSelection[0].seq - 1)
        if (this.itemsSelection.length > 1) {
          this.$message({
            message: '数据上移功能一次只能操作一条数据，不可多选！',
            type: 'warning'
          })
        } else if (i === 0) {
          this.$message({
            message: '当前选中数据为顶部数据、无法上移！',
            type: 'warning'
          })
        } else {
          let li = parseInt(i)
          li = li - 1
          const lastInfo = JSON.parse(JSON.stringify(this.items[li]))
          this.items[li] = this.items[i]
          this.items[i] = lastInfo
          this.items[i].seq = this.items[i].seq + 1
          this.items[li].seq = this.items[i].seq - 1
          this.items.forEach((element, index) => {
            this.$set(this.items, index, element)
          })
        } 
      } else if (this.itemsSelection.length === 0) {
        this.$message({
          message: '请选择需要上移的数据！',
          type: 'warning'
        })
      }
    },
    // 数据下移
    dataDown() {
      if (this.itemsSelection.length > 0) {
        const i = (this.itemsSelection[0].seq - 1)
        if (this.itemsSelection.length > 1) {
          this.$message({
            message: '数据下移功能一次只能操作一条数据，不可多选！',
            type: 'warning'
          })
        } else if (i === (this.items.length - 1)) {
          this.$message({
            message: '当前选中数据为底部数据、无法下移！',
            type: 'warning'
          })
        } else {
          let li = parseInt(i)
          li = li + 1
          const lastInfo = JSON.parse(JSON.stringify(this.items[li]))
          this.items[li] = this.items[i]
          this.items[i] = lastInfo
          this.items[i].seq = this.items[i].seq - 1
          this.items[li].seq = this.items[i].seq + 1
          this.items.forEach((element, index) => {
            this.$set(this.items, index, element)
          })
        } 
      } else if (this.itemsSelection.length === 0) {
        this.$message({
          message: '请选择需要下移的数据！',
          type: 'warning'
        })
      }
    },
    async declare() {
      // 报关事件
      const res = await customsBillServer.declare(this.id)
      if (Number.parseInt(res.data.code) === 200) {
        this.$message({
          message: '报关成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.data.msg,
          type: 'warning'
        })
      }
    },
    changeShip(res) {
      this.formData.forwarder_name = res.name
      // 如果是协议货代，将报关行指定为该协议货代对应的报关行
      if (res.shippingCompanyProxyType === 1) {
        this.formData.application_unit = res.customsLine
      }
    },
    showCustomsHouse() {
      this.showCustomsHouseView = true
    },
    showNameYw(index) {
      this.nameYwIndex = index
      this.showNameYwView = true
    },
    isContainImportedMaterial() {
      if (this.formData.is_imp === false) {
        this.formData.record_no = null
      }
    },
    updateNameYwInfo(data) {
      this.items[this.nameYwIndex].name_yw = data.name
      this.items[this.nameYwIndex].brand_name_en = data.nameYw
      this.items[this.nameYwIndex].hs_code = data.hsCode
      this.items[this.nameYwIndex].brand_name = data.brandName
      this.items[this.nameYwIndex].customs_uom = data.uomName
      this.items[this.nameYwIndex].second_unit = data.secondUnit
      this.items[this.nameYwIndex].elements_name = data.elementsName
      this.nameYwIndex = null
      this.showNameYwView = false
    },
    updateCustomsHouseInfo(res) {
      this.showCustomsHouseView = false
      this.formData.customs_house_code = res.customsCode
      this.formData.customs_house_name = res.customsName
    },
    changeProductName(res) {
      // 通过品名获取其它数据
      const item = this.items[res.$index]
      item.brand_name_en = res.nameYw
      item.hs_code = res.hsCode
      item.brand_name = res.brandName
      item.elements_name = res.elementsName
      item.second_unit = res.secondUnit // 第二单位
      this.items[res.$index] = item
      this.items.forEach((element, index) => {
        this.$set(this.items, index, element)
      })
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
    priceTypeChecked(res) {
      if (res) {
        this.formData.price_type2 = res
      } else {
        this.formData.price_type2 = 0
      }
    },
    isApplyOnlineChange(input) {
      console.log(typeof input === 'number')
    },
    authForPriceType(input) {
      return this.formData.price_type_name === input
    },
    changeWarnNo(res) {
      if (res === undefined) {
        this.formData.notice_ids = []
        this.formData.notice_id = null
        this.formData.warn_id = null
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
      this.formData.prover = res.prover
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
      if (!this.id) {
        if (
          this.items.length > 0 &&
          this.formData.notice_ids.toString() === list.toString()
        ) {
          this.$confirm(
            '切换将清空报关商品及明细信息，确定要切换数据吗？',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
          .then(() => {
            this.items = []
            this.itemDetails = []
            this.showDetailView = false
            this.formData.notice_id = noticeIds.join(',')
            this.formData.notice_no = noticeNos.join(',')
            if (noticeIds.length > 0) {
              this.getNoticeDetail()
            }
          })
          .catch(() => {
            // 恢复数据
            this.formData.notice_ids = oldList
          })
        }
      }
      if (noticeIds.length) this.formData.notice_id = noticeIds.join(',')
      if (noticeNos.length) this.formData.notice_no = noticeNos.join(',')
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
      const res = await customsBillServer.noticeDetail(postData)
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
          if (
            item.sale_customs_lineofsale_customs_h_lines &&
            item.sale_customs_lineofsale_customs_h_lines.relationData
          ) {
            item.sale_customs_lineofsale_customs_h_lines.relationData.forEach(
              element => {
                element.changeable = 0
              }
            )
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
    changeAmt() {
      let amt = 0
      this.items.forEach(item => {
        amt = amt + parseFloat(item.customs_amt)
      })
      this.formData.total_amt = Number.parseFloat(amt.toFixed(2))
    },
    changCprice(index) {
      this.items[index].customs_amt = (this.items[index].customs_price * this.items[index].customs_qty).toFixed(2)
      this.changeAmt() // 总金额的变化
    },
    changeUnitTj(index) {
      this.items[index].unit_tj = this.items[index].tj * this.items[index].customs_qty
      this.changeTj() // 总体积的变化
    },
    changeUnitGw(index) {
      this.items[index].unit_gw = this.items[index].gw * this.items[index].customs_qty
      this.changeGw() // 总毛重的变化
    }, 
    changeUnitNw(index) {
      this.items[index].unit_nw = this.items[index].nw * this.items[index].customs_qty
      this.changeNw() // 总净重的变化
    },
    changeQty(index) {
      let qty = 0
      this.items.forEach(item => {
        qty += item.customs_qty
      })
      this.items[index].customs_amt = (this.items[index].customs_price * this.items[index].customs_qty).toFixed(2)
      this.items[index].unit_tj = this.items[index].tj * this.items[index].customs_qty
      this.items[index].unit_gw = this.items[index].gw * this.items[index].customs_qty
      if (this.items[index].customs_uom === '千克') {
        this.items[index].unit_nw = this.items[index].customs_qty
      } else {
        this.items[index].unit_nw = this.items[index].nw * this.items[index].customs_qty
      }
      this.formData.total_qty = qty
      this.items.forEach((element, index) => {
        this.$set(this.items, index, element)
      })
      this.changeAmt() // 总金额的变化
      this.changeTj() // 总体积的变化
      this.changeGw() // 总毛重的变化
      this.changeNw() // 总净重的变化
    },
    chanageXQTY() {
      let total_xqty = 0 // 总件数
      this.items.forEach(item => {
        total_xqty += item.x_qty
      })
      this.formData.total_xqty = total_xqty
    },
    changeTj() {
      let tj = 0
      this.items.forEach(item => {
        tj += parseFloat(item.unit_tj)
      })
      this.formData.total_unit_tj = Number.parseFloat(tj.toFixed(2))
    },
    changeGw() {
      let gw = 0
      this.items.forEach(item => {
        gw += item.unit_gw
      })
      this.formData.total_unit_gw = gw
    },
    changeNw() {
      let nw = 0
      this.items.forEach(item => {
        nw += item.unit_nw
      })
      this.formData.total_unit_nw = nw
    },
    changeLineAmt() {
      let amt = 0
      this.items.forEach(item => {
        amt += parseFloat(item.line_amt)
      })
      this.formData.out_total_amt = amt.toFixed(2)
    },
    changeQTy() {
      let qty = 0
      this.items.forEach(item => {
        qty += item.qty
      })
      this.formData.out_total_qty = qty
    },
    handleCurrentChange(val) {
      if (this.itemDetails.length > 0) {
        const itemDetails = this.itemDetails
        for (let i = 0; i < itemDetails.length; i++) {
          const error = validate.dataObjectValidate(
            itemDetails[i],
            itemDetailRules
          )
          if (error) {
            this.$message({
              message:
                `报关商品明细 第 ${i + 1} 行 ` +
                error[Object.keys(error)[0]][0].message,
              type: 'warning',
              duration: 1000
            })
            return
          }
        }
        if (this.items[this.selectedHId]) {
          // 把数据更新到父表中
          this.items[
            this.selectedHId
          ].sale_customs_lineofsale_customs_h_lines.relationData = itemDetails
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
          if (
            item.customs_h_id === val.customs_h_id &&
            item.sale_customs_lineofsale_customs_h_lines &&
            item.sale_customs_lineofsale_customs_h_lines.relationData
          ) {
            itemDetails =
              item.sale_customs_lineofsale_customs_h_lines.relationData
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
    changePrice() {
      // 调整价格
      if (this.formData.part_amt === 0) {
        this.$message({
          message: '免费配件金额为0，不需要调整价格',
          type: 'warning'
        })
        return
      }
      this.recoverPriceBtn = false
      this.changePriceBtn = true
      const partamt = this.formData.part_amt
      let qty = 0
      this.items.forEach(item => {
        if (
          item.new_row !== '2' &&
          item.pro_type !== 4 &&
          item.sale_customs_lineofsale_customs_h_lines.relationData
        ) {
          item.sale_customs_lineofsale_customs_h_lines.relationData.forEach(
            element => {
              // if (element.pro_type === 2 || element.pro_type === 3) {
                qty += element.customs_qty
              // }
            }
          )
        }
      })
      this.items.forEach((item, index) => {
        if (item.new_row !== '2' && item.pro_type !== 4) {
          let price = 0
          if (item.sale_customs_lineofsale_customs_h_lines.relationData) {
            item.sale_customs_lineofsale_customs_h_lines.relationData.forEach(
              element => {                
                /** 无法判断pro_type和line_type判断的意义，根据现在的需求，【调整价格】和【恢复价格】统一可用，不区分类型 */
                // if (element.pro_type === 2 || element.pro_type === 3) {
                  element.customs_price = element.customs_price - partamt / qty
                  element.customs_amt =
                    element.customs_price * element.customs_qty
                  element.print_price = element.customs_price
                  price += element.customs_price
                // }
              }
            )
          }
          item.customs_price = price
          item.print_price = item.customs_price
          item.customs_amt = item.customs_price * item.customs_qty
        }
        this.$set(this.items, index, item)
      })
      this.itemDetails.forEach((item, index) => {
        this.$set(this.itemDetails, index, item)
      })
    },
    recoverPrice() {
      // 恢复价格
      this.recoverPriceBtn = true
      this.changePriceBtn = false
      this.items.forEach((item, index) => {
        /** 无法判断pro_type和line_type判断的意义，根据现在的需求，【调整价格】和【恢复价格】统一可用，不区分类型 */
        // if (item.pro_type > 0 && item.pro_type < 4 && item.line_type === 1) {
          item.customs_price = item.price
          item.print_price = item.customs_price
          item.customs_amt = item.customs_price * item.customs_qty
          if (item.sale_customs_lineofsale_customs_h_lines.relationData) {
            item.sale_customs_lineofsale_customs_h_lines.relationData.forEach(
              (element, i) => {
                // if (
                //   element.pro_type > 0 &&
                //   element.pro_type < 4 &&
                //   element.line_type === 1
                // ) {
                  element.customs_price = element.price
                  element.print_price = element.customs_price
                  element.customs_amt =
                    element.customs_price * element.customs_qty
                // }
              }
            )
          }
        // }
        this.$set(this.items, index, item)
      })
      this.itemDetails.forEach((item, index) => {
        this.$set(this.itemDetails, index, item)
      })
    },
    encryption() {
      this.items.forEach((item, index) => {
        if (item.brand_name) {
          item.brand_name_des = this.$md5(item.brand_name)
        }
        this.$set(this.items, index, item)
      })
    },
    cancelEncryption() {
      this.items.forEach((item, index) => {
        item.brand_name_des = null
        this.$set(this.items, index, item)
      })
    },
    async checkProductType() {
      // 获取工厂型号
      if (this.items.length === 0) {
        return
      }
      const res = await customsBillServer.checkProductType(this.items)
      this.items = res.data
      res.data.forEach((item, index) => {
        this.$set(this.items, index, item)
      })
    },
    quote() {
      if (!this.formData.cust_id) {
        this.$message({
          message: '请先选择出货预告号',
          type: 'warning'
        })
        return
      }
      this.showQuoteViewPopup = true
    },
    async updateQuoteInfo(data) {
      const res = await customsBillServer.get(data.customs_id)
      console.info('updateQuoteInfo: ', res)
      if (!res) {
        return
      }
      if (res.sale_customs_h_lineofsale_customs_header) {
        res.sale_customs_h_lineofsale_customs_header.forEach(item => {
          this.items.push({
            customs_h_id: this.items.length,
            $index: this.items.length,
            ...item
          })
        })
      }
      this.showQuoteViewPopup = false
    },
    addDetailBtn() {
      if (!this.formData.warn_id) {
        this.$message({
          message: '请先选择出货预告号',
          type: 'warning'
        })
        return
      }
      this.showAddDetailViewPopup = true
    },
    async PIPrint() {
      if (this.formData.warn_id) {
        let object = {
          id: this.formData.warn_id,
          userid: this.$store.getters.userCode
        }
        object = JSON.stringify(object)
        object = Base64.encode(object)
        const res = await containerServer.search({
          type: 'OMSIP'
        })
        
        const urlTo = res.data.data.OMSprod
        const url =
          urlTo + 'fssc_attachservlet?param0=sale_ship_warn_headerEdit&param1=' +
          object
        window.open(url)
      } else {
        this.$message({
          message: '请先选择有效的出货预告id',
          type: 'warning'
        })
      }
    },
    updateAddDetailInfo(data) {
      this.showAddDetailViewPopup = false
      if (
        data.sale_customs_lineofsale_customs_h_lines &&
        data.sale_customs_lineofsale_customs_h_lines.relationData
      ) {
        data.itemDetails =
          data.sale_customs_lineofsale_customs_h_lines.relationData
      }
      this.items.push({
        customs_h_id: this.items.length,
        $index: this.items.length,
        ...data
      })
    },
    close() {
      this.$emit('close')
    },
    getData() {
      return new Promise(async(s, j) => {
        this.loading = true
        try {
          const res = await customsBillServer.get(this.id)
          this.isEdit = true
          if (!res) {
            this.$message({
              message: '获取数据出错，请联系管理员',
              type: 'error'
            })
            this.loading = false
            return
          }
          if (res.stat === 99) {
            this.$emit('showSavePushBtn')
          }
          if (res.stat === 1 || res.stat === 5) {
            // 制单状态或已审核状态才显示作废按钮
            this.$emit('showVoid')
          }
          if (res.package_type === 0) {
            // 自动生成的包装类型为0，无对应值，转换为null
            res.package_type = null
          }
          res.notice_ids = res.notice_id.split(',')
          res.buyer_id = BuyerEnumUtil.toValue(res.buyer_name)
          res.disc_customs_type_id = DiscCustomsTypeEnumUtil.toValue(
            res.disc_customs_type
          )
          initFormData = res
          this.formData = {
            ...res
          }
          if (res.sale_customs_h_lineofsale_customs_header) {
            initItems = res.sale_customs_h_lineofsale_customs_header
            this.items = [...initItems]
            this.$refs.singleTable.setCurrentRow(initItems[0])
          }
          s()          
          this.changeAmt() // 总金额的变化
          this.changeTj() // 总体积的变化
          this.changeGw() // 总毛重的变化
          this.changeNw() // 总净重的变化
          this.loading = false
        } catch (e) {          
          j()
          this.loading = false
        }
      })      
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
                  message:
                    `报关商品 第 ${i + 1} 行 ` +
                    error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            try {         
              this.formData.sale_customs_h_lineofsale_customs_header = items
              if (this.formData.customs_id) {
                this.formData.deletedList = this.deletedList
                await customsBillServer.put(this.formData)   
                await this.getData()
                this.itemsSelection = []
              } else {
                this.formData.entid = this.$store.getters.entid
                const { data: { data: { dataSet: { rows: [res] }}}} = await customsBillServer.post(this.formData)

                // if (Number.parseInt(res.data.code) === 200) {
                //   // 新增保存成功后清空表单数据
                //   this.formData = { ...emptyFormData }
                // }
                this.formData.customs_id = res.customs_id
                this.$router.push({
                  path: './' + res.customs_id
                })
              }
              // initFormData = {
              //   ...this.formData
              // }
              // this.getData()
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
                id: this.formData.customs_id
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
        customsBillServer.delete(this.formData.customs_id).then(() => {
          this.$message({
            message: `删除 ${this.formData.customs_id} 成功`,
            type: 'success'
          })
          window.eventBus.$emit('closePage', 'CustomsBillEditPage')
        })
      })
    },
    resetData() {
      if (this.id) {
        this.formData = { ...emptyFormData }
        // this.items = [...initItems]
        // this.boxLine = [...initBoxLine]
        this.$refs.singleTable.setCurrentRow(initItems[0])
        this.getData()
      } else {
        this.formData = { ...emptyFormData }
        this.items = [...initItems]
        this.$refs.singleTable.setCurrentRow(initItems[0])
      }
    },
    clickAddItem() {
      this.items.push({
        customs_h_id: this.items.length,
        $index: this.items.length,
        ...itemEmptyData
      })
      this.items[this.items.length - 1].seq = this.items.length
      this.items.forEach((element, index) => {
        this.$set(this.items, index, element)
      })
    },
    selectionChangeItem(val) {
      this.itemsSelection = val
      console.log(val)
    },
    clickDeleteItem() {
      if (this.itemsSelection.length > 0) {
        // // 删除提示
        // this.$confirm('确定要删除选中数据吗？', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        const deletedList = []
        this.itemsSelection.forEach(item => {
          if (item.customs_id) {
            let has = false
            this.deletedList.forEach(element => {
              if (element.customs_id === item.customs_id) {
                has = true
              }
            })
            if (!has) {
              item.deleted = 1
              deletedList.push(item)
            }
          }
        })
        this.deletedList = [...deletedList, ...this.deletedList]
        this.deletedItem()
        // })
      } else {
        this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
      }
    },
    deletedItem() {
      this.itemsSelection.forEach(item => {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i] === item) {
            this.items.splice(i, 1)
            break
          }
        }
      })
      this.itemsSelection = []
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
          customsBillServer.deleteDetail(deleteIds).then(() => {
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
    async emitEvent({ key, params }) {
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
        case 'declare':
          this.declare()
          break
        case 'toVoid':
          this.toVoid()
          break
        case 'breakProcess':
          this.breakProcess()
          break
        case 'startProcess':
          return this.newStartProcess()
        case 'shareProcessInfo':
          return this.shareProcessInfo(params)
        default:
          break
      }
    },
    shareProcessInfo({ info: { nodeInfo = [] }}) {
      nodeInfo.forEach((infoItem) => {
        if (infoItem.status === 'awaiting_check') {
          this.curProcessNodeInfo = infoItem
        }
        if (Number.parseInt(infoItem.nodeOrder) === 1) {
          this.firstProcessNodeInfo = infoItem
        }
      })

      // 报关状态 == ‘放行后删单’ ，就显示 “中断” 按钮
      if (this.formData.customs_status === '10') {
        this.$emit('showBreak')

        // 如果符合审批人权限，就放开 “中断” 按钮的操作限制
        if (this.curProcessNodeInfo.nodeUserCode === localStorage.getItem('user')) {
          this.$emit('editableBreak')
        }
      }
    },
    diseditApplyOnline() {
      return this.curProcessNodeInfo.nodeOrder > 2
    },
    async newStartProcess() {
      return new Promise(async(resolve, reject) => {
        // 将当前行表数据保存到formData中
        if (!this.formData.application_unit || !this.formData.customs_house_name) {
          this.$message({
            message: '请填写报关行和申报地海关信息',
            type: 'warning'
          })
          return
        } else if (this.$refs.CustomsBillUpload.hasFiles === false) {
          this.$message({
            message: '请上传报关单附件',
            type: 'warning'
          })
          return
        }
        this.formData.sale_customs_h_lineofsale_customs_header = this.items
        if (initFormData !== this.formData) {
          // 如果当前表单数据与初始化数据不同，提示要先保存
          this.$confirm('单据数据需先保存才能提交，执行保存吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(async() => {
              // 同意保存，执行保存动作
              try {
                resolve(await this.saveBeforeStart())
              } catch (e) {
                reject(e)
              }
            })
            .catch(() => {
              // 不同意保存，断开流程
              reject()
            })
        } else {
          // 如果当前表单数据与初始化数据相同，检查当前数据实际发货数据是否相同
          try {
            resolve(await this.checkInfo())
          } catch (e) {
            reject(e)
          }
        }
      })
    },
    async saveBeforeStart() {
      return new Promise(async(resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            const items = this.items
            for (let i = 0; i < items.length; i++) {
              const error = validate.dataObjectValidate(items[i], itemRules)
              if (error) {
                this.$message({
                  message:
                    `报关商品 第 ${i + 1} 行 ` +
                    error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 5000
                })
                reject('error submit!!')
                return
              }
            }
            try {
              this.formData.sale_customs_h_lineofsale_customs_header = items
              this.formData.deletedList = this.deletedList
              await customsBillServer.put(this.formData)
              await this.getData()
              this.itemsSelection = []
            } catch (e) {
              this.$message({
                message: '保存失败 ' + e.message,
                type: 'error',
                duration: 5000
              })
              reject()
              return
            }
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            resolve()
          } else {
            this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
            reject()
          }
        })
      })
    },
    async checkInfo() {
      return new Promise(async(resolve, reject) => {
        const res = await customsBillServer.checkInfo(this.formData.customs_id)
        if (res.data.msg === 'T') {
          // 单据信息与实际发货信息相符
          resolve()
        } else {
          this.$confirm(
            res.data.msg,
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
            .then(() => {
              resolve()
            })
            .catch(() => {
              reject()
            })
        }
      })
    },
    async toVoid() {
      await customsBillServer.toVoid(this.formData.customs_id)
      this.getData()
      this.$emit('emitEvent', {
        key: 'update',
        params: {
          id: this.formData.customs_id
        }
      })
      this.$message({
        message: '修改成功',
        type: 'success'
      })
    },
    async breakProcess() {
      // 中断
      return new Promise(async(resolve, reject) => {
      this.$confirm('是否确认中断', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // 同意中断
          try {
            return resolve(await this.breakOffProgress())
          } catch (e) {
            return reject(e)
          }
        })
        .catch(() => {
          // 不同意中断
          return reject()
        })
      })
    },
    async breakOffProgress() {
      const res = await processServer.startProcess({
        action: 'reject',
        billId: this.id,
        billTypeId: 40085,
        userCode: this.firstProcessNodeInfo.nodeUserCode || '',	// 驳回到指定节点的审批人
        destination: this.firstProcessNodeInfo.nodeKey || '',	// 驳回指定节点的节点nodeKey
        opinion: ''
      })

      if (Number.parseInt(res.data.code) === 200) {
        this.delFiles = true
        this.$message({
          message: '中断成功',
          type: 'success'
        })

        // 中断成功之后，删除报关单附件
        this.deleteOrderedFiles()
        await this.getData()
        // 中断成功之后，更新流程
        this.$emit('emitEvent', {
          key: 'update',
          params: {
            id: this.formData.customs_id
          }
        })
      } else {
        this.$message({
          message: '中断失败',
          type: 'error'
        })
      }
    },
    deleteOrderedFiles() {
      const uploadModule = this.$refs.CustomsBillUpload
      uploadModule.tableData && uploadModule.tableData.forEach((fileItem) => {
        uploadModule.deleteRelateSilent(fileItem.fileCode)
      })
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
    hideNoticeNoSelect() {
      this.showNoticeNoSelect = false
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
.down-excel {
  margin-left: 10px;
}
.price-btn-box {
  text-align: right;
}
.file-div {
  margin-top: 12px;
}
.spanRight{
  margin-right: 30px
}
</style>
