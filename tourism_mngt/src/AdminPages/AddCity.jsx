import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';



export default function AddCity() {
  const [name, setname] = useState('');
  const [cityDetails, setCityDetails] = useState('');
  const [cityImage, setCityImage] = useState(null);
  const [day1Description, setDay1Description] = useState('');
  const [day2Description, setDay2Description] = useState('');
  const [day3Description, setDay3Description] = useState('');
  const [day4Description, setDay4Description] = useState('');
  const [duration, setDuration] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [location, setlocation] = useState('');
  const [price, setprice] = useState('');

  const pageLocation = useLocation();
const queryParams = new URLSearchParams(pageLocation.search);
  const [package_id, setpackage_id] = useState(queryParams.get('packageId'));


  
  // const package_id = queryParams.get('packageId');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('cityDetails', cityDetails);
    formData.append('cityImage', cityImage);
    formData.append('day1Description', day1Description);
    formData.append('day2Description', day2Description);
    formData.append('day3Description', day3Description);
    formData.append('day4Description', day4Description);
    formData.append('duration', duration);
    formData.append('startingDate', startingDate);
    formData.append('endingDate', endingDate);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('package_id', package_id);

    try {
      const response = await axios.post(`${config.url}/cities/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Reset form fields after successful submission
      setname('');
      setCityDetails('');
      setCityImage(null);
      setDay1Description('');
      setDay2Description('');
      setDay3Description('');
      setDay4Description('');
      setDuration('');
      setStartingDate('');
      setEndingDate('');
      setlocation('');
      setprice('');
      setpackage_id('');
      toast.success('City added successfully!');
    } catch (error) {
      toast.error('Error adding city', error);
      alert('Failed to add city. Please try again.');
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
        }}>Add City</h2>
      </div>
      <form onSubmit={handleFormSubmit}>
        <label style={{
          display: 'block',
          marginBottom: 5
        }}>City Name</label>
        <input
          type="text"
          placeholder="ex. Paris"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
          style={{
            width: '100%',
            height: 40,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            marginBottom: '10px'
          }}
        />
        <br />
        <label style={{
          display: 'block',
          marginBottom: 5
        }}>City Details</label>
        <textarea
          placeholder="Add Details"
          value={cityDetails}
          onChange={(e) => setCityDetails(e.target.value)}
          required
          style={{
            width: '100%',
            height: 100,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            marginBottom: '10px'
          }}
        />
        <br />
        <label style={{
          display: 'block',
          marginBottom: 5
        }}>Upload Image</label>
        <input
          type="file"
          onChange={(e) => setCityImage(e.target.files[0])}
          required
          style={{
            width: '100%',
            height: 50,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            marginBottom: '20px'
          }}
        />
        <br />
        <label style={{
          display: 'block',
          marginBottom: 5
        }}>Day 1 Description</label>
        <textarea
          placeholder="Day 1 Description"
          value={day1Description}
          onChange={(e) => setDay1Description(e.target.value)}
          required
          style={{
            width: '100%',
            height: 100,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            marginBottom: '10px'
          }}
        />
        <br />
        <label style={{
          display: 'block',
          marginBottom: 5
        }}>Day 2 Description</label>
        <textarea
          placeholder="Day 2 Description"
          value={day2Description}
          onChange={(e) => setDay2Description(e.target.value)}
          required
          style={{
            width: '100%',
            height: 100,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            marginBottom: '10px'
          }}
        />
        <br />
        <label style={{
          display: 'block',
          marginBottom: 5
        }}>Day 3 Description</label>
        <textarea
          placeholder="Day 3 Description"
          value={day3Description}
          onChange={(e) => setDay3Description(e.target.value)}
          required
          style={{
            width: '100%',
            height: 100,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            marginBottom: '10px'
          }}
        />
        <br />
        <label style={{
          display: 'block',
          marginBottom: 5
        }}>Day 4 Description</label>
        <textarea
          placeholder="Day 4 Description"
          value={day4Description}
          onChange={(e) => setDay4Description(e.target.value)}
          required
          style={{
            width: '100%',
            height: 100,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            marginBottom: '10px'
          }}
        />
        <br />
        <label style={{
          display: 'block',
          marginBottom: 5
        }}>Duration</label>
        <input
          type="text"
          placeholder="e.g., 4 days"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
          style={{
            width: '100%',
            height: 40,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            marginBottom: '10px'
          }}
        />
        <br />
        <label style={{
          display: 'block',
          marginBottom: 5
        }}>Starting Date</label>
        <input
          type="date"
          value={startingDate}
          onChange={(e) => setStartingDate(e.target.value)}
          required
          style={{
            width: '100%',
            height: 40,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            marginBottom: '10px'
          }}
        />
        <br />
        <label style={{
          display: 'block',
          marginBottom: 5
        }}>Ending Date</label>
        <input
          type="date"
          value={endingDate}
          onChange={(e) => setEndingDate(e.target.value)}
          required
          style={{
            width: '100%',
            height: 40,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            marginBottom: '10px'
          }}
        />
        <br />
        <label style={{
          display: 'block',
          marginBottom: 5
        }}>location</label>
        <input
          type="text"
          placeholder="e.g., Paris, Lyon"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
          required
          style={{
            width: '100%',
            height: 40,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            marginBottom: '10px'
          }}
        />
        <br />
        <label style={{
          display: 'block',
          marginBottom: 5
        }}>City Price</label>
        <input
          type="number"
          placeholder="Add Price"
          value={price}
          onChange={(e) => setprice(e.target.value)}
          required
          style={{
            width: '100%',
            height: 40,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            marginBottom: '10px'
          }}
        />
        <br />
        <label style={{
          display: 'block',
          marginBottom: 5
        }}>Package ID</label>
        <input
          type="number"
          placeholder="Add Package ID"
          value={package_id}
          onChange={(e) => setpackage_id(e.target.value)}
          required
          style={{
            width: '100%',
            height: 40,
            padding: 10,
            border: '1px solid #ccc',
            borderRadius: 5,
            marginBottom: '10px'
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
        }}>Add City</button>
      </form>
    </div>
  );
}
