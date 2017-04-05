'use strict';
import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import Store from './store';
import Actions from './actions';
import history from 'router/history';

import Header from 'components/common/header/HeaderComponent';
import ScrollComponent from 'libs/iscroll/ScrollComponent';

const img1 = require('images/park_weather01.jpg');
const img2 = require('images/park_weather02.jpg');
const img3 = require('images/park_weather03.jpg');
const img4 = require('images/park_weather04.jpg');
const img5 = require('images/park_weather05.jpg');
require('styles/index/Index.less');

class IndexComponent extends ScrollComponent{
  constructor(props){
    super(props);
    this.state={
      num:1,
      data:[],
      displacement:0
    }
    util.loading.show();
  }
  init(){
     this.actions = Actions;
  }
  componentWillMount() {
      if (this.autoload) {
          if(window.localStorage&&localStorage.getItem('listData')!==null){
              var listData = JSON.parse(localStorage.getItem('listData'));
              this.setState({list:listData});
              this.state=Object.assign(this.state,this.defaultState);
              this.actions.clear();
              this.noMoreData = false;
              this._updateTop();
          }else{
             this.initData(); 
          }      
      }      
  }
  _updateTop(){
    if(window.localStorage&&localStorage.getItem('displacement')!==null){
        var top = JSON.parse(localStorage.getItem('displacement'));
        this.setState({displacement:top});
        localStorage.removeItem("displacement");
    }
  }
  loadComplete(){
    this.scroll.options.momentum=false;
    this.scroll.scrollTo(0,-this.state.displacement);
    this.scroll.options.momentum=true;
    util.loading.hide();
  }
  triggerLoad() {
    Actions.loadList(this.state.page,{category_id:this.state.num});
  }
  jump(value){
      if(value){
          history.push(value);
      }else{
          util.toast('暂未开放');
      }
  }
  handelWrap(e){
   var pattern =new RegExp("\\((.| )+?\\)","igm");
   var trans =parseInt(this.refs.dispath.style.transform.match(pattern)[0].split(',')[1].split(')').join(''));
   var move=Math.abs(trans);
    var top = this.refs.scrollContainer.scrollTop;
    var distance = top+move;
    this.setState({
      displacement:distance
    });    
  }
  render() {
    var _this = this;
    if(window.localStorage){
      localStorage.setItem('listData',JSON.stringify(this.state.list));
    };
  	 return (
      <div className="index-component full-page">
        	<Header title={'公园列表'} name='indexHeader'/>
          <div className='main full-page'>
          <section className="scroll-block" ref="scrollContainer" onTouchEnd={this.handelWrap.bind(this)}>
            <div className="scroll-inner" ref="dispath">
            {this.getDownDom()}
              {this.state.list.map((item,index)=>{
                return(
                  <div className='park-weather-list' key={'index'+index} style={{backgroundImage:'url('+item.imgUrl+')'}} onClick={()=>this.jump('parkDetail/'+item.id+'?top='+_this.state.displacement)}>
                      <h2>{item.title}</h2>
                      <span>{item.weather}</span>
                      <span>{item.deg}℃</span>
                  </div>
                )
              })}
            {this.getUpDom()}
            </div>
          </section>
          </div>
      </div>
    );
  }
}

// ReactMixin.onClass(IndexComponent,Reflux.listenTo(Store, 'getData'));
ReactMixin.onClass(IndexComponent,Reflux.listenTo(Store, 'onChange'));
IndexComponent.displayName = 'IndexIndexComponent';
IndexComponent.defaultProps = {}

// Uncomment properties you need
// IndexComponent.propTypes = {};
// IndexComponent.defaultProps = {};

export default IndexComponent;

