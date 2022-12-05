import './App.css';
import NavBar from "./NavBar";
import Homepage from "./pages/Search/Homepage";
import Search from "./pages/Search/Search";
import Pages from "./pages/Article and Posts/Pages";
import Submission from "./pages/Submission/Submission";
import About from "./pages/About/About";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './styles.css'
import backgroundImg from "./images/background.png"

function App() {
    //const imageUrl = window.innerWidth >= 650 ? desktopImage : mobileImage;

    return (
        <BrowserRouter>
            <div>
                <div className="Sustainalearn"
                     style = {{backgroundImage: `url(${backgroundImg})` }}>
                    <NavBar/>
                    <h1>Sustainalearn</h1>
                    <div id="page-body">
                        <Routes>
                            <Route path={"/"} element={<Search />} />
                            <Route path={"/submission"} element={<Submission />} />
                            <Route path={"/pages/:id"} element={<Pages />} />
                            <Route path={"/about"} element={<About />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
