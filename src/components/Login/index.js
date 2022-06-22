import {useState} from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import './index.css'

const Login = () =>{
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [loginError,setLoginError] = useState({showLoginError:false,loginErrorMsg:""});

    const navigate = useNavigate();

    const onLoginSuccess = (jwtToken) =>{
        Cookies.set('jobby_app_jwt_token',jwtToken,{expires:2})
        navigate("/");
    }

    const onLoginFailure = (errorMsg) =>{
        setLoginError({showLoginError:true,loginErrorMsg:errorMsg})
    }

    const onFormSubmit = async event => {
        event.preventDefault();
        // console.log("testing form submit")
        const url = "https://apis.ccbp.in/login"
        const options ={method: 'POST',
        body: JSON.stringify({ username:username,password:password})
        };

        const response = await fetch(url,options)
        const data = await response.json();

        if(response.ok === true){
            onLoginSuccess(data.jwt_token)
        }
        else{
            onLoginFailure(data.error_msg)
        }
    }

    const onChangeOfUsername = event => {
        // console.log(event.target.value)
        setUsername(event.target.value)
    }

    const onChangeOfPassword = event =>{
        // console.log(event.target.value)
        setPassword(event.target.value)
    }

    const renderUsernameField = () =>{
        
        return(
            <div className='input-container'>
            <label htmlFor="username" className="input-label">USERNAME</label>
            <input type="text" id="username" className='input-el' onChange={onChangeOfUsername} value={username} placeholder="Username"/>
            </div>
        )
       
    }

    const renderPasswordField = () =>{
        return(
            <div className='input-container'>
            <label htmlFor="password" className="input-label">PASSWORD</label>
            <input type="password" id="passwprd" className='input-el' onChange={onChangeOfPassword} value={password} placeholder="Password"/>
            </div>
        )
    }

    return(
        <div className="app-container">
            <form className="form-container" onSubmit={onFormSubmit}>
                <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" alt="jobby-webstire-logo" className='logo-img'/>
                <div className='username-password-container'>
                    {renderUsernameField()}
                    {renderPasswordField()}
                </div>
                <button type="submit" className='login-btn'>Login</button>  
                {loginError.showLoginError && <p className='login-error-msg'>*{loginError.loginErrorMsg}</p>}     
            </form>
        </div>
       
    )
}

export default Login