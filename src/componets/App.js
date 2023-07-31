import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import About from "./About";
import Home from "./Home";

import NoteState from "../contex/notes/NoteState";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
          </Routes>
          <Routes>
            <Route exact path="/about" element={<About />}></Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
