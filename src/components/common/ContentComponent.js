'use strict';
 import React,{Component} from 'react';
 import Star from 'components/common/starComponent'
require('styles/common/content.less');

class ContentComponent extends Component{
	constructor(props){
		super(props);
	}
    render(){
    	var _this=this;
        return(
            <div className={this.props.contentClass(this.props.index)} >
            	<div className="data-container">
            		{this.props.val.map((item,index)=>{
            		return(
						<div key={index} className={_this.props.type}style={{backgroundImage:'url('+item.imgUrl+')'}}>
							<p><span>{item.title}：</span>{item.data}</p>
							<Star index={_this.props.dataId==1?item.index:''}/>
						</div>
            			)
            		})}
            	</div>
            </div>
        )
    }


};

export default ContentComponent;




    // //         	<div className="weather-container">
				// 	<div className='row-weather'>
				// 		<div className="weather-item">1{ this.props.val  }</div>
				// 		<div className="weather-item">2</div>
				// 	</div>
				// 	<div className='row-weather'>
				// 		<div className="weather-item" style="">3</div>
				// 		<div className="weather-item" style="">4</div>
				// 	</div>
				// // </div>
// <p>
// 								[new Array(item.index)].map((item1, index1) => {
// 							        return (
// 							          <span>实心</span>
// 							        )
// 							    })

// 							    [new Array(5-item.index)].map((item1, index1) => {
// 							        return (
// 							          <span>空心</span>
// 							        )
// 							    })
// 							</p>