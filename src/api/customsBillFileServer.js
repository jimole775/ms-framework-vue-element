import request from '@/utils/request'

export default {
  uploadFile(data, id, cpino) {
    return request({
      url: '/auxhome/sdp/api/1.0.0/excelConvert/excelConvert',
      method: 'post',
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      params: {
        customsId: id.toString(),
        cpiNo: cpino
      },
      data
    })
  },
  checkFile(param) {
    const data = {
      dataSet: {
        name: 'datas',
        params: { ...param.keyWord },
        page: { ...param.page }
      }
    }
    return request({
      url: '/file/api/1.0.0/fileBus/queryFiles',
      method: 'post',
      data
    }).then(res => {
      if (!res.data.data) {
        return []
      }
      return res.data.data
    })
  },
  fileRelate(param) {
    const data = {
      dataSet: {
        name: 'datas',
        params: {
          fileList: [{ ...param }]
        }
      }
    }
    return request({
      url: '/file/api/1.0.0/fileBus/connectFileToOrder',
      method: 'post',
      data
    })
  },
  deleteRelate(fileCode) {
    const data = {
      params: {
        fileCode
      }
    }
    return request({
      url: '/file/api/1.0.0/file/remove',
      method: 'post',
      data
    })
  },
}
