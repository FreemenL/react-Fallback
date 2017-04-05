'use strict';
import MixinStore from 'libs/CommonStore'

const Store = {
    list : {},
    loadUrl : '',

    rowNum : 5,
    clear : function() {
        this.list = [];
    },

    setRowNum : function(num) {
        this.rowNum = num;
    },

    addExtraParams : function(params, otherParams) {
        if (otherParams) {
            $.extend(params, otherParams);
            if (otherParams.rows) {
                this.rowNum = otherParams.rows;
            }
        }
    },

    getParams : function(page, args) {
        var params = {
            page : page,
            rows : this.rowNum
        };
        this.addExtraParams(params, args);
        return params;
    },


    /**
     * 加载列表
     * @param page  分页数
     * @param otherParams 其它参数
     * @param type  数据类型，可省略，用于兼容多数据
     */
    loadList : function(page, otherParams, type) {
        //兼容没有otherParams的情况
        if (typeof otherParams === 'string') {
            type = otherParams;
            otherParams = null;
        }
        var params = this.getParams(page, otherParams);
        var _this = this;
            var data = [
            {
                title:'仙湖植物园',
                weather:'晴',
                deg:'18-20',
                imgUrl:'images/park_weather01.jpg',
                id:'lake'
            },{
                title:'深圳湾公园',
                weather:'多云',
                deg:'18-21',
                imgUrl:'images/park_weather02.jpg',
                id:'SZ'
            },{
                title:'莲花山公园',
                weather:'小雨',
                deg:'18-22',
                imgUrl:'images/park_weather03.jpg',
                id:'lotus'
            },{
                title:'笔架山公园',
                weather:'暴雨',
                deg:'18-23',
                imgUrl:'images/park_weather04.jpg',
                id:'penholder'
            },
            {
                title:'东湖公园',
                weather:'大雨',
                deg:'18-24',
                imgUrl:'images/park_weather05.jpg',
                id:'East'
            },{
                title:'东湖公园',
                weather:'大雨',
                deg:'18-24',
                imgUrl:'images/park_weather05.jpg',
                id:'East'
            }

        ];
            var noMoreData = data.length === 0 || data.length < _this.rowNum;
            noMoreData=false;
            if (typeof type !== 'undefined') {
                if (typeof _this.list[type] === 'undefined') {
                    _this.list[type] = [];
                }
                _this.list[type] = _this.list[type].concat(data);
                _this.trigger('loadList', _this.list[type], noMoreData, type);
            } else {
                if (typeof _this.list === 'undefined') {
                    _this.list = [];
                }
                _this.list = _this.list.concat(data);
                _this.trigger('loadList', _this.list, noMoreData);
            }
    }
};


export default Object.assign(Store,MixinStore)