<template>
  <div>
    <div class="container">
      <ProcessInfoButton ref="processInfoButton" :id="id" :show="showBtn" :loading="loading" @emitEvent="emitEvent">
        <template slot="right">
          <!-- <el-button v-loading="loading" type="primary" size="mini" @click="onClick('declare')">报关</el-button> -->
          <el-button v-loading="loading" v-if="showBreakBtn" :disabled="!editBreakBtn" type="warning" size="mini" @click="onClick('breakProcess')">中断</el-button>
          <el-button v-loading="loading" v-if="id && showVoidBtn" type="primary" size="mini" @click="onClick('toVoid')">作废</el-button>
          <el-select v-model="downExcel" class="down-excel" placeholder="导出" size="mini" @change="changeDown">
            <a :href="'/auxhome/sdp/api/1.0.0/ecpFile/exportCustomsExcel?customsId=' + id" class="file-name" target="_self" download>
              <el-option :key="'本地'" :value="1" :label="'本地'"/>
            </a>
            <a :href="'/auxhome/sdp/api/1.0.0/ecpFile/exportCustomsExcel?sflag=99&customsId=' + id" class="file-name" target="_self" download>
              <el-option :key="'异地'" :value="2" :label="'异地'"/>
            </a>
            <a :href="'/auxhome/sdp/api/1.0.0/ecpFile/exportShippingBoxExcel?customsId=' + id" class="file-name" target="_self" download>
              <el-option :key="'查验清单'" :value="3" :label="'查验清单'"/>
            </a>
            <el-option :key="'PI打印'" :value="4" :label="'PI打印'"/>
          </el-select>
        </template>
      </ProcessInfoButton>
    </div>
    <CustomsBillEdit ref="customsBillEdit" :id="id" @loadingChange="loadingChange" @showVoid="showVoid" @showSavePushBtn="showSavePushBtn" @showBreak="showBreak" @editableBreak="editableBreak"/>
    <div class="container m-t-not">
      <ProcessInfoBlock
        ref="ProcessInfoBlock"
        :id="id"
        :process-id="40085"
        :loading="loading"
        @emitEvent="emitEvent"
      />
    </div>
  </div>
</template>

<script>
import CustomsBillEdit from './../../../components/entity/customs-bill/CustomsBillEdit'
import ProcessInfoBlock from './../../../components/process/ProcessInfoBlock'
import ProcessInfoButton from './../../../components/process/ProcessInfoButton'
export default {
  name: 'CustomsBillEditPage',
  components: {
    ProcessInfoBlock,
    ProcessInfoButton,
    CustomsBillEdit
  },
  data() {
    return {
      loading: false,
      showVoidBtn: false,
      showBreakBtn: false,
      editBreakBtn: false,
      showBtn: 0,
      downExcel: null,
      id: null
    }
  },
  created() {
    const id = this.$route.params.id
    this.id = id != null && id !== 'new' ? parseInt(id) : null
  },
  methods: {
    showVoid() {
      this.showVoidBtn = true
    },
    showSavePushBtn() {
      this.showBtn = 1
    },
    showBreak() {
      this.showBreakBtn = true
    },
    editableBreak() {
      this.editBreakBtn = true
    },
    changeDown() {
      if (this.downExcel === 4) {
        this.$refs.customsBillEdit.PIPrint()
      }
    },
    onClick(name) {
      this.emitEvent({
        key: name
      })
    },
    async emitEvent(event) {
      if (event.key === 'update' && event.params != null && event.params.id != null) {
        this.id = event.params.id
        setTimeout(async() => {
          await this.$refs.customsBillEdit.emitEvent(event)
          this.$refs.ProcessInfoBlock.emitEvent(event)
          this.$refs.processInfoButton.emitEvent(event)
        }, 250)
      } else {
        await this.$refs.customsBillEdit.emitEvent(event)
        this.$refs.ProcessInfoBlock.emitEvent(event)
        this.$refs.processInfoButton.emitEvent(event)
      }
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .down-excel{
    margin-left: 10px;
  }
</style>
