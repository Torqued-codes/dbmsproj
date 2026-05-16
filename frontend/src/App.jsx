import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sun, Moon, Activity, Users, Stethoscope, Calendar, FileText, CreditCard } from 'lucide-react';

function App() {
  const [theme, setTheme] = useState('light');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('patients');

  // Core Centralized Streaming States
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', contactNumber: '', dob: '', gender: 'Male', bloodGroup: 'O+'
  });

  const API_URL = 'http://localhost:3000/api/patients';

  // Static Relational Sub-Table Framework Datasets
  const doctorsList = [
    { id: 1, name: "Dr. Alice Smith", spec: "Cardiology", floor: "Floor 1", phone: "9876543210" },
    { id: 2, name: "Dr. Bob Wilson", spec: "Pediatrics", floor: "Floor 2", phone: "9876543211" },
    { id: 3, name: "Dr. Charlie Brown", spec: "Orthopedics", floor: "Floor 3", phone: "9876543212" }
  ];

  const appointmentsList = [
    { id: 101, patient: "John Doe", doctor: "Dr. Alice Smith", time: "2026-05-20 10:30 AM", status: "Scheduled" },
    { id: 102, patient: "Jane Smith", doctor: "Dr. Bob Wilson", time: "2026-05-21 02:00 PM", status: "Completed" }
  ];

  const prescriptionsList = [
    { id: 501, patient: "John Doe", doctor: "Dr. Alice Smith", diag: "Hypertension", med: "Amlodipine (5mg)" },
    { id: 502, patient: "Jane Smith", doctor: "Dr. Bob Wilson", diag: "Common Cold", med: "Paracetamol Syrup" }
  ];

  const billingList = [
    { id: 901, patient: "John Doe", amount: "₹1500.00", tax: "₹75.00", status: "Paid" },
    { id: 902, patient: "Jane Smith", amount: "₹500.00", tax: "₹25.00", status: "Pending" }
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const loadRecords = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Raw Payload Extracted from MySQL System Container:", response.data);
      setPatients(response.data);
    } catch (error) {
      console.error("Critical Connection Interrupt on API Route:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) loadRecords();
  }, [isAuthenticated]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, formData);
      if (response.status === 201) {
        alert('Transaction committed successfully to centralized relational node.');
        setFormData({ firstName: '', lastName: '', contactNumber: '', dob: '', gender: 'Male', bloodGroup: 'O+' });
        loadRecords();
      }
    } catch (error) {
      console.error("Write execution halted:", error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container min-vh-100 d-flex justify-content-center align-items-center">
        <div className="glass-card-3d p-5 w-100 text-center" style={{ maxWidth: '440px' }}>
          <div className="text-primary d-inline-block p-3 bg-white rounded-circle shadow mb-4">
            <Activity size={44} />
          </div>
          <h2 className="fw-bold mb-2">Clinical Matrix Node</h2>
          <p className="text-muted small mb-4">Centralized Enterprise Database Interface Gateway</p>
          <button className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow" onClick={() => setIsAuthenticated(true)}>
            Authenticate Connection Handshake
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 pb-5">
      {/* Immersive Glass Top Header */}
      <nav className="navbar navbar-expand-lg mx-4 mt-3 px-4 py-3 glass-card-3d d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <div className="bg-primary text-white p-2 rounded-3 shadow-sm">
            <Activity size={24} />
          </div>
          <span className="h4 mb-0 fw-bold">HMS Central System Mainframe</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="btn border-0 text-muted" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? <Moon size={20} style={{color:'var(--text-main)'}} /> : <Sun size={20} style={{color:'var(--text-main)'}} />}
          </button>
          <button className="btn btn-outline-danger btn-sm px-4 rounded-pill fw-bold" onClick={() => setIsAuthenticated(false)}>Disconnect</button>
        </div>
      </nav>

      {/* High-Contrast Clear Menu Bar Row */}
      <div className="container-fluid px-4 mt-4">
        <div className="glass-card-3d p-3 mb-4 d-flex overflow-auto gap-3">
          <button className={`btn custom-nav-btn d-flex align-items-center gap-2 ${activeTab === 'patients' ? 'active-tab' : ''}`} onClick={() => setActiveTab('patients')}><Users size={18} /> Patients Unit</button>
          <button className={`btn custom-nav-btn d-flex align-items-center gap-2 ${activeTab === 'doctors' ? 'active-tab' : ''}`} onClick={() => setActiveTab('doctors')}><Stethoscope size={18} /> Doctors Directory</button>
          <button className={`btn custom-nav-btn d-flex align-items-center gap-2 ${activeTab === 'appointments' ? 'active-tab' : ''}`} onClick={() => setActiveTab('appointments')}><Calendar size={18} /> Appointments Tracker</button>
          <button className={`btn custom-nav-btn d-flex align-items-center gap-2 ${activeTab === 'prescriptions' ? 'active-tab' : ''}`} onClick={() => setActiveTab('prescriptions')}><FileText size={18} /> Prescriptions Ledger</button>
          <button className={`btn custom-nav-btn d-flex align-items-center gap-2 ${activeTab === 'billing' ? 'active-tab' : ''}`} onClick={() => setActiveTab('billing')}><CreditCard size={18} /> Financial Billings</button>
        </div>

        {/* Dynamic Panel Configurations */}
        <div className="row">
          
          {activeTab === 'patients' && (
            <>
              <div className="col-lg-4 mb-4">
                <div className="glass-card-3d p-4">
                  <h5 className="fw-bold mb-4 text-primary border-bottom pb-2">Admission Registry Input</h5>
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
                      <label className="form-label small text-muted fw-bold">Contact Node Identifier</label>
                      <input type="tel" className="form-control" value={formData.contactNumber} onChange={(e)=>setFormData({...formData, contactNumber: e.target.value})} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label small text-muted fw-bold">Date of Birth</label>
                      <input type="date" className="form-control" value={formData.dob} onChange={(e)=>setFormData({...formData, dob: e.target.value})} required />
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <label className="form-label small text-muted fw-bold">Gender Matrix</label>
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
                    <button type="submit" className="btn btn-primary w-100 py-2.5 fw-bold shadow">Commit to Remote Server</button>
                  </form>
                </div>
              </div>
              
              <div className="col-lg-8">
                <div className="glass-card-3d p-0 overflow-hidden">
                  <div className="p-4 bg-primary text-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">Streaming MySQL Instances Ledger</h5>
                    <button className="btn btn-light btn-sm fw-bold px-3 shadow-sm" onClick={loadRecords}>Sync Rows 🔄</button>
                  </div>
                  <div className="table-responsive">
                    <table className="table align-middle mb-0 text-nowrap">
                      <thead className="table-light small text-uppercase">
                        <tr><th className="ps-4">Token Number</th><th>Patient's Name</th><th>Contact Number</th><th>Blood Group</th></tr>
                      </thead>
                      <tbody style={{color:'var(--text-main)'}}>
                        {patients.length === 0 ? (
                          <tr><td colSpan="4" className="text-center py-4 text-muted">Awaiting connection sync strings...</td></tr>
                        ) : (
                          patients.map((p, index) => (
                            <tr key={p.PatientID || index} style={{borderBottom:'1px solid var(--border-glass)'}}>
                              <td className="ps-4 fw-bold text-primary">#PAT-{p.PatientID || p.patientid || index + 1}</td>
                              <td className="fw-semibold">{p.FirstName || p.firstname} {p.LastName || p.lastname}</td>
                              <td>{p.ContactNumber || p.contactnumber}</td>
                              <td><span className="badge bg-danger px-3 py-2 rounded-pill">{p.BloodGroup || p.bloodgroup || 'O+'}</span></td>
                            </tr>
                          ))
                        )}
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
                    <thead className="table-light"><tr><th className="ps-4">Staff ID</th><th>Doctor Practitioner</th><th>Department Domain</th><th>Operation Base</th></tr></thead>
                    <tbody style={{color:'var(--text-main)'}}>
                      {doctorsList.map(d=>(
                        <tr key={d.id} style={{borderBottom:'1px solid var(--border-glass)'}}><td className="ps-4 fw-bold text-success">#DOC-{d.id}</td><td className="fw-semibold">{d.name}</td><td>{d.spec}</td><td><span className="badge bg-success px-3 py-2 rounded-pill">{d.floor}</span></td></tr>
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
                <div className="p-4 bg-info text-dark fw-bold h5 mb-0">Centralized Allocation Schedule</div>
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead className="table-light"><tr><th className="ps-4">Appt ID</th><th>Subject Target</th><th>Assigned Specialist</th><th>Scheduled Vector</th><th>Status Token</th></tr></thead>
                    <tbody style={{color:'var(--text-main)'}}>
                      {appointmentsList.map(a=>(
                        <tr key={a.id} style={{borderBottom:'1px solid var(--border-glass)'}}><td className="ps-4 fw-bold">#APT-{a.id}</td><td className="fw-semibold">{a.patient}</td><td>{a.doctor}</td><td>{a.time}</td><td><span className="badge bg-info text-dark px-3 py-2 rounded-pill">{a.status}</span></td></tr>
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
                    <thead className="table-light"><tr><th className="ps-4">Script Key</th><th>Patient Recipient</th><th>Diagnosing Authority</th><th>Diagnosis Summary</th><th>Assigned Formulation</th></tr></thead>
                    <tbody style={{color:'var(--text-main)'}}>
                      {prescriptionsList.map(pr=>(
                        <tr key={pr.id} style={{borderBottom:'1px solid var(--border-glass)'}}><td className="ps-4 fw-bold text-secondary">#RX-{pr.id}</td><td className="fw-semibold">{pr.patient}</td><td>{pr.doctor}</td><td>{pr.diag}</td><td><mark className="px-2 py-1 rounded">{pr.med}</mark></td></tr>
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
                    <thead className="table-light"><tr><th className="ps-4">Invoice Hash</th><th>Billing Account</th><th>Net Principal</th><th>Tax Surcharge</th><th>Transaction Status</th></tr></thead>
                    <tbody style={{color:'var(--text-main)'}}>
                      {billingList.map(b=>(
                        <tr key={b.id} style={{borderBottom:'1px solid var(--border-glass)'}}><td className="ps-4 fw-bold text-dark">#INV-{b.id}</td><td className="fw-semibold">{b.patient}</td><td>{b.amount}</td><td>{b.tax}</td><td><span className={`badge px-3 py-2 rounded-pill ${b.status==='Paid'?'bg-success':'bg-warning text-dark'}`}>{b.status}</span></td></tr>
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



