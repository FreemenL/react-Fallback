import Config from 'libs/const';
import ajax from 'libs/ajax';

const MixinStore={
    ajaxPost:ajax.post,
    ajaxGet:ajax.get,
    //获取微信签名
    getWxSign(callback) {
        var params = {
            'url':location.href.split('#')[0]
        };
        var requestUrl='ticket/sign';
        this.ajaxPost(requestUrl,params,function(data) {
            callback && callback(data);
        });
    },
    //获取地理位置
    getLocation(lng, lat) {
        var params = {
            lng : lng,
            lat : lat
        };
        var requestUrl='cominterface/get_location';
        var _this = this;
        this.ajaxPost(requestUrl,params,function(data) {
            _this.trigger(data, 'getLocation');
        });
    },
    getMobilizationInfo(callback) {
        var _this = this;
        this.ajaxGet('spread/getMyMobilizationInfo', function(data) {
            callback && callback(data);
        });
    }
}

export default MixinStore;
