# JHBridge
江湖 JS Bridge API

```
npm install jhbridge --save
```

浏览器中包括两个view，APP View 和 POP View。

APP View 是主程序所用的 Webview
POP View 是小程序所用的 Webview

```
const { view, native, info} = JHBridge
    view.back() // 当前 Webview 返回上一页
    view.show() // 显示小程序页面，传入是否清理上次浏览内容的标识
    view.hide() // 隐藏小程序页面
    view.load({ url }) // 加载小程序页面
}
```
以上逻辑均可以在 APP View 和 POP View 里面使用。

## 小程序一般正确使用姿势：

使用 `view.load({url:"http://xxxx.xxx"})` 加载小程序网址

然后使用 `view.show()` 显示POP View，不一定紧跟在`load`后面，也可以在 POP View 里面触发。

`view.show()` 可以在 POP View 的业务逻辑里写，比如不需要用户来主动触发的POP View（活动等），需要定时弹出的POP View，可以在页面 Dom 加载完成、业务逻辑执行的时候显示，比如，我们可以在小程序里面判断当前用户是否需要弹出这个POP View，就不用再主程序里面判断当前用户是否需要弹出了。




