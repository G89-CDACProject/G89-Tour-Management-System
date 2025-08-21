import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentConfirmation.css';

const PaymentConfirmation = () => {
    const navigate = useNavigate();

    const goToHomePage = () => {
        navigate('/');
    };

    return (
        <div className="payment-confirmation">
            <div className="confirmation-card">
                <h1 className="confirmation-title">Payment Successful</h1>
                <p className="confirmation-message">
                    Thank you for your payment. Your transaction has been completed successfully.
                </p>
                <div className="confirmation-buttons">
                    <button className="confirmation-button" onClick={goToHomePage}>
                        Go to Home Page
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmation;
