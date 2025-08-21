import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { toast } from "react-toastify";
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './cities.css'; // Import the CSS file for styling

const CityPage = () => {
    const { id } = useParams(); // Get the city ID from the route
    const [cityData, setCityData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [isAdmin, setIsAdmin] = useState(false); // State to check if user is admin
    const navigate = useNavigate(); // Initialize useNavigate hook

    // Function to fetch city data
    const fetchCityData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${config.url}/packages/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setCityData(response.data);
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error("Error fetching city data:", error.response ? error.response.data : error.message);
            setError('Failed to fetch city data');
            setLoading(false); // Set loading to false if there's an error
        }
    };

    useEffect(() => {
        const checkUserRole = () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                setIsAdmin(decodedToken.authorities === 'ADMIN');
            }
        };

        checkUserRole(); // Check if the user is an admin
        fetchCityData();
    }, [id]);

    const handleCardClick = (city) => {
        localStorage.setItem('selectedCityName', city.name);
        navigate(`/cities/${city.id}`);
    };

    const handleUpdateClick = (id) => {
        navigate(`/update-city/${id}`); // Navigate to the update city form
    };
  
    const handleDeleteClick = async (cityId) => {
        if (window.confirm("Are you sure you want to delete this city?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${config.url}/cities/${cityId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },                    
                }
                // toast.success("City deleted successfully");
                );
                // Re-fetch city data after deletion
                toast.success("City deleted successfully");
                fetchCityData();
            } catch (error) {
                console.error("Error deleting city:", error.response ? error.response.data : error.message);
                setError('Failed to delete city');
            }
        }
    };

    if (loading) {
        return (
            <div className="loader-container">
                <p>Loading...</p>
            </div>  
        );
    } 

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className='city-page'>
            {cityData.length >= 0 && (
                <>
                    <br />
                    <h1 className='page-title'>Book your favourite City!</h1>
                    <div className='card-group'>
                        {cityData.map((city) => (
                            <div
                                key={city.id} 
                                className="col-md-3" 
                                onClick={() => handleCardClick(city)} // Handle click event
                                style={{ cursor: 'pointer' }} // Change cursor to pointer
                            >
                                <div className="card">
                                    <img
                                        src={`data:image/jpeg;base64,${city.cityImage}`}
                                        className="card-img-top"
                                        alt={city.packageName}
                                        onClick={() => handleCardClick(city.id)}   // Handle click event
                                    />
                                    <div className="card-body">
                                        <div className="city-header">
                                            <h5 className="city-name">{city.name}</h5>
                                            <div className="duration-box">{city.duration}</div>
                                        </div>
                                        <hr />
                                        <p className="card-text">{city.cityDetails}</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="price-box">
                                            <small className="text-muted">
                                                &#8377; {city.price}/person
                                            </small>
                                        </div>
                                        {/* Conditionally render the Update and Delete buttons for admins */}
                                        {isAdmin && (
                                            <div className="admin-buttons">
                                                <button 
                                                    className="update-button"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent triggering the card click
                                                        handleUpdateClick(city.id);
                                                    }}
                                                >
                                                    Update
                                                </button>
                                                <button 
                                                    className="delete-button"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent triggering the card click
                                                        handleDeleteClick(city.id);
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Button to navigate to add city page */}
                    {isAdmin && (
                        <div className="add-city-button-container">
                            <button 
                                className="add-city-button"
                                onClick={() => navigate(`/add-city?packageId=${id}`)}
                            >
                                Add New City
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CityPage;
