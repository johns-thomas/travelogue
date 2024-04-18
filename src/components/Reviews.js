import React, { useState, useEffect } from 'react';
import AddReview from './AddReview';
import { HOST_URL } from '../geoapi';
function ReviewsComponent({cityId,cityName}) {
    const [reviews, setReviews] = useState(null);

    // Function to fetch reviews from API and update state
    const fetchReviewsFromApi = async () => {
        try {
            const accessToken = localStorage.getItem('JWTBOOKINGTOKEN');

            const response = await fetch(`${HOST_URL}/api/city/review/all?city=${cityId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }

            });
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            
            const data = await response.json();
            console.log(data)
            setReviews(data|| []); // Update state with fetched reviews
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    // Fetch reviews from API when component mounts
    useEffect(() => {
        fetchReviewsFromApi();
    }, [cityId]);

    // Function to add a new review
    const addReview = async (newReview) => {
        try {
            newReview.city=cityName;
            const accessToken = localStorage.getItem('JWTBOOKINGTOKEN');
            // Perform API call to add the review
            const respons = await fetch(`${HOST_URL}/api/city/review/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newReview)
            });
           // const res = await respons.json();
            if (!respons.ok) {
                throw new Error('Failed to add review');
            }
            // Update state with the new review after successful API call
            setReviews([...reviews,  newReview ]);
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    const renderStarRating = (rating) => {
        const filledStars = '★'.repeat(Math.round(rating));
        const emptyStars = '☆'.repeat(5 - Math.round(rating));
        return filledStars + emptyStars;
      };
    return (
        <div className='container mt-5'>
             {/* Display existing reviews or "NO reviews yet" if reviews array is empty */}
             <h2>Reviews</h2>
             {reviews === null ? (
                <p>Loading reviews...</p>
            ) : reviews.length === 0 ? (
                <p>NO reviews yet</p>
            ) : (
                <ul>
                    {reviews.map((review, index) => (
                        <li key={index}>
                            <h3>{review.title}</h3>
                            <p>{review.content}</p>
                            <p>Rating: {renderStarRating(review.rating)}</p>
                        </li>
                    ))}
                </ul>
            )}
            {/* AddReview component */}
            <AddReview onAddReview={addReview} location={cityId} cityName={cityName} />
        </div>
    );
}

export default ReviewsComponent;
