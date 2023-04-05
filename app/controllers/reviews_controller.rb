class ReviewsController < ApplicationController

  def index
    reviews = current_user.reviews
    # reviews = Review.all
    render json: reviews, status: :ok
  end

  def show
    @review = Review.find(params[:id])
    render json: @review, status: :ok
  rescue ActiveRecord::RecordNotFound => error
    render json: {message: error.message}, status: :not_found
  end

  def create
    @restaurant = Restaurant.find(params[:restaurant_id])
    @review = @restaurant.reviews.build(review_params)
    @review.user = current_user
    if @review.save
      render json: @restaurant
    else 
      render json: { errors: @review.errors.messages }, status: :unprocessable_entity
    end
  end

    def review_params
      params.require(:review).permit(:rating, :comment, :user_id, :restaurant_id)
    end

end
