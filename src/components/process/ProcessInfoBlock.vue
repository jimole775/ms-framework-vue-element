<template>
  <div class="process-info-block">
    <el-steps :active="active" finish-status="success">
      <ProcessStep
        v-for="item in data.nodeInfo"
        :title="item.nodeName"
        :message="item.remark"
        :key="item.infoId"
      />
    </el-steps>

    <div class="m-t-12">
      <el-form
        :model="formData"
        class="demo-form-inline"
        label-position="right"
        label-width="120px"
      >
        <el-row>
          <el-col :md="8" :sm="12" :xs="24">
            <el-form-item label="分权引用">
              <el-switch v-model="formData.isPower" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <el-form-item label="无分权计数">
              <el-input v-model="formData.noPowersNum" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <el-form-item label="无分权引用占比">
              <el-input v-model="formData.noPowersRate" :disabled="true" size="mini"/>
            </el-form-item>
          </el-col>
          <el-col :xs="24">
            <el-form-item label="引用明细">
              <el-input 
                :autosize="{minRows: 3, maxRows: 8}"
                v-model="formData.referDetail" 
                :disabled="true" 
                type="textarea" 
                size="mini"/>
            </el-form-item>
          </el-col>
        </el-row> 
      </el-form> 
    </div>      

    <div class="m-t-12">
      <el-tabs type="border-card">
        <el-tab-pane label="流程详情">
          <el-table :data="data.nodeInfo" border style="width: 100%">
            <el-table-column type="index" label="序号"/>
            <el-table-column prop="nodeName" sortable min-width="150" label="节点名称"/>
            <el-table-column prop="nodeUserCode" sortable min-width="150" label="执行人列表"/>
            <el-table-column prop="status" sortable min-width="150" label="状态">
              <template slot-scope="scope">{{ scope.row.status | status }}</template>
            </el-table-column>
            <el-table-column prop="approverName" sortable min-width="150" label="实际审批人"/>
            <el-table-column prop="approveTime" sortable min-width="160" label="审批时间"/>
            <el-table-column prop="opinion" sortable min-width="200" label="审批意见"/>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <template v-for="button in buttons">
                  <el-button
                    v-if="button.key === 'turn' && scope.$index === active"
                    :key="button.key"
                    type="text"
                    size="small"
                    @click="openTransfer(scope.row)"
                  >转办</el-button>
                  <!--<el-button--> 
                  <!--v-if="button.key === 'turn'"-->
                  <!--:key="button.key"-->
                  <!--type="text"-->
                  <!--size="small"-->
                  <!--@click="clickViewBtn(scope.row)"-->
                  <!--&gt;-->
                  <!--修改审核人-->
                  <!--</el-button>-->
                </template>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="流程历史">
          <el-table :data="data.opinionInfo" border style="width: 100%">
            <el-table-column type="index" label="序号"/>
            <el-table-column prop="taskName" sortable min-width="150" label="节点名称"/>
            <el-table-column prop="status" sortable min-width="150" label="状态">
              <template slot-scope="scope">{{ scope.row.status | status }}</template>
            </el-table-column>
            <el-table-column prop="approverName" sortable min-width="150" label="实际审批人"/>
            <el-table-column prop="approveTime" sortable min-width="160" label="审批时间"/>
            <el-table-column prop="opinion" sortable min-width="200" label="审批意见"/>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    
    <el-dialog :visible.sync="isFQ" :close-on-click-modal="false" title="添加分权">
      <label class="FQ-class">分权引用</label>
      <el-switch v-model="isPower" style="margin-bottom: 10px;margin-left: 10px" size="mini" @change="powerChange"/>
      <el-input :rows="4" :disabled="!isPower" v-model="referDetail" type="textarea" placeholder="分权引用明细"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isFQ = false">取 消</el-button>
        <el-button :loading="loadingStep === true" type="primary" @click="startProcessAndFQ">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="agreeVisible" title="同意">
      <el-input :rows="4" v-model="remark" type="textarea" placeholder="处理意见"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="agreeVisible = false">取 消</el-button>
        <el-button :loading="loadingStep === true" type="primary" @click="agreeProcess">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="rejectVisible" title="驳回">
      <el-input :rows="4" v-model="remark" type="textarea" placeholder="处理意见"/>
      <el-table ref="agreedNodes" :data="agreedNodes" @selection-change="test" @row-click="toggleRow">
        <el-table-column width="50">
          <template slot-scope="scope">
            <el-radio
              v-model="checkedRejectNodeInfo.infoId"
              :label="scope.row.infoId">
              .
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50"/>
        <el-table-column prop="nodeName" sortable min-width="150" label="审批节点"/>
        <el-table-column prop="approverName" sortable min-width="160" label="审批人"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rejectVisible = false">取 消</el-button>
        <el-button type="primary" @click="rejectProcess">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="transferVisible" title="转办">
      <el-input v-model="transferKeyword" size="mini" placeholder="搜索" @change="searchUser"/>
      <el-table
        ref="singleTable"
        :loading="loadingUser"
        :data="userList.slice((currentPage-1) * pagesize,currentPage * pagesize)"
        class="m-t-12"
        highlight-current-row
        @current-change="transferCurrentSelectChange"
      >
        <el-table-column property="index" label="序号"/>
        <el-table-column property="name" label="姓名"/>
        <el-table-column property="date" label="部门"/>
      </el-table>
      <div class="m-w cen-box m-t-12">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pagesize"
          :total="userList.length"
          layout="total, sizes, prev, pager, next"
          @size-change="transferPaginationSizeChange"
          @current-change="transferPaginationCurrentChange"
        />
      </div>
      <el-input
        :rows="4"
        v-model="transferRemark"
        class="m-t-12"
        type="textarea"
        placeholder="转办说明"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="transferVisible = false">取 消</el-button>
        <el-button :loading="loadingUser" type="primary" @click="commitTransfer">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ProcessStep from './ProcessStep'
import processServer from './../../api/processServer'
import personServer from './../../api/personServer'
import Validate from './../../utils/validate'
import { getAccount } from '@/api/login'
const emptyFormData = {
  powersReference: true,
  referDetail: null,
  noPowersNum: null,
  noPowersRate: null,
}
const initFormData = {
  ...emptyFormData
}
export default {
  name: 'ProcessInfoBlock',
  components: {
    ProcessStep
  },
  filters: {
    status(val) {
      switch (val) {
        case 'start':
          return '发起流程'
        case 'awaiting_check':
          return '待审批'
        case 'agree':
          return '同意'
        case 'against':
          return '反对'
        case 'reject':
          return '驳回'
        case 'abandon':
          return '弃权'
        case 'retrieve':
          return '追回'
        case 'end':
          return '结束'
        case 'turn':
          return '转办'
        default:
          return val
      }
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    id: {
      type: String | Number,
      default: null
    },
    processId: {
      type: String | Number,
      default: null
    },
    boolRemark: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      active: 2,
      formData: {
        ...initFormData
      },
      data: {},
      rowCodeList: null, // 用户权限
      isSuperManager: false, // 是否是超级管理员
      buttons: [],
      remark: '',
      isFQ: false, // 提交时分权弹窗的打开
      isPower: false, // 提交时分权弹窗-是否分权
      referDetail: '',
      agreeVisible: false,
      rejectVisible: false,
      transferVisible: false,
      transferKeyword: '',
      currentRow: null,
      userList: [],
      loadingUser: true,
      currentPage: 1,
      pagesize: 10,
      loadingStep: false,
      transferRemark: '',
      transferUser: null,
      checkedRejectNodeInfo: {},
    }
  },
  computed: {
    agreedNodes() {
      const result = []
      this.data.nodeInfo && this.data.nodeInfo.forEach((node) => {
        if (node.status === 'agree') {
          result.push(node)
        }
      })
      return result
    }, 
  },
  watch: {
    id(value) {
      this.getData()
    }
  },
  created() {
    this.getData()
    this.getDecentralization()
  },
  methods: {
    powerChange(val) {
      if (!val) {
        this.referDetail = ''
      } else {
        this.referDetail = this.formData.referDetail
      }
    },
    toggleRow(row) {
      this.checkedRejectNodeInfo = row
    },
    test(a) {
      // console.log('test:', a)
    },
    async getDecentralization() {
      const res = await processServer.getDecentralization({
        billId: this.id,
        billTypeId: this.processId
      })
      this.formData = res.data[0]
    },
    async getData() {
      if (this.id != null && this.processId != null && !isNaN(this.id)) {
        const res = await processServer.get({
          billId: this.id,
          billTypeId: this.processId
        })
        
        if (res.data == null || !res.data.nodeInfo) {
          return
        }
        this.$emit('emitEvent', {
          key: 'shareProcessInfo',
          params: {
            info: res.data
          }
        }) 
        if (res.data.nodeInfo != null) {
          // console.log(res.data.nodeInfo)
          res.data.nodeInfo.sort((a, b) => {
            return a.nodeOrder - b.nodeOrder
          })
          res.data.nodeInfo.forEach((item, index) => {
            if (item.infoId === res.data.infoId) {
              this.active = index
            }
            if (item.nodeUserCode === null || item.nodeUserCode === '') {
              item.nodeUserCode = item.approverName
            }
          })
          if (res.data.nodeInfo.length - 1 === this.active) {
            // 只剩最后一个结束节点时，把最后一个节点也点亮
            this.active++
          }
        }
        const buttons = []
        await getAccount().then(response => {
          this.rowCodeList = response.data.data.roles
        })  
        for (let i = 0; i < this.rowCodeList.length; i++) {
          if (this.rowCodeList[i].roleCode === 'ROLE_SUPER_ADMIN') {
            this.isSuperManager = true
            break
          }
        }
        
        if (res.data.buttonList) {
          res.data.buttonList.forEach(button => {
            buttons.push({
              key: button.alias,
              name: button.name,
            })
          })
        } else {
          if (this.isSuperManager === true) {
            buttons.push({
              key: 'turn',
              name: '转办',
            })
          }
        }
       
        // 新单子默认给出提交按钮
        if (res.data.opinionInfo == null || res.data.opinionInfo.length <= 0) {
          buttons.push({
            key: 'start',
            name: '提交'
          })
        } else { 
          /**
           * 非新单子，如果是超管，或者第二个节点是操作人，直接给出‘终止’按钮
           */
          if (this.isSuperManager === true || 
            (res.data.nodeInfo[1]['nodeUserCode'] === localStorage.getItem('user') && 
            res.data.nodeInfo[1]['status'] === 'awaiting_check')) {
            buttons.push({
              key: 'abort',
              name: '终止',
            })
          }
        }
        this.buttons = buttons
        this.$emit('emitEvent', {
          key: 'changeProcessButton',
          params: {
            buttons
          }
        })
        this.data = res.data
      }
    },
    async emitEvent({ key }) {
      switch (key) {
        case 'startProcess': {
          this.referDetail = this.formData.referDetail // 分权应用明细初始打开弹窗制空
          const res = await processServer.getDecentralization({
            billId: this.id,
            billTypeId: this.processId
          })
          this.isPower = res.data[0].isPower // 获取分权默认值
          this.isFQ = true
          break
        }
        case 'agreeProcess':
          this.remark = ''
          this.agreeVisible = true
          break
        case 'rejectProcess':
          this.remark = ''
          this.rejectVisible = true
          break
        case 'abortProcess':
          this.abortProcess()
          break
        case 'update':
          this.getData()
          this.getDecentralization()
          break
        default:
          break
      }
    },
    async startProcessAndFQ() {
      this.loadingStep = true
      return new Promise((resolve, reject) => {
        if (this.formData.isPower === true && (this.formData.referDetail == null || this.formData.referDetail === '')) {
          this.$message({
            message: '请输入分权引入明细！',
            type: 'warning'
          })
          this.loadingStep = false
          reject('error submit!!')
        } else {
          resolve(this.doBeforStart())
        }
      })
    },
    async doBeforStart() {
      await processServer.postDecentralization({
        billId: this.id,
        billTypeId: this.processId,
        isPower: this.isPower,
        referDetail: this.referDetail
      })
      const query = {}
      if (Validate.isNotEmpty(this.id)) {
        query['billId'] = this.id
      }
      if (Validate.isNotEmpty(this.processId)) {
        query['billTypeId'] = this.processId
      }
      if (Validate.isNotEmpty(this.boolRemark)) {
        query['remark'] = this.boolRemark
      }
      await processServer.startProcess(query)
      this.isFQ = false
      this.$emit('emitEvent', {
        key: 'update'
      })
      this.$message({
        message: '启动成功',
        type: 'success'
      })
      this.loadingStep = false
    },
    async agreeProcess() {
      this.loadingStep = true
      this.agreeVisible = false
      await processServer.startProcess({
        action: 'agree',
        billId: this.id,
        billTypeId: this.processId,
        opinion: this.remark
      })
      this.$emit('emitEvent', {
        key: 'update',
        params: {
          agreeProcessDate: new Date()
        }
      })
      this.$message({
        message: '已同意',
        type: 'success'
      })
      this.loadingStep = false
    },
    async rejectProcess() {
      if (!this.remark) {
        this.$message({
          message: '请填写驳回理由',
          type: 'warning'
        })
      } else {
        this.rejectVisible = false
        const res = await processServer.startProcess({
          action: 'reject',
          billId: this.id,
          billTypeId: this.processId,
          userCode: this.checkedRejectNodeInfo.nodeUserCode,	// 驳回到指定节点的审批人
          destination: this.checkedRejectNodeInfo.nodeKey,	// 驳回指定节点的节点nodeKey
          opinion: this.remark
        })
        if (res && Number.parseInt(res.data.code) === 200) {
          this.$emit('emitEvent', { key: 'update' })
          this.$message({
            message: '驳回成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: `驳回失败,${res.data.msg}`,
            type: 'warning'
          })
        }
      }
    },
    async abortProcess() {
      this.$confirm('是否终止流程', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.abortVisible = false
        const res = await processServer.startProcess({
          action: 'MANUALEND',
          billId: this.id,
          billTypeId: this.processId,
          // userCode: this.checkedRejectNodeInfo.nodeUserCode,	// 驳回到指定节点的审批人
          // destination: this.checkedRejectNodeInfo.nodeKey,	// 驳回指定节点的节点nodeKey
          opinion: '流程终止'
        })
        
        if (res && Number.parseInt(res.data.code) === 200) {
          this.$emit('emitEvent', { key: 'update' })
          this.$message({
            message: '终止成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: `终止失败,${res.data.msg}`,
            type: 'warning'
          })
        }
      })
    },
    openTransfer(row) {
      this.transferRemark = ''
      this.transferUser = null
      this.currentRow = row
      this.searchUser()
      this.transferVisible = true
    },
    async searchUser() {
      this.loadingUser = true
      const res = await personServer.search({
        keyword: {
          name: this.transferKeyword
        }
      })
      res.data.forEach((item, index) => {
        item.index = index + 1
      })
      this.userList = res.data
      this.loadingUser = false
    },
    transferPaginationSizeChange(val) {
      this.pagesize = val
    },
    transferPaginationCurrentChange(val) {
      this.currentPage = val
    },
    transferCurrentSelectChange(row) {
      this.transferUser = row
    },
    async commitTransfer() {
      this.transferVisible = false
      if (!Validate.isNotEmpty(this.transferRemark)) {
        this.$message({
          message: '转办说明不能为空',
          type: 'warning'
        })
        return
      }
      if (this.transferUser == null) {
        this.$message({
          message: '请选择转办人',
          type: 'warning'
        })
        return
      }
      await processServer.startProcess({
        action: 'turn',
        billId: this.id,
        billTypeId: this.processId,
        opinion: this.transferRemark,
        userCode: this.transferUser.userCode
      })
      this.$message({
        message: '转办成功',
        type: 'success'
      })
      this.$emit('emitEvent', { key: 'update' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.process-info-block {
  /deep/ .el-dialog__header {
    padding: 12px !important;
  }
  /deep/ .el-dialog__body {
    padding: 12px !important;
  }
  /deep/ .el-dialog__footer {
    padding: 12px !important;
  }
  /deep/ .el-textarea__inner {
    padding: 5px 6px;
  }
}
.FQ-class {
  text-align: right;
  float: left;
  font-size: 14px;
  color: #606266;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>
