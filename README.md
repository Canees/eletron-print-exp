# electron的打印模板
```
总体思路是用vue写了仿谷歌的打印组件，api使用el的BrowserWindow实例的webContents.print，使用printopdf来达到预览功能。
```

# TODO:
```
1. 生成PDF文件|数据回传打印组件
2. 打印组件优化参数
3. 打印组件预览PDF文件
4. 打印功能API对接
```


# 注意
```
1. yarn
2. npm run dev 启动 web 端
3. npm run edev 启动 electron
4. npm run make 打包带压缩文件
5. npm run pmake 打包不带压缩文件
6. /pucli 文件中的 loader 不能删除，为了渲染进程和主进程之间通信
7. out 文件为输出包
8. 环境变量在 vite.config 中添加

```
