import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./routes/Login";


function App() {
  return (
    <BrowserRouter>
      <Login/>
    </BrowserRouter>
  );
}

export default App;
