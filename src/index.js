require('normalize.css');
require('styles/App.css');
import 'core-js/fn/object/assign';
import ReactDOM from 'react-dom';
import Auth from 'router/auth';
import CommonStore from 'libs/CommonStore';
import Routes from 'router/router';

const App={
  run:function(){   
    ReactDOM.render(Routes,document.getElementById('app'))
  }
}

// CommonStore.getWxSign(function(){
	//jssdk.config(data);
	App.run();
// })
