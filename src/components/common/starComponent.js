'use strict';
 import React,{Component} from 'react';

class StarComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			index:[this.props.index]
		}
	}
  render(){
    var spans=[];
		for(var i=0;i<this.state.index;i++){
			spans.push('<span class="solid"></span>');
		};
		for(var j=0;j<5-this.state.index;j++){
			spans.push('<span class="hollow"></span>');
		};
		var inner = spans.join(' ');
    return(
				<p dangerouslySetInnerHTML={{__html:inner}}>
				</p>
			)
    }
};

export default StarComponent;