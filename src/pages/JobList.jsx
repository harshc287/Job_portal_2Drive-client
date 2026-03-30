import React, { useEffect, useState } from 'react';
import { jobsApi, applicationsApi } from '../api/api';
import JobCard from '../components/JobCard';

const JobList = ({ user }) => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const data = await jobsApi.getJobs();
      setJobs(data.jobs || data);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await applicationsApi.applyJob(jobId);
      alert('Applied successfully!');
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Available Jobs</h3>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} onApply={handleApply} user={user} />
      ))}
    </div>
  );
};

export default JobList;