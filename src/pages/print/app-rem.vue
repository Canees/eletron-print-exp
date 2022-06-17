<template>
  <div id="app">
    <div class="left">
      test
    </div>
    <div>
      <div class="right">
        <div>
          <span>打印</span>
          <div>2张纸</div>
        </div>
        <div>
          <span>目标打印机</span>
          <div>
            <Select
              v-model="model"
              prefix="md-print"
            >
              <Option
                v-for="item in List"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </Option>
            </Select>
          </div>
        </div>
        <div>
          <span>页面</span>
          <div>
            <Select
              v-model="model"
            >
              <Option
                v-for="item in List"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </Option>
            </Select>
          </div>
        </div>
        <div>
          <span>份数</span>
          <div>
            <InputNumber
              v-model="model1"
              :max="10"
              :min="1"
            />
          </div>
        </div>
        <div>
          <span>布局</span>
          <div>
            <Select
              v-model="model"
            >
              <Option
                v-for="item in List"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </Option>
            </Select>
          </div>
        </div>
        <div>
          <!--  -->
          <Collapse simple>
            <Panel hide-arrow>
              更多设置
              <Icon type="ios-arrow-forward" />
              <template #content>
                <div>
                  <span>纸质尺寸</span>
                  <div>
                    <Select
                      v-model="model"
                    >
                      <Option
                        v-for="item in List"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </Option>
                    </Select>
                  </div>
                </div>
                <div>
                  <span>每个工作表的页数</span>
                  <div>
                    <Select
                      v-model="model"
                    >
                      <Option
                        v-for="item in List"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </Option>
                    </Select>
                  </div>
                </div>
                <div>
                  <span>边距</span>
                  <div>
                    <Select
                      v-model="model"
                    >
                      <Option
                        v-for="item in List"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </Option>
                    </Select>
                  </div>
                </div>
                <div>
                  <span>打印质量</span>
                  <div>
                    <Select
                      v-model="model"
                    >
                      <Option
                        v-for="item in List"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </Option>
                    </Select>
                  </div>
                </div>
                <div>
                  <span>缩放</span>
                  <div>
                    <Select
                      v-model="model"
                    >
                      <Option
                        v-for="item in List"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </Option>
                    </Select>
                  </div>
                </div>
                <div class="resetStyle">
                  <span>选项</span>
                  <div>
                    <CheckboxGroup
                      v-model="checkAllGroup"
                    >
                      <Checkbox label="双面打印" />
                      <Checkbox label="页面页脚" />
                      <Checkbox label="背景图形" />
                    </CheckboxGroup>
                  </div>
                </div>
                <div>
                  使用系统对话框进行打印...(Ctrl+Shift+P)
                  <Icon type="md-share-alt" />
                </div>
              </template>
            </Panel>
          </Collapse>
        </div>
      </div>
      <div class="right-bottom">
        <Button type="primary">
          打印
        </Button>
        <Button @click="close">
          取消
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: 'test',
      model1: 1,
      checkAllGroup: [],
      List: [
        {
          value: 'test',
          label: 'test'
        }
      ]
    }
  },
  methods: {
    close() {
      const electron = window.$electron || null
      console.log(electron)
      if (electron) {
        electron.ipcRenderer.send('closePrint', false)
      }
    }
  }
}
</script>
<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  font-size: 0.15rem;
  color: black;
  .left{
    width: 5.6rem;
    background: rgb(218, 220, 224);
    overflow: auto;
  }
  .right{
    width: 4.1rem;
    height: 7rem;
    padding-top: 0.2rem;
    overflow-y:overlay;
    // 修改图标
    /deep/ .ivu-icon-ios-arrow-up:before{
      content:"\f343";
      font-size: 0.17rem;
    }
    /deep/ .ivu-icon-ios-arrow-down:before {
      content: "\f33d";
      font-size:  0.17rem;
    }
    /deep/ .ivu-input-number-input,
    /deep/ .ivu-input-number,
    /deep/ .ivu-select-selection{
      background: rgb(241, 243, 244);
      border: none;
    }
    /deep/ .ivu-input-number-handler-wrap{
      width: 0.22rem;
      border:none;
      background: none;
      &>a{
        border: none;
      }
      .ivu-input-number-handler{
        height: 0.16rem;
      }
      .ivu-input-number-handler-down-inner,
      .ivu-input-number-handler-up-inner{
        width: 0.12rem;
        height: 0.12rem;
        line-height: 0.12rem;
        font-size: 0.14rem;
        right: 0.05rem;
      }
    }
    /deep/ .ivu-icon-md-print:before {
      font-size: 0.2rem;
    }

    /deep/ .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
    /deep/ .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
      height: 0.3rem;
      line-height: 0.3rem;
      font-size: 0.14rem;
    }
    /deep/ .ivu-select-single .ivu-select-selection{
      height: 0.32rem;
    }
    /deep/ .ivu-select-item{
      padding: 0.07rem 0.16rem;
      clear: both;
      color: #515a6e;
      font-size: 0.14rem!important;
    }
    /deep/ .ivu-checkbox-wrapper{
      font-size: 0.14rem;
      margin-right: 0.08rem;
    }
    /deep/ .ivu-checkbox-inner{
      width: 0.16rem;
      height: 0.16rem;
      border-radius: 0.02rem;
      border: 0.01rem solid #dcdee2;
    }
    /deep/ .ivu-checkbox-checked .ivu-checkbox-inner:after{
      width: 0.04rem;
      height: 0.08rem;
      top: 0.02rem;
      left: 0.05rem;
    }
    /deep/ .ivu-input-number-input-wrap{
      height: 0.32rem;
    }
    /deep/ .ivu-input-number-input{
      height: 0.32rem;
      line-height: 0.32rem;
      padding: 0 0.07rem;
      border-radius: 0.04rem;
    }
    /deep/ .ivu-input-number{
      font-size: 0.14rem;
      width: 0.8rem;
      height: 0.32rem;
      line-height: 0.32rem;
      border-radius: 0.04rem;
    }
    /deep/ .ivu-collapse{
      border-bottom: none;
      .ivu-collapse-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.2rem 0.15rem 0.2rem 0.2rem;
        height: auto;
        line-height: normal;
      }
      .ivu-collapse-header:hover{
        background: rgba(232, 233, 233, 1);
      }
      .ivu-collapse-content{
        padding: 0;
      }
      .ivu-collapse-content-box>div{
        display: flex;
        align-items: center;
        margin-top: 0.2rem;
        text-align: left;
        padding: 0 0.2rem;
        &>span:first-child{
          display: inline-block;
          width: 1.5rem;
        }
        &>div:last-child{
          flex: 1;
        }
        &:last-child{
          font-size: 0.13rem;
          justify-content: space-between;
          margin-top: 0.4rem;
          cursor: pointer;
        }
        .ivu-checkbox-group-item{
          display: block;
          margin-bottom: 0.2rem;
        }
      }
      .ivu-collapse-content-box .resetStyle{
        align-items: flex-start;
      }
    }
    &>div:first-child span:first-child{
      font-size: 0.16rem;
    }
    &>div:first-child > div:last-child{
      text-align: right;
      font-size: 0.14rem;
    }
    &>div:not(:last-child){
      display: flex;
      align-items: center;
      margin-bottom: 0.2rem;
      text-align: left;
      padding: 0 0.2rem;
      &>span:first-child{
        display: inline-block;
        width: 1.5rem;
      }
      &>div:last-child{
        flex: 1;
      }
    }
  }
  .right-bottom{
    height: 0.6rem;
    display: flex;
    align-items: center;
    padding: 0 0.2rem;
    justify-content: flex-end;
    &>button:last-child{
      margin-left: 0.1rem;
    }
    /deep/ .ivu-btn{
      height: 0.32rem;
      padding: 0 0.15rem;
      font-size: 0.14rem;
      border-radius: 0.04rem;
    }
  }
}
</style>
<style>
html,
body {
  padding: 0;
  margin: 0;
  user-select: none;
  overflow: hidden;
}
/*  */
</style>
