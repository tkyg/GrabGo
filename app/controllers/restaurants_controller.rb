class RestaurantsController < ApplicationController

  def index
    render json: Restaurant.all, status: :ok
  end

  def show 
    restaurant = Restaurant.find(params[:id])
    render json: restaurant, status: :ok
  rescue ActiveRecord::RecordNotFound => error
    render json: {message: error.message}, status: :not_found
  end

end
