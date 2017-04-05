import Config from './const';
/**
 * 统一ajax请求获取数据
 * @param type  请求方式
 * @param url   请求地址
 * @param params    请求参数
 * @param callback  回调函数
 * @param sync  同步方式
 * @private
 */
function _ajaxData(type, url, params, callback, sync) {
    //无查询参数，用于兼容(url,callback)模式
    if (typeof callback === 'undefined' && typeof  params === 'function') {
        callback = params;
        params = {};
    }

    url=url.indexOf('http')>=0?url:Config.api+url;

    params.t = Math.random();
    $.ajax({
        'url': url,
        'type' : type,
        'async': !(sync &&  (sync === 'sync')),
        'data': params,
        'dataType': 'json',
        'timeout' : 3000,
        'xhrFields': {
            withCredentials: true
        },
        'success': function (result) {
            util.mask.hide();
            if (result && typeof result.code !== 'undefined' && result.code === 0 && typeof result.data !== 'undefined') {
                callback && callback(result.data);
            } else {
                //出错统一处理
                _handleAPIError(result);
            }
        },
        'error' : function(result) {
            util.mask.hide();
            //出错统一处理
            _handleAPIError(result);
        }
    });
 }

 function _handleAPIError(result) {
    util.loading.hide();
    if (result && typeof result.statusText && result.statusText === 'timeout') {
        alert('请求超时！');
    }

    if (result) {
        if (typeof result.code !== 'undefined' && result.code === 2 || result.code === 1) {
            result.msg && util.toast(result.msg);
        } else if (typeof result.responseText !== 'undefined') {
            if (result.msg) {
                util.toast(result.msg);
            }else{
                util.toast('请求错误!');
            }
        } else if(result.code===1001){
            util.toast('登录错误');
            //location.href = 'http://mp.weixin.qq.com/s?__biz=MzA5MDcxNzk2NA==&mid=206925187&idx=1&sn=bc8bff192af40a8a963115bb5b2a086f&scene=0#rd';
        }
    }
}

function ajaxGet(url, params, callback){
    //无查询参数，用于兼容(url,callback)模式
    if (typeof callback === 'undefined' && typeof  params === 'function') {
        callback = params;
        params = {};
    }
    _ajaxData('get', url, params, callback);
}

function ajaxPost(url, params, callback) {
    //无查询参数，用于兼容(url,callback)模式
    if (typeof callback === 'undefined' && typeof  params === 'function') {
        callback = params;
        params = {};
    }
    _ajaxData('post', url, params, callback);
}

var ajax={
    'get':ajaxGet,
    'post':ajaxPost
}

module.exports = ajax;
