import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './home.css';
import CityCards from "../components/CityCards";
import Navbar from "../components/Navbar";
import axios from "axios";
import config from "../config";

const Home = () => {
  const [Cities, setCities] = useState([])

    useEffect(()=>{
        const fetchCities = async()=>{
           try{
            const response = await axios.get(`${config.url}/`)
            console.log(response.data)
            setCities(response.data)
           }catch(error){
            console.error("Error fetching cities", error)
           }
        }
        fetchCities()
    }, []);

  return (
    <div>

      {/* Main Content */}
      <main className="container"
        style={{
          height: "650px",
          backgroundImage: 'url("https://wallpaper.dog/large/10732936.jpg")',
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "100%"
        }}>
           
        {/* Anim Text */}
        <div className="container22"  >
          <span className="mytext1">Welcome to Yatra </span>
          <div className="hidden visible">
            <span className="mytext2"> Enjoy Your Holiday  </span>
          </div>
        </div>
         
        <div className="additional-text">
          <span className="left-text" >24*7 Service</span>
          <span className="right-text" >4.5 Star Customer Rating</span>
        </div>
      </main>

      <CityCards Cities={Cities} />


    </div>
  );
};

export default Home;
