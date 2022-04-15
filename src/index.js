import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from './App';
import App from "./App1";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import App2 from "./App2";
import App3 from "./App3";
import { UserProvider } from "./component/member/UserContext";


// 메인함수
// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

ReactDOM.render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


