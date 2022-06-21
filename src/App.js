import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import Login from "./components/Login"
import Jobs from "./components/Jobs"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/jobs" element={<Jobs />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
