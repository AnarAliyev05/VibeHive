import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Register from "./pages/register"
import HomePage from "./pages/home"


function App() {
  

  return (
    <>
  <BrowserRouter>
      <Routes>
      <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
