'use strict';

import React from 'react';
  import history from 'router/history';
require('styles/common/header/Header.less');

class HeaderComponent extends React.Component {
	constructor(props){
		super(props);

	}
  doLeft(){
    history.goBack();
  }
  render() {
    var left=[];
    var _this=this;
    if(!this.props.hideLeft && window.history.length>=2){
      left.push(
        <span key="left-btn" onClick={()=>_this.doLeft()} ></span>
      )
    }
    return (
      <div className={this.props.name}>
       		{left}
       		<h1>{this.props.title}</h1>
      </div>
    );
  }
}

HeaderComponent.displayName = 'HeaderHeaderComponent';

// Uncomment properties you need
// HeaderComponent.propTypes = {};
// HeaderComponent.defaultProps = {};

export default HeaderComponent;
