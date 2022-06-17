import {useState} from 'react'

import './index.css'

const Login = () =>{
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()

    const onFormSubmit = event => {
        event.preventDefault();
        // console.log("testing form submit")
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
            <input type="text" id="username" className='input-el' onChange={onChangeOfUsername} value={username}/>
            </div>
        )
       
    }

    const renderPasswordField = () =>{
        return(
            <div className='input-container'>
            <label htmlFor="password" className="input-label">PASSWORD</label>
            <input type="password" id="passwprd" className='input-el' onChange={onChangeOfPassword} value={password}/>
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
            </form>
        </div>
       
    )
}

export default Login