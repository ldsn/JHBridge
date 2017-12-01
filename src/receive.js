const receiveArr = [];
let receiveEventCache = [];
let status = false;
window.__receiveJHMessage = function(evt, arg) {
    if (!status) {
        receiveEventCache.push({evt, arg});
        return;
    }
    receiveArr.forEach(func =>{
        func(evt, arg);
    });
}
function addReceiveListener (func) {
    receiveArr.push(func);
}

function removeReceiveListener (func) {
    const i = receiveArr.indexOf(func);
    receiveArr.splice(i, 1);
}

function flushReceive (func) {
    status = true;
    receiveEventCache.forEach(({evt, arg})=>{
        receiveArr.forEach(func => {
            func(evt, arg);
        });
    });
    receiveEventCache = [];
}

export default {addReceiveListener, removeReceiveListener, flushReceive};
