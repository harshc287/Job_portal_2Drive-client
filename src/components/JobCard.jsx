import React from 'react';

const JobCard = ({ job, onApply, user }) => (
  <div className="card mb-3 p-3">
    <h5>{job.title}</h5>
    <p>{job.description}</p>
    <p><strong>Location:</strong> {job.location}</p>
    <p><strong>Created By:</strong> {job.createdBy?.name || 'Admin'}</p>
    <p><strong>Admin Email:</strong> {job.createdBy?.email}</p>
    {user?.role === 'user' && (
      <button className="btn btn-success" onClick={() => onApply(job._id)}>
        Apply
      </button>
    )}
  </div>
);

export default JobCard;