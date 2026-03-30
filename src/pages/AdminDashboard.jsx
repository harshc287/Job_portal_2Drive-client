import React, { useEffect, useState } from 'react';
import { jobsApi, applicationsApi } from '../api/api';
import ApplicantModal from '../components/ApplicantModal';

const AdminDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ title: '', description: '', location: '' });
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);

  const fetchJobs = async () => {
    try {
      const data = await jobsApi.getJobs();
      setJobs(data.jobs || data);
    } catch (err) {
      alert(err.message);
    }
  };

  const createJob = async (e) => {
    e.preventDefault();
    try {
      await jobsApi.createJob(newJob);
      setNewJob({ title: '', description: '', location: '' });
      fetchJobs();
      alert('Job created!');
    } catch (err) {
      alert(err.message);
    }
  };

  const viewApplicants = async (jobId) => {
    try {
      const data = await applicationsApi.getApplicants(jobId);
      setApplicants(data);
      setSelectedJob(jobId);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  return (
    <div className="container mt-4">
      <h3>Create Job</h3>
      <form onSubmit={createJob} className="mb-4">
        <input className="form-control mb-2" placeholder="Title" value={newJob.title} onChange={e => setNewJob({ ...newJob, title: e.target.value })} required />
        <input className="form-control mb-2" placeholder="Description" value={newJob.description} onChange={e => setNewJob({ ...newJob, description: e.target.value })} required />
        <input className="form-control mb-2" placeholder="Location" value={newJob.location} onChange={e => setNewJob({ ...newJob, location: e.target.value })} required />
        <button className="btn btn-primary" type="submit">Create Job</button>
      </form>

      <h3>Jobs & Applicants</h3>
      {jobs.map(job => (
        <div key={job._id} className="card mb-2 p-2">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{job.title}</h5>
              <p>{job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
            </div>
            <button className="btn btn-info" onClick={() => viewApplicants(job._id)}>View Applicants</button>
          </div>
        </div>
      ))}

      {selectedJob && <ApplicantModal applicants={applicants} onClose={() => setSelectedJob(null)} />}
    </div>
  );
};

export default AdminDashboard;