import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../config';
import CityImages from '../components/CityImages';
import { useNavigate } from 'react-router-dom';



// Define styles first without any dependencies on itself
const inputFieldStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
};

const textAreaFieldStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical',
    height: '100px',
};

const saveButtonStyle = {
    display: 'block',
    width: '220px',
    padding: '12px',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderRadius: '8px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
};

const cancelButtonStyle = {
    ...saveButtonStyle,
    backgroundColor: '#e74c3c',
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#f4f4f9',
    },
    cityHeader: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    cityName: {
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
    },
    cityDescription: {
        fontSize: '1.2rem',
        color: '#555',
        marginBottom: '20px',
        lineHeight: '1.5',
    },
    cityInfoBox: {
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        width: '60%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cityInfoHeader: {
        fontSize: '1.4rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '15px',
    },
    cityInfo: {
        fontSize: '1rem',
        color: '#666',
        marginBottom: '10px',
    },
    cityInfoBoxItem: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        marginBottom: '10px',
    },
    cityPrice: {
        fontSize: '1.6rem',
        color: '#e67e22',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    images: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    cityImage: {
        borderRadius: '10px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        width: '350px',
        height: '220px',
        objectFit: 'cover',
    },
    bookNowButton: {
        display: 'block',
        width: '220px',
        padding: '12px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: '#007BFF',
        color: '#fff',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        borderRadius: '8px',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
    },
    bookNowButtonHover: {
        backgroundColor: '#0056b3',
        transform: 'scale(1.05)',
    },
    hotels: {
        marginTop: '30px',
    },
    hotelsTitle: {
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center',
    },
    hotelCard: {
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        maxWidth: '500px',
        margin: '0 auto',
    },
    hotelName: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
    },
    hotelInfo: {
        fontSize: '1.1rem',
        color: '#666',
        marginBottom: '8px',
    },
    hotelFacilities: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px',
    },
    facilitiesList: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
    facilitiesListItem: {
        fontSize: '1.1rem',
        color: '#555',
        marginBottom: '5px',
    },
    inputField: inputFieldStyle,
    textAreaField: textAreaFieldStyle,
    saveButton: saveButtonStyle,
    cancelButton: cancelButtonStyle,
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '20px',
    },
};

const UpdateCity = () => {
    const { cityId } = useParams();
    const [cityInfo, setCityInfo] = useState(null);
    const [editedCityInfo, setEditedCityInfo] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchCityData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${config.url}/cities/${cityId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setCityInfo(response.data);
                setEditedCityInfo(response.data); // Initialize with existing data
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch city data');
                setLoading(false);
            }
        };

        fetchCityData();
    }, [cityId]);

    const handleInputChange = (e) => {
        setEditedCityInfo({
            ...editedCityInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`${config.url}/cities/update/${cityId}`, editedCityInfo, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200 || response.status === 204) {
                // Successfully updated
                setCityInfo(editedCityInfo); // Update state with new data
                setIsEditing(false); // Exit editing mode
            } else {
                throw new Error(`Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating city data:', error);
            if (error.response) {
                // Server responded with a status code outside of 2xx range
                alert(`Failed to save changes: ${error.response.data.message || error.response.data}`);
            } else if (error.request) {
                // Request was made but no response was received
                alert('Failed to save changes: No response from server');
            } else {
                // Something happened in setting up the request
                alert(`Failed to save changes: ${error.message}`);
            }
        }
    };

    const handleCancel = () => {
        setEditedCityInfo(cityInfo); // Reset changes
        setIsEditing(false);
    };

    const renderEditableField = (label, field, type = 'text') => (
        <div style={styles.cityInfoBoxItem}>
            <p style={styles.cityInfo}>{label}: </p>
            {isEditing ? (
                <input
                    type={type}
                    name={field}
                    value={editedCityInfo[field] || ''}
                    onChange={handleInputChange}
                    style={styles.inputField}
                />
            ) : (
                <span>{cityInfo[field] || `${label} not available`}</span>
            )}
        </div>
    );

    const renderEditableTextArea = (label, field) => (
        <div style={styles.cityInfoBoxItem}>
            <p style={styles.cityInfo}>{label}: </p>
            {isEditing ? (
                <textarea
                    name={field}
                    value={editedCityInfo[field] || ''}
                    onChange={handleInputChange}
                    style={styles.textAreaField}
                />
            ) : (
                <span>{cityInfo[field] || `${label} not available`}</span>
            )}
        </div>
    );

    const navigate = useNavigate();
    // const addImages = () => {
    //     navigate(`/add-images/${cityId}`);
    // }
    const addImages = () => {
        navigate(`/add-images?cityId=${cityId}`);
    };

    const addHotels = () => {
        navigate(`/add-hotels?cityId=${cityId}`);
    }
    


    if (loading) return <div className="loader-container">Loading...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!cityInfo) return <div>No data available</div>;

    return (
        <div style={styles.container}>
            <div style={styles.cityHeader}>
                {renderEditableField('City Name', 'name')}
                {renderEditableTextArea('City Description', 'cityDetails')}

                <div style={styles.cityInfoBox}>
                    <h2 style={styles.cityInfoHeader}>Trip Details</h2>
                    {renderEditableField('Duration', 'duration')}
                    {renderEditableTextArea('Day 1 Plan', 'day1Description')}
                    {renderEditableTextArea('Day 2 Plan', 'day2Description')}
                    {renderEditableTextArea('Day 3 Plan', 'day3Description')}
                    {renderEditableTextArea('Day 4 Plan', 'day4Description')}
                    {renderEditableField('Starting Date', 'startingDate', 'date')}
                    {renderEditableField('Ending Date', 'endingDate', 'date')}
                    {renderEditableField('Location', 'location')}
                </div>
            </div>

            {/* <CityImages/> */}

            <div style={styles.images}>
                {cityInfo.images && cityInfo.images.length > 0 ? (
                    cityInfo.images.map((imagePath, index) => (
                        <img
                            key={index}
                            src={`${config.url}${imagePath.imagePath}`}
                            alt={`City Image ${index + 1}`}
                            style={styles.cityImage}
                        />
                    ))
                ) : (
                    <p>No images available</p>
                )}
            </div>

            <div style={styles.hotels}>
                <h3 style={styles.hotelsTitle}>Hotels</h3>
                {cityInfo.hotels && cityInfo.hotels.length > 0 ? (
                    cityInfo.hotels.map((hotel, index) => (
                        <div key={index} style={styles.hotelCard}>
                            {renderEditableField('Hotel Name', `hotels[${index}].name`)}
                            {renderEditableField('Address', `hotels[${index}].address`)}
                            {renderEditableField('Rate per Person', `hotels[${index}].ratePerPerson`)}
                            {renderEditableField('Rating', `hotels[${index}].starRating`)}
                            {renderEditableTextArea('Facilities', `hotels[${index}].facilities`)}
                        </div>
                    ))
                ) : (
                    <p>No hotels available</p>
                )}
            </div>

            {isEditing ? (
                <div style={styles.buttonContainer}>
                    <button style={styles.saveButton} onClick={handleSave}>
                        Save
                    </button>
                    <button style={styles.cancelButton} onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            ) : (
                <div style={styles.buttonContainer}>
                    <button
                        style={styles.bookNowButton}
                        onClick={() => setIsEditing(true)}
                    >
                        Update
                    </button>
                    <button
                        style={styles.bookNowButton}
                        onClick={() => addImages()}
                    >
                        Add Images
                    </button>
                    <button
                        style={styles.bookNowButton}
                        onClick={() => addHotels()}
                    >
                        Add Hotels
                    </button>
                </div>
                
            )}
        </div>
    );
};

export default UpdateCity;
