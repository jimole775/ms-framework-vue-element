import request from '@/utils/request'
import Validate from '@/utils/validate.js'
import { dateToDateStr } from '@/utils/datetime'
export default {
  search(params) {
    const query = {}
    if (Validate.isNotEmpty(params.keyword.warnNos)) {
      query['warnNos'] = params.keyword.warnNos
    }
    if (Validate.isNotEmpty(params.keyword.piNos)) {
      query['piNos'] = params.keyword.piNos
    }
    if (Validate.isNotEmpty(params.keyword.regNo)) {
      query['regNo'] = params.keyword.regNo
    }
    // if (Validate.isNotEmpty(params.keyword.note)) {
    //   query['note'] = params.keyword.note
    // }  
    if (Validate.isNotEmpty(params.keyword.stat)) {
      query['stat'] = params.keyword.stat
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        params: { ...query },
        page: {
          startRow: params.page * params.size, // 起始行
          endRow: params.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinExtraPayreg/doSearch',
      method: 'post',
      data: dataTo 
    }).then(res => {
      // res.data.data.data.forEach(item => {
      //   if (item.stat !== null) {
      //     item.stat = item.stat.toString()
      //   }
      // })
      return res.data.data
    })
  },
  get(id) {
    const query = {}
    if (Validate.isNotEmpty(id)) {
      query['regId'] = id
    }
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        params: { ...query },
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinExtraPayreg/doSelectOne',
      method: 'post',
      data: dataTo 
    }).then(res => {
      return res.data.data
    })
  },
  post(data1, data2) {
    const query = {}
    const lineList = [...data2]
    for (let i = 0; i < lineList.length; i++) {
      lineList[i].inputDate = dateToDateStr(lineList[i].inputDate)
      lineList[i].seq = i + 1
    }
    query['header'] = { 'note': data1.note, 'entid': parseInt(localStorage.getItem('entid')), 'stat': 1 }
    query['lineList'] = lineList
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        params: { ...query },
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinExtraPayreg/doInsert',
      method: 'post',
      data: dataTo 
    }).then(res => {
      return res.data
    })
  },
  put(data1, data2) {
    const query = {}
    const lineList = [...data2]
    for (let i = 0; i < lineList.length; i++) {
      lineList[i].inputDate = dateToDateStr(lineList[i].inputDate)
      lineList[i].seq = i + 1
    }
    query['header'] = { 'note': data1.note, 'regId': data1.regId }
    query['lineList'] = lineList
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        params: { ...query },
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinExtraPayreg/doUpdate',
      method: 'post',
      data: dataTo 
    }).then(res => {
      return res.data.data
    })
  },
  delete(id) {
    const query = {}
    if (Validate.isNotEmpty(id)) {
      query['regId'] = id
    }
    // 设置传参格式
    const dataTo = {
      dataSet: {
        name: 'data',
        params: { ...query },
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpFinExtraPayreg/doDelete',
      method: 'post',
      data: dataTo 
    }).then(res => {
    })
  }
}
