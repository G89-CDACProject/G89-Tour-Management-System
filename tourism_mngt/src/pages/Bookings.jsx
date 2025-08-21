// import React from 'react'
// import BookingTable from '../components/BookingTable'
// import AllBookingTable from '../components/AllBookingTable'

// export default function Bookings() {
//   return (
//     <div>
//       <BookingTable/>
//       <AllBookingTable/>
//     </div>
//   )
// }

import React from 'react';
import BookingTable from '../components/BookingTable';
import AllBookingTable from '../components/AllBookingTable';
import { jwtDecode } from 'jwt-decode';

export default function Bookings() {
    // Replace with your actual role-checking logic
    const userRole = localStorage.getItem('roles'); // Assuming you store the user's role in localStorage
    const token = localStorage.getItem('token');
    const decodeToken = jwtDecode(token);
    console.log(); 

    return (
        <div>
            {decodeToken.authorities === 'ADMIN' ? <AllBookingTable /> : <BookingTable />}
        </div>
    );
}
