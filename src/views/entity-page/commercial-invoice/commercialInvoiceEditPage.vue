<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :show="showBtn" :loading="loading" @emitEvent="emitEvent">
        <template slot="left">
          <el-button
            v-loading="loading"
            type="primary"
            size="mini"
            @click="onClick('goToSpecialDocuments')"
          >跳转特殊申请单数据</el-button>
        </template>
        <template slot="right">
          <el-button
            v-loading="loading"
            v-if="isShowBc"
            type="primary"
            size="mini"
            @click="onClick('hcInvoice')"
          >红冲</el-button>

          <!-- <el-dropdown @command="handleCommand">
            <el-button type="primary" size="mini">
              导出<i class="el-icon-arrow-down el-icon--right" />
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">按单打印</el-dropdown-item>
              <el-dropdown-item command="b">按柜打印</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-select v-model="downExcel" class="down-excel" placeholder="导出" size="mini" style="max-width:4rem" @change="changeDown">
            <el-option :key="'本地'" :value="1" :label="'按单打印'"/>
            <el-option :key="'异地'" :value="2" :label="'按柜打印'"/>
          </el-select>
          <template>
            <el-radio v-model="radio" label="cbx1" @change="change">非中转</el-radio>
            <el-radio v-model="radio" label="cbx2" @change="change">中转</el-radio>
          </template>

          <template>
            <el-radio v-model="radio1" label="cbx4" @change="change1">按分体机</el-radio>
            <el-radio v-model="radio1" label="cbx3" @change="change1">按整机</el-radio>
          </template>

          <template>
            <el-checkbox-group v-model="checkList" size="mini" @change="changeCheckbox">
              <el-checkbox label="cbx5">TT</el-checkbox>
              <el-checkbox label="cbx6">LC,OA,DA,DP</el-checkbox>
              <el-checkbox label="chk1">按收货人</el-checkbox>
            </el-checkbox-group>
          </template>
        </template>
      </ProcessInfoButton>
    </div>
    <div class="container m-t-not">
      <!-- <CreditCertificateEdit
        ref="creditCertificateEdit"
        :id="id"
        @loadingChange="loadingChange"
        @emitEvent="emitEvent"
      />-->

      <CommercialInvoiceEdit
        ref="commercialInvoiceEdit"
        :id="id"
        @hideSubmitBtn="hideSubmitBtn"
        @loadingChange="loadingChange"
        @emitEvent="emitEvent"
        @isShowHcBtn="isShowHcBtn"
      />
    </div>
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40097"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>
    <!-- <CommercialInvoiceEdit ref="commercialInvoiceEdit" :id="id" @loadingChange="loadingChange" />     -->
  </div>
</template>

<script>
import CommercialInvoiceEdit from './../../../components/entity/commercial-invoice/CommercialInvoiceEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
// import request from '@/utils/request'
// import { getToken } from '@/api/qiniu'
import * as auth from '@/utils/auth'
export default {
  name: 'CommercialInvoiceEditPage',
  components: {
    CommercialInvoiceEdit,
    ProcessInfoBlock,
    ProcessInfoButton
  },
  data() {
    return {
      loading: false,
      downExcel: null,
      id: null,
      isShowBc: false,
      radio: 'cbx1',
      radio1: 'cbx4',
      checkList: ['cbx5', 'cbx6', 'chk1'],
      note: 'cbx1cbx4cbx5cbx6chk1',
      token: null,
      showBtn: 0
    }
  },
  created() {
    const id = parseInt(this.$route.params.id)
    this.id = id != null && id !== 'new' ? id : null
    this.token = auth.getToken()
  },
  methods: {
    changeDown(val) {
      this.$refs.commercialInvoiceEdit.doExport(val, this.note)
      setTimeout(() => {
        this.downExcel = '导出'
      }, 35)
    },
    change() {
      this.dealWithNote()
    },
    change1() {
      this.dealWithNote()
    },
    changeCheckbox() {
      this.dealWithNote
    },
    dealWithNote() {
      let str = null
      str = this.radio + this.radio1 + this.checkList.join()
      this.note = str
    },
    loadingChange(val) {
      this.loading = val
    },
    // 红冲
    onClick(name) {
      this.emitEvent({
        key: name
      })
    },
    isShowHcBtn(val) {
      this.isShowBc = val
    },
    hideSubmitBtn() {
      this.showBtn = 1
    },
    handleCommand(command) {
      this.$message('click on item ' + command)
    },
    async emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(async() => {
          await this.$refs.commercialInvoiceEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        await this.$refs.commercialInvoiceEdit.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  /deep/ .el-radio + .el-radio {
    margin-left: 0;
  }
  /deep/ .el-checkbox {
    margin-left: 8px;
  }
  /deep/ .el-checkbox-group {
    display: inline;
  }
  /deep/ .el-checkbox + .el-checkbox {
    margin-left: 5px;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
    padding-left: 5px;
  }
  /deep/ .el-checkbox__label {
    padding-left: 5px;
    font-size: 12px;
  }
  /deep/ .el-select {
    width: 80px;
  }
}
</style>
