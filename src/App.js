import RecipeContent from "./recipeContent"
import { BrowserRouter, Routes, Route ,Outlet , Redirect} from "react-router-dom"
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


const RedditPage = () => {
  return (<div className="mt-32">
    <p>Reddit page</p>
  </div>)
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
