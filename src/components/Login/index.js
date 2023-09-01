// Write your JS code here
import {withRouter,Redirect}  from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'




const Login =props=>{
    const  jwtToken=Cookies.get('jwt_token')

    const setCookiesAndNavigateToHome=jwtToken=>{
        
        const  {history}=props
        Cookies.set('jwt_token',jwtToken,{expires:30})
        history.replace('/')
    }

    const onClickLogin= async()=>{
         const userDetails = {username: 'rahul', password: 'rahul@2021'}
        const url = 'https://apis.ccbp.in/login'
        const options={
            method:'POST',
            body:JSON.stringify(userDetails)
        }
        const response= await fetch(url,options)
       const data = await response.json()
        if (response.ok===true){
            setCookiesAndNavigateToHome(data.jwt_token)
        }
    }
      if (jwtToken !== undefined) {
    return <Redirect to="/" />
    }

        return(
            <div className="login-container">
                <h1 className="heading">Please Login</h1>
                <button type="button" 
                        className="button"
                        onClick={onClickLogin}>Login with sample Creds</button>
            </div>
        )
}

export default withRouter(Login)