import {useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';

const history = useRouterHistory(createHashHistory)({ queryKey: false });

export default history ;

// import createBrowserHistory from 'history/lib/createBrowserHistory'
// const history = createBrowserHistory();
// export default history ;

