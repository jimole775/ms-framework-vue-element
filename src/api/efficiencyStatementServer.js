import request from '@/utils/request'
import Validate from '@/utils/validate.js'

export default {
  search(param) {
    const query = {}
    if (Validate.isNotEmpty(param.keyword.beginDate)) {
      query['beginDate'] = param.keyword.beginDate
    }
    if (Validate.isNotEmpty(param.keyword.endDate)) {
      query['endDate'] = param.keyword.endDate
    }
    query['type'] = param.type
    // 设置传参格式
    const data = {
      params: { ...query },
      page: {
        startRow: param.page * param.size, // 起始行
        endRow: param.size // 每页条数
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpEdiShipmentapplyinfo/queryEfficiencyrEeport',
      method: 'post',
      data
    }).then(res => {
      return res.data.data
    })
  },
  get(id) {
    const query = {
      bankId: id,
    }
    // 设置传参格式
    const data = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BANK_NAME_003',
        params: { ...query },
        page: {
          startRow: 0, // 起始行
          endRow: 10 // 每页条数
        }
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/base/selectList',
      method: 'post',
      data
    }).then(res => {
      const list = []
      res.data.data.dataSet.rows.forEach(item => {
        item.usable = item.usable === 2
        const data = {
          id: item.bankId,
          name: item.bankName,
          Swift_Code: item.swiftCode,
          address: item.adress,
          remark: item.note,
          isDelete: item.deleted,
          departmentId: item.entid,
          enable: item.usable
        }
        list.push(data)
      })
      return list
    })
  },
  post(data) {
    data.enable = data.enable ? 2 : 1
    const datachange = {
      $state: 2,
      swiftCode: data.Swift_Code,
      bankName: data.name,
      adress: data.address,
      note: data.remark,
      deleted: data.isDelete,
      entId: data.entid,
      usable: data.enable
    }
    const backname = {
      ...datachange
    }
    // 设置传参格式
    const datas = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BANK_NAME_001',
        keyField: 'bank_id',
        rows: [{ ...backname }]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBankName/insertBankName',
      method: 'post',
      data: datas
    }).then(res => {
      return res
    })
  },
  put(data) {
    const datachange = {
      $state: 1,
      swiftCode: data.Swift_Code,
      bankName: data.name,
      adress: data.address,
      note: data.remark,
      bankId: data.id,
      deleted: data.isDelete,
      usable: data.enable ? 2 : 1
    }
    const backnames = {
      ...datachange
    }
    // 设置传参格式
    const datas = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BANK_NAME_002',
        keyField: 'bank_id',
        rows: [{ ...backnames }]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBankName/updateBankName',
      method: 'post',
      data: datas
    }).then(res => {
      return res
    })
  },
  delete(data) {
    const datachange = {
      $state: 3,
      bankName: data.name,
      bankId: data.bankId,
      deleted: 1,
    }
    const backname = {
      ...datachange
    }
    // 设置传参格式
    const datas = {
      dataSet: {
        name: 'data',
        config: 'ACT_SPD_BANK_NAME_002',
        keyField: 'bank_id',
        rows: [{ ...backname }]
      }
    }
    return request({
      url: '/auxhome/sdp/api/1.0.0/sdpBankName/deleteBankName',
      method: 'post',
      data: datas
    }).then(res => {
      return res
    })
  }
}
