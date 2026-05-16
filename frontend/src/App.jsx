import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // State Hook to capture form inputs dynamically
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    dob: '',
    gender: 'Male',
    bloodGroup: 'O+'
  });

  // State Hook to maintain streaming database rows
  const [patients, setPatients] = useState([]);

  const API_URL = 'http://localhost:3000/api/patients';

  // 1. Core function to retrieve live rows from MySQL via Node Server
  const loadRecords = async () => {
    try {
      const response = await axios.get(API_URL);
      setPatients(response.data);
    } catch (error) {
      console.error("Network communication failure with Backend API:", error);
    }
  };

  // Automatically fetch historical records when the webpage first loads
  useEffect(() => {
    loadRecords();
  }, []);

  // 2. Dynamically bind form text inputs to React Component State
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 3. Package and push data to MySQL when user clicks Submit button
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, formData);
      if (response.status === 201) {
        alert('Data transmission successful! Record committed to centralized database.');
        
        // Reset form inputs to blank states
        setFormData({ firstName: '', lastName: '', contactNumber: '', dob: '', gender: 'Male', bloodGroup: 'O+' });
        
        // Instant updates without refreshing page
        loadRecords(); 
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert('Failed to save data. Ensure backend server is up and running.');
    }
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Structural Header bar */}
      <nav className="navbar navbar-dark bg-dark mb-4 px-4 shadow">
        <span className="navbar-brand mb-0 h1 fw-bold">
          🏥 Centralized Hospital Management Ecosystem
        </span>
      </nav>

      <div className="container-fluid px-5">
        <div className="row">
          
          {/* Column 1: Entry Form Card */}
          <div className="col-lg-5 mb-4">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-primary text-white py-3">
                <h5 className="card-title mb-0 fw-bold">Patient Intake Registry</h5>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleFormSubmit}>
                  <div className="row mb-3">
                    <div className="col">
                      <label className="form-label small text-muted fw-bold">First Name</label>
                      <input type="text" id="firstName" className="form-control" value={formData.firstName} onChange={handleInputChange} required />
                    </div>
                    <div className="col">
                      <label className="form-label small text-muted fw-bold">Last Name</label>
                      <input type="text" id="lastName" className="form-control" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-muted fw-bold">Active Contact Number</label>
                    <input type="tel" id="contactNumber" className="form-control" value={formData.contactNumber} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small text-muted fw-bold">Date of Birth</label>
                    <input type="date" id="dob" className="form-control" value={formData.dob} onChange={handleInputChange} required />
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <label className="form-label small text-muted fw-bold">Gender</label>
                      <select id="gender" className="form-select" value={formData.gender} onChange={handleInputChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col">
                      <label className="form-label small text-muted fw-bold">Blood Type</label>
                      <select id="bloodGroup" className="form-select" value={formData.bloodGroup} onChange={handleInputChange}>
                        <option value="O+">O+</option>
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="AB+">AB+</option>
                        <option value="O-">O-</option>
                        <option value="A-">A-</option>
                        <option value="B-">B-</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-2 fw-bold shadow-sm">
                    Commit To Core Server
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Column 2: Data Streaming Table Hub */}
          <div className="col-lg-7">
            <div className="card shadow-sm border-0 rounded-3">
              <div className="card-header bg-success text-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0 fw-bold">Centralized Ledger Monitor</h5>
                <button className="btn btn-light btn-sm fw-bold px-3" onClick={loadRecords}>
                  Force Sync 🔄
                </button>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light text-secondary small text-uppercase">
                      <tr>
                        <th className="ps-4">UID</th>
                        <th>Full Name</th>
                        <th>Contact info</th>
                        <th>Gender</th>
                        <th className="pe-4">Blood Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-4 text-muted">
                            No patient records securely found. Try registering a record on the left!
                          </td>
                        </tr>
                      ) : (
                        patients.map((p) => (
                          <tr key={p.PatientID}>
                            <td className="ps-4 fw-bold text-primary">#{p.PatientID}</td>
                            <td className="fw-semibold text-dark">{p.FirstName} {p.LastName}</td>
                            <td>{p.ContactNumber}</td>
                            <td>{p.Gender}</td>
                            <td className="pe-4">
                              <span className="badge bg-danger px-3 py-2 fw-bold rounded-pill">
                                {p.BloodGroup}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;