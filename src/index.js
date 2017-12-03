import receive from './receive.js';
import {getInfo} from './info.js';
function sendMessage(evt, arg = "") {
    if (getInfo().IOS) {
        window.webkit.messageHandlers[getInfo().VIEW].postMessage({event: evt, arg: arg})
    } else if(getInfo().Android) {
        window.__BRIDGE.bridge(evt, arg)
    }
}


const view = {
    back() {
        if (getInfo().NO_VIEW) {
            history.back()
        } else {
            sendMessage('back')
        }
    },
    show() {
        sendMessage('back')
    },
    hide() {
        sendMessage('hide')
    },
    load({ url }) {
        if (getInfo().NO_VIEW) {
            location.href = url
        } else {
            sendMessage('load', url)
        }
    },
    setConfig(config) {
        for (let key in config) {
            config[key] = config[key].toString();
        }
        if (getInfo().IOS) {
            sendMessage('config', config);
        } else if (getInfo().Android){
            for (let key in config) {
                sendMessage('config', `${key},${config[key]}`);
            }
        }
    }
}
const native = {
    back() {}, // 返回键
    onPause(func) {

    }, 
    onResume(func){

    },
    ...receive
}

const JHBridge = { view, native, info: getInfo()}

// 触发加载完成
sendMessage('inited');

export default JHBridge