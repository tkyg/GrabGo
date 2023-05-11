class RestaurantsController < ApplicationController
  skip_before_action :authenticate_user, only: [:index, :show ]
  
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
    @restaurant = Restaurant.new(restaurant_params)
    @restaurant.user = @current_user
    if @restaurant.save
      render json: @restaurant, status: :created
    else
      render json: { errors: @restaurant.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update 
    @restaurant = Restaurant.find(params[:id])
    if @restaurant.user.id == @current_user.id 
      if @restaurant.update(restaurant_params)
      render json: @restaurant, status: :accepted
      else 
        render json: { error: @restaurant.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def destroy 
    @restaurant = Restaurant.find(params[:id])
    if @restaurant.user.id == @current_user.id 
      if @restaurant.destroy
        head :no_content
      else
        render json: { error: "Unable to delete the restaurant" }, status: :not_found
      end
    end
  end

  private

  def restaurant_params
    params.require(:restaurant).permit(:name, :address, :phone_number, :zip_code, :description, :category)
  end

end

  # def create
  #   @restaurant = Restaurant.new(restaurant_params)
  #   if @restaurant.save
  #     render json: @restaurant, status: :created
  #   else
  #     render json: { errors: @restaurant.errors.full_messages }, status: :unprocessable_entity
  #   end
  # end
  # def create
  #   @restaurant = Restaurant.new(restaurant_params)
  #   @restaurant.user = current_user # Assuming you have a current_user method for authentication
  #   if @restaurant.save
  #     render json: @restaurant, status: :created
  #   else
  #     render json: { errors: @restaurant.errors.full_messages }, status: :unprocessable_entity
  #   end
  # end

  # def filter_by_zipcode
  #   @restaurants = Restaurant.where(zip_code: params[:zipcode])
  #   render json: @restaurants, status: :ok
  # rescue ActiveRecord::RecordNotFound => error
  #   render json: {message: error.message}, status: :not_found
  # end

  # def filter_by_zipcode
  #   zipcode = params[:zipcode].slice(0, 4) + '%'
  #   @restaurants = Restaurant.where('zip_code LIKE ?', zipcode)
  #   render json: @restaurants, status: :ok
  # rescue ActiveRecord::RecordNotFound => error
  #   render json: {message: error.message}, status: :not_found
  # end

  # def update 
  #   restaurant = Restaurant.find(params[:id])
  #   restaurant.update(restaurant_params)
  #   render json: restaurant, status: :ok
  # rescue ActiveRecord::RecordNotFound => error
  #   render json: { message: error.message }, status: :not_found
  # end