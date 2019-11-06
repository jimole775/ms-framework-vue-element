import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    // 将查询关键词转换为接口对应的字段
    const query = {}
    if (Validate.isNotEmpty(param.keyword.id)) {
      query['userId'] = param.keyword.id
    }
    if (Validate.isNotEmpty(param.keyword.name)) {
      query['userName'] = param.keyword.name
    }
    if (Validate.isNotEmpty(param.keyword.fax)) {
      query['fax'] = param.keyword.fax
    }
    if (Validate.isNotEmpty(param.keyword.tel)) {
      query['tel'] = param.keyword.tel
    }
    if (Validate.isNotEmpty(param.keyword.createUser)) {
      query['createUser'] = param.keyword.createUser
    }
    if (Validate.isNotEmpty(param.keyword.createDate)) {
      query['createDate'] = param.keyword.createDate
    }
    if (Validate.isNotEmpty(param.keyword.orgIds)) {
      query['orgIds'] = param.keyword.orgIds
    }
    // 查询时增加组织id条件
    query['entid'] = parseInt(localStorage.getItem('entid'))
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BASE_SHIPPING_USER_003',
        params: { ...query },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        res.data.data = []
        return res.data
      }
      res.data.data.dataSet.rows.forEach(item => {
        item.id = item.userId
        item.entid = item.entId
        item.name = item.userName
        item.type = item.personnelType
        item.orgIds = item.orgIds
        item.orgNames = item.orgNames
      })
      return res.data.data.dataSet
    })
  },
  get(param) {
    const query = {
      userId: param
    }

    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BASE_SHIPPING_USER_003',
        params: { ...query },
        page: {
          startRow: param.page * param.size, // 起始行
          endRow: param.size // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data
    }).then(res => {
      res.data.data.dataSet.rows.forEach(item => {
        item.id = item.userId
        item.entid = item.entId
        item.name = item.userName
        item.type = item.personnelType
        item.orgIds = item.orgIds ? item.orgIds.split(',').map(item => +item) : []
        item.orgNames = item.orgNames
      })
      return res.data.data.dataSet.rows[0]
    })
  },
  put(data) {
    const query = {}
    query['userId'] = data.id
    query['userName'] = data.name
    query['userCode'] = data.userCode
    query['fax'] = data.fax
    query['tel'] = data.tel
    query['personnelType'] = data.type
    query['orgIds'] = data.orgIds.join(',')
    query['orgNames'] = data.orgNames
    query['$state'] = 2
    const adats = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BASE_SHIPPING_USER_002',
        keyField: 'user_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBaseShippingUser/updateSdpBaseShippingUser',
      method: 'post',
      data: adats
    })
  },
  post(data) {
    const query = {}
    query['userName'] = data.name
    query['userCode'] = data.userCode
    query['personnelType'] = data.type
    query['fax'] = data.fax
    query['tel'] = data.tel
    query['orgIds'] = data.orgIds.join(',')
    query['orgNames'] = data.orgNames
    query['entId'] = data.entid
    query['$state'] = 1
    query['deleted'] = 0
    const adatss = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BASE_SHIPPING_USER_001',
        keyField: 'user_id',
        rows: [query]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBaseShippingUser/addSdpBaseShippingUser',
      method: 'post',
      data: adatss
    })
  },
  delete(id) {
    const deleteData = {
      $state: 3,
      userId: id,
      deleted: 1
    }
    const proms = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BASE_SHIPPING_USER_002',
        keyField: 'user_id',
        rows: [deleteData]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBaseShippingUser/deleteSdpBaseShippingUser',
      method: 'post',
      data: proms
    }).then(res => {
      return res.msg
    })
  }
}
