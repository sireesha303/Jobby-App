import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import "./index.css";

import {AiFillStar} from "react-icons/ai";
import {MdLocationOn} from "react-icons/md";
import {BsBriefcaseFill} from "react-icons/bs";
import {BsFillArrowUpRightSquareFill} from 'react-icons/bs'

import Header from "../Header";

const JobDetailsItem = props =>{
    const [jobDetails,setJobDetails] = useState({companyLogoUrl:"",
    companyWebsiteUrl:"",
    employmentType:"",
    id:"",
    jobDescription:"",
    lifeAtCompany:{description:"",imageUrl:""},
    location:"",
    packagePerAnnum:"",
    rating:"",
    skills:[],
    title:"",
    similarJobs:[],
    })

    const {id} = useParams();
    console.log(id);

    useEffect(() =>{

        async function fetchData(){
            const jwtToken = Cookies.get('jobby_app_jwt_token');
            const url=`https://apis.ccbp.in/jobs/${id}`;
            const options = {
                method:'GET',
                headers: {
                      Authorization: `Bearer ${jwtToken}`,
                },        
            }
            const response = await fetch(url,options);
            const data = await response.json()

            if(response.ok){
                const updatedData = {
                    companyLogoUrl:data.job_details.company_logo_url,
                    companyWebsiteUrl:data.job_details.company_website_url,
                    employmentType:data.job_details.employment_type,
                    id:data.job_details.id,
                    jobDescription:data.job_details.job_description,
                    lifeAtCompany:{
                        description:data.job_details.life_at_company.description,
                        imageUrl:data.job_details.life_at_company.image_url
                    },
                    location:data.job_details.location,
                    packagePerAnnum:data.job_details.package_per_annum,
                    rating:data.job_details.rating,
                    skills:data.job_details.skills.map(eachSkill => ({
                        name:eachSkill.name,
                        imageUrl:eachSkill.image_url
                    }

                    )),
                    title:data.job_details.title,
                    similarJobs:[data.similar_jobs.map(eachJob => ({
                        companyLogoUrl:eachJob.company_logo_url,
                        employment_type: eachJob.employment_type,
                        id: eachJob.id,
                        job_description:eachJob.job_description,
                        rating: eachJob.rating,
                        title: eachJob.title
                    }))]
                }

                setJobDetails({...updatedData});
            }
        }
        fetchData();
        console.log(jobDetails);

    },[]);


    return(
        <div className="job-detail-item-bg-container">
            <Header />
            <div className="selected-job-and-similar-jobs-container">
                <div id="selected-job-container" className="selected-job-container">
                    <div id="logo-title-rating-container" className="logo-title-rating-container">
                        <img src={`${jobDetails.companyLogoUrl}`} alt="Company Logo"/>
                        <div className="title-rating-container">
                            <h1>{jobDetails.title}</h1>
                            <p><AiFillStar fill="yellow"/>{jobDetails.rating}</p>
                        </div>
                    </div>
                    <div className="location-employmenttype-package-container">
                        <div className='location-employment-type-container'>
                            <MdLocationOn fill='white'/>
                            <p className='location-el'>{jobDetails.location}</p>
                            <BsBriefcaseFill fill='white' />
                            <p className='job-type-el'>{jobDetails.employmentType}</p>
                        </div>
                        <p className='job-type-el'>{jobDetails.packagePerAnnum}</p>
                    </div>
                    <hr />
                    <div className="description-container" id="description-container">
                        <div className="description-header-link-container">
                            <h1>Desciption</h1>
                            <p>Visit <BsFillArrowUpRightSquareFill fill="blue"/></p>
                        </div>
                        <p>{jobDetails.jobDescription}</p>
                    </div>
                    <div className="skills-container" id="skills-container">
                        <h2 className="skill-heading">Skills</h2>
                        <div className="list-of-skills">
                            {jobDetails.skills.map(eachSkill =>(
                                <div className="skill-name-container">
                                    <img src={`${eachSkill.imageUrl}`} alt={`${eachSkill.name}`}/>
                                    <p>{`${eachSkill.name}`}</p>
                                </div>
                            ))}
                        </div>
                        
                            
                            
                            
                    </div>
                    <div id="life-at-company-container" className="life-at-company-container">
                        <h1>Life At Company</h1>
                        <div className="description-image-container">
                            <p>{jobDetails.lifeAtCompany.description}</p>
                            <img src={`${jobDetails.lifeAtCompany.imageUrl}`} alt="Company pic"/>
                        </div>
                        
                    </div>
                </div>
                <div id="similar-jobs-container"></div>

            </div>
            
        </div>
    )
}

export default JobDetailsItem