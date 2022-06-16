<template>
  <div class="home-nva">
    <Layout>
      <Sider
        v-model="isCollapsed"
        collapsible
        :collapsed-width="0"
      >
        <Menu
          :active-name="changePath"
          theme="dark"
          width="auto"
        >
          <MenuItem
            name="Lithology"
            to="/"
          >
            <Icon type="md-analytics" />
            <span>测试1</span>
          </MenuItem>
          <MenuItem
            name="Grain"
            to="Grain"
          >
            <Icon type="md-analytics" />
            <span>测试2</span>
          </MenuItem>
          <MenuItem
            name="Result"
            to="Result"
          >
            <Icon type="md-analytics" />
            <span>测试3</span>
          </MenuItem>
        </Menu>
      </Sider>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: false,
      changePath: 'Lithology'
    }
  },
  mounted() {
    this.changePath = this.$route.name
  },
  watch: {
    $route(to, from) {
      if (!from.name) this.changePath = to.name
    }
  }
}
</script>
<style scoped lang="less">
.home-nva {
  height: 100%;
  /deep/.ivu-layout {
    height: 100%;
  }
  /deep/.ivu-menu-item{
    font-size: 16px;
  }
  /deep/.ivu-layout-sider {
    background: #202532;
  }
  /deep/.ivu-menu-dark {
    background: #202532;
  }
  /deep/.ivu-layout-sider-trigger {
    background: none;
  }
  /deep/.ivu-icon-ios-arrow-back:before {
    content: "\f115";
  }
  /deep/.ivu-layout-sider-trigger {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 20px !important;
    height: 50px;
    background: #4d5062;
    clip-path: ellipse(100% 50% at 80% 50%);
  }
  /deep/.ivu-layout-sider-zero-width-trigger{
    z-index: 100;
  }
}
</style>
