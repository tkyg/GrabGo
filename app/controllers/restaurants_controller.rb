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
    @restaurant = Restaurant.create(restaurant_params)
    if @restaurant.valid?
      render json: @restaurant, status: :created
    else
      render json: { errors: @restaurant.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update 
    restaurant = Restaurant.find(params[:id])
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
