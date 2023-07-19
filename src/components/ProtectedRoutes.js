import { useEffect } from "react";
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
// this function is used to show the homePage in case of user login to prevent user from access homePage and he did not log in..!
const ProtectedRoutes = ({user , children}) => {
    const navigate = useNavigate();
    useEffect(() =>{
        if(!user){
            navigate("/") ;
            return
          }
    } , [user])
 return children ;
}

const mapStateToProps =(state) =>{
return {
    user : state.userPage.user
}
}

export default connect(mapStateToProps)(ProtectedRoutes);