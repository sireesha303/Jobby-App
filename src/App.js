import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import Login from "./components/Login"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" elelment={<Home />}/>
        <Route path="/Login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
