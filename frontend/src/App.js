import Connections from "./components/Connections";
import Messages from "./components/Messages";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./react-router/ProtectedRoute";
import Loginpage from "./components/Loginpage";
import Singuppage from "./components/Signuppage"
import Alerts from "./components/Alerts";





function App() {

  return (
    <div className="App">
      <Alerts ></Alerts>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Loginpage></Loginpage>}></Route>
          <Route path="/signup" element={<Singuppage></Singuppage>}></Route>
          <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Connections></Connections>
          }>
          </Route>
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
