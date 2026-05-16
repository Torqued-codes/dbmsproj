const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());          // Enables React frontend to communicate with this server
app.use(express.json());  // Instructs the server to handle incoming JSON payloads

// 1. Establish MySQL Connection Pool
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 2. Test Connection on Startup
db.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Database connection failed! Verify your .env credentials.");
        console.error("Error Detail:", err.message);
    } else {
        console.log("✅ Successfully established a link with the Central MySQL Database.");
        connection.release(); // Return connection back to the pool
    }
});

// 3. API ROUTE: FETCH PATIENTS (GET Request)
app.get('/api/patients', (req, res) => {
    const query = "SELECT PatientID, FirstName, LastName, ContactNumber, BloodGroup, Gender FROM Patients ORDER BY PatientID DESC";
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 4. API ROUTE: ADMIT/REGISTER PATIENT (POST Request)
app.post('/api/patients', (req, res) => {
    const { firstName, lastName, contactNumber, dob, gender, bloodGroup } = req.body;
    
    // Prepared Statement to safely handle data input and prevent SQL Injection
    const query = `INSERT INTO Patients (FirstName, LastName, ContactNumber, DOB, Gender, BloodGroup) 
                   VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.query(query, [firstName, lastName, contactNumber, dob, gender, bloodGroup], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "Record written to database!", id: result.insertId });
    });
});

// 5. Fire up the Backend listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Backend API Server actively running on http://localhost:${PORT}`);
});