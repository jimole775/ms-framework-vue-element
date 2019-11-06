<template>
  <div class="file-upload">
    <p class="title">{{ title }}</p>
    <el-upload
      :limit="10"
      :http-request="handlePost"
      :before-upload="beforeAvatarUpload"
      :on-error="onError"
      :show-file-list="false"
      action
      class="upload-box">
      <el-button type="primary" size="mini" @click="clickUpload">{{ btnText }}<i class="el-icon-upload el-icon--right"/></el-button>
    </el-upload>
    <template>
      <el-table
        v-if="tableData.length"
        :show-header="false"
        :data="tableData"
        :loading="loading"
        highlight-current-row
        class="m-t-12"
        style="width: 100%">
        <el-table-column prop="fileName" sortable min-width="95" label="附件名">
          <template slot-scope="scope">
            <a :href="'/file/api/1.0.0/file/down?fileCode=' + scope.row.fileCode" class="file-name" target="_self" download>{{ scope.row.fileName }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" sortable min-width="95" label="时间"/>
        <el-table-column prop="fileSize" sortable min-width="95" label="大小"/>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <i class="el-icon-delete" @click="clickDeleteBtn(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="tableData.length" class="m-w cen-box m-t-12">
        <el-pagination
          :current-page="page"
          :total="count"
          small
          layout="prev, pager, next"
          @current-change="pageNumberChange"/>
      </div>
    </template>
  </div>
</template>

<script>
import customsBillFileServer from './../../../api/customsBillFileServer'
import fileServer from './../../../api/fileServer'
export default {
  name: 'CustomsBillUpload',
  props: {
    id: {
      // 单据id
      type: String | Number,
      default: null
    },
    cpiNo: {
      type: String | Number,
      default: null
    },
    title: {
      // 组件标题
      type: String,
      default: '附件'
    },
    btnText: {
      // 上传按钮文案
      type: String,
      default: '上传'
    },
    tab: {
      // 单据tab页id
      type: Number,
      default: 0
    },
    delfiles: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      hasFiles: true,
      page: 1,
      count: 0,
      tableData: [],
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  watch: {
    id(value) {
      this.getFileData()
    }
  },
  created() {
    if (this.id) {
      this.getFileData()
    }
  },
  methods: {
    async getFileData() {
      const keyWord = {
        busCode: 'gen', // 单据类型id
        busNo: this.id, // 单据id 
      }
      const data = {
        keyWord,
        page: {
          startRow: (this.page - 1) * 10,
          endRow: this.page * 10
        }
      }
      const res = await fileServer.checkFile(data)
      this.tableData = res.data
      res.data.forEach((item, index) => {
        this.$set(this.tableData, index, item)
      })
      if (this.tableData.length === 0) {
        this.hasFiles = false
      } else {
        this.hasFiles = true
      }
      this.count = res.page.total
    },
    pageNumberChange(val) {
      this.page = val
      this.getFileData()
    },
    async handlePost(param) {
      const formData = new FormData()
      formData.append('appCode', 'auxhome-sdp')
      formData.append('fileCode', param.file)
      const res = await customsBillFileServer.uploadFile(formData, this.id, this.cpiNo)
      // this.relateFile(res.data.data)
      if (Number.parseInt(res.data.code) === 200) {
        if (res.data.data === 200) {
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.data.data,
            type: 'warning'
          })
        }
      }
      this.getFileData()
    },
    // async relateFile(fileCode) {
    //   // 单据与图片信息做关联
    //   const data = {
    //     fileCode,
    //     appCode: 'auxhome_sdp',
    //     tabNo: this.tab, // tab页标记
    //     busCode: 'gen', // 单据类型id
    //     busNo: this.id, // 单据id 
    //   }
    //   await fileServer.fileRelate(data)
    //   // 更新列表
    //   this.getFileData()
    // },
    clickUpload(event) {
      if (!this.id) {
        this.$message({
          message: '先保存单据才能上传对应附件',
          type: 'warning'
        })
        event.stopPropagation()
      }
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 128
      if (!isLt2M) {
        this.$message.error('上传文件不能超过 128MB!')
      }
      return isLt2M
    },
    onError() {
      this.$message.error({
        message: '上传失败',
        type: 'success'
      })
    },
    async clickDeleteBtn(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 解除关系
        this.deleteRelate(row.fileCode)
      })
    },
    async deleteRelate(fileCode) {
      await fileServer.deleteRelate(fileCode)
      if (!this.delfiles) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }
      // 更新列表
      this.getFileData()
    },
    async deleteRelateSilent(fileCode) {
      await fileServer.deleteRelate(fileCode)
      // 更新列表
      this.getFileData()
    },
  }
}
</script>

<style rel='stylesheet/scss' lang='scss' scoped>
  .file-upload{
    margin: 10px;
  }
  .el-icon-delete{
    color: red;
    cursor: pointer;
  }
  .title{
    margin: 5px 0;
  }
  .file-name{
    color: blue;
    cursor: pointer;
  }
</style>
