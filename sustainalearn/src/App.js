import './App.css';
import NavBar from "./NavBar";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Article from "./pages/Article";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles.css'

function App() {
  return (
    <BrowserRouter>
        <div className="Sustainalearn">
            <NavBar/>
            <h1>Sustainalearn</h1>
            <div id="page-body">
                <Routes>
                      <Route path={"/"} element={<Homepage />} />
                      <Route path={"/search"} element={<Search />} />
                      <Route path={"/article/:id"} element={<Article />} />
                </Routes>
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
