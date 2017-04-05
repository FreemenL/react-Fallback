'use strict';

import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import Store from './store';
import Actions from './actions';

import Header from 'components/common/header/HeaderComponent';
import Tab from 'components/common/TabComponent';
import Content from 'components/common/ContentComponent';
const imgs = require('images/park_bg.jpg');

require('styles/common/EchosDetail/EchosDetail.less');

class EchosDetialComponent extends React.Component {
  constructor(props){
    super(props);
    this.state={
      current:0,
      tab:[],
      data:{},
      content:[],
      id:this.props.params.id,
      top:props.location.query.top
    };
    util.loading.show();
    Actions.getData(this.state.id);
    Actions.transfor();
  }
  componentWillMount(){
    if(window.localStorage){
      localStorage.setItem('displacement',JSON.stringify(this.state.top));
    }
  }
  callBack(type,data){
    util.loading.hide();
    if(type=='msg'){
      this.setState({
        data:data,
        tab:data.tab
      })
    };
    if(type=='List'){
      this.setState({
        content:data
      })
    }
    
  }
  change(index){
    this.setState({
      current:index
    })
  }
  contentClass(index){
    return this.state.current === index ? 'show' : 'hide';
  }
  getDate(){
    var d=new Date();
    var weekday=["周日","周一","周二","周三","周四","周五","周六"];
    var day = d.toLocaleString().substr(5,4).split('/').join('-');
    return {week:weekday[d.getDay()],day:day}
  }

  render() {
    return (
      <div className="parkdetail" style={{backgroundImage:'url(images/park_bg.jpg)'}}  >
        <Header title={this.state.data.title} name='transparent'/>
        <span className="status">{this.state.data.status}</span>   
        <div className="weather_day">
            <span className='week'>{this.getDate().week}</span>

            <span className='day'>{this.getDate().day}</span>
        </div>
        <div className="weather-pic" style={{backgroundImage:'url(images/circle.png)'}}>
            <div className="sun" style={{backgroundImage:'url(images/sun.png)'}}></div>
            <div className="number">{this.state.data.currentTem}°</div>
            <div className="mask"><div className='scope'>{this.state.data.Temperature}℃</div></div>           
        </div>
       <Tab data={this.state.tab} change={this.change.bind(this)} index={this.state.current}/>
        <div>
            { this.state.content.map( ( val,index ) => {
                return ( <Content key={index} val={val.item} type={val.type} index={index} dataId={val.id} contentClass={ this.contentClass.bind(this) } /> )
            })}
        </div>
      </div>
    );
  }
}

EchosDetialComponent.displayName = 'EchosDetialComponent';
ReactMixin.onClass(EchosDetialComponent,Reflux.listenTo(Store, 'callBack'));
// Uncomment properties you need
// IframeComponent.propTypes = {};
// IframeComponent.defaultProps = {};

export default EchosDetialComponent;




