// Importing React library and necessary hooks from React Redux and React Router DOM
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'; // Ensure you have react-router-dom installed
import { updateBookingField } from '../redux/bookingSlice'; // Importing the action to update booking field in Redux store

// BookingForm component definition
const BookingForm = () => {
  // Access the booking data from the Redux store
  const bookingData = useSelector((state) => state.booking);
  // Initialize dispatch function to send actions to the Redux store
  const dispatch = useDispatch();
  // Initialize history object to navigate programmatically
  const history = useHistory();

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target
    // Dispatch action to update the specific field in booking data
    dispatch(updateBookingField({ field: name, value }));
  };

  // Function to handle booking submission
  const handleBookingSubmission = (bookingData) => {
    // Send POST request to the API with booking data
    fetch('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData), // Convert booking data to JSON
      headers: { 'Content-Type': 'application/json' }, // Set the request headers
    })
      .then((response) => response.json()) // Convert response to JSON
      .then((data) => {
        // Save booking details to Redux store or state
        dispatch(updateBookingField({ field: 'bookingDetails', value: data }));

        // Redirect to booking summary page
        history.push('/booking-summary');
      });
  };

  // Handle form submission event
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleBookingSubmission(bookingData); // Submit the booking data
  };

  return (
    // Form element with submission handler
    <form onSubmit={handleSubmit}>
      {/* <div> */}
        {/* <label>Booking No:</label>
        <input
          type="text"
          name="bookingNo"
          value={bookingData.bookingNo}
          onChange={handleChange}
          required
        />
      </div> */}

      <div>
        <label>Package Name:</label>
        <input
          type="text"
          name="packageName"
          value={bookingData.packageName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        {/* City name input field */}
        <label>City Name:</label>
        <input
          type="text"
          name="cityName"
          value={bookingData.cityName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        {/* Number of passengers input field */}
        <label>No. of Passengers:</label>
        <input
          type="number"
          name="noOfPassengers"
          value={bookingData.noOfPassengers}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        {/* Total cost input field */}
        <label>Total Cost:</label>
        <input
          type="number"
          step="0.01"
          name="totalCost"
          value={bookingData.totalCost}
          onChange={handleChange}
          required
        />
      </div>

      {/* Submit button for the form */}
      <button type="submit">Submit Booking</button>
    </form>
  );
};

// Exporting the BookingForm component as the default export
export default BookingForm;
