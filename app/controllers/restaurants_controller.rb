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

  def create
    restaurant = Restaurant.new(restaurant_params)
    restaurant.save 
    render json: restaurant, status: :created 
  rescue ActiveRecord::RecordNotFound => error
    render json: {message: error.message}, status: :not_found
  end

  def update 
    restaurant = Restaurant.new(restaurant_params)
    restaurant.update(restaurant_params)
    render json: restaurant, status: :ok
  rescue ActiveRecord::RecordNotFound => error
    render json: { message: error.message }, status: :not_found
  end

  def destroy 
    restaurant = Restaurant.find(params[:id])
    restaurant.destroy
    head :no_content
  rescue ActiveRecord::RecordNotFound => error
    render json: { message: error.message }, status: :not_found
  end

  private

  def restaurant_params
    params.permit(:name, :address, :phone_number, :zip_code)
  end

end
