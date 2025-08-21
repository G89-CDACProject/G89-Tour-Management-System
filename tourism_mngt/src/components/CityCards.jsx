
import React from "react";
import { useNavigate } from "react-router-dom";
               
const CityCards = ({ Cities }) => {
    
    const navigate = useNavigate();

    const handleOnCardClick = (city) => {
        localStorage.setItem('selectedPackageName', city.packageName);
        navigate(`/packages/${city.id}`);
    };
    
    return (
        <div className="card-group card-group-scroll">
            {Cities.map((city) => (
                <div key={city.id} className="col-md-3 mb-3" onClick={() => handleOnCardClick(city)}>
                    <div className="card">
                        <img
                            src={`data:image/jpeg;base64,${city.image}`}
                            className="card-img-top"
                            alt={city.packageName}
                        />
                        <div className="card-body">
                            <h5 className="card-title">
                                <b>{city.packageName}</b>
                            </h5>
                            <hr />
                            <p className="card-text">{city.packageDetails}</p>
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">
                                starting at &#8377; {city.startingPrice}
                            </small>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CityCards;
