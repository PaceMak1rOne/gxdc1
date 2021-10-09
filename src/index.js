import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import Router from './router'
import configStore from './redux/store/configStore'
const store =  configStore();
ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root')
) 