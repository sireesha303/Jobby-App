import './index.css';
import {MdLocationOn} from "react-icons/md";
import {BsBriefcaseFill} from "react-icons/bs";
import {AiFillStar} from "react-icons/ai";
import {Link} from 'react-router-dom';

const JobItem = props =>{
    //  console.log(props)
    const {jobDetails} = props;
    const {companyLogoUrl, employmentType, id,jobDescription, location, packagePerAnnum, rating, title} = jobDetails;
    return(
        <li className='job-detail-item-container'>
            <Link to={`/jobs/${id}`} className='test'>
            <div className='logo-company-name-container'>
                <img src={`${companyLogoUrl}`} alt="company logo url" className='company-logo-img'/>
                <div className='title-rating-container'>
                    <h2 className='title'>{title}</h2>
                    <p className='rating-el'><AiFillStar fill="yellow"/>{rating}</p>
                </div>
            </div>
            <div className='location-type-package-container'>
                <div className='location-employment-type-container'>
                    <MdLocationOn fill='white'/>
                    <p className='location-el'>{location}</p>
                    <BsBriefcaseFill fill='white' />
                    <p className='job-type-el'>{employmentType}</p>
                </div>
                <p className='job-type-el'>{packagePerAnnum}</p>
            </div>
            <hr/>
            <h2 className='description-heading'>Description</h2>
            <p className='description'>{jobDescription}</p>
            </Link>
          
        </li>
    )

}

export default JobItem