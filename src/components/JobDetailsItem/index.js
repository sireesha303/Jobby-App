import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import "./index.css";

import {AiFillStar} from "react-icons/ai";
import {MdLocationOn} from "react-icons/md";
import {BsBriefcaseFill} from "react-icons/bs";
import {BsFillArrowUpRightSquareFill} from 'react-icons/bs'

import Header from "../Header";

const JobDetailsItem = props =>{
    const {match} = props;
    const {params} = match;
    const {id} = params;

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

    // const {id} = useParams();

    // const {match} = this.props;
    // const {params} = match;
    // const {id} = params;

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
                    similarJobs:data.similar_jobs.map(eachJob => ({
                        companyLogoUrl:eachJob.company_logo_url,
                        employmentType: eachJob.employment_type,
                        id: eachJob.id,
                        jobDescription:eachJob.job_description,
                        rating: eachJob.rating,
                        title: eachJob.title,
                        location:eachJob.location
                    }))
                }

                setJobDetails({...updatedData});
            }
        }
        fetchData();
        // console.log(jobDetails);

    },[]);

    const getDescriptionSection = () =>{
        return(
            <div className="description-container" id="description-container">
                        <div className="description-header-link-container">
                            <h1 className="sections-Header">Desciption</h1>
                            <p className="visit-el">Visit <a href={`${jobDetails.companyWebsiteUrl}`} rel="noreferrer" target="_blank" ><BsFillArrowUpRightSquareFill fill="blue"/></a></p>
                        </div>
                        <p className="sections-text">{jobDetails.jobDescription}</p>
                    </div>
        )
    }

    const getSkillsSection = () =>{
        return(
            <div className="skills-container" id="skills-container">
                <h2 className="sections-Header">Skills</h2>
                <div className="list-of-skills">
                    {jobDetails.skills.map(eachSkill =>(
                        <div className="skill-name-container">
                            <img src={`${eachSkill.imageUrl}`} alt={`${eachSkill.name}`} className="skill-img"/>
                            <p className="sections-text">{`${eachSkill.name}`}</p>
                        </div>
                    ))}
                </div>                                  
            </div>
        )
    }

    const getLifeAtCompanySection = () =>{
        return(
        <div id="life-at-company-container" className="life-at-company-container">
            <h1 className="sections-Header">Life At Company</h1>
            <div className="description-image-container">
                <p className="sections-text">{jobDetails.lifeAtCompany.description}</p>
                <img src={`${jobDetails.lifeAtCompany.imageUrl}`} alt="Company pic" className="company-life-img"/>
            </div>
        </div>
        )
      
    }

    const getSimilarJobDetails = eachJob =>{
        const {companyLogoUrl,employmentType,id,jobDescription,rating,title,location} = eachJob
        // console.log(eachJob)
        return(
            <div className="job-container">
                <div className="title-img-container">
                    <img src={`${companyLogoUrl}`} alt="Comapny logo" className="job-logo-img"/>
                    <div className="job-title-rate">
                        <h1 className="title-heading">{title}</h1>
                        <p className="rating-el"><AiFillStar fill="yellow"/>{rating}</p>
                    </div>
                </div>
                    <h1 className="sections-Header">Desciption</h1>
                    <p className="sections-text">{jobDescription}</p>
                    <div className="icons-text-container">
                        <MdLocationOn fill='white'/>
                        <p className='location-el'>{location}</p>
                        <BsBriefcaseFill fill='white' />
                        <p className='job-type-el'>{employmentType}</p>
                    </div>
            </div>
        )

    }

    return(
        <div className="job-detail-item-bg-container">
            <Header />
            <div className="selected-job-and-similar-jobs-container">
                <div id="selected-job-container" className="selected-job-container">
                    <div id="logo-title-rating-container" className="logo-title-rating-container">
                        <img src={`${jobDetails.companyLogoUrl}`} alt="Company Logo" className="company-logo"/>
                        <div className="title-rating-container">
                            <h1 className="title-heading">{jobDetails.title}</h1>
                            <p className="rating-el"><AiFillStar fill="yellow"/>{jobDetails.rating}</p>
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
                    {getDescriptionSection()}
                    {getSkillsSection()}
                    {getLifeAtCompanySection()}   
                </div>
                <div id="similar-jobs-section" className="similar-jobs-section">
                    <h1 className="sections-Header">Similar Jobs</h1>
                    <div className="similar-job-container">
                        {jobDetails.similarJobs.map(eachJob =>(
                            getSimilarJobDetails(eachJob)
                        )  
                        )}
                    </div>
                   
                </div>

            </div>
            
        </div>
    )
}

export default JobDetailsItem