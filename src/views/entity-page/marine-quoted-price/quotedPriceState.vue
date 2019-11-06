<template>
  <el-input v-model="text" readonly class="QuotedPricecState__default-input"/>
</template>
<script>
import thiServer from '@/api/marineQuotedPriceServer'
export default {
    name: 'QuotedPricecState',
    props: {
        id: {
            type: String | Number,
            default: 0
        }
    },
    data() {
        return {
            text: ''
        }
    },
    async created() {
        // 提交后就是“已报价”
        // 未提交就是“未报价”
        // 过了询价截至日期就是“已过期、”       
        const { curTime, data: { enquiryUptoDate, sdpSaleEnquiryLineList }} = await thiServer.get(this.id)
        const today = new Date(curTime).getTime()
        const isExpired = today > new Date(enquiryUptoDate).getTime()
        if (
          sdpSaleEnquiryLineList.length > 0 && 
          sdpSaleEnquiryLineList[0].isCommit === 2
        ) {
          this.text = isExpired ? '已过期' : '未报价'
        } else {
          this.text = '已报价'
        }
    }
}
</script>
<style>
.QuotedPricecState__default-input > input.el-input__inner{
    background: none;
    border: 0;
}
</style>
