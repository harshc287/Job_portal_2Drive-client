import React, { useEffect, useState } from 'react';
import { jobsApi, applicationsApi } from '../api/api';
import JobCard from '../components/JobCard';

const JobList = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 3; // 3 jobs per page

  // Fetch jobs from API
  const fetchJobs = async (pageNumber = 1) => {
    try {
      const data = await jobsApi.getJobs(pageNumber, limit);
      setJobs(data.jobs || []);
      setPage(data.page || 1);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  // Apply to job
  const handleApply = async (jobId) => {
    try {
      await applicationsApi.applyJob(jobId);
      alert('Applied successfully!');
      fetchJobs(page); // optional: refresh jobs if needed
    } catch (err) {
      alert(err.message);
    }
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div className="container mt-4">
      <h3>Available Jobs</h3>
      {jobs.length === 0 && <p>No jobs available.</p>}
      {jobs.map(job => (
        <JobCard key={job._id} job={job} onApply={handleApply} user={user} />
      ))}

      {jobs.length > 0 && (
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-secondary" onClick={handlePrev} disabled={page === 1}>
            Previous
          </button>
          <span>Page {page} of {totalPages}</span>
          <button className="btn btn-secondary" onClick={handleNext} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default JobList;