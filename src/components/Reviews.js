import React, { useState, useEffect } from 'react';
import AddReview from './AddReview';

function ReviewsComponent(cityId) {
    const [reviews, setReviews] = useState([]);

    // Function to fetch reviews from API and update state
    const fetchReviewsFromApi = async () => {
        try {
            const accessToken = localStorage.getItem('JWTBOOKINGTOKEN');

            const response = await fetch('http://localhost:5000/bookingapp/api/city/review', {
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
            setReviews(data.reviews); // Update state with fetched reviews
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
            // Perform API call to add the review
            const respons = await fetch('http://localhost:5000/bookingapp/api/city/review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(newReview)
            });
            const res = await respons.json();
            if (!response.ok) {
                throw new Error('Failed to add review');
            }
            // Update state with the new review after successful API call
            setReviews([...reviews, { newReview }]);
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
        <div>
            {/* Display existing reviews */}
            <h2>Reviews</h2>
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <h3>{review.title}</h3>
                        <p>{review.content}</p>
                        <p>Rating: {renderStarRating(review.rating)}</p>
                    </li>
                ))}
            </ul>

            {/* AddReview component */}
            <AddReview onAddReview={addReview} location={cityId} />
        </div>
    );
}

export default ReviewsComponent;
