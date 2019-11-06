<template>
  <div class="container m-t-not">
    <template>
      <el-form
        :model="formData"
        :ref="'formData'"
        :rules="rules"
        class="demo-form-inline"
        label-position="right"
        label-width="120px">
        <el-table
          :data="mergeTableData"
          border
          class="merge-table"
          style="width: 100%">
          <el-table-column
            type="index"
            width="55"
            label="序号"/>
          <el-table-column
            show-overflow-tooltip
            prop="lcNo"
            sortable
            min-width="130"
            label="信用证号"/>
          <el-table-column
            show-overflow-tooltip
            prop="amtDist"
            sortable
            min-width="130"
            label="已分配金额"/>
          <!-- <el-table-column
            show-overflow-tooltip
            prop="yIncAmt"
            sortable
            min-width="100"
            label="原始金额"/> -->
          <el-table-column
            show-overflow-tooltip
            prop="incAmt"
            sortable
            min-width="80"
            label="金额"/>
          <el-table-column
            show-overflow-tooltip
            prop="factAmt"
            sortable
            min-width="115"
            label="实际金额"/>
          <el-table-column
            show-overflow-tooltip
            prop="adjustAmt"
            sortable
            min-width="150"
            label="调整金额">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.adjustAmt" :step="1" size="mini" @change="changeAdjustAmt(scope.$index)"/>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="adjustedAmt"
            sortable
            min-width="140"
            label="调整后金额"/>
          <el-table-column
            show-overflow-tooltip
            prop="itemList"
            sortable
            min-width="115"
            label="品名">
            <template slot-scope="scope">
              <span class="item-list" @click="changeItemList(scope.$index, scope.row.itemList)">{{ scope.row.itemListName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="clickDeleteBtn(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </template>
    <component
      v-if="showAddCreditViewPopup"
      :is="'CreditViewPopup'"
      @updateInfo="updateCreditInfo"
      @close="showAddCreditViewPopup = false"
    />
    <component
      v-if="showItemListEditViewPopup"
      :is="'ItemListEditViewPopup'"
      :item-list="editItemList"
      @updateInfo="updateItemList"
      @close="showItemListEditViewPopup = false"
    />
  </div>
</template>

<script>
import creditMergeServer from './../../../api/creditMergeServer'
import validate from './../../../utils/validate'

const initSearchParams = {
  createTimeStart: null,
  createTimeEnd: null,
  creditNo: null,
  tradeName: null,
  name: null,
}
const mergeTableDataRules = {
  adjustAmt: [
    { message: '调整金额 不能为0', validate: validate.isNotZero },
  ],
}
let initFormData = {
  hisList: []
}
export default {
  name: 'CreditMergeEdit',
  components: {
    CreditViewPopup: () => import('./CreditViewPopup.vue'),
    ItemListEditViewPopup: () => import('./ItemListEditViewPopup.vue'),
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      keyword: {
        ...initSearchParams
      },
      showAddCreditViewPopup: false,
      formData: {},
      rules: {},
      editIndex: null,
      editItemList: [],
      showItemListEditViewPopup: false,
      page: 1,
      size: 5,
      count: 0,
      pageSize: [5, 10, 20, 30, 40, 50],
      mergeTableData: [],
      multipleSelection: [],
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  watch: {
    id(val) {
      if (val !== this.initFormData.mergeId) {
        this.getData()
      }
    },
    loading(val) {
      this.$emit('loadingChange', val)
    }
  },
  created() {
    if (this.id) {
      this.getData()
    } else {
      initFormData = {
        hisList: []
      }
      this.mergeTableData = []
    }
  },
  methods: {
    changeAdjustAmt(index) {
      // 调整后金额=金额+调整金额
      this.mergeTableData[index].adjustedAmt = this.mergeTableData[index].adjustAmt + this.mergeTableData[index].incAmt
      this.mergeTableData.forEach((item, index) => {
        this.$set(this.mergeTableData, index, item)
      })
    },
    updateItemList(list) {
      this.showItemListEditViewPopup = false
      this.mergeTableData.forEach((item, index) => {
        if (index === this.editIndex) {
          item.itemList = list.itemList
          item.deletedList = list.deletedList
          item.itemListName = list.itemList.map(e => e.finLcItemName).join(',')
        }
        this.$set(this.mergeTableData, index, item)
      })
    },
    updateCreditInfo(list) {
      this.showAddCreditViewPopup = false
      const mergeData = this.mergeTableData
      list.forEach((item, index) => {
        let exist = false
        // 判断该信用证是否在当前合并列表中，用信用证号做判断
        this.mergeTableData.forEach((element, i) => {
          if (item.lcNo === element.lcNo) {
            exist = true
          }
        })
        // 如果该信用证不在当前列表中，将其添加进来
        if (!exist) {
          item.yIncAmt = null
          // item.adjustAmt = 0
          item.adjustDirection = 0
          item.deletedList = []
          item.itemListName = item.itemList.map(e => e.finLcItemName).join(',')
          mergeData.push(item)
        }
      })
      this.mergeTableData = []
      mergeData.forEach((item, index) => {
        this.$set(this.mergeTableData, index, item)
      })
    },
    addDataView() {
      this.showAddCreditViewPopup = true
    },
    close() {
      this.$emit('close')
    },
    changeItemList(index, itemList) {
      this.editIndex = index
      this.editItemList = [...itemList]
      this.showItemListEditViewPopup = true
    },
    async getData() {
      this.loading = true
      try {
        const res = await creditMergeServer.get(this.id)
        this.mergeTableData = []
        if (res.hisList) {
          res.hisList.forEach((item, index) => {
            item.deletedList = []
            item.itemListName = item.itemList.map(e => e.finLcItemName).join(',')
            this.$set(this.mergeTableData, index, item)
          })
        }
        initFormData = { ...res }
        this.formData = {
          ...initFormData
        }
        this.loading = false
      } catch (e) {
        this.loading = false
      }
    },
    clickDeleteBtn(row) {
      this.mergeTableData = this.mergeTableData.filter(item => item.lcNo !== row.lcNo)
      this.mergeTableData.forEach((item, index) => {
        this.$set(this.mergeTableData, index, item)
      })
    },
    async save() {
      return new Promise((resolve, reject) => {
        this.$refs['formData'].validate(async valid => {
          if (valid) {
            if (this.mergeTableData.length < 2) {
              this.$message({
                message: '至少需要2个信用证',
                type: 'warning',
                duration: 1000
              })
              return
            }
            const mergeTableData = this.mergeTableData
            // 信用证合并中金额增加的信用证数量
            let countIn = 0
            let adjustAmtAll = 0
            for (let i = 0; i < mergeTableData.length; i++) {
              const error = validate.dataObjectValidate(mergeTableData[i], mergeTableDataRules)
              if (error) {
                this.$message({
                  message: `第 ${i + 1} 行 ` + error[Object.keys(error)[0]][0].message,
                  type: 'warning',
                  duration: 1000
                })
                return
              }
              adjustAmtAll += mergeTableData[i].adjustAmt
              if (mergeTableData[i].adjustAmt > 0) {
                countIn++
                // 修改增加或减少的标志
                mergeTableData[i].adjustDirection = 1
              }
            }
            if (countIn > 1) {
              this.$message({
                message: '最多只能有一个信用证调整金额为正数',
                type: 'warning',
                duration: 1000
              })
              return
            } else if (countIn === 0) {
              this.$message({
                message: '至少需要有一个信用证调整金额为正数',
                type: 'warning',
                duration: 1000
              })
              return
            }
            if (adjustAmtAll !== 0) {
              this.$message({
                message: '所有信用证的调整金额之和需为0',
                type: 'warning',
                duration: 1000
              })
              return
            }
            this.formData.hisList = mergeTableData
            if (this.formData.mergeId) {
              const res = await creditMergeServer.put(this.formData)
              if (res.data.code !== 200) {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                })
                return
              }
            } else {
              this.formData.entid = this.$store.getters.entid
              const res = await creditMergeServer.post(this.formData)
              if (Number.parseInt(res.data.code) === 200) {
                // 新增保存成功后清空表单数据
                this.formData = {}
                this.mergeTableData = []
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning'
                })
                return
              }
              this.$router.push({
                path: './' + res.data.data.mergeId
              })
            }
            initFormData = {
              ...this.formData
            }
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            resolve({
              ...this.mergeTableData
            })
          } else {
            this.$message({
              message: '请确认所有必填字段',
              showClose: true,
              type: 'warning'
            })
            reject('error submit!!')
          }
        })
      })
    },
    emitEvent({ key }) {
      switch (key) {
        case 'saveFormData':
          this.save()
          break
        case 'resetData':
          this.resetData()
          break
        case 'update':
          this.getData()
          break
        case 'addDataView':
          this.addDataView()
          break
        default:
          break
      }
    },
    resetData() {
      this.mergeTableData = [
        ...initFormData
      ]
      this.mergeTableData = []
      initFormData.hisList.forEach((item, index) => {
        this.$set(this.mergeTableData, index, item)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-form-item {
    width: 100%;
    margin-right: 0;
  }
  .el-form-item {
    width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
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
  .merge-table{
    margin-bottom: 10px;
  }
  .item-list{
    cursor: pointer;
  }
</style>
