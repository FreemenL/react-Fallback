'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import iSlider from './script/islider';


require('./css/islider.less');

class Islider extends React.Component {
	constructor(props) {
		super(props);
	}

    componentWillMount() {

    }

    componentDidMount() {
        $(".islider-component").append(this.props.children);
        var slider = new iSlider(this.props.config);
    }

    componentWillUnmount() {

    }

    render(){
        

        return (
          <div className="islider-component">    
          </div>
        );
    }
}

Islider.displayName = 'IsliderComponent';

// Uncomment properties you need
// ScrollComponent.propTypes = {};
// ScrollComponent.defaultProps = {};

export default Islider;
