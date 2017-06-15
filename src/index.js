import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'antd/dist/antd.css'
import './app.css'
import { Provider } from 'react-redux'
import store from './redux/store'
ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById('root'));
