<template>
  <div v-if="Number.isInteger(billType)" class="file-upload">
    <p class="title">{{ title }}</p>
    <el-upload v-if="form=='外部文件'" :limit="10" :http-request="handlePost" :before-upload="beforeAvatarUpload" :on-error="onError" :show-file-list="false" :disabled="restrict" action class="upload-box">
      <el-button type="primary" size="mini" @click="clickUpload">
        {{ btnText }}
        <i class="el-icon-upload el-icon--right" />
      </el-button>
    </el-upload>
    <el-upload v-else-if="hidden==false&&form==='内部文件'" :http-request="handlePost" :before-upload="beforeAvatarUpload" :on-error="onError" :show-file-list="false" action class="upload-box">
      <el-button type="primary" size="mini" @click="clickUpload">
        {{ btnText }}
        <i class="el-icon-upload el-icon--right" />
      </el-button>
    </el-upload>
    <el-upload v-else :limit="10" :http-request="handlePost" :before-upload="beforeAvatarUpload" :on-error="onError" :show-file-list="false" action class="upload-box">
      <el-button type="primary" size="mini" @click="clickUpload">
        {{ btnText }}
        <i class="el-icon-upload el-icon--right" />
      </el-button>
    </el-upload>
    <template>
      <el-table v-if="tableData.length" :show-header="false" :data="tableData" :loading="loading" highlight-current-row class="m-t-12" style="width: 100%">
        <el-table-column prop="fileName" sortable min-width="25%" label="附件名">
          <template slot-scope="scope">
            <a :href="'/file/api/1.0.0/file/down?fileCode=' + scope.row.fileCode" class="file-name" target="_self" download>{{ scope.row.fileName }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" sortable min-width="25%" label="时间" />
        <el-table-column prop="fileSize" sortable min-width="25%" label="大小" />
        <el-table-column label="操作" min-width="25%">
          <template slot-scope="scope">
            <i v-if="hidden==false" class="el-icon-delete" @click="clickDeleteBtn(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <div v-if="tableData.length" class="m-w cen-box m-t-12">
        <el-pagination :current-page="page" :total="count" small layout="prev, pager, next" @current-change="pageNumberChange" />
      </div>
    </template>
  </div>
</template>

<script>
import fileServer from './../../api/fileServer'
import BillTypeEnumUtil from './../enum/bill-type/BillTypeEnumUtil'
export default {
  name: 'FileUpload',
  props: {
    id: {
      // 单据id
      type: String | Number,
      default: null
    },
    billName: {
      // 单据类型名称
      type: String,
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
    isCustomBill: {
      type: Boolean,
      default: false
    },
    tab: {
      // 单据tab页id
      type: Number,
      default: 0
    },
    conceal: {
      type: Boolean,
      default: false
    },
    astrict: {
      type: Boolean,
      default: true
    },
    form: {
      type: String,
      default: '附件'
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      count: 0,
      tableData: [],
    }
  },
  computed: {
    billType() {
      return BillTypeEnumUtil.toValue(this.billName)
    },
    windowWidth() {
      return this.$store.getters.width
    },
    hidden() {
      return this.conceal
    },
    restrict() {
      return this.astrict
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
        busCode: this.billType, // 单据类型id
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
      res.data = res.data.filter(item => item.tabNo === this.tab)
      this.tableData = res.data
      let res2 = null
      if (this.isCustomBill === true) {
        const keyWord = {
          busCode: 'pre', // 单据类型id
          busNo: this.id, // 单据id
        }
        const data1 = {
          keyWord,
          page: {
            startRow: (this.page - 1) * 10,
            endRow: this.page * 10
          }
        }
        res2 = await fileServer.checkFile(data1)
        if (res2.data) {
          this.tableData = this.tableData.concat(res2.data)
        }
      }
      this.tableData.forEach((item, index) => {
        this.$set(this.tableData, index, item)
      })
      this.count = res.page.total
      this.$emit('uploadedFiles', this.tableData)
    },
    pageNumberChange(val) {
      this.page = val
      this.getFileData()
    },
    async handlePost(param) {
      const formData = new FormData()
      formData.append('appCode', 'auxhome-sdp')
      formData.append('fileCode', param.file)
      const res = await fileServer.uploadFile(formData)
      this.relateFile(res.data.data)
      this.$message({
        message: '上传成功',
        type: 'success'
      })
    },
    async relateFile(fileCode) {
      // 单据与图片信息做关联
      const data = {
        fileCode,
        appCode: 'auxhome_sdp',
        tabNo: this.tab, // tab页标记
        busCode: this.billType, // 单据类型id
        busNo: this.id, // 单据id
      }
      await fileServer.fileRelate(data)
      // 更新列表
      this.getFileData()
    },
    clickUpload(event) {
      if (!this.id) {
        this.$message({
          message: '先保存单据才能上传对应附件',
          type: 'warning'
        })
        event.stopPropagation()
      } else {
        if (this.restrict && this.form === '外部文件') {
          this.$message({
            message: '当前账户权限不足',
            type: 'warning'
          })
        }
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
    onError(msg) {
      if (!msg.message) {
        this.$message.error({
          message: '上传失败',
          type: 'success'
        })
      }
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
      this.$message({
        message: '删除成功',
        type: 'success'
      })
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
.file-upload {
  margin: 10px;
}
.el-icon-delete {
  color: red;
  cursor: pointer;
}
.title {
  margin: 5px 0;
}
.file-name {
  color: blue;
  cursor: pointer;
}
</style>
