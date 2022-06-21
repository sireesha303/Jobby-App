import "./index.css"
import Header from '../Header'
import JobDetailsItem from '../JobDetailsItem'

import { useEffect, useState } from "react"
import Cookies from 'js-cookie';
import {AiOutlineSearch} from 'react-icons/ai'

const Jobs = () =>{
    const [jobslist, setJobsList] = useState([]);
    const [userInfo,setUserInfo] = useState({profileImgUrl:"",name:"",shortBio:""});


    useEffect(()=>{
        async function fetchData(){
            const jwtToken = Cookies.get('jobby_app_jwt_token');
            const url = "https://apis.ccbp.in/jobs"
            const options = {
                method:'GET',
                headers: {
                      Authorization: `Bearer ${jwtToken}`,
                },        
            }

            const response = await fetch(url,options);
            // console.log(response)
            const data = await response.json();
            //  console.log(data)
            const updatedListData = data.jobs.map(eachJob =>({
                companyLogoUrl:eachJob.company_logo_url,
                employmentType:eachJob.employment_type,
                id:eachJob.id,
                jobDescription:eachJob.job_description,
                location:eachJob.location,
                packagePerAnnum:eachJob.package_per_annum,
                rating:eachJob.rating,
                title:eachJob.title
            }));
            setJobsList(updatedListData)

            const profileUrl = "https://apis.ccbp.in/profile"
            const profileRequestOptions = {
                method:"GET",
                headers:{
                    Authorization:`Bearer ${jwtToken}`
                }
            }

            const profileInfoResponse = await fetch(profileUrl,profileRequestOptions)
            const profileData = await profileInfoResponse.json();
            console.log(profileData.profile_details)

            
            setUserInfo({
                profileImgUrl:profileData.profile_details.profile_image_url,
                name:profileData.profile_details.name,
                shortBio:profileData.profile_details.short_bio
            })
        }
        fetchData();
    },[]);


    return(
        <>
            <Header />
            <div className="jobs-bg-container" id="jobs-bg-container">
            <div className="profile-filters-container">
                <div className="profile-container">
                    <img src={`${userInfo.profileImgUrl}`} alt="Profile-Img-Url" className="profile-img"/>
                    <h1 className="name-el">{userInfo.name}</h1>
                    <p className="short-bio">{userInfo.shortBio}</p>
                </div>
                <hr className="line-break"/>
                <h1 className="filter-heading">Type Of Employement</h1>
                <input type="checkbox" id="fulltime" name="fav_language" value="Full Time"/>
                <label htmlFor="fulltime" className="filter-label">Full Time</label><br/>
                <input type="checkbox" id="parttime" name="fav_language" value="Part Time"/>
                <label htmlFor="parttime" className="filter-label">Part Time</label><br/>
                <input type="checkbox" id="freelance" name="fav_language" value="Freelance"/>
                <label htmlFor="FreeLance" className="filter-label">Freelance</label><br/>
                <input type="checkbox" id="internship" name="fav_language" value="Internship"/>
                <label htmlFor="internship" className="filter-label">Internship</label><br/>
                <hr className="line-break"/>
                <h1 className="filter-heading">Salary Range</h1>
                <input type="radio" id="10lpa" name="fav_language" value="10LPA"/>
                <label htmlFor="10lpa" className="filter-label">10LPA and above</label><br/>
                <input type="radio" id="20lpa" name="fav_language" value="20LPA"/>
                <label htmlFor="20lpa" className="filter-label">20LPA and above</label><br/>
                <input type="radio" id="10lpa" name="fav_language" value="30LPA"/>
                <label htmlFor="30lpa" className="filter-label">30LPA and above</label><br/>
                <input type="radio" id="10lpa" name="fav_language" value="40LPA"/>
                <label htmlFor="40lpa" className="filter-label">40LPA and above</label><br/>
            </div>
            <div>
                <div className="search-container">
                    <input type="search" className="search-el" placeholder="Search" />
                    <div className="search-icon-container">
                        <AiOutlineSearch fill="white"/>
                    </div>
                </div>
                
                <ul>
                    {jobslist.map((eachJob)=><JobDetailsItem jobDetails={eachJob} />)}
                </ul>
            </div>

        </div>
        </>
      
        
    )
    
}

export default Jobs