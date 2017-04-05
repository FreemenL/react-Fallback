'use strict'
import Ajax from 'libs/ajax';
import Config from 'libs/const';

const auth= {
  login:function(cb){
      if(window.sessionStorage.getItem('isLogin')){
         cb && cb();
      }else{
         this.doLogin(cb);
      }
  },

  doLogin:function(cb){
    var begin=window.location.href.indexOf('?');
    var length=window.location.href.length;
    var str=window.location.href.substring(begin,length);
    var url=str.substr(1);
    url= url.split('&');
    var code,type,obj_id,uid,source;
    for(var i=0;i<url.length;i++){
          var arr=url[i].split('=');
          if(arr[0]=='code'){
              code=arr[1];
          }else if(arr[0]=='uid'){
             window.tgUid=arr[1];
          }
    }
    
    var options={
        'code':code
    }

    Ajax.post('user/wmLogin',options, function(data) {
        window.sessionStorage.setItem('isLogin',true);
        if(data.subscribe==0){
            window.tgUid=window.tgUid?'?uid='+window.tgUid:''
            location.replace(Config.domains+"/wm/tg/index.html"+window.tgUid)
        }
        cb && cb(data);
    });
  },

  getQueryString(name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
     var r = window.location.search.substr(1).match(reg);
     if (r!=null) return (r[2]); return null;
  },

  getWxSign:function(cb) {
    var params = {
        'url':location.href.split('#')[0]
    };

    Ajax.post('ticket/sign',params,function(data) {
        cb && cb(data);
    });
  }
}

export default auth;