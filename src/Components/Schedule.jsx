import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableRow, TableContainer, TableCell, TableHead, Checkbox, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

function Schedule() {
  const [employeesData, setEmployeesData] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const[admin,setAdmin] = useState([])
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [comment, setComment] = useState('');

  const navigate = useNavigate();

  const adminId = localStorage.getItem('adminId');

  console.log(adminId);

  const fetchUserData = async () => {
    try {
      const result = await axios.get('http://localhost:3001/api/user/users');
      setEmployeesData(result.data.allUsers);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchAdminData = async () => {
    try {
      const result = await axiosInstance.get('/user/admin', admin);
      // const result = await axios.get('http://localhost:3001/api/user/admin');
      console.log(result.data.result)
      setAdmin(result.data.result)
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchAdminData()
  }, []);
console.log('admin',admin)
  const handleCheckboxChange = (employee) => {
    setSelectedEmployees((prev) =>
      prev.includes(employee)
        ? prev.filter((item) => item._id !== employee._id)
        : [...prev, employee]
    );
  };

  const handleSelectAllChange = () => {
    if (selectedEmployees.length === employeesData.length) {
      setSelectedEmployees([]); // Uncheck all if all are selected
    } else {
      setSelectedEmployees(employeesData); // Select all
    }
  };

  const isAllSelected = selectedEmployees.length === employeesData.length;
  console.log(selectedEmployees);

  const sendHandler = async (e) => {
    e.preventDefault();
    let data = {
      employees: selectedEmployees,
      date: date,
      time: time,
      comment: comment,
      createdBy: admin,
    };

    try {
      let response = await  axiosInstance.post('schedule/createSchedule', data);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Schedule</h3>
      <Button variant="contained" onClick={logoutHandler}>
        Logout
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox checked={isAllSelected} onChange={handleSelectAllChange} />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeesData?.map((emp) => {
              return (
                <TableRow key={emp._id}>
                  <TableCell>
                    <Checkbox
                      onChange={() => handleCheckboxChange(emp)}
                      checked={selectedEmployees.some((e) => e._id === emp._id)}
                    />
                  </TableCell>
                  <TableCell>{emp.username}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <input
          type="time"
          onChange={(e) => setTime(e.target.value)}
          value={time}
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={200}
          placeholder="Schedule Comment"
          rows={4}
          style={{ width: '100%' }}
        />
      </div>
      <Button onClick={sendHandler} variant="contained">
        SUBMIT
      </Button>
    </div>
  );
}

export default Schedule;











  

