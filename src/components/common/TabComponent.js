'use strict';
 import React,{Component} from 'react';

require('styles/common/tab.less');

class TabComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			currentTab:0
		}
	}
	changeTab(index){
		this.props.change(index)
	}
	render(){
		var _this = this
		return(
			<div className='tabContainer'>
			   {_this.props.data.map((item,index)=>{
		  			return(
		  				<span key={index} className={_this.props.index==index?'active':''} onClick={()=>this.changeTab(index)}>{item.name}</span>
		  			)
		  		})}
			</div>

			)
		}
};

export default TabComponent;