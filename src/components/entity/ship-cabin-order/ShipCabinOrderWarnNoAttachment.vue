<template>
  <div v-show="tableData.length >= 1" class="file-upload">
    <p class="title">{{ title }}</p>
    <el-table v-if="tableData.length" :show-header="false" :data="tableData" :loading="loading" highlight-current-row class="m-t-12" style="width: 100%">
      <el-table-column prop="fileName" sortable min-width="25%" label="附件名">
        <template slot-scope="scope">
          <a :href="scope.row.docUrl" class="file-name" target="_self" download>{{ scope.row.docName }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="omsCreateTime" sortable min-width="25%" label="时间" />
      <el-table-column prop="oldsize" sortable min-width="50%" label="大小" />
    </el-table>
    <div class="m-w cen-box m-t-12">
      <el-pagination :current-page="page" :total="count" small layout="prev, pager, next" @current-change="pageNumberChange" />
    </div>
  </div>
</template>

<script>
import shipCabinOrderServer from './../../../api/shipCabinOrderServer'
export default {
  name: 'ShipCabinOrderWarnNoAttachment',
  props: {
    id: {
      // 单据id
      type: String | Number,
      default: null,
      required: true
    },
    title: {
      type: String,
      default: '附件'
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      count: 0,
      tableData: [
        // { docName: '形式发票.pdf', docUrl: 'http://100.100.10.166:82/downloadfile.do?docid=1206441', bookingId: 634 }
      ]
    }
  },
  watch: {
    id(val) {
      if (val !== null) {
        this.getFileData()
      }
    }
  },
  methods: {
    async getFileData() {
      const keyWord = {
        bookingId: this.id, // 单据id
      }
      const data = {
        keyWord,
        page: {
          startRow: (this.page - 1) * 10,
          endRow: this.page * 10
        }
      }
      const res = await shipCabinOrderServer.queryWarnNoAttahment(data)

      this.tableData = res.data.dataSet.rows
      this.tableData.forEach((item, index) => {
        let oldsize = item.oldsize
        if (oldsize !== null) {
          oldsize = (item.oldsize / 1000).toFixed(2)
          item.oldsize = item.oldsize > 0 ? oldsize + 'KB' : item.oldsize + 'B'
        }
        this.$set(this.tableData, index, item)
      })
      this.count = res.data.dataSet.page.total
      // this.$emit('uploadedFiles', this.tableData)
    },
    pageNumberChange(val, event) {
      this.page = val
      this.getFileData()
    }
  }
}
</script>

<style>
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
