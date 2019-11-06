<template>
  <div>
    <ShippingAdvanceEdit ref="shippingAdvanceEdit" :id="id" @loadingChange="loadingChange" />
  </div>
</template>

<script>
import ShippingAdvanceEdit from './../../../components/entity/shipping-advance/ShippingAdvanceEdit'
export default {
  name: 'ShippingAdvanceEditPopup',
  components: {
    ShippingAdvanceEdit
  },
  props: {
    id: {
      type: String | Number,
      default: null
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    windowWidth() {
      return this.$store.getters.width
    }
  },
  created() {
  },
  methods: {
    close() {
      this.$emit('close')
    },
    async save() {
      const formData = await this.$refs.shippingAdvanceEdit.save()
      this.$emit('update', formData)
    },
    resetData() {
      this.$refs.shippingAdvanceEdit.resetData()
    },
    loadingChange(val) {
      this.loading = val
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
