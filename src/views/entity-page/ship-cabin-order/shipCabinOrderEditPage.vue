<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent">
        <template slot="right">
          <!-- <el-button v-loading="loading" type="primary" size="mini" @click="onClick('importCredit')">引用历史信用证</el-button> -->
          <!-- <el-button v-loading="loading" type="primary" size="mini" @click="onClick('confirmShipDate')">船期确认</el-button> -->
          <!-- <el-button v-loading="loading" type="primary" size="mini" @click="onClick('changeShipDate')">船期变更</el-button>        -->
          <!-- <el-button v-loading="loading" type="primary" size="mini" @click="onClick('returnShipDate')">船期反馈</el-button> -->
          <!-- <el-button v-loading="loading" type="primary" size="mini" @click="onClick('releaseShippingSpace')">已放舱</el-button> -->
          <!-- <el-button v-loading="loading" type="primary" size="mini" @click="onClick('bookingComplete')">订舱完成</el-button> -->
          <el-button v-loading="loading" v-if="!checkPermission(['ROLE_SUPER_FORWARDER'])" :disabled="isDisabled === true" type="primary" size="mini" @click="onClick('createBillOfLayding')">生成提单</el-button>
          <el-button v-loading="loading" v-if="!checkPermission(['ROLE_SUPER_FORWARDER'])" :disabled="isDisabled === true" type="primary" size="mini" @click="onClick('changeShipCabin')">变更</el-button>
          <el-button v-loading="loading" v-if="!checkPermission(['ROLE_SUPER_FORWARDER'])" :disabled="isDisabled === true" type="primary" size="mini" @click="onClick('walkthroughArkUpdate')">更新预排柜数据</el-button>
          <el-button v-loading="loading" v-if="!checkPermission(['ROLE_SUPER_FORWARDER'])" :disabled="isDisabled === true" type="primary" size="mini" @click="onClick('synchronizeLogisticsStatus')">同步物流状态</el-button>
          <el-button v-loading="loading" v-if="!checkPermission(['ROLE_SUPER_FORWARDER'])" :disabled="isDisabled === true" type="primary" size="mini" @click="onClick('saveCollectFees')">包干费用汇总保存</el-button>
          <!-- <el-button v-loading="loading" type="primary" size="mini" @click="onClick('doExport')">导出</el-button> -->
          <el-select v-model="downExcel" :disabled="isDisabled === true" class="down-excel" placeholder="导出" size="mini" style="max-width:4rem" @change="changeDown">
            <el-option :key="'托单'" :value="1" :label="'托单'"/>
            <el-option :key="'订舱委托书'" :value="2" :label="'订舱委托书'"/>
            <el-option :key="'拖柜通知书'" :value="3" :label="'拖柜通知书'"/>
            <el-option :key="'仓库分箱子明细'" :value="4" :label="'仓库分箱明细'"/>
            <el-option :key="'新仓单'" :value="5" :label="'新舱单'" :disabled="manifestDisabled"/>
            <el-option :key="'提货通知书'" :value="6" :label="'提货通知书'"/>
            <el-option :key="'费用标准反馈'" :value="7" :label="'费用标准反馈'"/>
          </el-select>
        </template>
      </ProcessInfoButton>
    </div>
    <ShipCabinOrderEdit 
      ref="shipCabinOrderEdit" 
      :id="id" 
      @loadingChange="loadingChange" 
      @emitEvent="emitEvent" 
      @changeManifestDisabled="changeManifestDisabled"
      @isDisableButton="isDisableButton" />
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40092"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>
  </div>
</template>

<script>
import ShipCabinOrderEdit from './../../../components/entity/ship-cabin-order/ShipCabinOrderEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  name: 'ShipCabinOrderEditPage',
  components: {
    ProcessInfoBlock,
    ShipCabinOrderEdit,
    ProcessInfoButton
  },
  data() {
    return {
      loading: false,
      manifestDisabled: true,
      id: null,
      isDisabled: false,
      downExcel: null,
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? parseInt(id) : null
  },
  methods: {
    checkPermission,
    changeManifestDisabled(disabled) {
      this.manifestDisabled = disabled
    },
    changeDown(val) {
      this.$refs.shipCabinOrderEdit.doExport(val)
    },
    save() {
      this.$refs.shipCabinOrderEdit.save()
    },
    resetData() {
      this.$refs.shipCabinOrderEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    },
    onClick(name) {
      this.emitEvent({ key: name })
    },
    isDisableButton(val) {
      this.isDisabled = val
    },
    async emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(async() => {
          await this.$refs.shipCabinOrderEdit.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
        }, 250)
      } else {
        await this.$refs.shipCabinOrderEdit.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
