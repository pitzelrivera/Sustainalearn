import './App.css';
import NavBar from "./NavBar";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import Pages from "./pages/Pages";
import Submission from "./pages/Submission";
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
                        <Route path={"/"} element={<Search />} />
                        <Route path={"/submission"} element={<Submission />} />
                        <Route path={"/pages/:id"} element={<Pages />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
