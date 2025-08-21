 import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BookingSummary.css';
import axios from 'axios';
import config from '../config';
import {toast} from 'react-toastify';

// BookingSummary component definition
const BookingSummary = () => {
    const navigate = useNavigate();

   const bookingNo = localStorage.getItem('bookingNo') || 'Not Available';
    const packageName = localStorage.getItem('selectedPackageName') || 'Not Available';
    const cityName = localStorage.getItem('selectedCityName') || 'Not Available';
    const hotelName = localStorage.getItem('hotelName') || 'Not Available';
    const totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
    const noOfPassengers = parseInt(localStorage.getItem('noOfPassengers')) || 0;
    const totalCost = totalPrice * noOfPassengers;

    const handlePayment = async () => {
      try {
          await axios.put(`${config.url}/booking/update-payment-status`, {
              bookingNo,
              paymentStatus: true // Update this according to your payment status
          });
          navigate('/payment-confirmation');
      } catch (error) {
          console.error('Failed to update payment status:', error);
          alert('An error occurred while processing the payment.');
      }
  };

    return (
        <div className="booking-summary">
            <h1 className="summary-title">Booking Summary</h1>
            <div className="summary-details">
                <div className="summary-item">
                    <span className="summary-label">Package Name:</span>
                    <span className="summary-value">{packageName}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">City Name:</span>
                    <span className="summary-value">{cityName}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Hotel Name:</span>
                    <span className="summary-value">{hotelName}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Number of Passengers:</span>
                    <span className="summary-value">{noOfPassengers}</span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Total Cost:</span>
                    <span className="summary-value">₹ {totalCost.toFixed(2)}</span>
                </div>
            </div>
            <button className="go-to-booking-button" onClick={handlePayment}>
               Pay Now
            </button>
        </div>
    );
};

// Exporting the BookingSummary component as the default export
export default BookingSummary;

