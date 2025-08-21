import React from 'react';
import { useNavigate } from 'react-router-dom';

function ContactUs() {
    const handleSubmit = () => {
        console.log('Form submitted');
    };

    const navigate = useNavigate();
    const onRequestCall = () => {
        navigate('/');
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            flexDirection: 'column',
            textAlign: 'center',
            backgroundImage: `url('https://images.unsplash.com/photo-1528747045269-390fe33c19f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className="container mt-5">
                <div className="row mb-4">
                    <div className="col-md-12">
                        <h2 className="text-white mb-3" style={{ fontWeight: 'bold', fontSize: '2.5rem' }}>CONTACT US</h2>
                        <p className="text-light lead">
                            Have any questions? We'd love to hear from you. Reach out to us and we'll get back to you as soon as possible.
                        </p>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-6">
                        <div className="card bg-light shadow-sm mb-4" style={{ maxHeight: '200px', overflow: 'auto' }}>
                            <div className="card-body">
                                <h5 className="card-title" style={{ fontWeight: 'bold' }}>Contact-Us Today</h5>
                                <p className="card-text">
                                    We're here to help you with any inquiries or concerns you may have. Please reach out to us through the information below.
                                </p>
                            </div>
                        </div>
                        <div className="card bg-light shadow-sm" style={{ maxHeight: '200px', overflow: 'auto' }}>
                            <div className="card-body">
                                <h5 className="card-title" style={{ fontWeight: 'bold' }}>Contact Information</h5>
                                <ul className="list-unstyled">
                                    <li>
                                        Email: 
                                        <a href="mailto:shubhyatra@gmail.com" className="text-decoration-none"> shubhyatra@gmail.com</a>
                                    </li>
                                    <li>
                                        Phone:   
                                        <a href="tel:+123987456" className="text-decoration-none"> + 91 907 857 556</a>
                                    </li>
                                    <li>
                                        Address: 
                                        <a href="https://www.google.com/maps?q=Hinjewadi,+Pune,+India" target="_blank" rel="noopener noreferrer" className="text-decoration-none"> Akurdi, Pune, India</a>
                                    </li>
                                </ul> 
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 d-flex align-items-center">
                        <div className="card bg-light shadow-sm mx-auto" style={{ maxWidth: '800px', maxHeight: '400px', overflow: 'auto' }}>
                            <div className="card-body">
                                <h4 className="text-black mb-4" style={{ fontWeight: 'bold' }}>Want us to call you?</h4>
                                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} style={{ width: '100%' }}>
                                    <div className="form-group mb-3 text-start">
                                        <label htmlFor="name" className="form-label">Name:</label>
                                        <input type="text" id="name" className="form-control" placeholder="Enter your name" required />
                                    </div>
                                    <div className="form-group mb-3 text-start">
                                        <label htmlFor="phone" className="form-label">MobNo:</label>
                                        <input type="text" id="phone" className="form-control" placeholder="Enter your mobile no" required />
                                    </div>
                                    <div className="form-group mb-3 text-start">
                                        <label htmlFor="email" className="form-label">Email:</label>
                                        <input type="email" id="email" className="form-control" placeholder="Enter your email" required />
                                    </div>
                                    <button type="submit" className="btn btn-primary" onClick={onRequestCall}>Request Call</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;
