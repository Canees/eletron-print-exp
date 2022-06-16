<template>
  <div id="app">
    <div class="top">
      <span>测试</span>
    </div>
    <div class="center">
      <div class="left">
        <Nav />
      </div>
      <div class="right">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
      <div
        v-if="showLoading"
        class="loading"
      >
        <Loading />
      </div>
    </div>
  </div>
</template>
<script>
import Nav from './components/Nav.vue'
import Loading from '@/components/loading.vue'
export default {
  components: { Nav, Loading },
  computed: {
    showLoading() {
      return this.$store.getters.GetLoading
    }
  },
  mounted() {
    // 通知主进程是否完成渲染
    const electron = window.$electron || null
    if (electron) {
      electron.ipcRenderer.send('close-loading')
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  width: 100%;
  height: 100%;
  min-width: 1620px;
  min-height: 900px;
  // max-width: 1920px;
  // max-height: 1080px;
  background: black;
  margin: 0;
  padding: 0;
  .top {
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
    background: #202532;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    position: relative;
    svg {
      width: 200px;
      height: 50px;
      position: absolute;
      left: 0;
    }
  }
  .center {
    display: flex;
    height: calc(100% - 70px);
    width: 100%;
    position: relative;
    overflow: hidden;
    & > div {
      height: 100%;
    }
    .left {
      margin-right: 10px;
    }
    .right {
      flex: 1;
      width: calc(100% - 220px);
      position: relative;
    }
    .loading {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 9999;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
<style>
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  user-select: none;
}
/* 隐藏滚动条 */
::-webkit-scrollbar {
  width: 0 !important;
  display: none;
}
/*在谷歌下移除input[number]的上下箭头*/
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
</style>
