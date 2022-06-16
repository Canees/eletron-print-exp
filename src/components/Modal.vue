<template>
  <div class="modal" v-if="show" @click="callBack">
    <div class="content">
      <template>
        <slot name="content"></slot>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: ["show"],
  methods: {
    callBack() {
      this.$emit("callBack", false);
    },
  },
};
</script>
<style lang="less" scoped>
.modal{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  .content{
    width: 80%;
    height: 80%;
    margin: 5% auto;
    overflow: hidden;
  }
}
</style>
