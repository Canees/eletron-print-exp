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
        <Button>取消</Button>
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
  }
}
</script>
<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  width: 1310px;
  height: 860px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  display: flex;
  font-size: 15px;
  color: black;
  .left{
    width: 900px;
    height: 860px;
    background: rgb(218, 220, 224);
    overflow-y: scroll;
  }
  .right{
    width: calc(1310px - 900px);
    height: 800px;
    padding-top: 20px;
    overflow-y: overlay;
    // 修改图标
    /deep/ .ivu-icon-ios-arrow-up:before{
      content:"\f343";
      font-size: 17px;
    }
    /deep/ .ivu-icon-ios-arrow-down:before {
      content: "\f33d";
      font-size: 17px;
    }
    /deep/ .ivu-input-number-input,
    /deep/ .ivu-input-number,
    /deep/ .ivu-select-selection{
      background: rgb(241, 243, 244);
      border: none;
    }
    /deep/ .ivu-input-number-handler-wrap{
      border:none;
      background: none;
      &>a{
        border: none;
      }
    }
    /deep/ .ivu-icon-md-print:before {
      font-size: 20px;
    }
    /deep/ .ivu-collapse{
      border-bottom: none;
      .ivu-collapse-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 15px 20px 20px;
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
        margin-top: 20px;
        text-align: left;
        padding: 0 20px;
        &>span:first-child{
          display: inline-block;
          width: 150px;
        }
        &>div:last-child{
          flex: 1;
        }
        &:last-child{
          font-size: 13px;
          justify-content: space-between;
          margin-top: 40px;
          cursor: pointer;
        }
        .ivu-checkbox-group-item{
          display: block;
          margin-bottom: 20px;
        }
      }
      .ivu-collapse-content-box .resetStyle{
        align-items: flex-start;
      }
    }
    &>div:first-child span:first-child{
      font-size: 16px;
    }
    &>div:first-child > div:last-child{
      text-align: right;
      font-size: 14px;
    }
    &>div:not(:last-child){
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      text-align: left;
      padding: 0 20px;
      &>span:first-child{
        display: inline-block;
        width: 150px;
      }
      &>div:last-child{
        flex: 1;
      }
    }
  }
  .right-bottom{
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: flex-end;
    &>button:last-child{
      margin-left: 10px;
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
</style>
