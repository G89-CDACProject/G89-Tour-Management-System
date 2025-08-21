import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';

export default function AddPackages() {
  const [packageName, setPackageName] = useState('');
  const [packageDetails, setPackageDetails] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [startingPrice, setStartingPrice] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('packageName', packageName);
    formData.append('packageDetails', packageDetails);
    formData.append('imageFile', imageFile);
    formData.append('startingPrice', startingPrice);

    try {
      const response = await axios.post(`${config.url}/packages/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Reset form fields after successful submission
      setPackageName('');
      setPackageDetails('');
      setImageFile(null);
      setStartingPrice('');
      toast.success('Package added successfully!');
      // Navigate to another page
      navigate('/update-packages');
    } catch (error) {
      toast.error('Error adding package');
      alert('Failed to add package. Please try again.');
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
        }}>Add Packages</h2>
      </div>
      <form onSubmit={handleFormSubmit}>
        <label style={{
          display: 'block',
          marginBottom: 5
        }}>Package Name</label>
        <input
          type="text"
          placeholder="ex. Beach"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
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
        }}>Package Description</label>
        <textarea
          placeholder="Add Description"
          value={packageDetails}
          onChange={(e) => setPackageDetails(e.target.value)}
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
          onChange={(e) => setImageFile(e.target.files[0])}
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
        }}>Package Price</label>
        <input
          type="number"
          placeholder="Add Price"
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
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
        <button
          type="submit"
          style={{
            width: 200,
            height: 40,
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: 5,
            cursor: 'pointer',
            margin: '20px auto',
            display: 'block'
          }}
        >
          Add Package
        </button>
      </form>
    </div>
  );
}
