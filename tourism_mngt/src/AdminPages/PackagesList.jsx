import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '../pages/home.css';
import Navbar from "../components/Navbar";
import CityCardsAdmin from "../components/CityCardsAdmin";
import { Link } from "react-router-dom";

const PackagesList = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <div>

            

            <CityCardsAdmin />

            <div className="container-fluid mb-5" style={{ marginLeft: '680px' }}>
                <button className="btn btn-info">
                    <Link to="/add-packages" className="nav-link" style={{ textDecoration: 'none' }}>
                        Add Packages
                    </Link>
                </button>
            </div>

        </div>
    );
};

export default PackagesList;
