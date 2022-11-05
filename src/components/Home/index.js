import Header from '../Header';

import './index.css';

const Home = (props) =>{

    const {history} = props

    const onClickOfFindJobs = () =>{
        history.push('/jobs')
        // return <Redirect to="/jobs"/>
    }
    
    return(
        <div className='home-bg-container'>
            <Header />
            <div className='app-info-container'>
               <h1 className='app-info-heaing'>
                Find The Job That Fits Your Life.
               </h1>
               <p className='app-info-para'>Millions of People are searching for job,salary information, company reviews. Find the job that fits your abilities and potential.</p>
               <button onClick={onClickOfFindJobs}>Find Jobs</button>
            </div>
        </div>
         
    )
}


export default Home