

import * as React from "react";
import { Routes, Route, Outlet, Link, NavLink } from "react-router-dom";

import MainPage from "./component/main/MainPage";
import Emoji from "./component/main/Emoji";
import LikeFolder from "./component/main/LikeFolder";
import Header from "./component/main/Header";
import OneToFifty from "./component/game/OneToFifty";


function App3() {
  return (
    <div className="container">
      <Header />
      
      <Routes>
     
        

        {/* <Route index element={<Main />} />
          <Route path="feed" element={<Feed />} />
          <Route path="sidebar" element={<Sidebar />} />
          <Route path="storyreal" element={<StoryReal />} />
          <Route path="widgets" element={<Widgets />} />
          <Route path="main" element={<Main />} />
          <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App3;
