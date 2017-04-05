
import Reflux from 'reflux'
import Actions from './actions'
import CommonStore from 'libs/iscroll/store/store'

export default Reflux.createStore({
    mixins: [CommonStore],
    listenables: [Actions],
    loadUrl : 'question/getList',
    rowNum:10,
});