window.__receiveJHMessage = function(evt, arg) {
    
}
const IDENTIFY = {
    Android: 'JH_Android',
    IOS: 'JH_IOS',
    APP_VIEW: 'APP_VIEW',
    POP_VIEW: 'POP_VIEW'
}
function is(id) {
    const ua = navigator.userAgent
    return ua.indexOf(id) > -1
}

/**
 * getInfo().Android 在Android上   
 * getInfo().IOS 在IOS
 * getInfo().APP_VIEW 在APP_VIEW里
 * getInfo().POP_VIEW 在POP_VIEW里
 * getInfo().NO_VIEW 不在APP里
 * getInfo().VERSION
 */
var _ua = null
function getInfo() {
    if (!_ua) {
        _ua = {}

        for (let key in IDENTIFY) {
            _ua[key] = is(key)
        }

        // 如果 不是POPVIEW 也不是APPVIEW 那就不是在APP
        if (!_ua.APP_VIEW && !_ua.POP_VIEW) {
            _ua.NO_VIEW = true
        }
        const {APP_VIEW, POP_VIEW, NO_VIEW} = _ua

        // 具体是哪一个VIEW
        _ua.VIEW = APP_VIEW ? 'APP_VIEW' : POP_VIEW ? 'POP_VIEW' : 'NO_VIEW'

        const jhIndex = navigator.userAgent.indexOf('JH ')
        if (jhIndex > -1) {
            _ua.VERSION = navigator.userAgent.substring(jhIndex + 3, 8)
        }
    }
    return _ua
}

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
    }
}
const native = {
    back() {}, // 返回键
    onPause(func) {

    }, 
    onResume(func){

    }
}

const JHBridge = { view, native, info: getInfo()}

export default JHBridge