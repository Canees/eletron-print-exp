<template>
  <div>
    <Button
      type="primary"
      @click="test"
    >
      打印
    </Button>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    test() {
      // 通知主进程开启打印窗口
      const electron = window.$electron || null
      if (electron) {
        electron.ipcRenderer.send('openPrint')
      }
    }
  }
}
</script>
