import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, Moon, ShieldAlert, Activity, UserPlus, LogIn, Users, PlusCircle, CheckCircle } from 'lucide-react';

function App() {
  // Theme state hook
  const [theme, setTheme] = useState('light');
  // Auth state hooks
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [authForm, setAuthForm] = useState({ username: '', password: '' });

  // Patient database stream states
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', contactNumber: '', dob: '', gender: 'Male', bloodGroup: 'O+'
  });
  const [patients, setPatients] = useState([]);
  const API_URL = 'http://localhost:3000/api/patients';

  // Toggle Dark Mode
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  // Load patient ledger entries
  const loadRecords = async () => {
    try {
      const response = await axios.get(API_URL);
      setPatients(response.data);
    } catch (error) {
      console.error("API link failure:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) loadRecords();
  }, [isAuthenticated]);

  // Handle Form changes
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleAuthChange = (e) => setAuthForm({ ...authForm, [e.target.id]: e.target.value });

  // Handle Authentication submit simulation
  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (authForm.username && authForm.password) {
      setIsAuthenticated(true);
    } else {
      alert("Please check credentials input parameters.");
    }
  };

  // Handle Patient Record write
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, formData);
      if (response.status === 201) {
        alert('Record committed to database schema engine.');
        setFormData({ firstName: '', lastName: '', contactNumber: '', dob: '', gender: 'Male', bloodGroup: 'O+' });
        loadRecords();
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  // --- RENDERING ROUTE 1: AUTHENTICATION INTERFACE (LOGIN/SIGNUP) ---
  if (!isAuthenticated) {
    return (
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        {/* Floating Theme Toggle during login */}
        <button className="btn btn-outline-secondary position-absolute top-0 end-0 m-4 rounded-circle p-2" onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="card card-3d p-4 w-100" style={{ maxWidth: '420px' }}>
          <div className="text-center mb-4">
            {/* 3D Floating Medical Icon Graphic asset */}
            <div className="float-3d bg-primary text-white d-inline-block p-3 rounded-circle mb-3 shadow-lg">
              <Activity size={40} />
            </div>
            <h3 className="fw-bold text-custom-main">{isSignUp ? 'Create Corporate Account' : 'Clinical Gateway Secure Access'}</h3>
            <p className="small text-custom-muted">Centralized Hospital Management Node</p>
          </div>

          <form onSubmit={handleAuthSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-custom-muted">User ID / Email Address</label>
              <input type="text" id="username" className="form-control py-2" placeholder="admin@hospital.org" value={authForm.username} onChange={handleAuthChange} required />
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold text-custom-muted">Security Key Access Password</label>
              <input type="password" id="password" className="form-control py-2" placeholder="••••••••" value={authForm.password} onChange={handleAuthChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold mb-3 d-flex align-items-center justify-content-center gap-2 shadow">
              {isSignUp ? <UserPlus size={18} /> : <LogIn size={18} />}
              {isSignUp ? 'Register Network Agent' : 'Authenticate Session Key'}
            </button>
          </form>

          <div className="text-center">
            <button className="btn btn-link btn-sm text-decoration-none text-custom-muted" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Already authorized? Login here' : 'Request new terminal access keys'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING ROUTE 2: CORE ENTERPRISE LEDGER DASHBOARD ---
  return (
    <div className="min-vh-100">
      {/* Immersive 3D Navbar Header context layout */}
      <nav className="navbar navbar-expand-lg border-bottom px-4 py-3 shadow-sm d-flex justify-content-between align-items-center" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary text-white p-2 rounded-3 float-3d shadow-sm">
            <Activity size={24} />
          </div>
          <span className="navbar-brand mb-0 h4 fw-bold text-custom-main">HMS Enterprise Central Matrix</span>
        </div>
        
        <div className="d-flex align-items-center gap-3">
          {/* Theme Switcher element */}
          <button className="btn card-3d p-2 rounded-circle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={18} className="text-custom-main" /> : <Sun size={18} className="text-custom-main" />}
          </button>
          <button className="btn btn-outline-danger btn-sm fw-bold px-3 rounded-pill" onClick={() => setIsAuthenticated(false)}>
            Terminate Session
          </button>
        </div>
      </nav>

      {/* Main Structural Working Grid array */}
      <div className="container-fluid p-5">
        <div className="row">
          
          {/* Dashboard Left Wing Form Layout column component */}
          <div className="col-lg-4 mb-4">
            <div className="card card-3d p-4">
              <div className="d-flex align-items-center gap-2 mb-3 text-primary border-bottom pb-2">
                <PlusCircle size={20} />
                <h5 className="mb-0 fw-bold">Admission Record Intake</h5>
              </div>
              
              <form onSubmit={handleFormSubmit}>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label small text-custom-muted fw-bold">First Name</label>
                    <input type="text" id="firstName" className="form-control" value={formData.firstName} onChange={handleInputChange} required />
                  </div>
                  <div className="col">
                    <label className="form-label small text-custom-muted fw-bold">Last Name</label>
                    <input type="text" id="lastName" className="form-control" value={formData.lastName} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label small text-custom-muted fw-bold">Primary Terminal Contact</label>
                  <input type="tel" id="contactNumber" className="form-control" value={formData.contactNumber} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label small text-custom-muted fw-bold">Date of Isolation Entry (DOB)</label>
                  <input type="date" id="dob" className="form-control" value={formData.dob} onChange={handleInputChange} required />
                </div>
                <div className="row mb-4">
                  <div className="col">
                    <label className="form-label small text-custom-muted fw-bold">Biometric Gender</label>
                    <select id="gender" className="form-select" value={formData.gender} onChange={handleInputChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col">
                    <label className="form-label small text-custom-muted fw-bold">Serology Strain (Blood)</label>
                    <select id="bloodGroup" className="form-select" value={formData.bloodGroup} onChange={handleInputChange}>
                      <option value="O+">O+</option>
                      <option value="A+">A+</option>
                      <option value="B+">B+</option>
                      <option value="AB+">AB+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 fw-bold shadow-lg rounded-3">
                  Commit Record Secure Vector
                </button>
              </form>
            </div>
          </div>

          {/* Dashboard Right Wing Data streaming viewport matrix layer */}
          <div className="col-lg-8">
            <div className="card card-3d p-0 overflow-hidden">
              <div className="p-4 d-flex justify-content-between align-items-center text-white rounded-top-4" style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)' }}>
                <div className="d-flex align-items-center gap-2">
                  <Users size={22} />
                  <h5 className="mb-0 fw-bold">Live Synchronized Ledger Viewport</h5>
                </div>
                <button className="btn btn-light btn-sm fw-bold px-3 shadow" onClick={loadRecords}>
                  Force Data Sync 🔄
                </button>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light small text-uppercase fw-bold text-secondary">
                    <tr>
                      <th className="ps-4">Registry Unique Index</th>
                      <th>Legal Identity Frame</th>
                      <th>Contact Interface</th>
                      <th className="pe-4">Serology Token</th>
                    </tr>
                  </thead>
                  <tbody className="text-custom-main">
                    {patients.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center py-5 text-custom-muted">
                          No active schema partitions populated. Awaiting stream inputs...
                        </td>
                      </tr>
                    ) : (
                      patients.map((p) => (
                        <tr key={p.PatientID} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td className="ps-4 fw-bold text-primary">#PAT-{p.PatientID}</td>
                          <td className="fw-semibold">{p.FirstName} {p.LastName}</td>
                          <td>{p.ContactNumber}</td>
                          <td className="pe-4">
                            <span className="badge bg-danger shadow-sm px-3 py-2 rounded-pill fw-bold" style={{ fontSize: '0.8rem' }}>
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
  );
}

export default App;