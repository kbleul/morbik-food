import RecipeContent from "./recipecontent"
import RedditPage from "./redditpage"
import { BrowserRouter, Routes, Route ,Outlet } from "react-router-dom"
import Header from "./header";

const App = () => {

  return (<BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} >
        <Route path="/" element={<RecipeContent />} />
           <Route path="/reddit" element={<RedditPage />}  />
        </Route>
    </Routes>


  </BrowserRouter>)
 
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
