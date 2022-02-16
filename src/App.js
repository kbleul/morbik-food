import Header from "./header";
import Footer from "./fotter";
import Main from "./main";

function App() {
  return (
    <div className="grid grid-cols-8 gap-3">
    <div className="col-span-9 ">
      <Header />
      </div>
      <nav className="  col-span-1 row-start-2 row-end-2 "></nav>
      <main className="col-start-2 col-end-9 row-start-2 row-end-5 ">
        <Main />
      </main>

      <div className="col-span-9 ">
      <Footer />
      </div>
    </div>
  );
}

export default App;
