module.exports = {
    config: function(sign) {
        wx.config({
            debug: false,
            appId: sign.appId,
            timestamp: sign.timestamp,
            nonceStr: sign.nonceStr,
            signature: sign.signature,
            jsApiList: [
                // 所有要调用的 API 都要加到这个列表中
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'hideMenuItems',
                'chooseImage',
                'getLocation',
                'uploadImage',
                'previewImage'
            ]
        });
    },
    init:function(callback){
        wx.ready(function () {
            callback && callback();
        });
        wx.error(function(res) {

        });
    },
    //隐藏菜单
    hideMenuItems:function(addList){
       var lists=[
            'menuItem:readMode', // 阅读模式
            'menuItem:openWithQQBrowser', // 在浏览器中打开
            'menuItem:copyUrl', // 复制链接
            'menuItem:openWithSafari',
            'menuItem:share:email',
            'menuItem:share:qq',
            'menuItem:share:weiboApp',
            'menuItem:share:facebook'
       ];
       if(typeof addList==='object' && addList.length>0){
            Array.prototype.push.apply(lists,addList);
       }
       wx.hideMenuItems({
          menuList: lists
      });
    },
    //分享给朋友
    ShareToFriend:function(options){
       wx.onMenuShareAppMessage({
          title: options.title,
          desc: options.desc,
          link: options.url,
          imgUrl: options.imgUrl,
       });
    },
    //分享到朋友圈
    ShareToMoments:function(options){
        wx.onMenuShareTimeline({
            title: options.title,
            link: options.url,
            imgUrl: options.imgUrl,
        });
    },
    addImg : function() {
        wx.chooseImage({
            success: function (res) {
                return res.localIds;
            }
        });
    },
    previewImage:function(current,list){
        wx.previewImage({
            current: current, // 当前显示图片的http链接
            urls: list// 需要预览的图片http链接列表
        });
    }
}