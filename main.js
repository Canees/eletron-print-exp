const {
  app, BrowserWindow, Menu, ipcMain
} = require('electron')// 引入electron
const path = require('path')
const fs = require('fs')

class InitWin {
  constructor() {
    Menu.setApplicationMenu(null) // 去掉菜单栏
    app.commandLine.appendSwitch('wm-window-animations-disabled') // 拖动闪屏
    this.loadingWin = null
    this.mainWin = null
    this.printWin = null
    this.filePath = path.join(__dirname, './dist/print.pdf')
    this.on()
  }

  /**
   * 加载窗口
   * @returns
   */
  loading() {
    const obj = new BrowserWindow({
      frame: false, // 无边框（窗口、工具栏等），只包含网页内容
      width: 200,
      height: 200,
      resizable: false,
      center: true,
      alwaysOnTop: true,
      transparent: true // 窗口是否支持透明，如果想做高级效果最好为true
    })
    obj.loadFile('loading/index.html')
    obj.on('close', () => {
      this.loadingWin = null
    })
    return obj
  }

  /**
   * 主窗口
   * @returns
   */
  main() {
    const obj = new BrowserWindow({
      maxWidth: 1920,
      maxHeight: 1080,
      minWidth: 1620,
      minHeight: 900,
      useContentSize: true,
      center: true,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        webSecurity: false // 去掉跨越
      },
      show: false
    })// 创建一个窗口
    // 在窗口内要展示的内容index.html 就是打包生成的index.html
    obj.loadFile('dist/index.html')
    // 开启调试工具
    // obj.webContents.openDevTools()
    // 事件监听
    obj.on('close', () => {
      // 回收BrowserWindow对象
      this.mainWin = null
    })
    return obj
  }

  /**
   * 打印窗口
   * @returns
   */
  print() {
    const obj = new BrowserWindow({
      width: 970,
      height: 760,
      frame: false,
      resizable: false,
      center: true,
      transparent: true,
      show: false,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
        webSecurity: false
      }
    })// 创建一个窗口
    obj.loadFile('dist/print.html')
    obj.webContents.openDevTools()
    obj.on('close', () => {
      // 回收BrowserWindow对象
      this.printWin = null
    })
    return obj
  }

  /**
   * 保存打印文件默认保存在dist中
   * @param {object} win
   * @param {object} option
   */
  async SavePrintData(win, option) {
    if (!option || !Object.keys(option).length) {
      option = {
        marginsType: 1, // 默认边距
        pageSize: 'A4',
        printBackground: true, // 文件中包含 CSS 背景
        printSelectionOnly: false,
        landscape: false// 纵向模式
      }
    }
    const buffer = await win.webContents.printToPDF(option)
    return new Promise((resolve, reject) => {
      fs.writeFile(this.filePath, buffer, (err) => {
        if (err) {
          console.log('save error')
          return reject(err)
        }
        return resolve(this.filePath)
      })
    })
  }

  /**
   * 事件监听
   */
  on() {
    app.on('ready', async () => {
      this.loadingWin = this.loading()
      this.mainWin = this.main()
      this.printWin = this.print()
      // 监听渲染进行
      ipcMain.once('close-loading', () => {
        this.loadingWin.close()
        this.mainWin.show()
      })

      // 监听打开print
      ipcMain.on('openPrint', async (event) => {
        try {
          // 获取当前BW实例打印机列表
          const currentWin = event.sender.getOwnerBrowserWindow()
          const list = await currentWin.webContents.getPrintersAsync()
          this.printWin.webContents.send('getData', list)
          this.printWin.show()
          // 转成PDF文件
          const filePath = await this.SavePrintData(currentWin)
          // 渲染进程加载PDF
          this.printWin.webContents.send('loadingPDF', filePath)
        } catch (error) {
          console.log(error)
          this.printWin.webContents.send('loadingPDF', '')
        }
      })

      // 监听关闭print
      ipcMain.on('closePrint', (event, data) => {
        console.log('close', data)
        // 显示打印组件
        this.printWin.hide()
      })
    })

    app.on('window-all-closed', () => {
      app.quit()
    })

    app.on('activate', () => {
      if (this.mainWin == null) {
        this.mainWin = this.main()
      }
    })
  }
}

new InitWin()