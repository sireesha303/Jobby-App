import { Link, withRouter } from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie';

import {MdOutlineLogout} from 'react-icons/md';
import {AiFillHome} from 'react-icons/ai';
import {BsBriefcaseFill} from 'react-icons/bs';

const Header = (props) => {

    const {history} = props
  
    const logoutFromApp = () =>{
        Cookies.remove('jobby_app_jwt_token')
        history.replace('/login');
        // return <Redirect to="/login"/>;
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
            <div className='home-jobs-lg-nav-items-container'>
                <Link to="/" className='nav-link'>Home</Link>
                <Link to="/jobs" className='nav-link'>Jobs</Link>
            </div>
            <button className='logout-btn' onClick={logoutFromApp}>Logout</button>
            <div className='home-jobs-sm-nav-icons-container'>
                <Link to="/"><AiFillHome fill='white' className='sm-nav-icon'/></Link>
                <Link to="/jobs"><BsBriefcaseFill fill='white' className='sm-nav-icon'/></Link>
                <MdOutlineLogout fill='white' className='sm-nav-icon' onClick={logoutFromApp}/>
            </div>
            
            
        </div>
    )
}

export default withRouter(Header)