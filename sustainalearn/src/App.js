import './App.css';
import Homepage from "./pages/Homepage";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <h1>Sustainalearn</h1>
            <div id="page-body">
                <Routes>
                    <Route path={"/"} element={<Homepage/>} />
                </Routes>
                Welcome to Sustainalearn!
            </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
