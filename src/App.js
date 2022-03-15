
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { useState, useEffect, createContext, useContext } from "react";
import RecipeContent from "./recipecontent"
import DrinkRecipeContent from "./drinkrecipecontent"
import RedditPage from "./redditpage"
import Header from "./header";
import SubredditListPage from './subredditlistpage'
import Subreddit from "./subreddit"
import MyFavorites from "./MyFavorites"
import location_context from "./locationcontext"


const App = () => {

  return (<BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} >
        <Route path="/" element={<RecipeContent />} />\
        <Route path="/drinks" element={<DrinkRecipeContent />} />
        <Route path="/reddit" element={<RedditPage />} >
          <Route path="/reddit/" element={<SubredditListPage />} />
          <Route path=":slug" element={<Subreddit />} />
        </Route>
        <Route path="/myfavorites" element={<MyFavorites />} />

      </Route>
    </Routes>
  </BrowserRouter >)

}



const Home = () => {
  const [whereami, set_whereami] = useState("Home");
  return (
    <div className="dark:bg-gray-700">

      <div>
        <location_context.Provider value={[whereami, set_whereami]}>
          <Header whereami_arr={[whereami, set_whereami]} />
        </location_context.Provider>
      </div>
      <location_context.Provider value={[whereami, set_whereami]}>
        <Outlet whereami_arr={[whereami, set_whereami]}/>
      </location_context.Provider>


    </div>
  );
}


export default App;
