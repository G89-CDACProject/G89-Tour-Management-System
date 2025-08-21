import React, { useEffect, useState } from 'react';
import config from "../config";
import axios from "axios";

const AllBookingTable = () => {
    const [booking, setBooking] = useState([]);

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`${config.url}/booking/all-bookings`);
            console.log(response.data);
            setBooking(response.data);
        } catch (error) {
            console.log("Error in fetching details: " + error);
        }
    }

    useEffect(() => {
        fetchBookings();
    }, []);

    const tableStyles = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    };

    const thStyles = {
        padding: '12px 15px',
        textAlign: 'left',
        backgroundColor: '#343a40',
        color: '#fff',
    };

    const tdStyles = {
        padding: '12px 15px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    };

    const trHoverStyles = {
        backgroundColor: '#f1f1f1',
    };

    const headerStyle = {
        marginBottom: '20px',
        color: '#343a40',
        textAlign: 'center',
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={headerStyle}> All Booking Details</h2>
            <table style={tableStyles}>
                <thead>
                    <tr>
                        <th style={thStyles}>#</th>
                        <th style={thStyles}>Booking No</th>
                        <th style={thStyles}>City Name</th>
                        <th style={thStyles}>Payment Status</th>
                        <th style={thStyles}>No. of Passengers</th>
                        <th style={thStyles}>Package Name</th>
                        <th style={thStyles}>Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(booking) && booking.length > 0 ? (
                        booking.map((bkg, index) => (
                            <tr key={bkg.id} style={{ ...tdStyles, ...trHoverStyles }}>
                                <td style={tdStyles}>{index + 1}</td>
                                <td style={tdStyles}>{bkg.bookingNo}</td>
                                <td style={tdStyles}>{bkg.cityName}</td>
                                <td style={tdStyles}>{bkg.bookingStatus ? "Paid" : "Unpaid"}</td>
                                <td style={tdStyles}>{bkg.noOfPassengers}</td>
                                <td style={tdStyles}>{bkg.packageName}</td>
                                <td style={tdStyles}>&#8377; {bkg.totalCost.toFixed(2)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" style={tdStyles}>No bookings found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AllBookingTable;
