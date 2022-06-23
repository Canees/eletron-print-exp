<template>
  <div id="app">
    <div class="left">
      <VuePdfEmbed
        v-if="loadingPDF"
        :source="loadingPDF"
      />
      <Loading v-else />
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
              v-model="selectData.deviceName"
              prefix="md-print"
            >
              <Option
                v-for="item in deviceName"
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
              v-model="selectData.copies"
              :max="9999"
              :min="1"
            />
          </div>
        </div>
        <div>
          <span>布局</span>
          <div>
            <Select
              v-model="selectData.Landscape"
            >
              <Option
                v-for="item in Landscape"
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
                      v-model="selectData.pageSize"
                    >
                      <Option
                        v-for="item in pageSize"
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
                      v-model="selectData.pagesPerSheet"
                    >
                      <Option
                        v-for="item in pagesPerSheet"
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
                      v-model="selectData.margins"
                    >
                      <Option
                        v-for="item in margins"
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
                      v-model="selectData.dpi"
                    >
                      <Option
                        v-for="item in dpi"
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
                      v-model="selectData.scaleFactor"
                    >
                      <Option
                        v-for="item in scaleFactor"
                        :key="item.value"
                        :value="item.value"
                      >
                        {{ item.label }}
                      </Option>
                    </Select>
                  </div>
                </div>
                <div class="resetStyle">
                  <span>双面</span>
                  <div>
                    <Checkbox v-model="duplex">
                      双面打印
                    </Checkbox>
                    <div v-if="duplex">
                      <Select
                        v-model="selectData.duplexMode"
                      >
                        <Option
                          v-for="item in duplexMode"
                          :key="item.value"
                          :value="item.value"
                        >
                          {{ item.label }}
                        </Option>
                      </Select>
                    </div>
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
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
import Loading from './components/loading.vue'
export default {
  components: {
    VuePdfEmbed,
    Loading
  },
  data() {
    return {
      // 打印机列表
      deviceName: [ ],
      // 工作表的页数
      pagesPerSheet: [
        {
          value: 1,
          label: '1'
        },
        {
          value: 2,
          label: '2'
        },
        {
          value: 4,
          label: '4'
        },
        {
          value: 6,
          label: '6'
        },
        {
          value: 9,
          label: '9'
        },
        {
          value: 16,
          label: '16'
        }
      ],
      // 布局
      Landscape: [
        {
          value: 0,
          label: '纵向'
        },
        {
          value: 1,
          label: '横向'
        }
      ],
      // 页面 尺寸
      pageSize: [
        {
          value: 'A4',
          label: 'A4'
        },
        {
          value: 'A5',
          label: 'A5'
        }
      ],
      // 边距
      margins: [
        {
          value: 'default',
          label: '默认'
        },
        {
          value: 'printableArea',
          label: '可打印区域'
        },
        {
          value: 'none',
          label: '无'
        }
      ],
      // 分辨率
      dpi: [
        {
          value: 600,
          label: '600 dpi'
        },
        {
          value: 1200,
          label: '1200 dpi'
        }
      ],
      // 缩放
      scaleFactor: [
        {
          value: 0,
          label: '200%'
        },
        {
          value: 1,
          label: '150%'
        },
        {
          value: 2,
          label: '130%'
        },
        {
          value: 3,
          label: '100%'
        },
        {
          value: 4,
          label: '50%'
        },
        {
          value: 5,
          label: '30%'
        }
      ],
      // 双面打印
      duplexMode: [
        {
          value: 'shortEdge',
          label: '短边翻转'
        },
        {
          value: 'longEdge',
          label: '长边翻转'
        }
      ],
      // 选定数据
      selectData: {
        deviceName: '', // 目标打印机
        pagesPerSheet: 1, // 工作表的页数
        copies: 1, // 份数
        Landscape: 0, // 布局
        dpi: 600, // 打印质量
        margins: 'default', // 边距
        scaleFactor: 3, // 缩放
        pageSize: 'A4', // 纸张尺寸
        duplexMode: 'shortEdge'// 双面打印
      },
      duplex: false,
      loadingPDF: ''
    }
  },
  methods: {
    // 关闭打印
    close() {
      const { ipcRenderer } = window.$electron || null
      if (ipcRenderer) {
        ipcRenderer.send('closePrint', false)
      }
    }
  },
  mounted() {
    this.loadingPDF = ''
    const electron = window.$electron || null
    if (electron) {
      // 监听打印机数据
      electron.ipcRenderer.on('getData', (event, list) => {
        const arr = []
        let isDefault = ''
        for (let k = 0; k < list.length; k++) {
          const el = list[k]
          if (el.isDefault) isDefault = el.name
          arr.push({
            value: el.name,
            label: el.displayName
          })
        }
        this.deviceName = arr
        this.selectData.deviceName = isDefault
      })
      // 监听PDF文件准备完成
      electron.ipcRenderer.on('loadingPDF', (event, filePath) => {
        this.loadingPDF = filePath
        console.log(66, filePath)
      })
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
  font-size: 15px;
  color: black;
  width: 970px;
  .left{
    width: 560px;
    height: 760px;
    background: rgb(218, 220, 224);
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    /deep/ .loader{
      position: absolute;
      top: 45%;
      left: 45%;
      transform: translate(-45%,-45%);
    }
  }
  .right{
    width: 410px;
    height: 710px;
    padding-top: 10px;
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
    /deep/ .ivu-select-item{
      width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    /deep/ .ivu-select-selection .ivu-select-selected-value{
      width: 200px;
    }
    /deep/ .ivu-select-selection{
      &>div{
        display: flex;
        align-items: center;
      }
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
  user-select: none;
  overflow: hidden;
}
</style>
