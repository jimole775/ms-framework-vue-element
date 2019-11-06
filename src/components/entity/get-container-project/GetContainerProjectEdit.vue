<template>
  <div class="max-w get-container-project-edit">
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
          <el-form-item label="计划单号" prop="billNo">
            <el-input v-model="formData.billNo" :disabled="true" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="年份月份" prop="pMonth">
            <el-date-picker
              v-model="formData.yearAndMonth"
              :disabled="formData.id != null && projectInfoList.length > 0"
              :clearable="false"
              size="mini"
              type="month"
              placeholder="选择日期"
              value-format="yyyyMM"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="制单人" prop="createUser">
            <el-input v-model="formData.createUser" :disabled="true" size="mini"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="经营单位" prop="entId">
            <OperateUnitSelect v-model="formData.entId" :disabled="true"/>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="微信推送人" prop="note">
            <el-input :rows="1" v-model="formData.note" type="textarea" placeholder="请更新微信推送人"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-tabs ref="tabs" v-model="activeName" type="border-card">
      <el-tab-pane label="拖柜计划数据" name="one">
        <el-form 
          v-show="formData.id"
          :inline="true" 
          :model="keyword2"
          class="demo-form-inline2" >
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="合同号">
                <el-input v-model="keyword2.piNo" :clearable="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="出货预告号">
                <el-input v-model="keyword2.warnNo" :clearable="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="协议货代">
                <el-input v-model="keyword2.transitName" :clearable="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="截关日">
                <el-date-picker
                  v-model="keyword2.cutDate"
                  :clearable="true"
                  size="mini"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="截单日">
                <el-date-picker
                  v-model="keyword2.singleDay"
                  :clearable="true"
                  size="mini"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
              <el-form-item class="search-btn-item">
                <el-button :loading="loading" type="primary" size="mini" @click="searchPlanDetails">查询</el-button>
                <el-button :loading="loading" size="mini" @click="resetSearch2">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row>
          <el-button
            :loading="loading"
            type="primary"
            icon="el-icon-plus"
            circle
            size="mini"
            @click="openShipmentNoticeSelect"
          />
          <el-button
            :loading="loading"
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="clickDeleteProjectInfoSelection"
          />
          <el-button
            :loading="loading"
            type="primary"
            icon="el-icon-download"
            circle
            size="mini"
            @click="exportLineGridData"
          />
        </el-row>
        <el-alert
          :closable="false"
          :title="`已选中 ${selectedRowsCount} 行数据`"
          class="m-t-12"
          type="info"
          show-icon
        />        
        <el-row class="custom-row">          
          <div ref="customLayout" class="layout">
            <ag-grid-vue 
              :column-defs="linecolumns" 
              :row-data="lineTableData"
              :grid-options="lineGridOptions"
              class="ag-theme-balham container-ag-table"/>
          </div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="拖柜计划明细" name="two">
        <el-table :data="formData.detailsEntities" border class="m-t-12">
          <el-table-column type="index" label="序号" width="50"/>
          <el-table-column property="planDate" label="计划日期" width="100"/>
          <el-table-column label="计划柜数" align="center">
            <el-table-column property="planContQtyJy" label="家用" width="80"/>
            <el-table-column property="planContQtySy" label="商用" width="80"/>
          </el-table-column>
          <el-table-column property="boxQty10" label="汇总" width="80">
            <template
              slot-scope="scope"
            >{{ scope.row.planContQtyJy * 1 + scope.row.planContQtySy * 1 }}</template>
          </el-table-column>          
          <el-table-column property="remarks" label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remarks" size="mini"/>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="拖柜日期汇总" name="three">
        <el-form 
          :inline="true" 
          :model="keyword"
          class="demo-form-inline2" >
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="合同号">
                <el-input v-model="keyword.piNo" :clearable="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="keyword.startDate"
                  :clearable="true"
                  size="mini"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="keyword.endDate"
                  :clearable="true"
                  size="mini"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item v-show="isExternalUser !== '内部用户'" label="显示全部">
                <el-switch v-model="keyword.isShowAllData" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
              <el-form-item class="search-btn-item">
                <el-button type="primary" size="mini" @click="searchDateOfRemove">查询</el-button>
                <el-button size="mini" @click="resetSearch">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>    
        <!-- <el-table v-loading="loading" :data="formData.towingTankSummaryEntities" max-height="550" border class="m-t-12">
          <el-table-column type="index" label="序号" width="50"/>
          <el-table-column property="entId" label="组织" width="100">
            <template slot-scope="scope" >{{ parseInt(scope.row.entId) | OperaUnitFilter }}</template>
          </el-table-column>
          <el-table-column property="warnNo" label="出货预告" width="180"/>
          <el-table-column property="piNos" label="合同编号" width="150"/>
          <el-table-column property="transitName" label="货代协议" width="250"/>
          <el-table-column property="orgName" label="部门" width="100"/>
          <el-table-column property="salesUserId" label="业务员" width="100"/>
          <el-table-column property="singleDay" label="截单日" width="120"/>
          <el-table-column property="cutDate" label="截关日" width="120"/>
          <el-table-column property="towingDate" label="拖柜日期" width="120"/>
          <el-table-column property="dateAm" label="上午(08:00-12:00)" width="150"/>
          <el-table-column property="datePm" label="下午(12:00-18:00)" width="150"/>
          <el-table-column property="dateEm" label="晚上(18:00-08:00)" width="150"/>
          <el-table-column property="note" label="备注" width="200"/>
        </el-table> -->
        <ag-grid-vue 
          :column-defs="summaryColumns" 
          :grid-options="summaryGridOptions"
          :row-data="summaryTableData"
          class="ag-theme-balham container-ag-table"/>
      </el-tab-pane>
      <el-tab-pane label="按日期汇总" name="four">
        <div class="max-w f-l">
          <el-checkbox-group
            v-model="dateCountParamChecks"
            class="f-l"
            @change="dateCountParamChange">
            <el-checkbox
              v-for="item in dateCountParam"
              :key="item.key"
              :label="item.key"
            >{{ item.label }}</el-checkbox>
          </el-checkbox-group>
          <el-button :loading="loading" class="m-l-12" type="primary" size="mini" @click="getDateCountTable">汇总</el-button>
        </div>
        <el-table :data="getContainerProjectCount" border class="m-t-12 f-l">
          <el-table-column type="index" label="序号" width="50"/>
          <el-table-column
            v-if="dateCountParamChecks.includes('towingDate')"
            property="towingDate"
            label="拖柜日期"
            width="100"
          />
          <el-table-column
            v-if="dateCountParamChecks.includes('entId')"
            property="entId"
            label="组织"
            width="80">
            <template slot-scope="scope" >{{ parseInt(scope.row.entId) | OperaUnitFilter }}</template>
          </el-table-column>
          <el-table-column
            v-if="dateCountParamChecks.includes('transitName')"
            property="transitName"
            label="货代协议"
            min-width="200"
          />
          <el-table-column property="locationJ" label="姜" width="80"/>
          <el-table-column property="locationM" label="茅" width="80"/>
          <el-table-column property="locationB" label="北" width="80"/>
          <el-table-column property="locationC" label="春" width="80"/>
          <el-table-column property="locationG" label="港" width="80"/>
          <el-table-column property="locationP" label="潘" width="80"/>
          <el-table-column label="合计" width="80">
            <template slot-scope="scope">
              {{ (scope.row.locationJ || 0) * 1 + (scope.row.locationM || 0) * 1 + (scope.row.locationB || 0) * 1 +
              (scope.row.locationC || 0) * 1 + (scope.row.locationG || 0) * 1 + (scope.row.locationP || 0) * 1 }}
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="区域分布汇总" name="five">
        <el-form class="demo-form-inline" label-position="right" label-width="60px">
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="时间">
                <el-date-picker
                  v-model="getAreaCountParams.date"
                  type="daterange"
                  size="mini"
                  placeholder="选择时间"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label-width="12px">
                <el-button
                  :loading="loading"
                  type="primary"
                  size="mini"
                  @click="getAreaCountTable"
                >查询</el-button>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-button
                :loading="loading"
                type="primary"
                @click="findPushMan"
              >获取微信推送人</el-button>
              <el-button
                :loading="loading"
                type="primary"
                @click="updatePushMan"
              >更新微信推送人</el-button>
              <el-button
                :loading="loading"
                type="primary"
                @click="weChatPush(1)"
              >微信推送</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="getAreaCount" border class="f-l" style="margin-top: -10px">
          <el-table-column type="index" label="序号" width="50"/>
          <el-table-column property="transitName" label="货代协议"/>
          <el-table-column property="locationJ" label="姜山" width="80"/>
          <el-table-column property="locationM" label="茅山" width="80"/>
          <el-table-column property="locationB" label="北仑" width="80"/>
          <el-table-column property="locationC" label="春晓" width="80"/>
          <el-table-column property="locationG" label="小港" width="80"/>
          <el-table-column property="locationP" label="潘火" width="80"/>
          <el-table-column property="Total" label="合计" width="80"/>
          <el-table-column property="locationOvernight" label="过夜" width="80"/>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="内部大区汇总" name="six">
        <el-form class="demo-form-inline" label-position="right" label-width="60px">
          <el-row>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label="时间">
                <el-date-picker
                  v-model="getInternalCountParams.date"
                  type="daterange"
                  size="mini"
                  placeholder="选择时间"
                />
              </el-form-item>
            </el-col>
            <el-col :lg="6" :md="8" :sm="12" :xs="24">
              <el-form-item label-width="12px">
                <el-button
                  :loading="loading"
                  type="primary"
                  size="mini"
                  @click="getInternalCountTable"
                >查询</el-button>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-button
                :loading="loading"
                type="primary"
                @click="findPushMan"
              >获取微信推送人</el-button>
              <el-button
                :loading="loading"
                type="primary"
                @click="updatePushMan"
              >更新更新推送人</el-button>
              <el-button
                :loading="loading"
                type="primary"
                @click="weChatPush(2)"
              >微信推送</el-button>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="getInternalCount" border class="f-l" style="margin-top: -10px">
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column property="orgName" label="大区" />
          <el-table-column property="locationJ" label="姜山" />
          <el-table-column property="locationM" label="茅山" />
          <el-table-column property="locationB" label="北仑" />
          <el-table-column property="locationC" label="春晓" />
          <el-table-column property="locationG" label="小港" />
          <el-table-column property="locationP" label="潘火" />
          <el-table-column property="Total" label="合计" />
          <el-table-column property="locationOvernight" label="过夜" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <ShipmentNoticeSelectPopup
      v-if="showShipmentNoticeSelect"
      size="mini"
      @close="showShipmentNoticeSelect = false"
      @confirm="confirmShipmentNoticeSelect"
    />
    <HDCopModal v-if="HDCopVisible" @close="HDCopVisible = false" @confirm="transitDialogConfirm"/>
  </div>
</template>

<script>
import './../../../../node_modules/ag-grid-community/dist/styles/ag-grid.css'
import './../../../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css'
import getContainerProjectServer from './../../../api/getContainerProjectServer'
import OperateUnitSelect from './../operate-unit/OperateUnitSelect'
import containerServer from './../../../api/containerServer'
import OperaUnitEnumUtil from './../../enum/opera-unit/OperaUnitEnumUtil2'
import ShippingCompanySelect from './../shipping-company/ShippingCompanySelect'
import datetime from './../../../utils/datetime'
import ShipmentNoticeSelectPopup from './../shipment-notice/ShipmentNoticeSelectPopup'
import { getAccount } from '@/api/login'
import { AgGridVue } from 'ag-grid-vue'
import 'ag-grid-enterprise'
import TableCellButton from './table-cell-components/TableCellButton'
import TableCellDate from './table-cell-components/TableCellDate'
import TableCellInput from './table-cell-components/TableCellInput'
import TableCellSelect from './table-cell-components/TableCellSelect'
import TableCellInputDialog from './table-cell-components/TableCellInputDialog'
import HDCopModal from './HDCopModal'
import { dateToDateStr } from '@/utils/datetime'
const initSearchParams = {
  piNo: null,
  startDate: null,
  endDate: null,
  userType: null,
  isShowAllData: true
}
const initSearchParams2 = {
  piNo: null,
  warnNo: null,
  transitName: null,
  cutDate: null,
  singleDay: null
}
const emptyFormData = {
  yearAndMonth:
    new Date().getMonth() > 8
      ? new Date().getFullYear().toString() +
        (new Date().getMonth() + 1).toString()
      : new Date().getFullYear().toString() +
        '0' +
        (new Date().getMonth() + 1).toString(),
  billNo: null,
  pYear: null,
  pMonth: null,
  createUser: null,
  note: null,
  entId: null
}
let initFormData = {
  ...emptyFormData
}
export default {
  name: 'GetContainerProjectEdit',
  components: {
    OperateUnitSelect,
    ShippingCompanySelect,
    ShipmentNoticeSelectPopup,
    AgGridVue,
    TableCellButton,
    TableCellDate,
    TableCellInput,
    TableCellSelect,
    HDCopModal,
    TableCellInputDialog,
  },
  filters: {
    OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      summaryColumns: [
        {
          headerName: '序号', 
          field: 'index', 
          width: 35, 
        },
        {
          headerName: '组织', 
          field: 'entId', 
          width: 45,
          cellRenderer: (params) => {
            const map = { 101: '家用', 102: '商用' }
            return map[params.value]
          },
        },
        {
          headerName: '出货预告', 
          field: 'warnNo',
          width: 130,
        },           
        {
          headerName: '合同编号', 
          field: 'piNos',
          width: 90,
        }, 
        {
          headerName: '协代', 
          field: 'transitName',
          width: 90,
        }, 
        {
          headerName: '部门', 
          field: 'orgName', 
          width: 70, 
        }, 
        {
          headerName: '业务', 
          field: 'salesUserId', 
          width: 60,
        },  
        {
          headerName: '截单日', 
          field: 'singleDay',
          width: 110,
        }, 
        {
          headerName: '截关日', 
          field: 'cutDate',
          width: 110,
        }, 
        {
          headerName: '拖柜日期', 
          field: 'towingDate',
          width: 110,
        }, 
        {
          headerName: '上午(08:00-12:00)', 
          field: 'dateAm',
          width: 110,
        }, 
        {
          headerName: '下午(12:00-18:00)', 
          field: 'datePm',
          width: 110,
        }, 
        {
          headerName: '晚上(18:00-08:00)', 
          field: 'dateEm',
          width: 110,
        }, 
        {
          headerName: '备注', 
          field: 'note',
          width: 110,
        }, 
      ],
      summaryGridOptions: {
        suppressNoRowsOverlay: true, // 去掉表格无数据提示            
        enableRangeSelection: true,     
        // suppressMultiRangeSelection: true,
        defaultColDef: {
          sortable: true,
          resizable: true,
          filter: true,
          // suppressMenu: true, // 隐藏表头菜单
        },
      },
      selectedRowsCount: 0,
      indexByTransitHit: null, // 编辑 协议货代 时，选中的行的下标
      lineGridOptions: {
        defaultColDef: {
          sortable: true,
          resizable: true,
          filter: true,
          // suppressMenu: true, 
          // columnGroupShow: true,
        },
        enableRangeSelection: true,
        getContextMenuItems: () => {
          return ['copy']
        },
        // suppressMultiRangeSelection: true,
        // rowSelection: 'multiple', // one of ['single','multiple'], leave blank for no selection
        // rowDeselection: false,
        suppressNoRowsOverlay: true, // 去掉表格无数据提示
        // 行选中回调
        onRowSelected: (options) => {
          const nodes = options.node.selectionController.selectedNodes
          this.selectedRowsCount = 0
          Object.keys(nodes).forEach((rowIndex) => {
            if (nodes[rowIndex]) {
              this.selectedRowsCount++
            }
          })
        },
      },
      linecolumns: [
        {
          headerName: '#', 
          width: 25, 
          checkboxSelection: true, 
          sortable: false,
          suppressMenu: true, 
          pinned: 'left',
        },
        {
          headerName: '序号', 
          field: 'index', 
          width: 35, 
          pinned: 'left',
        },
        {
          headerName: '状态', 
          field: 'stat', 
          width: 75,
          pinned: 'left',        
          list: [
            { val: 1, desc: '待拖柜' }, { val: 2, desc: '已拖柜' }, { val: 3, desc: '取消' }
          ],
          valueFormatter: (params) => {
            return { 1: '待拖柜', 2: '已拖柜', 3: '取消' }[params.value]
          },      
          cellRendererFramework: TableCellSelect,
        },
        {
          headerName: '组织', 
          field: 'entid',
          width: 45,
          pinned: 'left',
          valueFormatter: (params) => {
            // return params.data.a * 1000;
            const map = { 101: '家用', 102: '商用' }
            return map[params.value]
          },
          // cellRenderer: (params) => {
          //   const map = { 101: '家用', 102: '商用' }
          //   return map[params.value]
          // },
        },            
        {
          headerName: '完成情况', 
          field: 'completionStatus',
          width: 60,
          pinned: 'left',
          valueFormatter: (params) => {
            // return params.data.a * 1000;
            const map = { null: '', 1: '已完成', 2: '未完成', 3: '异常' }
            return map[params.value]
          },
          // cellRenderer: (params) => {
          //   const map = { null: '', 1: '已完成', 2: '未完成', 3: '异常' }
          //   return map[params.value]
          // },
        },
        {
          headerName: '合同编号', 
          field: 'piNos',
          width: 90,
          pinned: 'left'
        }, 
        {
          headerName: '协代', 
          field: 'transitName',
          width: 90,
          pinned: 'left',
          action: (params) => {
            this.HDCopVisible = true
            this.indexByTransitHit = params.rowIndex
          },
          cellRendererFramework: TableCellInputDialog,
        }, 
        {
          headerName: '船司', 
          field: 'towCopCode', 
          width: 78,
          pinned: 'left',
          editable: true,
          singleClickEdit: true,
        }, 
        {
          headerName: '截单日', 
          field: 'singleDay',
          width: 110,
          pinned: 'left',
          valueFormatter: (params) => {
            return dateToDateStr(params.value)
          },
          cellRendererFramework: TableCellDate,
        }, 
        {
          headerName: '截关日', 
          field: 'cutDate',
          width: 110,
          pinned: 'left',
          valueFormatter: (params) => {
            return dateToDateStr(params.value)
          },
          cellRendererFramework: TableCellDate,
        }, 
        {
          headerName: '箱量',
          children: [
            {
              headerName: '20GP',
              field: 'boxQty1',
              width: 55,
            },
            {
              headerName: '40GP',
              field: 'boxQty2',
              width: 55,               
            }, 
            {
              headerName: '40HQ',
              field: 'boxQty3',
              width: 55,
            }
          ]
        }, 
        {
          headerName: '出货预告', 
          field: 'warnNo',
          width: 130,
        }, 
        {
          headerName: '商检批次', 
          field: 'inspectionBatchno',
          width: 90,
        }, 
        {
          headerName: '到(预)付', 
          field: 'payStyle', 
          width: 110,
          valueFormatter: (params) => {
            return this.payStyleMap[params.value]
          },
        }, 
        {
          headerName: '业务', 
          field: 'salesUserId', 
          width: 60,
        }, 
        {
          headerName: '部门', 
          field: 'orgName', 
          width: 70,
        }, 
        {
          headerName: '大区', 
          field: 'areaName', 
          width: 60,
        }
      ],
      HDCopVisible: false,
      loading: false,
      formData: {
        ...initFormData
      },
      lineTitleInfos: [],
      keyword: {
        ...initSearchParams
      },
      keyword2: {
        ...initSearchParams2
      },
      activeName: 'one',
      isExternalUser: null,
      projectInfoDeletedList: [],
      projectInfoList: [],
      payStyleMap: {},
      dateCountParamChecks: ['towingDate', 'transitName', 'entId'],
      getContainerProjectCount: [],
      getAreaCount: [],
      getAreaCountParams: {
        date: null
      },
      getInternalCount: [],
      getInternalCountParams: {
        date: null
      },
      showShipmentNoticeSelect: false,
      dateCountParam: [
        {
          key: 'towingDate',
          label: '按拖柜日期'
        },
        {
          key: 'transitName',
          label: '按协议货代'
        },
        {
          key: 'entId',
          label: '组织'
        }
      ],
      rules: {
        billNo: [],
        pYear: [],
        pMonth: [],
        createUser: [],
        note: [
          {
            min: 0,
            max: 250,
            message: '长度在 0 到 250个字符',
            trigger: 'blur'
          }
        ],
        entId: []
      }
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    },
    summaryTableData() {
      // 动态添加下标(ag-grid-vue组件不支持显示下标)
      if (this.formData.towingTankSummaryEntities && this.formData.towingTankSummaryEntities.length) {
        this.formData.towingTankSummaryEntities.forEach((item, index) => {
          item.index = (index + 1)
        })
      }
      return this.formData.towingTankSummaryEntities
    },
    lineTableData() {
      // 动态添加下标(ag-grid-vue组件不支持显示下标)
      if (this.projectInfoList && this.projectInfoList.length) {
        this.projectInfoList.forEach((item, index) => {
          item.index = (index + 1)
        })
      }
      return this.projectInfoList
    }
  },
  watch: {
    loading(val) {
      this.$emit('loadingChange', val)
    },
  },
  async created() {
    emptyFormData.entId = parseInt(this.$store.getters.entid)
    const res = await containerServer.search({
      type: 'payStyle'
    })
    this.payStyleMap = res.data.data
    emptyFormData.createUser = this.$store.getters.userCode
    emptyFormData.operateUnitId = this.$store.getters.entid
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
    this.findUserInfo()
  },
  methods: {
    exportLineGridData() {
      const cache = [...this.lineTableData] // 先暂存原有数据
      this.lineTableData.forEach((row) => {
        row.stat = { 1: '待拖柜', 2: '已拖柜', 3: '取消' }[row.stat]
        row.entid = { 101: '家用', 102: '商用' }[row.entid]
        row.completionStatus = { null: '', 1: '已完成', 2: '未完成', 3: '异常' }[row.completionStatus]
        row.payStyle = this.payStyleMap[row.payStyle]
        row.singleDay = dateToDateStr(row.singleDay)
        row.cutDate = dateToDateStr(row.cutDate)
      })
      this.lineGridOptions.api.exportDataAsExcel()
      setTimeout(() => {
        this.lineTableData = [...cache]
      })
    },
    // 【拖柜计划数据】 选择"协代"时，模态框点击确定时的回调
    transitDialogConfirm(dialogSelectedRow) {
      this.projectInfoList[this.indexByTransitHit].transitId = dialogSelectedRow.id
      this.projectInfoList[this.indexByTransitHit].transitName = dialogSelectedRow.name
      this.$nextTick(() => {
      })
    },
    buildDateSeq(val) {
      val.forEach((date, index) => {
        // 给每个日期添加4个子项
        const model = {
          headerName: date,
          children: [
            {
              headerName: '上午(08:00-12:00)',
              field: 'dateAm' + (index + 1),
              width: 120,
              editable: true,
              singleClickEdit: true,
              // cellRendererFramework: TableCellInput,
            },
            {
              headerName: '下午(12:00-18:00)',
              field: 'datePm' + (index + 1),
              width: 120,
              editable: true,
              singleClickEdit: true,
              // cellRendererFramework: TableCellInput,
            }, 
            {
              headerName: '晚上(18:00-08:00)',
              field: 'dateEm' + (index + 1),
              width: 120,
              editable: true,
              singleClickEdit: true,
              // cellRendererFramework: TableCellInput,
            },
            {
              headerName: '备注',
              field: 'note' + (index + 1),
              width: 110,
              editable: true,
              singleClickEdit: true,
              // cellRendererFramework: TableCellInput,
            },
          ]
        }            
        this.linecolumns.push(model)
      })
    },
    close() {
      this.$emit('close')
    },
    async findUserInfo() {
      await getAccount().then(response => {
        this.isExternalUser = response.data.data.userType
      })
      if (this.isExternalUser === '外部用户') {
        this.$refs.tabs.$children[0].$refs.tabs[0].style.display = 'none'
        this.$refs.tabs.$children[0].$refs.tabs[1].style.display = 'none'
        this.$refs.tabs.$children[0].$refs.tabs[3].style.display = 'none'
        this.$refs.tabs.$children[0].$refs.tabs[4].style.display = 'none'
        this.$refs.tabs.$children[0].$refs.tabs[5].style.display = 'none'
        this.activeName = 'three'
      }
    },
    resetSearch() {
      this.keyword = {
        ...initSearchParams
      }
      this.searchDateOfRemove()
    },
    resetSearch2() {
      this.keyword2 = {
        ...initSearchParams2
      }
      this.searchPlanDetails()
    },
    async searchPlanDetails() {
      this.loading = true
      const params = JSON.parse(JSON.stringify(this.keyword2))
      await getAccount().then(response => {
        params.userType = response.data.data.userType
        params.sdpBillId = this.formData.id
      })
      const res = await getContainerProjectServer.searchPlanDetails(params)
      if (res.data) {
        this.projectInfoList = res.data.data
        this.projectInfoList.forEach((item, index) => {
          this.$set(this.projectInfoList, index, item)
        })
      } else {
        this.projectInfoList = []
      }
      this.loading = false
    },
    async searchDateOfRemove() { // 查询拖柜计划日期汇总的数据
      this.loading = true
      const params = JSON.parse(JSON.stringify(this.keyword))
      await getAccount().then(response => {
        params.userType = response.data.data.userType
        params.sdpBillId = this.formData.id
      })
      const res = await getContainerProjectServer.searchDateOfRemove(params)
      this.formData.towingTankSummaryEntities = res.data.data
      this.loading = false
    },
    async weChatPush(tab) {
      if (this.formData.note) {
        const params = {}
        if (tab === 1) {
          params['date'] = this.getAreaCountParams.date
        } else if (tab === 2) {
          params['date'] = this.getInternalCountParams.date
        }
        params['entId'] = this.$store.getters.entid
        params['type'] = tab
        params['pushMan'] = this.formData.note
        const res = await getContainerProjectServer.weChatPush(params)
        if (Number.parseInt(res.data.code) === 200) {
          this.$message({
            message: '微信推送成功',
            type: 'success'
          })
        }
      } else {
        this.$message({
          massage: '当前操作微信推送人不能为空',
          type: 'warning'
        })
      } 
    },
    async findPushMan() {
      const res = await getContainerProjectServer.findPushMan()
      if (Number.parseInt(res.data.code) === 200) {
        if (res.data.data[0].dictvalue !== '' && res.data.data[0].dictvalue !== null) {
          this.formData.note = res.data.data[0].dictvalue
        } else {
          this.$message({
            message: '未获取到当前推送人',
            type: 'warning'
          })
        }
      }
    },
    async updatePushMan() {
      if (this.formData.note !== '' && this.formData.note !== null) {
        const res = await getContainerProjectServer.updatePushMan(this.formData.note)
        if (Number.parseInt(res.data.code) === 200) {
          this.$message({
            message: '微信推送人已更新',
            type: 'success'
          })
        }
      } else {
        this.$message({
          message: '当前微信推送人不能为空',
          type: 'warning'
        })
      }
    },
    dateAdd(day, val) {
      const date = new Date(day.getTime() + (24 * 60 * 60 * 1000) * val)
      const weekDay = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'] 
      return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日' + '(' + weekDay[date.getDay()] + ')' 
    },
    async getData() {
      this.loading = true
      let userTypeTo = null
      await getAccount().then(response => {
        userTypeTo = response.data.data.userType
      })
      const res = await getContainerProjectServer.get(
        this.formData.id, userTypeTo
      )
      initFormData = res.data
      let yearAndMonth = ''
      if (res.data.pMonth > 8) {
        yearAndMonth = `${res.data.pYear}` + `${res.data.pMonth}`
      } else {
        yearAndMonth = `${res.data.pYear}` + `0${res.data.pMonth}`
      }
      const monthStartDate = new Date(res.data.pYear, (res.data.pMonth - 1), 1)
      const year1 = res.data.pYear
      let month1 = res.data.pMonth
      month1 = parseInt(month1, 10)
      const monthDays = new Date(year1, month1, 0).getDate()
      for (let i = 0; i < monthDays; i++) {
        this.lineTitleInfos[i] = this.dateAdd(monthStartDate, i)
      } 

      this.formData = {
        ...res.data,
        yearAndMonth: yearAndMonth
      }
      const lineEntities = JSON.parse(JSON.stringify(res.data.lineEntities))
      // const currentDate = new Date(this.formData.yearAndMonth)
      // const lastDay = this.getLastDay(currentDate)
      lineEntities.forEach(project => {
        project.singleDay = project.singleDay
          ? new Date(project.singleDay)
          : null
        project.cutDate = project.cutDate ? new Date(project.cutDate) : null
        // project.days = []
        // for (let i = 1; i <= 31; i++) {
        //   project.days.push({
        //     dateAm: project[`dateAm${i}`],
        //     datePm: project[`datePm${i}`],
        //     dateEm: project[`dateEm${i}`],
        //     note: project[`note${i}`]
        //   })
        //   if (lastDay <= i) {
        //     break
        //   }
        // }
      })
      this.projectInfoList = lineEntities
      this.projectInfoList.forEach((item, index) => {
        this.$set(this.projectInfoList, index, item)
      })
      if (!this.buildDateSeq.hasRunOnce) {
        this.buildDateSeq.hasRunOnce = true
        this.buildDateSeq(this.lineTitleInfos)
      }
      this.loading = false
      // this.getDateCountTable()
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.lineGridOptions.api.stopEditing()
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            this.loading = true
            this.projectInfoDeletedList.forEach(item => {
              item.deleted = 1
            })
            const lineEntities = [
              ...this.projectInfoList,
              ...this.projectInfoDeletedList
            ]
            lineEntities.forEach(item => {
              if (item.billId == null && item.deleted == null) {
                item.$state = 1
                item.deleted = 0
              } else {
                item.$state = 2
              }
              item.singleDay =
                item.singleDay && item.singleDay.length > 0
                  ? datetime.dateToDateStr(item.singleDay)
                  : null
              item.cutDate =
                item.cutDate && item.cutDate.length > 0
                  ? datetime.dateToDateStr(item.cutDate)
                  : null
            })
            this.formData.lineEntities = lineEntities
            try {
              if (this.formData.id) {
                await getContainerProjectServer.put(this.formData)
              } else {
                const res = await getContainerProjectServer.post(this.formData)
                if (Number.parseInt(res.data.code) === 200) {
                  // 新增保存成功后清空表单数据
                  this.formData = { ...emptyFormData }
                }
                this.formData.id = res.data.data
                this.$router.push({
                  path: '/CW-manage/get-container-project/edit/' + this.formData.id
                })
              }
              this.loading = false
            } catch (e) {
              this.loading = false
              reject(e)
              return
            }
            initFormData = {
              ...this.formData
            }
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.getData()
            this.loading = false
            this.projectInfoDeletedList = []
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
    resetData() {
      if (this.id) {
        this.formData = {
          ...initFormData
        }
        this.projectInfoList = []
        this.getAreaCount = []
        this.getData()
      } else {
        this.formData = {
          ...initFormData
        }
      }
    },
    getLastDay(date) {
      const year = date.getFullYear()
      let month = date.getMonth()
      // 取当前的年份
      let new_year = year
      // 取下一个月的第一天，方便计算（最后一天不固定）
      let new_month = month++
      // 如果当前大于12月，则年份转到下一年
      if (month > 11) {
        // 月份减
        new_month = 0
        // 年份增
        new_year++
      }
      // 取当年当月中的第一天
      const new_date = new Date(new_year, new_month + 1, 1)
      // 获取当月最后一天日期
      return new Date(new_date.getTime() - 1000 * 60 * 60 * 24).getDate()
    },
    dateCountParamChange() {
      // this.getDateCountTable()
    },
    async getDateCountTable() {
      this.loading = true
      try {
        const res = await getContainerProjectServer.getDateCountTable({
          sdpBillId: this.formData.sdpBillId,
          transitName: true,
          towingDate: true
        })
        if (res.data) {
          this.getContainerProjectCount = res.data
        } else {
          this.getContainerProjectCount = []
        }
        this.getContainerProjectCount.forEach((item, index) => {
          this.$set(this.getContainerProjectCount, index, item)
        })
      } finally {
        this.loading = false
      }
    },
    async getAreaCountTable() {
      this.loading = true
      try {
        const res = await getContainerProjectServer.getAreaCountTable({
          sdpBillId: this.formData.sdpBillId,
          date: this.getAreaCountParams.date,
          entId: this.$store.getters.entid
        })
        if (res.data) {
          this.getAreaCount = res.data
        } else {
          this.getAreaCount = []
        }
        this.getAreaCount.forEach((item, index) => {
          this.$set(this.getAreaCount, index, item)
        })
      } finally {
        this.loading = false
      }
    },
    async getInternalCountTable() {
      this.loading = true
      try {
        const res = await getContainerProjectServer.getInternalCountTable({
          sdpBillId: this.formData.sdpBillId,
          date: this.getInternalCountParams.date,
          entId: this.$store.getters.entid
        })
        if (res.data) {
          this.getInternalCount = res.data
        } else {
          this.getInternalCount = []
        }
        this.getInternalCount.forEach((item, index) => {
          this.$set(this.getInternalCount, index, item)
        })
      } finally {
        this.loading = false
      }
    },
    confirmShipmentNoticeSelect(newList) {
      const projectInfoList = this.projectInfoList
      const projectInfoDeletedList = this.projectInfoDeletedList
      newList.forEach(item => {
        for (let i = 0; i < projectInfoList.length; i++) {
          if (
            projectInfoList[i].warnId === item.warnid &&
            item.warnid != null
          ) {
            return
          }
        }
        for (let i = 0; i < projectInfoDeletedList.length; i++) {
          if (
            projectInfoDeletedList[i].warnId === item.warnid &&
            item.warnid != null
          ) {
            projectInfoDeletedList[i].deleted = 0
            this.projectInfoList.push(projectInfoDeletedList[i])
            projectInfoDeletedList.splice(i, 1)
            return
          }
        }
        const data = {
          orgId: parseInt(item.orgid),
          orgName: item.orgname,
          orgCode: item.orgcode,
          warnId: item.warnid,
          stat: 1,
          entid: parseInt(item.entid),
          piNos: item.pino,
          transitName: item.transitname,
          transitCode: item.transitcode,
          transitId: parseInt(item.transitid),
          towcopid: parseInt(item.towcopid),
          towCopCode: item.towcopcode,
          towCopName: item.towcopname,
          singleDay: item['cutoffdate'] ? item['cutoffdate'] : null,
          cutDate: item['cutdate'] ? item['cutdate'] : null,
          boxQty1: parseInt(item.boxtype1),
          boxQty2: parseInt(item.boxtype2),
          boxQty3: parseInt(item.boxtype3) + parseInt(item.boxtype4) + parseInt(item.boxtype5),
          boxQty4: parseInt(item.boxtype4),
          boxQty5: parseInt(item.boxtype5),
          boxQty6: parseInt(item.boxtype6),
          boxQty7: parseInt(item.boxtype7),
          boxQty8: parseInt(item.boxtype8),
          boxQty9: parseInt(item.boxtype9),
          boxQty10: parseInt(item.boxtype10),
          warnNo: item.warnno,
          payStyle: item.paystyle,
          salesUserId: item.salesuserid,
          areaName: item.areaname,
          inspectionBatchno: item.inspectionbatchno,
        }
        this.projectInfoList.push(data)
        this.showShipmentNoticeSelect = false
      })
    },
    clickDeleteProjectInfoSelection() {
      const newList = []
      const selectedNodes = this.lineGridOptions.api.selectionController.selectedNodes

      // 设置所有 将要删除 的行 deleted 为 1
      Object.keys(selectedNodes).forEach((rowIndex, loopIndex) => {
        if (selectedNodes[rowIndex]) this.projectInfoList[rowIndex].deleted = 1
      })

      this.projectInfoList.forEach(item => {
        if (item.deleted === 1) {          
          this.projectInfoDeletedList.push(item)
        } else {
          newList.push(item)
        }
      })

      this.selectedRowsCount = 0
      this.projectInfoList = newList
    },
    openShipmentNoticeSelect() {
      if (this.formData.yearAndMonth == null) {
        this.$message({
          message: '请先选择年份月份',
          type: 'warning'
        })
        return
      }
      this.showShipmentNoticeSelect = true
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
.get-container-project-edit{
  .demo-form-inline2{
    .el-form-item {
      width: 100%;
      margin-right: 0;
      margin-bottom: 10px;
      /deep/ .el-form-item__label {
        width: 90px !important;
      }
      /deep/ .el-form-item__content {
        width: calc(100% - 90px);
      }
    }
  }
  .project-info-title {
    width: 100px;
    padding-right: 6px;
    text-align: right;
    float: left;
    margin-bottom: 12px;
  }

  .project-info-content {
    width: calc(100% - 106px);
    float: left;
    margin-bottom: 12px;
  }

  .el-date-editor.el-input {
    width: 100%;
  }

  .el-range-editor {
    width: 100%;
  }

  .el-table {
    /deep/ .cell {
      padding: 3px;
      padding-left: 3px !important;
    }
  }
  .search-btn-item {
    /deep/ .el-form-item__content {
      width: auto;
      float: right;
    }
  }
  .custom-row {
    overflow: hidden;
    font-size: 0.8rem;
    text-align: center;
    .layout {
      max-height: 450px;
      overflow: auto;
    }
    table { 
      border:1px solid #EBEEF5;
      th {
        color: #909399;
        background-color: #f4f4f5;      
      }
      th,td{
        border-right:1px solid #EBEEF5;
        border-bottom:1px solid #EBEEF5;
        padding:5px;
        overflow: hidden;
        word-break: break-all;
      }
    }
    .fakcer-head {
      background: #EBEEF5;
      z-index: 2;
      position: absolute;
      top: 0;
      left: 0;
    }
    .fakcer-left {
      background: #fff;
      z-index: 3;
      position: absolute;
      top: 0;
      left: 0;
    }
    .real-table {
      z-index: 1;
      position: relative;
    }
  }
  .container-ag-table {
    height: 400px;
    width: 100%;
  }
  .ag-cell{
    padding: 0 3px;
    text-align: left;
    .el-input--suffix .el-input__inner,.el-input--mini .el-input__inner {
      height: 22px;
      line-height: 22px;
      border: 0;
    }
  }
  .ag-header-cell{    
    padding: 0 3px;
    text-align: left;
  }
  .ag-menu-list .ag-menu-option span.ag-menu-option-text{
    text-align: left
  }
}
</style>
