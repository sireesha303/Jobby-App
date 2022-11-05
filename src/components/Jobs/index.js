import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import {ThreeDots} from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Redirect} from 'react-router-dom';

import "./index.css"
import Header from '../Header'
import JobItem from '../JobItem'

const jobDetailsLodingStatus = {
    success:"SUCCESS",
    loading:"LOADING",
    failure:"FAILURE"
}

const Jobs = () =>{
    const [jobslist, setJobsList] = useState([]);
    const [userInfo,setUserInfo] = useState({profileImgUrl:"",name:"",shortBio:"",isProfileDetailsLoaded:false});
    const [isJobDetailsLoaded,setJobDetailsLoadStatus] = useState(jobDetailsLodingStatus.loading)
    const [employmentType,setEmploymentType] = useState('')
    const [minimumPackage,setMinimumPackage] = useState('')
    const [titleSearchInput, setTitleSearchInput] = useState('')

    useEffect(()=>{
        async function fetchData(){
            setJobDetailsLoadStatus(jobDetailsLodingStatus.loading)
            
            const jwtToken = Cookies.get('jobby_app_jwt_token');
            const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${titleSearchInput}`
            const options = {
                method:'GET',
                headers: {
                      Authorization: `Bearer ${jwtToken}`,
                },        
            }

            const response = await fetch(url,options);
            console.log(response)
            const data = await response.json();
            console.log(data)
            if(response.ok === true){
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
                setJobsList(updatedListData);
                setJobDetailsLoadStatus(jobDetailsLodingStatus.success);
            }
            else{
                setJobDetailsLoadStatus(jobDetailsLodingStatus.failure);
            }

            const profileUrl = "https://apis.ccbp.in/profile"
            const profileRequestOptions = {
                method:"GET",
                headers:{
                    Authorization:`Bearer ${jwtToken}`
                }
            }

            const profileInfoResponse = await fetch(profileUrl,profileRequestOptions)
            const profileData = await profileInfoResponse.json();

            setUserInfo({
                profileImgUrl:profileData.profile_details.profile_image_url,
                name:profileData.profile_details.name,
                shortBio:profileData.profile_details.short_bio,
                isProfileDetailsLoaded:true
            })
        }
        fetchData();
    },[employmentType,minimumPackage,titleSearchInput]);

   
    const onChangeofEmploymentType = (event) =>{
        // console.log(event.target.value)
        if(employmentType !== ''){
            let t = employmentType.concat(',',event.target.value)
            setEmploymentType(t)
            
        }
        else{
            setEmploymentType(event.target.value)
            // console.log(employmentType)
        }
    }

    const onChangeOfMinimumSalary = (event) =>{
        setMinimumPackage(event.target.value)
    }

    const onChangeOfSearchInput = (event) =>{
        // console.log(event.target.value)
        setTitleSearchInput(event.target.value)

    }

    const getDifferentFilters = () =>{
        return(
            <>
            <hr className="line-break"/>
            <h1 className="filter-heading">Type Of Employement</h1>
            <input type="checkbox" id="FULLTIME" name="fav_language" value="FULLTIME" onChange={onChangeofEmploymentType}/>
            <label htmlFor="FULLTIME" className="filter-label">Full Time</label><br/>
            <input type="checkbox" id="PARTTIME" name="fav_language" value="PARTTIME" onChange={onChangeofEmploymentType}/>
            <label htmlFor="PARTTIME" className="filter-label">Part Time</label><br/>
            <input type="checkbox" id="FREELANCE" name="fav_language" value="FREELANCE" onChange={onChangeofEmploymentType}/>
            <label htmlFor="FREELANCE" className="filter-label">Freelance</label><br/>
            <input type="checkbox" id="INTERNSHIP" name="fav_language" value="INTERNSHIP" onChange={onChangeofEmploymentType}/>
            <label htmlFor="INTERNSHIP" className="filter-label">Internship</label><br/>
            <hr className="line-break"/>

            <h1 className="filter-heading">Salary Range</h1>
            <input type="radio" id="1000000" name="fav_language" value="1000000" onChange={onChangeOfMinimumSalary}/>
            <label htmlFor="1000000" className="filter-label">10LPA and above</label><br/>
            <input type="radio" id="2000000" name="fav_language" value="2000000" onChange={onChangeOfMinimumSalary}/>
            <label htmlFor="2000000" className="filter-label">20LPA and above</label><br/>
            <input type="radio" id="3000000" name="fav_language" value="3000000" onChange={onChangeOfMinimumSalary}/>
            <label htmlFor="3000000" className="filter-label">30LPA and above</label><br/>
            <input type="radio" id="4000000" name="fav_language" value="4000000" onChange={onChangeOfMinimumSalary}/>
            <label htmlFor="4000000" className="filter-label">40LPA and above</label><br/>
        </>
        )
        
    }

    const getListOfJobs = () =>{
        switch (isJobDetailsLoaded) {
            case jobDetailsLodingStatus.loading:
                return <ThreeDots type="TailSpin" color="white" height={100} width={50} />
            case jobDetailsLodingStatus.success:
                return <ul>
                    {jobslist.map((eachJob)=><JobItem jobDetails={eachJob} key={eachJob.id}/>)}
                </ul>
            case jobDetailsLodingStatus.failure:
                return <Redirect to="/login"/>
            default:
                return null
        }
    }

    return(
        <>
            <Header />
            <div className="jobs-bg-container" id="jobs-bg-container">
                <div className="search-container-for-sm">
                        <input type="search" className="search-el" placeholder="Search" />
                        <div className="search-icon-container">
                            <AiOutlineSearch fill="white"/>
                        </div>
                </div>
                <div className="profile-filters-container">
                    {!userInfo.isProfileDetailsLoaded ? <ThreeDots type="TailSpin" color="white" height={100} width={50} />:
                        <div className="profile-container">
                        <img src={`${userInfo.profileImgUrl}`} alt="Profile-Img-Url" className="profile-img"/>
                        <h1 className="name-el">{userInfo.name}</h1>
                        <p className="short-bio">{userInfo.shortBio}</p>
                    </div>
                    }
                    {getDifferentFilters()}
        
                </div>
                <div>
                    <div className="search-container">
                        <input type="search" className="search-el" placeholder="Search" onChange={onChangeOfSearchInput}/>
                        <div className="search-icon-container">
                            <AiOutlineSearch fill="white"/>
                        </div>
                    </div>
                    {getListOfJobs()}
                    
                </div>
            </div>
        </>
      
        
    )
    
}



export default Jobs