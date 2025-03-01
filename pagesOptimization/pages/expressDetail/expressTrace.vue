<template>
  <view>
    <web-view :src="expessTrace.url"></web-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        expessTrace:{}
      };
    },
    async onLoad(options) {
      const {expressNum} = options
      this.getExpessTrace(expressNum)
    },
    methods:{
       async getExpessTrace(expressNum){
         const data = {
           no:expressNum
         }
         const res =  await this.$http.post('/api/trace/getH5',data)
         if(res.code == 200){
           this.expessTrace = res.data
         }
       }
    }
  }
</script>

<style>
</style>