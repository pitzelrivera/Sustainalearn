import './App.css';
import NavBar from "./NavBar";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Article from "./pages/Article";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles.css'
import backgroundImg from "./images/background.png"

function App() {
    //const imageUrl = window.innerWidth >= 650 ? desktopImage : mobileImage;

    return (
        <BrowserRouter>
            <div className="Sustainalearn"
                 style = {{backgroundImage: `url(${backgroundImg})` }}>
                <NavBar/>
                <h1>Sustainalearn</h1>
                <div id="page-body">
                    <Routes>
                        <Route path={"/"} element={<Homepage />} />
                        <Route path={"/search"} element={<Search />} />
                        <Route path={"/article"} element={<Article />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
