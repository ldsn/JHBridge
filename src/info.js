
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

export {getInfo};