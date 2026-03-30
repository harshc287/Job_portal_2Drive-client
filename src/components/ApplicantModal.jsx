import React from 'react';

const ApplicantModal = ({ applicants, onClose }) => (
  <div className="modal show d-block" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Applicants</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          {applicants.length === 0 && <p>No applicants yet.</p>}
          {applicants.map((app, idx) => (
            <div key={idx} className="card mb-2 p-2">
              <p><strong>Name:</strong> {app.name}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Applied:</strong> {new Date(app.appliedDate).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ApplicantModal;