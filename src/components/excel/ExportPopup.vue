<template>
  <div class="import-view">
    <el-dialog
      :visible="true"
      :width="windowWidth < 768 ? 'calc(100% - 24px)' : '60%'"
      title="数据导出"
      top="10vh"
      @close="close"
    >
      <div class="container">
        <el-form :inline="true" :model="keyword" class="demo-form-inline">
          <el-row>
            <el-col :lg="8" :md="12" :sm="12" :xs="24">
              <el-form-item label="文件名称">
                <el-input :placeholder="'默认excel-list'" v-model="keyword.filename" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12" :sm="12" :xs="24">
              <el-form-item label="自动列宽">
                <el-switch
                  v-model="keyword.autoWidth"
                  active-color="#13ce66"
                  inactive-color="#ff4949"/>
              </el-form-item>
            </el-col>
            <el-col :lg="8" :md="12" :sm="12" :xs="24">
              <el-form-item label="文件类型">
                <el-select v-model="keyword.bookType" style="width:120px;" >
                  <el-option
                    v-for="item in options"
                    :key="item"
                    :label="item"
                    :value="item"
                    size="mini"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="action-div">
        <el-button
          style="margin:0 0 20px 20px;"
          type="primary"
          icon="document"
          size="mini"
          @click="handleDownload">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
export default {
  name: 'ExportPopup',
  props: {
    list: {
      type: Array,
      default: null
    },
    tHeader: {
      type: Array,
      default: null
    },
    filterVal: {
      type: Array,
      default: null
    },
  },
  data() {
    return {
      keyword: {
        filename: '',
        autoWidth: true,
        bookType: 'xlsx'
      },
      options: ['xlsx', 'csv']
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    handleDownload() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = this.tHeader
        const filterVal = this.filterVal
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.keyword.filename,
          autoWidth: this.keyword.autoWidth,
          bookType: this.keyword.bookType
        })
        this.close()
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form-item {
    width: 100%;
    margin-right: 0;
    /deep/ .el-form-item__label {
      width: 90px;
    }
    /deep/ .el-form-item__content {
      width: calc(100% - 90px);
    }
  }
  .search-btn-item {
    /deep/ .el-form-item__content {
      width: auto;
      float: right;
    }
  }
  .action-div{
    text-align: center;
  }
</style>
