import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import viteCompression from 'vite-plugin-compression'
import eslint from 'vite-plugin-eslint'
import path from 'path'
import glob from 'glob'
import fs from 'fs'
// 多页面入口配置
const entryConfig = function () {
  const viteconfig = {}
  // 含有.js的文件
  const entryFiles = glob.sync('./src/pages/*/*.js')
  // 获取模板
  const temp = fs.readFileSync('./index.html')
  // 模板增加ts入口
  entryFiles.forEach((entry) => {
    const projectName = entry.split('/')[3]
    try {
      fs.accessSync(`./${projectName}.html`)
    } catch (error) {
      // 重构模板
      const html = temp.toString().replace(/\.\/src\/[^\s]*/g, `${entry}"></script>`)
      fs.writeFile(`./${projectName}.html`, html, (err) => {
        if (err) console.error(err)
      })
    }
    viteconfig[projectName] = path.resolve(__dirname, `./${projectName}.html`)
  })
  return viteconfig
}

export default ({ mode }) => defineConfig({
  base: './',
  resolve: {
    alias: {
      /*
        路径别名
        若为文件系统路径必须是绝对路径的形式，否则将以别名原样呈现，不会解析为文件系统路径路径
      */
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [ createVuePlugin(), viteCompression({ disable: true }), eslint({ fix: true }) ],
  server: {
    host: 'localhost',
    port: 6547,
    open: true,
    strictPort: false,
    https: false
    // 反向代理
    // proxy: {
    //   '/': {
    //     target: 'http://172.16.1.215:5000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\//, '')
    //   },
    // }
  },
  build: {
    rollupOptions: {
      input: entryConfig(),
      output: { // 静态资源分类打包
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    terserOptions: { // 去掉打印
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  define: { // 环境变量配置
    'process.env': {
      SERVERURL: mode === 'development' ? 'http://127.0.0.1:5000' : 'http://127.0.0.1:5000'
    }
  }
})
