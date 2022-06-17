import './index.css'

const Login = () =>{

    const renderUsernameField = () =>{
        return(
            <div className='input-container'>
            <lable htmlFor="username" className="input-label">USERNAME</lable>
            <input type="text" id="username" className='input-el'/>
            </div>
        )
       
    }

    const renderPasswordField = () =>{
        return(
            <div className='input-container'>
            <lable htmlFor="password" className="input-label">PASSWORD</lable>
            <input type="text" id="passwprd" className='input-el'/>
            </div>
        )
    }
    return(
        <div className="app-container">
            <form className="form-container">
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