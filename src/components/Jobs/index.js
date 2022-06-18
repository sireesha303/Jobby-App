import "./index.css"
import Header from '../Header'
import { useEffect, useState } from "react"
import Cookies from 'js-cookie';

const Jobs = () =>{
    const [jobslist, setJobsList] = useState([]);


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
            const data = await response.json()
            console.log(data)
        }
        fetchData();
    }
        ,[]);


    return(
        <>
            <Header />
            <div className="jobs-bg-container" id="jobs-bg-container">
            <div className="profile-filters-container">
                <div className="profile-container">
                    <img src=""/>
                    <h1>"Rahul Attuluri"</h1>
                    <p>"Short bio"</p>
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
                <input type="search" />

            </div>

        </div>
        </>
      
        
    )
    
}

export default Jobs