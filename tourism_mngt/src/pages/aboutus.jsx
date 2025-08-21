import React from 'react';
import banaras from '../Images/banaras.jpg';
import beachbackside from '../Images/beachbackside.jpg';

function AboutUs() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    minWidth: '100%',
    minHeight: '100%',
    backgroundImage: `url(${beachbackside})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    padding: '40px 20px',
    boxSizing: 'border-box',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    position: 'relative',
    // No background color or image, ensures only the background image is visible
    background: 'none',
  };

  const sectionStyle = {
    flex: 1,
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Changed to flex-start
    color: 'black',
    boxSizing: 'border-box',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    margin: '10px',
    maxWidth: '800px',
    height: 'auto', // Adjust height as needed
    textAlign: 'left', // Changed to left
  };

  const imagesStyle = {
    flex: 1,
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Changed to flex-start
    color: 'black',
    boxSizing: 'border-box',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    margin: '10px',
    maxWidth: '700px',
    textAlign: 'left', // Changed to left
  };

  const imageRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginBottom: '20px',
    gap: '18px', // Adjust gap for smaller images
  };

  const imageStyle = {
    margin: '5px',
    maxWidth: '30%', // Reduced size of images
    height: '110px', // Adjust height as needed
    borderRadius: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  };

  const headingStyle = {
    fontSize: '36px',
    margin: '20px 0',
    fontWeight: 'bold',
    color: '#333',
    // Ensures no background is applied to heading
    background: 'none',
  };

  const subHeadingStyle = {
    fontSize: '24px',
    margin: '10px 0',
    fontWeight: 'bold',
    color: '#555',
  };

  const paragraphStyle = {
    fontSize: '17px',
    lineHeight: '1.6',
    margin: '10px 0',
    color: '#666',
  };

  const mediaQueries = `
    @media (max-width: 1024px) {
      .container {
        flex-direction: column;
      }

      .section, .images {
        padding: 15px;
        align-items: center;
      }

      .image-row {
        flex-direction: column;
        align-items: center;
      }

      .image-row img {
        max-width: 80%;
      }
    }

    @media (max-width: 768px) {
      .section {
        padding: 10px;
      }

      .images {
        padding: 10px;
      }

      .image-row {
        margin-bottom: 10px;
      }

      .image-row img {
        max-width: 80%;
      }
    }

    @media (max-width: 480px) {
      .section {
        padding: 5px;
      }

      .images {
        padding: 5px;
      }

      .image-row img {
        max-width: 100%;
      }
    }
  `;

  return (
    <div>
      <style>{mediaQueries}</style>
      <div style={headerStyle}>
        <h2 style={headingStyle}>About Us</h2>
      </div>
      <div className="container" style={containerStyle}>
        <div className="section" style={sectionStyle}>
          <br />
          <br />
          <h4 style={subHeadingStyle}>Why Travel with us</h4>
          <p style={paragraphStyle}>
            we are passionate about creating unforgettable travel experiences. With a commitment to
            excellence and a deep understanding of our customers’ needs, we strive to be your trusted partner in
            exploring the world. Whether you’re dreaming of a luxurious getaway, an adventurous expedition, or a
            culturally enriching journey, we are here to turn your travel aspirations into reality.
          </p>
          <br />
          <h4 style={subHeadingStyle}>What We Do</h4>
          <p style={paragraphStyle}>
            Our dedicated team of travel experts leverages their deep knowledge and extensive network to curate seamless
            journeys, encompassing everything from flights and accommodations to tours and activities. Whether you're
            seeking a luxurious escape, an adventurous expedition, or a culturally immersive trip, we handle all aspects
            of your travel arrangements with meticulous attention to detail. From solo travelers to large groups, we offer
            customized itineraries, reliable bookings, and round-the-clock support to ensure your journey is not only
            memorable but also stress-free.
          </p>
          <br />
          <h4 style={subHeadingStyle}>Who We Are</h4>
          <p style={paragraphStyle}>
            Shubhyatra is a leading provider of comprehensive travel management solutions. Our dedicated team of
            travel experts brings together years of industry experience and a genuine love for travel. We leverage our
            extensive network of partners and suppliers to offer you a diverse range of destinations, activities, and
            accommodations tailored to your preferences.
          </p>
        </div>
        <div className="images" style={imagesStyle} >
          <br />
          <br />
          <div className="image-row" style={imageRowStyle}>
            <img src={banaras} alt="Banaras" style={{ height: '200px', width: '100%', borderRadius: '20px' }} />
          </div>
          <div>
            <h4 style={subHeadingStyle}>What We Believe</h4>
            <p style={paragraphStyle}>
              We believe that exploring new places, experiencing different cultures, 
              and connecting with people around the world enriches our lives and broadens our perspectives. 
              Our belief in travel extends beyond mere movement, it's about creating meaningful experiences that leave a lasting impact. 
              We believe in authenticity, ensuring every journey we curate reflects the true essence of the destinations we visit. 
            </p>
          </div>
          <br />
          <h4 style={subHeadingStyle}>Leadership Team</h4>
          <div className="image-row" style={imageRowStyle}>
            <br />
  
            <img src="https://via.placeholder.com/150" alt="Leadership 1" style={imageStyle} />
            <img src="https://via.placeholder.com/150" alt="Leadership 2" style={imageStyle} />
            {/* <img src="https://via.placeholder.com/150" alt="Leadership 3" style={imageStyle} />
            <img src="https://via.placeholder.com/150" alt="Leadership 4" style={imageStyle} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
