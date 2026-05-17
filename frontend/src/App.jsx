import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, Moon, Activity, Users, Stethoscope, Calendar, FileText, CreditCard } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('patients');

  // Core Relational Live States
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [billing, setBilling] = useState([]);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', contactNumber: '', dob: '', gender: 'Male', bloodGroup: 'O+'
  });

  const BACKEND_URL = 'http://localhost:3000/api';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Master Sync Hook to load data based on what tab is opened
  const syncDatabaseSubsystem = async () => {
    try {
      if (activeTab === 'patients') {
        const res = await axios.get(`${BACKEND_URL}/patients`);
        setPatients(res.data);
      } else if (activeTab === 'doctors') {
        const res = await axios.get(`${BACKEND_URL}/doctors`);
        setDoctors(res.data);
      } else if (activeTab === 'appointments') {
        const res = await axios.get(`${BACKEND_URL}/appointments`);
        setAppointments(res.data);
      } else if (activeTab === 'prescriptions') {
        const res = await axios.get(`${BACKEND_URL}/prescriptions`);
        setPrescriptions(res.data);
      } else if (activeTab === 'billing') {
        const res = await axios.get(`${BACKEND_URL}/billing`);
        setBilling(res.data);
      }
    } catch (error) {
      console.error(`Subsystem sync failed for tab: ${activeTab}`, error);
    }
  };

  // Trigger sync on tab initialization
  useEffect(() => {
    if (isAuthenticated) syncDatabaseSubsystem();
  }, [isAuthenticated, activeTab]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/patients`, formData);
      if (response.status === 201) {
        alert('Transaction written cleanly to MySQL Patients partition.');
        setFormData({ firstName: '', lastName: '', contactNumber: '', dob: '', gender: 'Male', bloodGroup: 'O+' });
        syncDatabaseSubsystem();
      }
    } catch (error) {
      console.error("Write transaction faulted:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="glass-card-3d p-5 w-100 text-center" style={{ maxWidth: '440px' }}>
          <div className="text-primary d-inline-block p-3 bg-white rounded-circle shadow mb-4">
            <Activity size={44} />
          </div>
          <h2 className="fw-bold mb-2">Clinical Enterprise Core</h2>
          <p className="text-muted small mb-4">Secure Distributed Database Interface Gateway</p>
          <button className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow" onClick={() => setIsAuthenticated(true)}>
            Connect Security Context
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 pb-5">
      {/* Immersive Glass Header Dashboard Control Panel */}
      <nav className="navbar navbar-expand-lg mx-4 mt-3 px-4 py-3 glass-card-3d d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary text-white p-2 rounded-3 shadow-sm">
            <Activity size={24} />
          </div>
          <span className="h4 mb-0 fw-bold">HMS Multi-Unit Mainframe</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="btn border-0" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? <Moon size={20} style={{color:'var(--text-main)'}} /> : <Sun size={20} style={{color:'var(--text-main)'}} />}
          </button>
          <button className="btn btn-outline-danger btn-sm px-4 rounded-pill fw-bold" onClick={() => setIsAuthenticated(false)}>Logout Matrix</button>
        </div>
      </nav>

      {/* Primary Selection Command Tab array */}
      <div className="container-fluid px-4 mt-4">
        <div className="glass-card-3d p-3 mb-4 d-flex overflow-auto gap-3">
          <button className={`btn custom-nav-btn d-flex align-items-center gap-2 ${activeTab === 'patients' ? 'active-tab' : ''}`} onClick={() => setActiveTab('patients')}><Users size={18} /> Patients Unit</button>
          <button className={`btn custom-nav-btn d-flex align-items-center gap-2 ${activeTab === 'doctors' ? 'active-tab' : ''}`} onClick={() => setActiveTab('doctors')}><Stethoscope size={18} /> Doctors Directory</button>
          <button className={`btn custom-nav-btn d-flex align-items-center gap-2 ${activeTab === 'appointments' ? 'active-tab' : ''}`} onClick={() => setActiveTab('appointments')}><Calendar size={18} /> Appointments Tracker</button>
          <button className={`btn custom-nav-btn d-flex align-items-center gap-2 ${activeTab === 'prescriptions' ? 'active-tab' : ''}`} onClick={() => setActiveTab('prescriptions')}><FileText size={18} /> Prescriptions Ledger</button>
          <button className={`btn custom-nav-btn d-flex align-items-center gap-2 ${activeTab === 'billing' ? 'active-tab' : ''}`} onClick={() => setActiveTab('billing')}><CreditCard size={18} /> Financial Billings</button>
        </div>

        {/* Dynamic Display Rendering Portals */}
        <div className="row">
          
          {activeTab === 'patients' && (
            <>
              <div className="col-lg-4 mb-4">
                <div className="glass-card-3d p-4">
                  <h5 className="fw-bold mb-4 text-primary border-bottom pb-2">Admission File Input</h5>
                  <form onSubmit={handleFormSubmit}>
                    <div className="row mb-3">
                      <div className="col">
                        <label className="form-label small text-muted fw-bold">First Name</label>
                        <input type="text" className="form-control" value={formData.firstName} onChange={(e)=>setFormData({...formData, firstName: e.target.value})} required />
                      </div>
                      <div className="col">
                        <label className="form-label small text-muted fw-bold">Last Name</label>
                        <input type="text" className="form-control" value={formData.lastName} onChange={(e)=>setFormData({...formData, lastName: e.target.value})} required />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small text-muted fw-bold">Contact Vector ID</label>
                      <input type="tel" className="form-control" value={formData.contactNumber} onChange={(e)=>setFormData({...formData, contactNumber: e.target.value})} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small text-muted fw-bold">Date of Birth</label>
                      <input type="date" className="form-control" value={formData.dob} onChange={(e)=>setFormData({...formData, dob: e.target.value})} required />
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <label className="form-label small text-muted fw-bold">Gender</label>
                        <select className="form-select" value={formData.gender} onChange={(e)=>setFormData({...formData, gender: e.target.value})}>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div className="col">
                        <label className="form-label small text-muted fw-bold">Serology strain</label>
                        <select className="form-select" value={formData.bloodGroup} onChange={(e)=>setFormData({...formData, bloodGroup: e.target.value})}>
                          <option value="O+">O+</option>
                          <option value="A+">A+</option>
                          <option value="B+">B+</option>
                        </select>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-2.5 fw-bold shadow">Save to Remote Database</button>
                  </form>
                </div>
              </div>
              
              <div className="col-lg-8">
                <div className="glass-card-3d p-0 overflow-hidden">
                  <div className="p-4 bg-primary text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">Live Streaming Patients Ledger</h5>
                    <button className="btn btn-light btn-sm fw-bold px-3 shadow-sm" onClick={syncDatabaseSubsystem}>Sync Rows 🔄</button>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle mb-0 text-nowrap">
                      <thead>
                        <tr><th className="ps-4">UID Token</th><th>Full Legal Identity</th><th>Contact Number</th><th>Serology Group</th></tr>
                      </thead>
                      <tbody>
                        {patients.map((p, i) => (
                          <tr key={p.PatientID || i}>
                            <td className="ps-4 fw-bold text-primary">#PAT-{p.PatientID}</td>
                            <td className="fw-semibold">{p.FirstName} {p.LastName}</td>
                            <td>{p.ContactNumber}</td>
                            <td><span className="badge bg-danger px-3 py-2 rounded-pill">{p.BloodGroup}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'doctors' && (
            <div className="col-12">
              <div className="glass-card-3d p-0 overflow-hidden">
                <div className="p-4 bg-success text-white fw-bold h5 mb-0">Active Practitioner Staffing Matrix</div>
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead><tr><th className="ps-4">Staff ID</th><th>Doctor Practitioner</th><th>Department Domain</th><th>Contact Interface</th></tr></thead>
                    <tbody>
                      {doctors.map(d=>(
                        <tr key={d.DoctorID}><td className="ps-4 fw-bold text-success">#DOC-{d.DoctorID}</td><td className="fw-semibold">{d.FullName}</td><td>{d.Specialization}</td><td>{d.ContactNumber}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="col-12">
              <div className="glass-card-3d p-0 overflow-hidden">
                <div className="p-4 bg-info text-dark fw-bold h5 mb-0">Centralized Allocation Schedule (Live MySQL)</div>
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead><tr><th className="ps-4">Appt ID</th><th>Patient Target</th><th>Assigned Specialist</th><th>Scheduled Vector</th><th>Status Token</th></tr></thead>
                    <tbody>
                      {appointments.map(a=>(
                        <tr key={a.ApptID}><td className="ps-4 fw-bold">#APT-{a.ApptID}</td><td className="fw-semibold">{a.PatientName}</td><td>{a.DoctorName}</td><td>{a.ApptDateTime}</td><td><span className="badge bg-info text-dark px-3 py-2 rounded-pill">{a.Status}</span></td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div className="col-12">
              <div className="glass-card-3d p-0 overflow-hidden">
                <div className="p-4 bg-secondary text-white fw-bold h5 mb-0">Clinical Treatment Script Logs</div>
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead><tr><th className="ps-4">Script Key</th><th>Patient Recipient</th><th>Diagnosing Authority</th><th>Diagnosis Summary</th><th>Assigned Formulation</th><th>Dosage Matrix</th></tr></thead>
                    <tbody>
                      {prescriptions.map(pr=>(
                        <tr key={pr.PrescID}><td className="ps-4 fw-bold text-secondary">#RX-{pr.PrescID}</td><td className="fw-semibold">{pr.PatientName}</td><td>{pr.DoctorName}</td><td>{pr.Diagnosis}</td><td><mark className="px-2 py-1 rounded">{pr.MedicationName}</mark></td><td>{pr.Dosage}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="col-12">
              <div className="glass-card-3d p-0 overflow-hidden">
                <div className="p-4 bg-dark text-white fw-bold h5 mb-0">Ecosystem Invoicing Terminal Ledger</div>
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead><tr><th className="ps-4">Invoice Hash</th><th>Billing Account</th><th>Net Principal</th><th>Dynamic Tax Surcharge</th><th>Transaction Status</th></tr></thead>
                    <tbody>
                      {billing.map(b=>(
                        <tr key={b.BillID}>
                          <td className="ps-4 fw-bold text-dark">#INV-{b.BillID}</td>
                          <td className="fw-semibold">{b.PatientName}</td>
                          <td>₹{b.TotalAmount}</td>
                          <td className="text-muted">₹{b.TaxAmount}</td>
                          <td><span className={`badge px-3 py-2 rounded-pill ${b.PaymentStatus==='Paid'?'bg-success':'bg-warning text-dark'}`}>{b.PaymentStatus}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;



