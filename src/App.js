import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import Login from "./components/Login"
import Jobs from "./components/Jobs"
import JobDetailsItem from './components/JobDetailsItem'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/jobs" element={<Jobs />}/>
        <Route path="/jobs/:id" element={<JobDetailsItem />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
