import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import Header from "./components/Header"
import { handleUserAuth } from "./components/redux/actions"
import { connect } from "react-redux"
import { useEffect } from "react"
import ProtectedRoutes from "./components/ProtectedRoutes"


const App = (props) => {
  useEffect(() =>{
     props.userAuth() ;
  } , [])
  return (
 <div className="App">

     <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={
        <ProtectedRoutes>
        <Header/>
        <Home/>
        </ProtectedRoutes>
    }/>
    </Routes>
     </Router>
    </div>


  )
}
const mapStateToProps = (state) =>{
 return {} ;
}

const mapDispatchToProps = (dispatch) =>{
  return {
    userAuth :() => dispatch(handleUserAuth())
  }
}
export default connect(mapStateToProps , mapDispatchToProps)(App) ;