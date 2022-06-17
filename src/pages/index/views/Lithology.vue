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
        const w = window.innerWidth
        const h = window.innerHeight
        electron.ipcRenderer.send('openPrint', { w, h })
      }
    }
  }
}
</script>
