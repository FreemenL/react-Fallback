require('./util.less');
//mask
export const mask = {
    maskClass : 'mui-off-canvas-backdrop',
    activeClass : 'mui-active',
    show : function($container, options) {
        //兼容没有options的情况
        if ($.isPlainObject($container)) {
            options = $container;
            $container = null;
        }

        $container = $container || $('body');
        var activeClass = this.activeClass;
        var maskClass = (options && options.maskClass) || this.maskClass;

        if ($container.length > 0) {
            var $mask = $container.find('.'+maskClass);
            if ($mask.length > 0) {
                $container.find('.'+maskClass).addClass(activeClass);
            } else {
                $container.append('<div class="'+maskClass+' '+activeClass+'"></div>');
            }
        }

        if (options && options.clickHide) {
            var _this = this;
            $container.on('click', function() {
                _this.hide();
            });
        }
    },


    hide : function($container) {
        $container = $container || $('body');
        $container.find('.'+this.maskClass).removeClass(this.activeClass)
            .off('click');
    }
};


export const dialog = {
    show : function(content,options,ele) {
        ele=ele?ele:$('body');
        util.mask.show();
        var $dialog = $([
            '<div class="global-dialog">',
                '<div class="dialog-title"><span>X</span></div>',
                '<div class="dialog-content">'+content+'</div>',
            '</div>'
        ].join('')).appendTo(ele);

        var newStyle = {
            'marginTop' : '-'+Math.round($dialog.height()/2)+'px' //垂直居中
        };
        //设置宽度，水平居中
        if (options && options.width) {
            newStyle.width = options.width+'px';
            newStyle.marginLeft = '-'+Math.round(options.width/2)+'px';
        }
        $dialog.css(newStyle);
        var remove = function() {
            ele.find('.global-dialog').remove();
            util.mask.hide();
        };
        $dialog.find('.dialog-title').on('click', remove);
        $('.mui-off-canvas-backdrop').on('click', remove);
        $dialog.hide = remove;
        return $dialog;
    }
};

//toast
export const toast = function(message, callback) {
    var share = document.createElement('div');
    share.classList.add('mui-toast-container');
    share.innerHTML = '<div class="mui-toast-message">'+message+'</div>';
    document.body.appendChild(share);
    setTimeout(function(){
        document.body.removeChild(share);
        callback && callback();
    },1500);
};

//loading
export const loading = {
    show : function(text='正在加载...') {
        var $body = $('body');
        var $loading = $body.find('.weui_loading_toast');
        if ($loading.length > 0) {
            $loading.show();
        } else {
            var html='<div class="weui_loading_toast"><div class="weui_toast"><div class="weui_loading">';
            for(var i=0;i<12;i++){
                html+='<div class="weui_loading_leaf weui_loading_leaf_'+i+'"></div>';
            }            
            html+='</div><p class="weui_toast_content">'+text+'</p></div></div>';
            $body.append(html);
        }

    },
    hide : function() {
        var $body = $('body');
        $body.find('.weui_loading_toast').hide();
    }   
};

//加载地图
export const loadMap =function(){
    /* jshint camelcase:false */
    if (typeof window.BMap_loadScriptTime === 'undefined') {
        window.BMap_loadScriptTime = (new Date()).getTime();

        var ak = 'oe9aBdr0eKpuXX9nsXTsdTFe';
        var src = 'http://api.map.baidu.com/getscript?v=2.0&ak='+ak+'&services=&t=20150901171226';

        var script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
    }
};

export const getImgUrl = function(url, width, height,cpos) {
    //return url+'?ss=1&w='+width+'&h='+height;
    cpos= cpos || 'center';
    return url+'?crop=1&cpx=0&cpy=0&cpos='+cpos+'&w='+width+'&h='+height;
};

//加载地图
export const shares =function(){
    var share = document.createElement('div');
    share.classList.add('share-container');
    share.innerHTML = '<div class="share-bg"></div>';
    document.body.appendChild(share);
    $(share).on('click',function(){
        document.body.removeChild(share);
    })
};

//去除空格
export const trims =function(value){
    value = value.replace("/(^\s*)|(\s*$)/g","");
    value = value.replace("^\:[a-z0-9_]+\:$","");
    return value
};

//检查手机格式
export const checkMobile =function(tel){
     var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
     if (reg.test(tel)) {
          return true;
     }else{
          return false;
     }
};

//加载更多
export const scrollLoad=function(element,callback){
    $('#'+element).on("scroll",function(){
        var a = this.scrollTop==0? document.body.clientHeight : this.clientHeight;
        var b = this.scrollTop==0? document.body.scrollTop : this.scrollTop;
        var c = this.scrollTop==0? document.body.scrollHeight : this.scrollHeight;
        if(a+b==c){

        }
    });
}

//滚动事件
export const scroll = {
    getScrollTop:function(){
    　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    　　if(document.body){
    　　　　bodyScrollTop = document.body.scrollTop;
    　　}
    　　if(document.documentElement){
    　　　　documentScrollTop = document.documentElement.scrollTop;
    　　}
    　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    　　return scrollTop;
    },
    //文档的总高度
    getScrollHeight:function(){
    　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    　　if(document.body){
    　　　　bodyScrollHeight = document.body.scrollHeight;
    　　}
    　　if(document.documentElement){
    　　　　documentScrollHeight = document.documentElement.scrollHeight;
    　　}
    　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    　　return scrollHeight;
    },
    //浏览器视口的高度
    getWindowHeight:function(){
    　　var windowHeight = 0;
    　　if(document.compatMode == "CSS1Compat"){
    　　　　windowHeight = document.documentElement.clientHeight;
    　　}else{
    　　　　windowHeight = document.body.clientHeight;
    　　}
    　　return windowHeight;
    },
    hitBottom:function(callback,height=50){
        if(this.getScrollHeight()-(this.getScrollTop() + this.getWindowHeight()) <=height ){
    　　　　callback && callback();
    　　}
    }
};

export const date={
    format:function(timestamp,timeFormat='h:i:s'){
        var timeType=timeFormat.split(':');
        var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var date = (d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" +(d.getDate());

        var time='';
        var _this = this;
        timeType.map(function(data){
            switch(data){
                case 'h':
                    time+=' '+(_this.checkTime(d.getHours()));
                    break;
                case 'i':
                    time+=':'+(_this.checkTime(d.getMinutes()));
                    break;
                case 's':
                    time+=':'+(_this.checkTime(d.getSeconds()));
                    break;
            }
        })

        date=date+time;

        return date;
    },
    checkTime:function(i){
        if (i<10){
            i = "0" + i;
        }
        return i;
    }
}

//倒计时
export const countDown=function(deadTime){
    deadTime=deadTime.replace(/\-/g, '/');
    var EndTime= new Date(deadTime); //截止时间     
    var NowTime = new Date();
    var t = EndTime.getTime() - NowTime.getTime();

    var d=Math.floor(t/1000/60/60/24)>=0?Math.floor(t/1000/60/60/24):0;
    var h=Math.floor(t/1000/60/60%24)>=0?Math.floor(t/1000/60/60%24):0;
    var m=Math.floor(t/1000/60%60)>=0?Math.floor(t/1000/60%60):0;
    var s=Math.floor(t/1000%60)>=0?Math.floor(t/1000%60):0;
    
    h=(d*24+h)<99?(d*24+h):99;

    if(h>0){
        h=h.toString();
        var h_l=h.substr(h.length-1,1);
        var h_h=h.length>1?h.substr(h.length-2,1):0;
    }else{
        var h_l=0;
        var h_h=0;
    }

    if(m>0){
        m=m.toString();
        var m_l=m.substr(m.length-1,1);
        var m_h=m.length>1?m.substr(m.length-2,1):0;
    }else{
        var m_l=0;
        var m_h=0;
    }

    if(s>0){
        s=s.toString();
        var s_l=s.substr(s.length-1,1);
        var s_h=s.length>1?s.substr(s.length-2,1):0;
    }else{
        var s_l=0;
        var s_h=0;
    }

    return '<span>'+h_h+'</span><span>'+h_l+'</span>:<span>'+m_h+'</span><span>'+m_l+'</span>:<span>'+s_h+'</span><span>'+s_l+'</span>';
}


