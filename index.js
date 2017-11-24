window.__receiveJHMessage = function(evt, arg) {
    
}
const IDENTIFY = {
    Android: 'JH_Android',
    IOS: 'JH_IOS',
    APP_VIEW: 'APP_VIEW',
    POP_VIEW: 'POP_VIEW'
}
function is(id) {
    const ua = navigator.userAgent;
    return ua.indexOf(id) > -1;
}

/**
 * getInfo().Android 在Android上   
 * getInfo().IOS 在IOS
 * getInfo().APP_VIEW 在APP_VIEW里
 * getInfo().POP_VIEW 在POP_VIEW里
 * getInfo().NO_VIEW 不在APP里
 * getInfo().VERSION
 */
let __ua_info;
function getInfo() {
    if (!__ua_info) {
        __ua_info = {}

        for (let key in IDENTIFY) {
            __ua_info[key] = is(key);
        }

        // 如果 不是POPVIEW 也不是APPVIEW 那就不是在APP
        if (!__ua_info.APP_VIEW && !__ua_info.POP_VIEW) {
            __ua_info.NO_VIEW = true;
        }
        const {APP_VIEW, POP_VIEW, NO_VIEW} = __ua_info;

        // 具体是哪一个VIEW
        __ua_info.VIEW = APP_VIEW ? 'APP_VIEW' : POP_VIEW ? 'POP_VIEW' : 'NO_VIEW';

        const jhIndex = navigator.userAgent.indexOf('JH ');
        if (jhIndex > -1) {
            __ua_info.VERSION = navigator.userAgent.substring(jhIndex + 3, 8);
        }
    }
    return __ua_info
}

function sendMessage(evt, arg = "") {
    if (getInfo().IOS) {
        window.webkit.messageHandlers[getInfo().VIEW].postMessage({event: evt, arg: arg});
    } else if(getInfo().Android) {
        window.__BRIDGE.bridge(evt, arg);
    }
}


const view = {
    back() {
        if (NO_VIEW) {
            history.back();
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
        sendMessage('load', url)
    }
}
const native = {
    back() {}, // 返回键
    onPause(func) {

    }, 
    onResume(func){

    }
}

const JHBridge = { view, native, info: getInfo()};

export JHBridge;