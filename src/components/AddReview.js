
import React, { useState } from 'react';

const AddReview = ({ onAddReview, location }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate inputs
        if (!title || !content || rating === 0) {
            alert('Please fill in all fields and select a rating');
            return;
        }
        // Create new review object
        const newReview = {
            title,
            content,
            rating,
            location
        };
        try {
            // Call the onAddReview function passed from the parent component
            await onAddReview(newReview);
            // Clear form inputs
            setTitle('');
            setContent('');
            setRating(0);
        } catch (error) {
            console.error('Error adding review:', error);
            // Handle error if necessary
        }

    };

    // Function to render star rating selector
    const renderStarRatingSelector = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    style={{ cursor: 'pointer', color: i <= rating ? 'gold' : 'gray' }}
                    onClick={() => setRating(i)}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="container mt-4">
            <h2>Add Review for {location}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content:</label>
                    <textarea className="form-control" id="content" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rating:</label>
                    <div>
                        {renderStarRatingSelector()}
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit Review</button>
            </form>
        </div>
    );
};

export default AddReview;
