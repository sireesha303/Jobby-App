import { Link, useNavigate } from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie';

const Header = () => {

    const navigate = useNavigate();

    const logoutFromApp = () =>{
        Cookies.remove('jobby_app_jwt_token');
        navigate("/login");
    }
    return(
        <div className='header-container'>
            <Link to="/">
                <img 
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png" 
                alt="logo img"
                className='header-logo-img'
                />
            </Link>
            <div>
                <Link to="/" className='nav-link'>Home</Link>
                <Link to="/jobs" className='nav-link'>Jobs</Link>
            </div>
            <button className='logout-btn' onClick={logoutFromApp}>Logout</button>
            
        </div>
    )
}

export default Header