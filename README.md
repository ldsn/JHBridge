# JHBridge
江湖 JS Bridge API

```bash
npm install jhbridge --save
```

浏览器中包括两个view，APP View 和 POP View。

APP View 是主程序所用的 Webview
POP View 是小程序所用的 Webview

```javascript
const JHBridge = require('jhbridge');

JHBridge.view.back() // 当前 Webview 返回上一页
JHBridge.view.show() // 显示小程序页面，传入是否清理上次浏览内容的标识
JHBridge.view.hide() // 隐藏小程序页面
JHBridge.view.load({ url }) // 加载小程序页面


JHBridge.info.Android // true | false 在Android上   
JHBridge.info.IOS // true | false 在IOS
JHBridge.info.APP_VIEW // true | false 在APP_VIEW里
JHBridge.info.POP_VIEW // true | false 在POP_VIEW里
JHBridge.info.NO_VIEW // true | false 不在APP里
JHBridge.info.VERSION // x.x.x 当前APP的版本

```
以上逻辑均可以在 APP View 和 POP View 里面使用。

## 小程序一般正确使用姿势：

使用 `view.load({url:"http://xxxx.xxx"})` 加载小程序网址

然后使用 `view.show()` 显示POP View，不一定紧跟在`load`后面，也可以在 POP View 里面触发。

`view.show()` 可以在 POP View 的业务逻辑里写，比如不需要用户来主动触发的POP View（活动等），需要定时弹出的POP View，可以在页面 Dom 加载完成、业务逻辑执行的时候显示，比如，我们可以在小程序里面判断当前用户是否需要弹出这个POP View，就不用再主程序里面判断当前用户是否需要弹出了。


## 注册接收native传来的消息

```javascript
const func = (evt, arg)=>{

};
JHBridge.native.addReceiveListener(func);
```

可注册多个，接收两个参数：
- evt: (string)事件名称（push）
- arg: (string)参数内容

比如推送被点击的事件名称为`'push'`，arg是一个json格式的字符串。


可以删除注册的事件
```
JHBridge.native.removeReceiveListener(func); // func保证与注册时候的函数指向相同的地址。
```