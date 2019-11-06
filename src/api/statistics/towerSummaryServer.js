import request from '@/utils/request'

export default {
  search(params) {
    // 查询时增加组织id条件
    params.entid = parseInt(localStorage.getItem('entid'))
    return request({
      url: '/auxhome/rpt/api/1.0.0/shipReportData/selectTowingTankCollectList',
      method: 'post',
      data: {
        dataSet: {
          name: 'datas',
          config: 'ACT_SALE_DRAG_CONT_PACK_RPT_SELECT',
          params: {
            ...params
          }
        }
      }
    })
  }
}
