<template>
  <div class="max-w back">
    <div class="container m-t-not">
      <el-tabs type="border-card">
        <el-tab-pane label="家用组织">
          <el-row>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="addHouseHold" />
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="delHouseHold" />
            <el-button type="primary" icon="el-icon-check" size="mini" class="f-r">保存</el-button>
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${houseHoldUseSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="houseHoldTickets"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeHouseHoldTicket"
          >
            <el-table-column type="selection" />
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column
              prop="code"
              label="公司编码" />
            <el-table-column
              prop="companyName"
              label="船务公司名称" />
            <el-table-column
              prop="hdType"
              label="货代类型">
              <template slot-scope="scope">
                {{ scope.row.hdType | HdTypeFilter }}
              </template>
            </el-table-column>  
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="商用组织">
          <el-row>
            <el-button type="primary" icon="el-icon-plus" circle size="mini" @click="addBusinessUse" />
            <el-button type="danger" icon="el-icon-delete" circle size="mini" @click="delBusinessUse" />
            <el-button type="primary" icon="el-icon-check" size="mini" class="f-r" >保存</el-button>
          </el-row>
          <el-alert
            :closable="false"
            :title="`已选中 ${businessUSeSelection.length} 行数据`"
            class="m-t-12"
            type="info"
            show-icon
          />
          <el-table
            :data="businessUseTickets"
            :loading="loading"
            class="m-t-12"
            border
            @selection-change="selectionChangeBusinessUseTicket"
          >
            <el-table-column type="selection" />
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column
              prop="code"
              label="公司编码" />
            <el-table-column
              prop="companyName"
              label="船务公司名称" />
            <el-table-column
              prop="hdType"
              label="货代类型" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <CompanyChoose v-if="CompanyChoosePopup" @confirm="confirmInfo" @close="CompanyChoosePopup = false" />
  </div>
</template>
<script>
  import CompanyChoose from './../../../components/entity/company/CompanyChoose'
  import HdTypeFilterUtil from './../../../components/enum/company-choose/HdTypeChooseUtil'
  // const houseHoldData = {
  //   code: null,
  //   companyName: null,
  //   Type: null
  // }
  const businessUseData = {
    code: null,
    companyName: null,
    Type: null
  }
  export default {
    name: 'FreightForwardManagement',
    filters: {
      HdTypeFilter: HdTypeFilterUtil.toTitleFilter,
    },
    components: {
      CompanyChoose
    },
    data() {
      return {
        loading: false,
        houseHoldTickets: [],
        houseHoldUseSelection: [],
        businessUseTickets: [],
        businessUSeSelection: [],
        CompanyChoosePopup: false
      }
    },
    computed: {
      windowWidth() {
        return this.$store.getters.width
      }
    },
    created() {
      // this.getData()
    },
    methods: {
      confirmInfo(chooseData) {
        console.log(chooseData)
        this.CompanyChoosePopup = false
        for (let i = 0; i < chooseData.length; i++) {
          chooseData[i].code = chooseData[i].supplierCode
          chooseData[i].companyName = chooseData[i].supplierName
        }
        this.houseHoldTickets = this.houseHoldTickets.concat(chooseData)
      },
      selectionChangeHouseHoldTicket(val) {
        this.houseHoldUseSelection = val
      },
      selectionChangeBusinessUseTicket(val) {
        this.businessUSeSelection = val
      },
      // getData() {
      // },
      addHouseHold() {
        this.CompanyChoosePopup = true
        // this.houseHoldTickets.push({
        //   ...houseHoldData
        // })
      },
      addBusinessUse() {
        this.businessUseTickets.push({
          ...businessUseData
        })
      },
      delHouseHold() {
        if (this.houseHoldUseSelection.length > 0) {
          this.houseHoldUseSelection.forEach(item => {
          for (let i = 0; i < this.houseHoldTickets.length; i++) {
            if (this.houseHoldTickets[i] === item) {
              this.houseHoldTickets.splice(i, 1)
              break
            }
          }
        })
        this.houseHoldUseSelection = [] 
        } else {
          this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
        }
      },
      delBusinessUse() {
        if (this.businessUSeSelection.length > 0) {
          this.businessUSeSelection.forEach(item => {
          for (let i = 0; i < this.businessUseTickets.length; i++) {
            if (this.businessUseTickets[i] === item) {
              this.businessUseTickets.splice(i, 1)
              break
            }
          }
        })
        this.businessUSeSelection = [] 
        } else {
          this.$message({
          message: '请先选中需要删除的行',
          showClose: true,
          type: 'warning'
        })
        }
      }
    }
  }
</script>
