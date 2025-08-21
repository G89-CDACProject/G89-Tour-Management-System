
// import React, { useState,useEffect } from 'react';

// import { Link, useNavigate } from "react-router-dom";
// import logo from '../Images/ShubhYatra-removebg-preview.png';
// import axios from 'axios';
// import config from '../config';
// import { toast } from 'react-toastify';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';

// const Navbar = () => {
//     const [showLoginModal, setShowLoginModal] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [userEmail, setUserEmail] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const navigate = useNavigate();

//     useEffect(() => {
//         // Check if there's a token stored in localStorage
//         const token = localStorage.getItem('token');
        
//         // Retrieve the stored email from localStorage
//         const storedEmail = localStorage.getItem('userEmail');
    
//         // If both token and storedEmail exist, consider the user as logged in
//         if (token && storedEmail) {
//             // Update the state to reflect that the user is logged in
//             setIsLoggedIn(true);
    
//             // Update the state with the stored email
//             setUserEmail(storedEmail);
//         }
//     }, []);  // Empty dependency array ensures this effect runs only once, on component mount
    

//     const handleLogout = () => {
//         // Remove the authentication token from localStorage
//         localStorage.removeItem('token');
        
//         // Remove the user's roles from localStorage
//         localStorage.removeItem('roles');
        
//         // Remove the user's email from localStorage
//         localStorage.removeItem('userEmail');
//         localStorage.removeItem('totalCost');	
//         localStorage.removeItem('bookingNo')
//         localStorage.removeItem('selectedPackageName')
//         localStorage.removeItem('hotelName')
//         localStorage.removeItem('selectedCityName')
//         localStorage.removeItem('noOfPassengers')	
//         localStorage.removeItem('totalPrice')
    
//         setIsLoggedIn(false);

//         // Clear the user email state
//         setUserEmail("");

//         // Navigate the user back to the home page (or landing page)
//         navigate('/');
//     };


//     const handleLogin = async () => {
//         try {
//             // Send a POST request to the login endpoint with the user's email and password
//             const response = await axios.post(`${config.url}/user/login`, {
//                 email,
//                 password
//             });
    
//             // Destructure the token and roles from the response data
//             const { token, roles } = response.data;
    
//             // Store the token in localStorage for authentication purposes
//             localStorage.setItem('token', token);
            
//             // Store the user's roles in localStorage, converting the roles array to a JSON string
//             localStorage.setItem('roles', JSON.stringify(roles));
            
//             // Store the user's email in localStorage
//             localStorage.setItem('userEmail', email);
            
//             // Display a success message to the user
//             toast.success('Login successful!');
            

//             setUserEmail(email);
            
//             // Update the state to reflect that the user is logged in
//             setIsLoggedIn(true);
    
//             // Navigate to the admin dashboard if the user has an ADMIN role
//             if (roles.includes('ADMIN')) {
//                 navigate('/admin-dashboard');
//             } else if (roles.includes('USER')) {
//                 navigate('/');
//             } 
//             // Log an error message if the role is unknown
//             else {
//                 console.log('Unknown role:', roles);
//             }
    
//         } catch (error) {
//             // Display an error message if the login fails
//             toast.error('Login failed. Please check your email and password.');
//         }
//     };
    

//     const handleForgotPassword = () => {
//         setShowLoginModal(false);
//         navigate('/forgot-password');
//     };

//     return (
//         <div>
//             <header>
//                 <nav className="navbar navbar-expand-lg navbar-dark" style={{ height: '70px', backgroundColor: 'black', boxShadow: '2px 1px 5px 5px rgba(0, 0, 0, 0.521)' }}>
//                     <a className="navbar-brand d-flex align-items-center">
//                     <Link to="/">
//       <img src={logo} alt="Company Logo" style={{ width: '150px', height: 'auto' }} />
//     </Link>
//                     </a>

//                     <div className="collapse navbar-collapse" id="navbarNavDropdown">
//                         <ul className="navbar-nav mr-auto">
//                             <li className="nav-item">
//                             <Link to="/" className="nav-link" style={{ textDecoration: 'none' }}>
//                                     Home
//                                 </Link>
//                             </li>

//                             <li className="nav-item">
//                                 <Link to="/contact-us" className="nav-link" style={{ textDecoration: 'none' }}>
//                                     Contact Us
//                                 </Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link to="/about-us" className="nav-link" style={{ textDecoration: 'none' }}>
//                                     About Us
//                                 </Link>
//                             </li>
//                             <li className="nav-item">
//                                 <Link to="/bookings" className="nav-link" style={{ textDecoration: 'none' }}>
//                                     Bookings
//                                 </Link>
//                             </li>
//                             &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;
//                             &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;
//                             &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;
//                             &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;
//                             &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;
//                             &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;
//                             &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;
//                             &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;
//                             &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;
//                             &#160; &#160; &#160; &#160; &#160; &#160; &#160; &#160;
                            
                    
//                         </ul>
//                         <ul className="navbar-nav ml-auto">
//                             {isLoggedIn ? (
//                                 <> 
//                                     <li className="nav-item">
//                                         <span className="nav-link" style={{ textDecoration: 'none' }}>
//                                             <FontAwesomeIcon icon={faUser} /> Hello, {userEmail}
//                                         </span>
//                                     </li>
//                                     <li className="nav-item">
                          
//                                         <button type="button" className="nav-link btn btn-link" onClick={handleLogout} style={{ textDecoration: 'none' }}>

//                                             Logout
//                                         </button>
//                                     </li>
//                                 </>
//                             ) : (
//                                 <>
//                                     <li className="nav-item">
//                                         <a
//                                             className="nav-link"
//                                             id="navbarDropdownMenuLink"
//                                             role="button"
//                                             onClick={() => setShowLoginModal(true)}
//                                             style={{ textDecoration: 'none' }}
//                                         >
//                                             Login
//                                         </a>
//                                     </li>
//                                     <li className="nav-item">
//                                         <Link to="/Register" className="nav-link" style={{ textDecoration: 'none' }}>
//                                             Sign Up
//                                         </Link>
//                                     </li>
//                                 </>
//                             )}
//                         </ul>
//                     </div>
//                 </nav>
//             </header>

//             {/* Login Modal */}
//             {showLoginModal && (
//                 <div className="modal show" style={{
//                     display: 'block',
//                     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                     transition: 'background-color 0.3s ease-in-out'
//                 }}>
//                     <div className="modal-dialog modal-dialog-centered" style={{
//                         maxWidth: '450px',
//                         margin: 'auto',
//                         transition: 'transform 0.3s ease-in-out',
//                         transform: 'scale(1)'
//                     }}>
//                         <div className="modal-content" style={{
//                             borderRadius: '12px',
//                             boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
//                             padding: '25px',
//                             backgroundColor: '#fff',
//                             transition: 'all 0.3s ease-in-out'
//                         }}>
//                             <div className="modal-header" style={{
//                                 borderBottom: 'none',
//                                 padding: '0',
//                                 marginBottom: '20px',
//                                 display: 'flex',
//                                 justifyContent: 'center'
//                             }}>
//                                 <h5 className="modal-title" style={{
//                                     fontSize: '26px',
//                                     fontWeight: 'bold',
//                                     color: '#444'
//                                 }}>Login</h5>
//                             </div>
//                             <div className="modal-body">
//                                 <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
//                                     <div className="form-group" style={{ marginBottom: '20px' }}>
//                                         <label htmlFor="email" style={{
//                                             fontSize: '18px',
//                                             marginBottom: '5px',
//                                             color: '#666'
//                                         }}>Email address</label>
//                                         <input
//                                             type="email"
//                                             className="form-control"
//                                             id="email"
//                                             placeholder="Enter email"
//                                             value={email}
//                                             onChange={(e) => setEmail(e.target.value)}
//                                             style={{
//                                                 height: '45px',
//                                                 fontSize: '16px',
//                                                 padding: '10px',
//                                                 borderColor: '#ccc',
//                                                 borderRadius: '5px'
//                                             }}
//                                         />
//                                     </div>
//                                     <div className="form-group">
//                                         <label htmlFor="password" style={{
//                                             fontSize: '18px',
//                                             marginBottom: '5px',
//                                             color: '#666'
//                                         }}>Password</label>
//                                         <input
//                                             type="password"
//                                             className="form-control"
//                                             id="password"
//                                             placeholder="Password"
//                                             value={password}
//                                             onChange={(e) => setPassword(e.target.value)}
//                                             style={{
//                                                 height: '45px',
//                                                 fontSize: '16px',
//                                                 padding: '10px',
//                                                 borderColor: '#ccc',
//                                                 borderRadius: '5px'
//                                             }}
//                                         />
//                                     </div>
//                                     <div className="modal-footer" style={{
//                                         borderTop: 'none',
//                                         padding: '0',
//                                         display: 'flex',
//                                         justifyContent: 'space-between',
//                                         alignItems: 'center'
//                                     }}>
//                                         <div>
//                                             <br />
//                                             <button onClick={() => { handleLogin(); setShowLoginModal(false); }} type="button" className="btn btn-primary" style={{
//                                                 width: '110px',
//                                                 height: '45px',
//                                                 fontSize: '16px',
//                                                 padding: '0',
//                                                 marginRight: '10px',
//                                                 backgroundColor: '#337ab7',
//                                                 borderColor: '#337ab7',
//                                                 borderRadius: '5px',
//                                                 transition: 'background-color 0.3s ease'
//                                             }}>Login</button>
//                                             <button type="button" className="btn btn-danger" onClick={() => setShowLoginModal(false)} style={{
//                                                 width: '110px',
//                                                 height: '45px',
//                                                 fontSize: '16px',
//                                                 padding: '0',
//                                                 backgroundColor: '#d9534f',
//                                                 borderColor: '#d9534f',
//                                                 borderRadius: '5px',
//                                                 transition: 'background-color 0.3s ease'
//                                             }}>Close</button>
//                                             &nbsp; &nbsp;
//                                             <Link to="/forgot-password" style={{
//                                                 textDecoration: 'none',
//                                                 fontSize: '14px',
//                                                 color: '#337ab7'
//                                             }} onClick={handleForgotPassword}>Forgot Password?</Link>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Navbar;








import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../Images/ShubhYatra-removebg-preview.png';
import axios from 'axios';
import config from '../config';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roles, setRoles] = useState([]); // ✅ Added roles state

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedEmail = localStorage.getItem('userEmail');
        const storedRoles = JSON.parse(localStorage.getItem('roles') || '[]'); // ✅ Get roles from localStorage

        if (token && storedEmail) {
            setIsLoggedIn(true);
            setUserEmail(storedEmail);
            setRoles(storedRoles); // ✅ Set roles state
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('totalCost');	
        localStorage.removeItem('bookingNo');
        localStorage.removeItem('selectedPackageName');
        localStorage.removeItem('hotelName');
        localStorage.removeItem('selectedCityName');
        localStorage.removeItem('noOfPassengers');	
        localStorage.removeItem('totalPrice');

        setIsLoggedIn(false);
        setUserEmail("");
        setRoles([]); // ✅ Clear roles state
        navigate('/');
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${config.url}/user/login`, {
                email,
                password
            });

            const { token, roles } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('roles', JSON.stringify(roles));
            localStorage.setItem('userEmail', email);

            toast.success('Login successful!');
            setUserEmail(email);
            setRoles(roles); // ✅ Set roles after login
            setIsLoggedIn(true);

            if (roles.includes('ADMIN')) {
                navigate('/admin-dashboard');
            } else if (roles.includes('USER')) {
                navigate('/');
            } else {
                console.log('Unknown role:', roles);
            }

        } catch (error) {
            toast.error('Login failed. Please check your email and password.');
        }
    };

    const handleForgotPassword = () => {
        setShowLoginModal(false);
        navigate('/forgot-password');
    };

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark" style={{ height: '70px', backgroundColor: 'black', boxShadow: '2px 1px 5px 5px rgba(0, 0, 0, 0.521)' }}>
                    <a className="navbar-brand d-flex align-items-center">
                        <Link to="/">
                            <img src={logo} alt="Company Logo" style={{ width: '150px', height: 'auto' }} />
                        </Link>
                    </a>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                       {/* <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" style={{ textDecoration: 'none' }}>
                                    Home
                                </Link>
                            </li>

                            // ✅ Conditionally show Admin Dashboard 
                            {roles.includes('ADMIN') && (
                                <li className="nav-item">
                                    <Link to="/admin-dashboard" className="nav-link" style={{ textDecoration: 'none' }}>
                                        Admin Dashboard
                                    </Link>
                                </li>
                            )}

                            <li className="nav-item">
                                <Link to="/contact-us" className="nav-link" style={{ textDecoration: 'none' }}>
                                    Contact Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about-us" className="nav-link" style={{ textDecoration: 'none' }}>
                                    About Us
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/bookings" className="nav-link" style={{ textDecoration: 'none' }}>
                                    Bookings
                                </Link>
                            </li>
                        </ul>*/}



                        <ul className="navbar-nav me-auto">  {/* Bootstrap 5: use 'me-auto' instead of 'mr-auto' */}
  <li className="nav-item">
    <Link to="/" className="nav-link" style={{ textDecoration: 'none' }}>Home</Link>
  </li>

  {roles.includes('ADMIN') && (
    <li className="nav-item">
      <Link to="/admin-dashboard" className="nav-link" style={{ textDecoration: 'none' }}>
        Admin Dashboard
      </Link>
    </li>
  )}

  <li className="nav-item">
    <Link to="/contact-us" className="nav-link" style={{ textDecoration: 'none' }}>Contact Us</Link>
  </li>
  <li className="nav-item">
    <Link to="/about-us" className="nav-link" style={{ textDecoration: 'none' }}>About Us</Link>
  </li>
  <li className="nav-item">
    <Link to="/bookings" className="nav-link" style={{ textDecoration: 'none' }}>Bookings</Link>
  </li>
</ul>



                        <ul className="navbar-nav ml-auto">
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item">
                                        <span className="nav-link" style={{ textDecoration: 'none' }}>
                                            <FontAwesomeIcon icon={faUser} /> Hello, {userEmail}
                                        </span>
                                    </li>
                                    <li className="nav-item">
                                        <button type="button" className="nav-link btn btn-link" onClick={handleLogout} style={{ textDecoration: 'none' }}>
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" role="button" onClick={() => setShowLoginModal(true)} style={{ textDecoration: 'none' }}>
                                            Login
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/Register" className="nav-link" style={{ textDecoration: 'none' }}>
                                            Sign Up
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </nav>
            </header>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="modal show" style={{
                    display: 'block',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    transition: 'background-color 0.3s ease-in-out'
                }}>
                    <div className="modal-dialog modal-dialog-centered" style={{
                        maxWidth: '450px',
                        margin: 'auto',
                        transition: 'transform 0.3s ease-in-out',
                        transform: 'scale(1)'
                    }}>
                        <div className="modal-content" style={{
                            borderRadius: '12px',
                            boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
                            padding: '25px',
                            backgroundColor: '#fff',
                            transition: 'all 0.3s ease-in-out'
                        }}>
                            <div className="modal-header" style={{
                                borderBottom: 'none',
                                padding: '0',
                                marginBottom: '20px',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <h5 className="modal-title" style={{
                                    fontSize: '26px',
                                    fontWeight: 'bold',
                                    color: '#444'
                                }}>Login</h5>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                                    <div className="form-group" style={{ marginBottom: '20px' }}>
                                        <label htmlFor="email" style={{
                                            fontSize: '18px',
                                            marginBottom: '5px',
                                            color: '#666'
                                        }}>Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            style={{
                                                height: '45px',
                                                fontSize: '16px',
                                                padding: '10px',
                                                borderColor: '#ccc',
                                                borderRadius: '5px'
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" style={{
                                            fontSize: '18px',
                                            marginBottom: '5px',
                                            color: '#666'
                                        }}>Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{
                                                height: '45px',
                                                fontSize: '16px',
                                                padding: '10px',
                                                borderColor: '#ccc',
                                                borderRadius: '5px'
                                            }}
                                        />
                                    </div>
                                    <div className="modal-footer" style={{
                                        borderTop: 'none',
                                        padding: '0',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            <br />
                                            <button onClick={() => { handleLogin(); setShowLoginModal(false); }} type="button" className="btn btn-primary" style={{
                                                width: '110px',
                                                height: '45px',
                                                fontSize: '16px',
                                                marginRight: '10px'
                                            }}>Login</button>
                                            <button type="button" className="btn btn-danger" onClick={() => setShowLoginModal(false)} style={{
                                                width: '110px',
                                                height: '45px',
                                                fontSize: '16px'
                                            }}>Close</button>
                                            &nbsp; &nbsp;
                                            <Link to="/forgot-password" style={{
                                                textDecoration: 'none',
                                                fontSize: '14px',
                                                color: '#337ab7'
                                            }} onClick={handleForgotPassword}>Forgot Password?</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
