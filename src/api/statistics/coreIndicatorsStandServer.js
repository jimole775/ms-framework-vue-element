import request from '@/utils/request'

export default {
  search(params) {
    return request({
      url: '/auxhome/rpt/api/1.0.0/shipReportData/selectCoreStandsRpt',
      method: 'post',
      data: {
        dataSet: {
          name: 'datas',
          params: {
            entid: parseInt(localStorage.getItem('entid')),
            rptDate: params.day
          }
        }
      }
    })
  }
}
