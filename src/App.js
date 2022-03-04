import RecipeContent from "./recipecontent"
import DrinkRecipeContent from "./drinkrecipecontent"
import RedditPage from "./redditpage"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import Header from "./header";
import SubredditListPage from './subredditlistpage'
import Subreddit from "./subreddit"


const App = () => {

  return (<BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} >
        <Route path="/" element={<RecipeContent />} />\
        <Route path="/drinks" element={<DrinkRecipeContent />} />
        <Route path="/reddit" element={<RedditPage />} >
            <Route path="/reddit/" element={<SubredditListPage /> } />
              <Route path=":slug" element={<Subreddit />} />
        </Route>
            
      </Route>
  </Routes>


  </BrowserRouter >)
 
}



const Home = () => {


  return (
    <div className="">
      <div className="">
        <Header />
      </div>

      <Outlet />
    </div>
  );
}


export default App;
