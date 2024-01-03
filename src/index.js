import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'; // Import toastr styles

window.addEventListener('online', () => {
    toastr.success('connected to the internet', 'online!')
})

window.addEventListener('offline', () => {
 toastr.error('You are offline, please check your wifi connection', 'offline!')
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
