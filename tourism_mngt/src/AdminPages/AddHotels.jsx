import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import config from '../config';

export default function AddHotels() {

    const pageLocation = useLocation();
    const queryParams = new URLSearchParams(pageLocation.search);
    const cityId = queryParams.get('cityId');

    const [formData, setFormData] = useState({
        address: '',
        bonfire: false,
        breakfast: false,
        checkInDate: '',
        checkOutDate: '',
        free_WiFi: false,
        housekeeping: false,
        luggageAssistance: false,
        name: '',
        pool: false,
        ratePerPerson: '',
        restaurant: false,
        starRating: '',
        city_id: cityId // Add city_id here
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSend = {
                ...formData,
            };

            const response = await axios.post(`${config.url}/cities/hotel/${cityId}`, dataToSend);
            console.log(response.data);
            // Reset form fields after successful submission
            setFormData({
                address: '',
                bonfire: false,
                breakfast: false,
                checkInDate: '',
                checkOutDate: '',
                free_WiFi: false,
                housekeeping: false,
                luggageAssistance: false,
                name: '',
                pool: false,
                ratePerPerson: '',
                restaurant: false,
                starRating: '',
                city_id: cityId // Reset city_id as well
            });
            toast.success('Hotel details added successfully!');
        } catch (error) {
            toast.error('Error adding hotel details');
            console.error('Error submitting data:', error);
        }
    };

    return (
        <div style={{
            maxWidth: 400,
            margin: '40px auto',
            padding: 20,
            border: '5px solid #ddd',
            borderRadius: 10,
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        }}>
            <div style={{
                textAlign: 'center',
                marginBottom: 20
            }}>
                <h2 style={{
                    fontWeight: 'bold',
                    color: '#333'
                }}>Add Hotel Details for city id {cityId}</h2>
            </div>
            <form onSubmit={handleFormSubmit}>
                <label style={{
                    display: 'block',
                    marginBottom: 5
                }}>Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                        width: '100%',
                        height: 40,
                        padding: 10,
                        border: '1px solid #ccc',
                        borderRadius: 5,
                        marginBottom: 10
                    }}
                />
                <label style={{
                    display: 'block',
                    marginBottom: 5
                }}>Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    style={{
                        width: '100%',
                        height: 40,
                        padding: 10,
                        border: '1px solid #ccc',
                        borderRadius: 5,
                        marginBottom: 10
                    }}
                />
                <br />
                <label style={{
                    display: 'block',
                    marginBottom: 5
                }}>Bonfire</label>
                <input
                    type="checkbox"
                    name="bonfire"
                    checked={formData.bonfire}
                    onChange={handleChange}
                    style={{
                        marginBottom: 20
                    }}
                />
                <br />
                <label style={{
                    display: 'block',
                    marginBottom: 5
                }}>Breakfast</label>
                <input
                    type="checkbox"
                    name="breakfast"
                    checked={formData.breakfast}
                    onChange={handleChange}
                    style={{
                        marginBottom: 20
                    }}
                />
                <br />
                <label style={{
                    display: 'block',
                    marginBottom: 5
                }}>Check-in Date</label>
                <input
                    type="date"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleChange}
                    required
                    style={{
                        width: '100%',
                        height: 40,
                        padding: 10,
                        border: '1px solid #ccc',
                        borderRadius: 5,
                        marginBottom: 10
                    }}
                />
                <br />
                <label style={{
                    display: 'block',
                    marginBottom: 5
                }}>Check-out Date</label>
                <input
                    type="date"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleChange}
                    required
                    style={{
                        width: '100%',
                        height: 40,
                        padding: 10,
                        border: '1px solid #ccc',
                        borderRadius: 5,
                        marginBottom: 10
                    }}
                />
                <br />
                <label style={{
                    display: 'block',
                    marginBottom: 5
                }}>Free Wi-Fi</label>
                <input
                    type="checkbox"
                    name="free_WiFi"
                    checked={formData.free_WiFi}
                    onChange={handleChange}
                    style={{
                        marginBottom: 20
                    }}
                />
                <br />
                <label style={{
                    display: 'block',
                    marginBottom: 5
                }}>housekeeping</label>
                <input
                    type="checkbox"
                    name="housekeeping"
                    checked={formData.housekeeping}
                    onChange={handleChange}
                    style={{
                        marginBottom: 20
                    }}
                />
                <br />
                <label style={{
                    display: 'block',
                    marginBottom: 5
                }}>Luggage Assistance</label>
                <input
                    type="checkbox"
                    name="luggageAssistance"
                    checked={formData.luggageAssistance}
                    onChange={handleChange}
                    style={{
                        marginBottom: 20
                    }}
                />
                <br />
                <label style={{
                    display: 'block',
                    marginBottom: 5
                }}>Pool</label>
                <input
                    type="checkbox"
                    name="pool"
                    checked={formData.pool}
                    onChange={handleChange}
                    style={{
                        marginBottom: 20
                    }}
                />
                <br />
                <label style={{
                    display: 'block',
                    marginBottom: 5
                }}>Restaurant</label>
                <input
                    type="checkbox"
                    name="restaurant"
                    checked={formData.restaurant}
                    onChange={handleChange}
                    style={{
                        marginBottom: 20
                    }}
                />
                <br />
                <label style={{
                    display: 'block',
                    marginBottom: 5
                }}>Rate per Person</label>
                <input
                    type="number"
                    name="ratePerPerson"
                    value={formData.ratePerPerson}
                    onChange={handleChange}
                    required
                    style={{
                        width: '100%',
                        height: 40,
                        padding: 10,
                        border: '1px solid #ccc',
                        borderRadius: 5,
                        marginBottom: 10
                    }}
                />
                <br />             
                <label style={{
                    display: 'block',
                    marginBottom: 5
                }}>Star Rating</label>
                <input
                    type="number"
                    name="starRating"
                    value={formData.starRating}
                    onChange={handleChange}
                    min={0}
                    max={5}
                    required
                    style={{
                        width: '100%',
                        height: 40,
                        padding: 10,
                        border: '1px solid #ccc',
                        borderRadius: 5,
                        marginBottom: 10
                    }}
                />
                <br />
                <button type="submit" style={{
                    width: 200,
                    height: 40,
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 5,
                    cursor: 'pointer',
                    margin: '20px auto',
                    display: 'block'
                }}>Add Hotel</button>
            </form>
        </div>
    );
}
