<template>
  <div class="container">
    <ProcessInfoButton ref="processInfoButton" :id="id" :loading="loading" @emitEvent="emitEvent">
      <template slot="right">
        <!-- <el-button v-loading="loading" type="primary" size="mini" @click="onClick('changeShipDate')">船期变更</el-button>        -->
        <el-button v-loading="loading" v-if="isInnerUser" :disabled="isDisabled === true" type="primary" size="mini" @click="onClick('createBillOfLayding')">生成提单</el-button>
        <el-button v-loading="loading" v-if="isInnerUser" :disabled="isDisabled === true" type="primary" size="mini" @click="onClick('changeShipCabin')">变更</el-button>
        <el-button v-loading="loading" v-if="isInnerUser" :disabled="isDisabled === true" type="primary" size="mini" @click="onClick('walkthroughArkUpdate')">更新预排柜数据</el-button>
        <el-button v-loading="loading" v-if="isInnerUser" :disabled="isDisabled === true" type="primary" size="mini" @click="onClick('synchronizeLogisticsStatus')">同步物流状态</el-button>
        <el-button v-loading="loading" v-if="isInnerUser" :disabled="isDisabled === true" type="primary" size="mini" @click="onClick('saveCollectFees')">包干费用汇总保存</el-button>
        <!-- <el-button v-loading="loading" v-show="isInnerUser && isStatus === 10" type="primary" size="mini" @click="onClick('cancelTheChange')">取消变更</el-button> -->
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
    <ShipCabinOrderChangeEdit 
      ref="shipCabinOrderChangeEdit" 
      :id="id" 
      @loadingChange="loadingChange" 
      @emitEvent="emitEvent" 
      @changeManifestDisabled="changeManifestDisabled" 
      @changeIsStatus="changeIsStatus"
      @isDisableButton="isDisableButton"/>
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
import ShipCabinOrderChangeEdit from './../../../components/entity/ship-cabin-order/ShipCabinOrderChangeEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
import checkPermission from '@/utils/permission' // 权限判断函数

export default {
  name: 'ShipCabinOrderChangeEditPage',
  components: {
    ShipCabinOrderChangeEdit,
    ProcessInfoBlock,
    ProcessInfoButton
  },
  data() {
    return {
      loading: false,
      manifestDisabled: true,
      isDisabled: false,
      downExcel: null,
      id: null,
      isStatus: null
    }
  },
  computed: {
    isInnerUser() {
      return this.$store.getters.userType !== '外部用户'
    },
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
    changeIsStatus(val) {
      this.isStatus = val
    },
    changeDown(val) {
      this.$refs.shipCabinOrderChangeEdit.doExport(val)
    },
    isDisableButton(val) {
      this.isDisabled = val
    },
    // setIdOld(id) {
    //   debugger
    //   this.idOld = id
    // },
    save() {
      this.$refs.shipCabinOrderChangeEdit.save()
    },
    resetData() {
      this.$refs.shipCabinOrderChangeEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    },
    changeOrder() {
      this.$refs.shipCabinOrderChangeEdit.changeOrder()
    },
    cancelOrder() {
      this.$refs.shipCabinOrderChangeEdit.cancelOrder()
    },
    onClick(name) {
      this.emitEvent({ key: name })
    },
    async emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(async() => {
          await this.$refs.shipCabinOrderChangeEdit.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
        }, 250)
      } else {
        await this.$refs.shipCabinOrderChangeEdit.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
