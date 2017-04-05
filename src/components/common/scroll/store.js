'use strict';
import Reflux from 'reflux'
import MixinStore from 'libs/CommonStore'

const Store = {
    list : {},
    loadUrl : '',

    rowNum : 10,
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
        this.ajaxPost(this.loadUrl, params, function(data) {
            var noMoreData = data.length === 0 || data.length < _this.rowNum;
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

        });
    }
};


export default Object.assign(Store,MixinStore)
