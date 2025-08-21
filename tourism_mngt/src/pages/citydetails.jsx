import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../config';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';




const CityDetails = () => {
  const { cityId } = useParams();
  const [cityInfo, setCityInfo] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(null); // State to hold the total price
  const [bookingNo, setBookingNo] = useState('');

  
  const navigate = useNavigate();

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          style={{ color: i <= rating ? '#ffc107' : '#e4e5e9', marginRight: '2px' }}
        />
      );
    }
    return stars;
  };
  
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.url}/cities/${cityId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });


        
        console.log('API Response:', response.data); // Log full response for debugging
        setCityInfo(response.data);
        setTotalPrice(response.data.price); // Initialize totalPrice with the original package price
        setLoading(false);
      } catch (error) {
        console.error("Error fetching city data:", error.response ? error.response.data : error.message);
        setError('Failed to fetch city data');
        setLoading(false);
      }
    };

    fetchCityData();
  }, [cityId]);

  const handleHotelClick = (hotel) => {
    setSelectedHotel(hotel);
    localStorage.setItem('hotelName', hotel.name);
    // Update the total price when a hotel is selected
    setTotalPrice((cityInfo.price || 0) + (hotel.ratePerPerson || 0));
  };

  const imageUrl = (imagePath) => {
    const fullUrl = `${config.url}${imagePath}`;
    console.log('Constructed Image URL:', fullUrl); // Log URL for debugging
    return fullUrl;
  };

  const renderFacilities = (facilities) => (
    <ul style={styles.facilitiesList}>
      {facilities.breakfast && <li style={styles.facilitiesListItem}>Breakfast</li>}
      {facilities.free_wi_fi && <li style={styles.facilitiesListItem}>Free Wi-Fi</li>}
      {facilities.pool && <li style={styles.facilitiesListItem}>Pool</li>}
      {facilities.restaurant && <li style={styles.facilitiesListItem}>Restaurant</li>}
      {facilities.housekeeping && <li style={styles.facilitiesListItem}>Housekeeping</li>}
      {facilities.luggage_assistance && <li style={styles.facilitiesListItem}>Luggage Assistance</li>}
      {facilities.bonfire && <li style={styles.facilitiesListItem}>Bonfire</li>}
    </ul>
  );

  const generateBookingNo = () => {
    const base = 'BN';
    const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase(); // Generate a random string
    const timestampPart = Date.now().toString().slice(-4); // Last 4 digits of the current timestamp
    
    const newBookingNo = `${base}-${randomPart}-${timestampPart}`;
    return newBookingNo;
};

const Addpass = () => {
  const newBookingNo = generateBookingNo();  // Generate booking number
  console.log('Booking No in Addpass:', newBookingNo); // Debugging statement

  localStorage.setItem('bookingNo', newBookingNo);
  localStorage.setItem('totalPrice', totalPrice);
  navigate('/PassengerPage');
};

  if (loading) {
    return <div style={styles.loaderContainer}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.errorMessage}>{error}</div>;
  }

  if (!cityInfo) {
    return <div>No data available</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.cityHeader}>
        <h1 style={styles.cityName}>{cityInfo.name || 'City Name Not Available'}</h1>
        
        <span style={styles.cityInfoLabel}>Duration: </span>
        <span style={styles.cityInfoValue}>{cityInfo.duration || 'Not available'}</span> &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; 
        <span style={styles.cityInfoLabel}>Location: </span>
        <span style={styles.cityInfoValue}>{cityInfo.location || 'Not available'}</span> &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;
      <br/>
        <span style={styles.cityInfoLabel}>Starting Date: </span>
        <span style={styles.cityInfoValue}>{cityInfo.startingDate || 'Not available'}</span>  &nbsp; &nbsp; &nbsp;
        <span style={styles.cityInfoLabel}>Ending Date:  </span>
        <span style={styles.cityInfoValue}>{cityInfo.endingDate || 'Not available'}</span>
        <br /> <br /> <br />
        <p style={styles.cityDescription}>{cityInfo.cityDetails || 'Details not available'}</p>
        <br /> 
        <div style={styles.images}>
          {cityInfo.images && cityInfo.images.length > 0 ? (
            cityInfo.images.map((imagePath, index) => (
              <img
                key={index}
                src={imageUrl(imagePath.imagePath)}
                alt={`City Image ${index + 1}`}
                style={index < 2 ? styles.largeCityImage : styles.smallCityImage}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150'; // Fallback image
                  console.error('Image failed to load:', e.target.src);
                }}
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div> <br />
      <div style={styles.cityInfoBox}>
        <h2 style={styles.cityInfoHeader}>Trip Details</h2>
        <div style={styles.dayPlanBox}>
          <h3 style={styles.dayPlanHeader}>Day 1 Plan</h3>
          <p>{cityInfo.day1Description || 'Not available'}</p>
        </div>
        <div style={styles.dayPlanBox}>
          <h3 style={styles.dayPlanHeader}>Day 2 Plan</h3>
          <p>{cityInfo.day2Description || 'Not available'}</p>
        </div>
        <div style={styles.dayPlanBox}>
          <h3 style={styles.dayPlanHeader}>Day 3 Plan</h3>
          <p>{cityInfo.day3Description || 'Not available'}</p>
        </div>
        <div style={styles.dayPlanBox}>
          <h3 style={styles.dayPlanHeader}>Day 4 Plan</h3>
          <p>{cityInfo.day4Description || 'Not available'}</p>
        </div>
      </div>
      <div style={styles.hotels}>
        <br />
        <h3 style={styles.hotelsTitle}>Hotels</h3>
        <h5>Select the hotel that suits you</h5>
        <br />
        <div style={styles.hotelsList}>
          {cityInfo.hotels && cityInfo.hotels.length > 0 ? (
            cityInfo.hotels.map((hotel, index) => (
              <div
                key={index}
                style={selectedHotel && selectedHotel.id === hotel.id ? styles.selectedHotelCard : styles.hotelCard}
                onClick={() => handleHotelClick(hotel)}
              >
                <h4 style={styles.hotelName}>{hotel.name || 'Hotel Name Not Available'}</h4>
                <br />
                <p style={styles.hotelInfo}>Address: {hotel.address || 'Address not available'}</p>
                <p style={styles.hotelInfo}>Rate per Person: &#8377; {hotel.ratePerPerson ? hotel.ratePerPerson.toFixed(2) : 'Rate not available'}</p>
                <p style={styles.hotelInfo}>Rating: {renderStarRating(hotel.starRating) || 'Star rating not available'}</p>

              </div>
            ))
          ) : (
            <p>No hotels available</p>
          )}
        </div>
        <br />
        {selectedHotel && (
          <div style={styles.hotelDetails}>
            <h4 style={styles.hotelDetailsHeader}>Selected Hotel Details</h4>
            <p style={styles.hotelInfo}>Name: {selectedHotel.name || 'Hotel Name Not Available'}</p>
            <p style={styles.hotelInfo}>Address: {selectedHotel.address || 'Address not available'}</p>
            <p style={styles.hotelInfo}>Rate per Person: &#8377; {selectedHotel.ratePerPerson ? selectedHotel.ratePerPerson.toFixed(2) : 'Rate not available'}</p>
            <p style={styles.hotelInfo}>Rating: {renderStarRating(selectedHotel.starRating) || 'Star rating not available'}</p>
            <br />
            <p style={styles.hotelFacilities}>Facilities:</p>
            {renderFacilities(selectedHotel)}
          </div>
        )}
        <br />
        <div style={styles.cityInfoBoxItem}>
          <p style={styles.cityInfo}>Total Price : <span style={styles.cityPrice}>&#8377; {totalPrice ? totalPrice.toFixed(2) : 'Not available'}</span> per person</p>
        </div>
        
        <a href="#"
           style={styles.bookNowButton}
           onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.bookNowButtonHover.backgroundColor}
           onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.bookNowButton.backgroundColor}
           onClick={Addpass}
        >
          Book Now
        </a>
        <br />
      </div>
    </div>
  );
};
// Inline styles for the component
const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  },
  cityHeader: {
    textAlign: 'center',
  },
  cityName: {
    fontSize: '3em',
    marginBottom: '10px',
    // marginRight :'1100px',
    fontWeight: 'bold',
  },
  cityDescription: {
    fontSize: '1.2em',
    color: '#555',
  },
  cityInfoLabel: {
    fontWeight: 'bold',
  },
  cityInfoValue: {
    fontStyle: 'italic',
  },
  images: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '30px',
    padding: '10px',
  },
  largeCityImage: {
    width: '350px',
    height: '200px',
    borderRadius: '10px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  smallCityImage: {
    width: '400px',
    height: '175px',
    borderRadius: '10px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  cityInfoBox: {
    marginTop: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  dayPlanBox: {
    marginBottom: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  dayPlanHeader: {
    marginBottom: '10px',
    fontSize: '1.6em',
    color: '#333',
    borderBottom: '2px solid #007bff',
    paddingBottom: '5px',
  },
  hotels: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  hotelsTitle: {
    fontSize: '2.5em',
    marginBottom: '15px',
    color: '#333',
  },
  hotelsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  hotelCard: {
    width: '300px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  selectedHotelCard: {
    width: '300px',
    padding: '15px',
    border: '2px solid #007bff',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  hotelName: {
    fontSize: '1.5em',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  hotelInfo: {
    fontSize: '1.2em',
    marginBottom: '5px',
  },
  hotelFacilities: {
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  hotelDetails: {
    marginTop: '20px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  hotelDetailsHeader: {
    fontSize: '1.6em',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  cityPrice: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  bookNowButton: {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '1.2em',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    textAlign: 'center',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
  bookNowButtonHover: {
    backgroundColor: '#0056b3',
  },
  loaderContainer: {
    textAlign: 'center',
    padding: '20px',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    padding: '20px',
  },
};



export default CityDetails;
