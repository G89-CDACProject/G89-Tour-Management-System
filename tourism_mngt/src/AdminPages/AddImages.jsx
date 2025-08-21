// @ts-nocheck
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddImages() {
    const pageLocation = useLocation();
    const queryParams = new URLSearchParams(pageLocation.search);
    const cityId = queryParams.get('cityId'); // Get the cityId from the URL
    const [images, setImages] = useState([]); // To store the images being uploaded
    const [errorMessage, setErrorMessage] = useState('');


    // Function to handle the file selection
    const handleImageChange = (e) => {
        setImages([...e.target.files]); // Update the images state with selected files
    };

    const navigate = useNavigate();

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (images.length === 0) {
            setErrorMessage('Please select at least one image to upload.');
            return;
        }
    
        const formData = new FormData();
        formData.append('city_id', cityId);
        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });
    
        try {
            const response = await axios.post('http://localhost:8080/cities/add/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
           
            if (response.status === 202) {
                toast.success('Images added successfully');
                navigate(`/packages/:id`);
            } else {
                throw new Error(`Unexpected response code: ${response.status}`);
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            if (error.response) {
                setErrorMessage(`Failed to upload images: ${error.response.data.message || error.response.data}`);
            } else if (error.request) {
                setErrorMessage('Failed to upload images: No response from server');
            } else {
                setErrorMessage(`Failed to upload images: ${error.message}`);
            }
        }
    };
    
    

    return (
        <div style={{
            maxWidth: '400px',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h2 style={{
                color: '#333',
                marginBottom: '20px',
                fontSize: '24px',
                textAlign: 'center'
            }}>Upload Images for City ID: {cityId}</h2>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
            }}>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    style={{
                        marginBottom: '15px',
                        padding: '10px',
                        border: '2px solid #ddd',
                        borderRadius: '5px',
                        fontSize: '16px',
                        width: '100%'
                    }}
                />
                <button type="submit" style={{
                    backgroundColor: '#4CAF50',
                    color: '#fff',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                }}>Upload Images</button>
                {errorMessage && <p style={{
                    color: 'red',
                    marginTop: '10px',
                    fontSize: '14px'
                }}>{errorMessage}</p>}
            </form>
        </div>
    );
}