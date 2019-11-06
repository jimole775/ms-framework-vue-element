<template>
  <div>
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '80%'"
      title="品名编辑-view"
      top="10vh"
      @close="close">
      <el-row>
        <div :lg="24" :md="24" :sm="24" :xs="24" class="item-box-name">
          <el-tag
            v-for="tag in itemList"
            :key="tag.finLcItemName"
            :disable-transitions="false"
            closable
            @close="handleClose(tag.finLcItemName)">
            {{ tag.finLcItemName }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="mini"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"/>
          <el-button v-else class="button-new-tag" size="mini" @click="showInput">
            + 品名
          </el-button>
          <div class="action-box">
            <div class="f-r">
              <el-button type="primary" size="mini" @click="save">保存</el-button>
            </div>
          </div>
        </div>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'ItemListEditViewPopup',
  props: {
    itemList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      deletedList: [],
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
    // 
  },
  methods: {
    handleClose(name) {
      let index = null
      const deletedList = []
      this.itemList.forEach((item, i) => {
        if (item.finLcItemName === name) {
          index = i
          if (item.finLcItemId) {
            item.delete = 1
            deletedList.push(item)
          }
        }
      })
      this.deletedList = deletedList
      if (index !== null) {
        this.itemList.splice(index, 1)
      }
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      const list = this.itemList.filter(item => item.finLcItemName === inputValue)
      if (inputValue && list.length === 0) {
        this.itemList.push({ finLcItemName: inputValue })
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    save() {
      const list = {
        itemList: this.itemList,
        deletedList: this.deletedList
      }
      this.$emit('updateInfo', list)
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .item-box-name{
    display: block;
    padding: 5px;
    margin-bottom: 10px;
    .item-box-title{
      padding: 5px 0 5px 5px;
    }
  }
  .el-input--mini{
    width: 90px;
  }
  .el-tag--medium{
    margin-right: 10px;
    margin-bottom: 5px;
  }
</style>
