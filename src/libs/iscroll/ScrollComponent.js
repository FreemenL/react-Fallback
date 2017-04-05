
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import IScroll from './script/iscroll';

require('./less/iscroll.less');

var defaultState={
    list : [],
    page : '',
    firstLoaded : false
}

class ScrollComponent extends React.Component {
	constructor(props) {
		super(props);
        this.init && this.init();
    	this.scrollLoad=true; //滚动是否触发加载
		this.autoload=true;   //是否自动加载数据
		this.scroll=null;
	    this.pullUpDom=null;
	    this.pullDownDom=null;
	    this.noMoreData=false;
	    this.loading=false;
	}


    //初始化参数 init actions必须初始化
    //用于兼容其它数据成功返回处理 onStoreOtherChange
    //多参数则重写 triggerLoad
    //获取容器重写 getContainer

    initData() {
        //加载列表
        this.state=Object.assign(this.state,defaultState);
        this.actions.clear();
        this._loadList();
        this.noMoreData = false;
    }

    _getContainer() {
        if (this.getContainer) {
            return this.getContainer();
        } else {
            return ReactDOM.findDOMNode(this.refs.scrollContainer);
        }
    }

    
    bindScroll(){
		var _this = this;
        if (this.scrollLoad) {
            if (this.scroll !== null) {
                $(this.pullDownDom).css('display', 'none');
				this.scroll.refresh();
            } else {
                var container = this._getContainer();
                var $container = $(container);
                this.pullUpDom = $container.find('.pull-up')[0];
                this.pullDownDom = $container.find('.pull-down')[0];
                this.scroll = new IScroll(container, {
                    mouseWheel: true,
                    hideScrollbars : true,
                    fadeScrollbars : true,
                    shrinkScrollbars : 'clip',
                    scrollbars : 'custom',
                    probeType: 2,
                    click : true
                });
				
                this.scroll.on('brforeRefresh', function() {
                    if (_this.loading) {
                        return;
                    }
                    if (!_this.noMoreData){
                        var pullUpEl = _this.pullUpDom;
                        if (pullUpEl.className !== 'pull-up') {
                            pullUpEl.className = 'pull-up';
                            pullUpEl.querySelector('.pull-up-label').innerHTML = '上拉加载...';
                        }
                    }
                });
                var _this = this;
                this.scroll.on('scroll', function() {
                    if (_this.loading) {
                        return;
                    }
                    var pullUpEl = _this.pullUpDom;
                    var pullDownEl = _this.pullDownDom;
                    if (this.y > 0) {
						$('.pull-down').css('display', 'block');
						if (this.y < 39) {
                            $(pullDownEl).removeClass('flip');
                            $('.pull-down-label').html('下拉加载...');
                        } else if (this.y > 39) {
                            $(pullDownEl).addClass('flip');
                            $('.pull-down-label').html('释放刷新...');
                            
                        }
                    } else if (!_this.noMoreData) {
                        if (this.y < (this.maxScrollY - 30) && !pullUpEl.className.match('flip')) {
                            $(pullUpEl).addClass('flip');
                            pullUpEl.querySelector('.pull-up-label').innerHTML = '释放加载...';
                        } else if (this.y > (this.maxScrollY - 30) && pullUpEl.className.match('flip')) {
                            $(pullUpEl).removeClass('flip');
                            pullUpEl.querySelector('.pull-up-label').innerHTML = '上拉加载...';
                        }
                    }
                });
                this.scroll.on('moveEnd', function() {
                    if (_this.loading) {
                        return;
                    }

                    // 下拉刷新
                    var pullDownEl = _this.pullDownDom;
                    if (typeof pullDownEl !== 'undefined' && pullDownEl !== null && pullDownEl.className.match('flip')) {
                        $(pullDownEl).removeClass('flip');
                        _this.refresh();
                    }

                    var pullUpEl = _this.pullUpDom;
                    if (typeof pullDownEl !== 'undefined' && pullUpEl !== null && pullUpEl.className.match('flip')) {
                        $(pullUpEl).addClass('loading');
                        pullUpEl.querySelector('.pull-up-label').innerHTML = '加载中...';
                        _this._loadList();
                    }
                });
            }
        }
    }

    offScroll() {
        if (this.scrollLoad) {
            try {
                this.scroll.destroy();
            } catch(err) {

            }
            this.scroll = null;
            this.pullUpDom = null;
            this.pullDownDom = null;
        }
    }

    //刷新
    refresh() {
        this.state.page ='';
        this.initData();
    }

    componentDidMount() {
        this.bindScroll();
        this.loadComplete();
    }

    componentWillUnmount() {
        this.offScroll();
    }
    _loadList() {
        if(this.loading) {
            return;
        }else{
            this.loading = true;
            if (this.triggerLoad) {
                this.triggerLoad();
            } else {
                this.actions.loadList(this.state.page);
            }
        }
    }


    onChange(type, data, noMoreData, listType) {
		if (type === 'loadList') {
			//兼容多类型数据时的情况
			if (typeof listType !== 'undefined' && listType !== this.state.type) {
				return;
			}
			this.loadComplete && this.loadComplete();
			this.loading = false;
			if (!this.state.firstLoaded) {
				this.setState({firstLoaded : true});
			}

			if (noMoreData) {
				this.noMoreData = true;
				var pullUp = this.pullUpDom;
				if (pullUp) {
					pullUp.className = 'pull-up no-more-data';
					pullUp.querySelector('.pull-up-label').innerHTML = '没有更多数据...';
				}
				if (data.length === this.state.list.length) {
                    this.setState({
                         list : data
                    });
					return;
				}
			}
          
			this.setState({
				list : data
			});
			this.bindScroll();
		}else{
            this.onStoreOtherChange && this.onStoreOtherChange(type, data, noMoreData);
        }
    }

    getUpDom(){
        return (
            <div className="pull-up">
                <span className="pull-up-icon"></span>
                <span className="pull-up-label">上拉加载...</span>
            </div>
        );
    }

	getDownDom(){
        return (
            <div className="pull-down">
                <span className="pull-down-icon"></span>
                <span className="pull-down-label">下拉加载...</span>
            </div>
        );
    }
}

ScrollComponent.displayName = 'ScrollComponent';

// Uncomment properties you need
// ScrollComponent.propTypes = {};
// ScrollComponent.defaultProps = {};

export default ScrollComponent;
