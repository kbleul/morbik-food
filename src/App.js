import Header from "./header";
import Footer from "./fotter"

function App() {
  return (
    <div className="grid grid-cols-8 gap-3">
    <div className="col-span-9 border-2 border-gray-500">
      <Header />
      </div>
      <nav className="  col-span-1 row-start-2 row-end-2 border-2 border-gray-500"></nav>
      <main className="col-start-2 col-end-9 row-start-2 row-end-5 border-2 border-gray-500">

      </main>
      <div className="col-span-9 border-2 border-gray-500">
      <Footer />
      </div>
    </div>
  );
}

export default App;
