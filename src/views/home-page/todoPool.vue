<template>
  <div class="container">
    <el-form :inline="true" :model="keyword" class="demo-form-inline" @keyup.enter.native="commitSearch">
      <el-row>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="开始时间" prop="startDate">
            <el-date-picker 
              v-model="keyword.startDate" 
              value-format="yyyy-MM-dd" 
              size="mini" 
              class="max-w" 
              type="date" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="结束时间" prop="endDate">
            <el-date-picker 
              v-model="keyword.endDate" 
              value-format="yyyy-MM-dd" 
              size="mini" 
              class="max-w" 
              type="date"/>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="合同号">
            <el-input v-model="keyword.piNo" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="出货预告号">
            <el-input v-model="keyword.warnNo" size="mini" />
          </el-form-item>
        </el-col>
        <!--<el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="组织">
            <el-input v-model="keyword.entid" size="mini" />
          </el-form-item>
        </el-col>-->
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="销售部门">
            <el-input v-model="keyword.orgName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="处理人">
            <el-input v-model="keyword.executor" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24">
          <el-form-item label="待办">
            <!-- <el-input v-model="keyword.isTodo" size="mini" /> -->
            <el-select
              :loading="loading"
              v-model="keyword.isTodo"
              size="mini">
              <el-option
                :key="1"
                :label="'是'"
                :value="1" />
              <el-option
                :key="2"
                :label="'否'"
                :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="6" :md="8" :sm="12" :xs="24" class="f-r">
          <el-form-item class="search-btn-item">
            <el-button type="primary" size="mini" @click="commitSearch">查询</el-button>
            <el-button size="mini" @click="resetSearch">重置</el-button>
            <!-- <el-button type="text" size="mini" @click="more = !more">
                {{ more ? '收起' : '更多' }}
              </el-button> -->
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template>
      <el-table :data="tableData" :loading="loading" border class="m-t-12" style="width: 100%">
        <!-- <el-table-column show-overflow-tooltip prop="id" label="自增主键" min-width="150" /> -->
        <!--<el-table-column show-overflow-tooltip prop="entid" label="组织" min-width="80">
          <template slot-scope="scope" >{{ parseInt(scope.row.entid) | OperaUnitFilter }}</template>
        </el-table-column>-->
        <el-table-column show-overflow-tooltip fixed prop="warnCNo" label="出货预告变更号" min-width="160">
          <template slot-scope="scope" >
            <a :href="scope.row.warnUrl" target="_blank" class="im-link">{{ scope.row.warnCNo }}</a>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip fixed prop="warnNo" label="出货预告号" min-width="180" />
        <!-- <el-table-column show-overflow-tooltip prop="warnCId" label="出货预告变更id" min-width="150" /> -->
        <!-- <el-table-column show-overflow-tooltip prop="warnNo" label="出货预告号" min-width="150" /> -->
        <!-- <el-table-column show-overflow-tooltip prop="warnId" label="出货预告id" min-width="150" /> -->
        <!-- <el-table-column show-overflow-tooltip prop="warnUrl" label="出货预告变更url" min-width="180" /> -->
        <el-table-column show-overflow-tooltip fixed prop="piNo" label="合同号" min-width="150" />
        <el-table-column show-overflow-tooltip fixed prop="salesman" label="业务员" min-width="80" />
        <!-- <el-table-column show-overflow-tooltip prop="orgId" label="销售部门id" min-width="150" /> -->
        <el-table-column show-overflow-tooltip fixed prop="orgName" label="销售部门" min-width="100" />
        <el-table-column show-overflow-tooltip prop="shipType" label="发运方式" min-width="100">
          <template slot-scope="scope" >{{ shipTypeMap[parseInt(scope.row.shipType)] }}</template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="isChange" label="出货预告变更类型" min-width="150">
          <template slot-scope="scope" >
            {{ isChangeMap[parseInt(scope.row.isChange)] }}
          </template>          
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="cNote" label="变更原因" min-width="150" />
        <el-table-column show-overflow-tooltip prop="checkTime" label="变更审核时间" min-width="150" />
        <el-table-column show-overflow-tooltip prop="cDeclare" label="代办池变更类型" min-width="150" />
        <el-table-column show-overflow-tooltip prop="executor" label="处理人" min-width="80" />
        <el-table-column show-overflow-tooltip prop="billNo" label="单号" min-width="150">
          <template slot-scope="scope" >     
            <a href="javascript:void(0)" class="im-link" @click="jumpToLocal(scope.row.billEditUrl)">{{ scope.row.billNo }}</a>
          </template>
        </el-table-column>
        <!-- <el-table-column show-overflow-tooltip prop="billId" label="单据对应的单id" min-width="150" /> -->
        <!-- <el-table-column show-overflow-tooltip prop="billEditUrl" label="单据对应的页面url" min-width="150" /> -->
        <!-- <el-table-column show-overflow-tooltip prop="options" label="订舱变更" min-width="150" /> -->
        <!-- <el-table-column show-overflow-tooltip prop="disposeTime" label="处理时间" min-width="150" /> -->
        <el-table-column label="处理时间" min-width="140">
          <template slot-scope="scope" >     
            <el-date-picker 
              v-model="scope.row.disposeTime" 
              value-format="yyyy-MM-dd" 
              size="mini" 
              class="max-w" 
              type="date"/>
          </template>
        </el-table-column>
        <!-- <el-table-column show-overflow-tooltip prop="deleted" label="是否删除" min-width="150"> -->
        <!-- <template slot-scope="scope" >{{ deletedMap[(scope.row.deleted)] }}</template> -->
        <!-- </el-table-column> -->
        <!-- <el-table-column show-overflow-tooltip prop="createUser" label="创建人" min-width="150" /> -->
        <!-- <el-table-column show-overflow-tooltip prop="createDate" label="创建时间" min-width="150" /> -->
        <!-- <el-table-column show-overflow-tooltip prop="updateUser" label="修改人" min-width="150" /> -->
        <!-- <el-table-column show-overflow-tooltip prop="updateDate" label="修改时间" min-width="150" /> -->
        <el-table-column label="选项" min-width="110">
          <template slot-scope="scope" >     
            <el-select
              :loading="loading"
              v-model="scope.row.options"
              size="mini">
              <el-option
                v-for="(val,key) in test[scope.row.cDeclareV]"
                :key="key"
                :label="val"
                :value="key" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="75">
          <template slot-scope="scope" >     
            <el-button type="primary" class="table-cell-save-btn" @click="save(scope.row)">保存</el-button>
          </template> 
        </el-table-column>
      </el-table>
    </template>
    <div class="m-w cen-box m-t-12">
      <el-pagination 
        :current-page="page" 
        :page-sizes="pageSize" 
        :page-size="size" 
        :total="count"
        :layout="windowWidth < 768 ? 'total, jumper' : 'total, sizes, prev, pager, next, jumper'"
        @size-change="pageSizeChange" 
        @current-change="pageNumberChange" />
    </div>
  </div>
</template>

<script>
  import todoPoolServer from './../../api/todoPoolServer'
  import OperaUnitEnumUtil from './../../components/enum/opera-unit/OperaUnitEnumUtil'
  const initSearchParams = {
    piNo: null,
    warnNo: null,
    orgName: null,
    entid: null,
    startDate: null, // 变更审核时间开始 2019-07-12 
    endDate: null, // 变更审核时间结束 2019-07-15
    executor: null,
    isTodo: null
  }
  export default {
    name: 'TodoPool',
    components: {},
    filters: {
      OperaUnitFilter: OperaUnitEnumUtil.toTitleFilter,
    },
    data() {
      return {
        deletedMap: {
          0: '未删除',
          1: '已删除',
        },
        isChangeMap: {
          1: '其他信息变更', 
          2: '提单信息变更',
          3: '数量变更',
          4: '柜量变更',
          5: '导出数量更改',
          6: '船务更改',
        },
        shipTypeMap: {
          1: 'BY TRAIN',
          2: 'BY SEA',
          3: '自提',
          4: 'BY AIR',
          5: 'BYTRUCK',
          6: 'BY EXPRESS',
          7: 'BY LCL',
        },
        test: {
          '40085': {
            '1': '不处理',
            '2': '报关修改',
            '3': '删单重报'
          },
          '40092': {
            '1': '不处理',
            '2': '订舱变更',
            '3': '关闭订舱'
          },
        },
        loading: false,
        keyword: {
          ...initSearchParams
        },
        page: 1,
        size: 10,
        count: 0,
        pageSize: [10, 20, 30, 40, 50],
        sort: null,
        tableData: [],
        more: false,
      }
    },
    computed: {
      windowWidth() {
        return this.$store.getters.width
      },
      
    },
    created() {
      // 默认查询当前用户的数据
      this.keyword.executor = this.$store.getters.userCode
      this.search()
    },
    methods: {
      async save(row) {
        const res = await todoPoolServer.post(row)
        if (res.data.code === 200) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '保存失败',
            type: 'warning'
          })
        }
      },
      jumpToLocal(target) {
        this.$router.push({
          path: target.split('#')[1]
        })
      },
      async search() {
        this.loading = true
        const keyword = {
          ...this.keyword
        }
        const res = await todoPoolServer.search({
          keyword: keyword,
          page: this.page - 1,
          size: this.size
        })
        this.tableData = res.data.queryList
        this.count = res.page.total
        this.$nextTick(() => {
          this.setPageSize()
        })
        this.loading = false
      },
      setPageSize() {
        // 重新设定分页条件
        this.pageSize = []
        for (let i = 1; i < 6; i++) {
          if (this.count > 10 * i) {
            this.pageSize.push(10 * i)
          }
        }
        this.pageSize.push(this.count)
      },
      pageSizeChange(val) {
        this.size = val
        this.page = 1
        this.search()
      },
      pageNumberChange(val) {
        this.page = val
        this.search()
      },
      commitSearch() {
        this.page = 1
        this.search()
      },
      resetSearch() {
        this.keyword = {
          ...initSearchParams
        }
        this.page = 1
        this.search()
      },
      update() {
        setTimeout(() => {
          this.search()
        }, 1000)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
  .table-cell-save-btn {
    padding: 3px 5px;
    font-size: 12px;
  }
  .im-link {
    color: #7c7cff;
    text-decoration-line: underline;
    font-size: 13px;
  }
</style>
