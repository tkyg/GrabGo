import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import ReviewCard from './ReviewCard'
import { loadReviews } from '../actions/reviewsActions'

const ReviewList = ({ loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const reviews = useSelector(store => store.reviewsReducer)
  const { loggedIn } = useSelector(store => store.usersReducer)

  useEffect(() => {
    if(!loading && !loggedIn) {
      navigate('/login')
    }
    dispatch(loadReviews())
  }, [dispatch, loading, loggedIn, navigate])

 
  const reviewCards = reviews.map((review, index) => <ReviewCard key={index} review={review} />)

  return (
    <div>
      <div>
        {reviewCards}
      </div>
    </div>
  )
}

export default ReviewList