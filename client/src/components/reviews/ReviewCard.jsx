import React from 'react'

const ReviewCard = ({ review }) => {
  return (
    <div>
      <ul>
        <li>Restaurant Name: {review.restaurant.name}</li>
        <li>Review: {review.comment}</li>
        <li>Rating: {review.rating}</li>
        <br/>
      </ul>
    </div>
  )
}

export default ReviewCard