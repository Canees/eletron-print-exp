<template>
  <div class="result">
    <Calendar />
  </div>
</template>
<script>
import Calendar from 'vue-calendar-component'
export default {
  components: {
    Calendar
  },
  data() {
    return {
      remarks: { '2021-1-13': 'some tings' }
    }
  }
}
</script>
<style lang="less" scoped>
.result{
  width: 500px;
  height: 500px;
}
</style>