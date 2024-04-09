import React, { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';

function HotelWidget({ cityId }) {
    const [hotels, setHotels] = useState(null); // State to store hotel data
    useEffect(() => {
        console.log(cityId)
        fetchHotelsData(cityId); // Fetch hotels data on component mount
    }, [cityId]); 
    function getFormattedDate(date) {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        if (month < 10) month = '0' + month;
        let day = date.getDate();
        if (day < 10) day = '0' + day;
        return `${year}-${month}-${day}`;
    }

    function renderStars(rating) {
        rating = (rating / 2);
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;

        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span
                key={i}
                style={{ color: "gold" }}
               
              >
                ★
              </span>);
        }
        

        return stars;
    }


    const fetchHotelsData = async (city) => {
        console.log(city)
        if (!city) {
            return
        }

        const checkin=getFormattedDate(new Date());
        const checkout=getFormattedDate(new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000)));
        const url = `https://booking-com18.p.rapidapi.com/stays/search?locationId=${city}&checkinDate=${checkin}&checkoutDate=${checkout}`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4b885ecdb1msh6f39e2f29a6ea62p16c894jsn8b6172e49dd6',
                'X-RapidAPI-Host': 'booking-com18.p.rapidapi.com'
            }
        };

        try {
            const hotelsResponse = await fetch(
                url, options// Adjust this according to your hotel API documentation
            );
            const hotelData = await hotelsResponse.json();
            setHotels(hotelData.data); // Set hotel data

        } catch (error) {
            console.error('Error fetching hotel data:', error);
        }
    };
    console.log(hotels);

    return (
        <div className='container mt-5'>
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header onClick={() => fetchHotelsData(cityId)} >
                    Stays
                </Accordion.Header>

                <Accordion.Body>
                    {hotels && Array.isArray(hotels) && hotels.length > 0 ? (
                        hotels.map((hotel, index) => (
                            <div key={index} className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={hotel.photoUrls[0]} style={{ width: "50%", height: "50%" }} className="img-fluid rounded-start" alt="Hotel" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{hotel.name}</h5>
                                            <p className="card-text">{hotel.address}</p>
                                            <p className="card-text">{hotel.priceBreakdown.grossPrice.amountRounded}</p>
                                            <p className="card-text">Rating: {renderStars(hotel.reviewScore)}</p>
                                            <p className="card-text"><small className="text-muted">{hotel.review_score} reviews</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading..</p>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </div>
    );
}

export default HotelWidget;