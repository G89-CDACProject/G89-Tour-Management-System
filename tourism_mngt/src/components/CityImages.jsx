import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import config from '../config';
import './CityImages.css';

const CityImages = () => {
    const { cityId } = useParams();
    const [images, setImages] = useState([]);
    const [newImage, setNewImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${config.url}/cities/${cityId}/images`);
                setImages(response.data);
            } catch (error) {
                setError('Failed to fetch images');
            }
        };

        fetchImages();
    }, [cityId]);

    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('image', newImage);

            const response = await axios.post(`${config.url}/cities/add/images`, formData);
            setImages([...images, response.data]);
            setNewImage(null);
        } catch (error) {
            setError('Failed to upload image');
        }
    };

    const handleImageDelete = async (imageId) => {
        try {
            await axios.delete(`${config.url}/cities/${cityId}/images/${imageId}`);
            setImages(images.filter((image) => image.id !== imageId));
        } catch (error) {
            setError('Failed to delete image');
        }
    };

    return (
        <div className="city-images-container">
            <h2>City Images</h2>
            <div className="image-grid">
                {images.map((image) => (
                    <div key={image.id} className="image-item">
                        <img src={`${config.url}${image.imagePath}`} alt={image.alt} />
                        <button className="delete-button" onClick={() => handleImageDelete(image.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <div className="upload-image-container">
                <input type="file" onChange={handleImageChange} />
                <button className="upload-button" onClick={handleImageUpload}>Upload Image</button>
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default CityImages;