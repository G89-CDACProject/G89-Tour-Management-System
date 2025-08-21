import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CityCardsAdmin = () => {
    const [cities, setCities] = useState([]);
    const[isDeleted,setIsDeleted] =useState(false);
    const [editingCity, setEditingCity] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [updatedCity, setUpdatedCity] = useState({
        packageName: '',
        packageDetails: '',
        startingPrice: ''
    });
    const fetchCities = async () => {
        try {
            const response = await axios.get(`${config.url}/`);
            if (response.data !== cities) {
                setCities(response.data);
            }
        } catch (error) {
            console.error("Error fetching cities", error);
        }
    };
    useEffect(() => {
        fetchCities();
    }, []); // Re-fetch cities when refresh state changes
    useEffect(()=>{
        fetchCities()
    },[isDeleted])
    const handleUpdate = (city) => {
        setEditingCity(city.id);
        setUpdatedCity({
            packageName: city.packageName, // Pre-fill with existing data
            packageDetails: city.packageDetails,
            startingPrice: city.startingPrice
        });
    };

    const saveUpdatedCity = async (id) => {
        try {
            await axios.put(`${config.url}/packages/update/${id}`, updatedCity);
            toast.success("Package details updated successfully");
            setEditingCity(null); // Close the editing mode
            setRefresh(prev => !prev); // Toggle `refresh` to force re-fetch
            setCities([]); // Trigger re-fetch
        } catch (error) {
            console.error("Error updating city", error);
        }
    };

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure to delete package?")){
        try {
           const response =  await axios.delete(`${config.url}/packages/${id}`);
           if(response!=null){
            toast.success("Package deleted successfully");
            setIsDeleted(true);
            setCities([]);
            } // Reset the cities state to trigger re-fetch
        } catch (error) {
            console.error("Error deleting city", error);
        }
    }
    };

    // const handleDelete = async (id) => {
    //     if(window.confirm("Are you sure to delete package?")){
    //     try {
    //        const response =  await axios.delete(${config.url}/packages/${id});
    //        if(response!=null){
    //         console.log("sffssf")
    //         toast.success("Deleted city with id:", id);
    //         setIsDeleted(true);
    //         setCities([]);
    //         } // Reset the cities state to trigger re-fetch
    //     } catch (error) {
    //         console.error("Error deleting city", error);
    //     }
    // }
    // };

    const navigate = useNavigate();
    const handleOnCardClick=(id)=>{
        navigate(`/packages/${id}`);
    }

    return (
        <div className="card-group card-group-scroll">
            {cities.map((city, id) => (
                <div key={id} className="col-md-3 mb-3"  >
                    <div className="card" >  
                        <img src={`data:image/jpeg;base64,${city.image}`} className="card-img-top" alt={city.packageName} onClick={()=>handleOnCardClick(city.id)} />
                        <div className="card-body">
                            {editingCity === city.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={updatedCity.packageName}
                                        onChange={(e) => setUpdatedCity({ ...updatedCity, packageName: e.target.value })}
                                        placeholder="Package Name"
                                        className="form-control mb-2"
                                    />
                                    <textarea
                                        value={updatedCity.packageDetails}
                                        onChange={(e) => setUpdatedCity({ ...updatedCity, packageDetails: e.target.value })}
                                        placeholder="Package Details"
                                        className="form-control mb-2"
                                    />
                                    <input
                                        type="number"
                                        value={updatedCity.startingPrice}
                                        onChange={(e) => setUpdatedCity({ ...updatedCity, startingPrice: e.target.value })}
                                        placeholder="Starting Price"
                                        className="form-control mb-2"
                                    />
                                    <div className="d-flex justify-content-between">
                                        <button className="btn btn-success btn-sm" onClick={() => saveUpdatedCity(city.id)}>Save</button>
                                        <button className="btn btn-secondary btn-sm" onClick={() => setEditingCity(null)}>Cancel</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h5 className="card-title"><b>{city.packageName}</b></h5>
                                    <hr />
                                    <p className="card-text">{city.packageDetails}</p>
                                </>
                            )}
                        </div>
                        <div className="card-footer">
                            <small className="text-muted">Starting at &#8377; {city.startingPrice}</small>
                            <div className="d-flex justify-content-center mt-2 gap-2">
                                <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(city)}>Update</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(city.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CityCardsAdmin;
