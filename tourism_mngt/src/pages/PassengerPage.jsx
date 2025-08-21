
import React, { useState } from 'react';
import './PassengerPage.css'; 
import { useNavigate } from 'react-router-dom';
import config from '../config';
import axios from 'axios';

const PassengerPage = () => {
    const [passengers, setPassengers] = useState([]);
    const [passenger, setPassenger] = useState({
        name: '',
        age: '',
        gender: '',
        email: '',
        aadhaar: '',
    });

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Ensure that the aadhaar number only accepts up to 12 digits
        if (name === 'aadhaar' && (value.length > 12 || isNaN(value))) {
            return;
        }

        setPassenger({ ...passenger, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the aadhaar number is exactly 12 digits
        if (passenger.aadhaar.length !== 12) {
            alert('Aadhaar number must be exactly 12 digits.');
            return;
        }

        // Add the new passenger to the local list
        setPassengers([...passengers, passenger]);

        // Reset the form for a new entry
        setPassenger({ name: '', age: '', gender: '', email: '', aadhaar: '' });
    };
   
    const viewBookingSummary = async () => {
        try {
            const email = localStorage.getItem('userEmail')
            const bookingNo = localStorage.getItem('bookingNo');
            const packageName = localStorage.getItem('selectedPackageName');
            const cityName = localStorage.getItem('selectedCityName');
            const hotelName = localStorage.getItem('hotelName');
            console.log(hotelName);
            const totalPrice = localStorage.getItem('totalPrice');
            console.log(email);
            const payload = {
                bookingNo,
                email: email,
                packageName: packageName, 
                cityName: cityName,       
                hotelName: hotelName,     
                noOfPassengers: passengers.length,
                totalCost: passengers.length * totalPrice,
            };
            const response = await axios.post(`${config.url}/booking/save-details`, payload);
            console.log(response);
            
            const travellers = passengers.map(p => ({
                name: p.name,
                age: p.age,
                gender: p.gender.toUpperCase(),
                email: p.email,
                aadhaarNo: p.aadhaar, // Ensure this matches your DTO
            }));
    
            const travellerPayload = {
                travellers,
                bookingNo,
            };
            await axios.post(`${config.url}/traveller/add`, travellerPayload);
            localStorage.setItem('noOfPassengers', passengers.length);
            localStorage.setItem('totalCost', passengers.length * totalPrice );
            navigate('/booking-summary');
        
        } catch (error) {
            console.error('Failed to process booking summary:', error);
            alert('An error occurred while processing the booking summary.');
        }
    };

    const goBack = () => {
        navigate(-1); // Go back to the previous page
    };
    
    return (
        <div className="passenger-page">
            <h2>Passenger Details</h2>

            <form onSubmit={handleSubmit} className="passenger-form">
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={passenger.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Age:</label>
                    <input 
                        type="number" 
                        name="age" 
                        value={passenger.age} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <select 
                        name="gender" 
                        value={passenger.gender} 
                        onChange={handleChange} 
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={passenger.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Aadhaar:</label>
                    <input 
                        type="number" 
                        name="aadhaar" 
                        value={passenger.aadhaar} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit">Add Passenger</button>
            </form>

            <br /><br />
            <h3>Passenger List</h3>
            <table className="passenger-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Aadhaar</th>
                    </tr>
                </thead>
                <tbody>
                    {passengers.map((p, index) => (
                        <tr key={index}>
                            <td>{p.name}</td>
                            <td>{p.age}</td>
                            <td>{p.gender}</td>
                            <td>{p.email}</td>
                            <td>{p.aadhaar}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={viewBookingSummary} className="go-to-booking-button">
                View Booking Summary
            </button>
        </div>
    );
};

export default PassengerPage;
