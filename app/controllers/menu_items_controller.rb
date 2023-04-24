class MenuItemsController < ApplicationController
  skip_before_action :authenticate_user
  
  def index
    render json: MenuItem.all, status: :ok
  end

  def show 
    @menu_item = MenuItem.find(params[:id])
    render json: @menu_item, status: :ok
  rescue ActiveRecord::RecordNotFound => error
    render json: {message: error.message}, status: :not_found
  end

  def create
    @restaurant = Restaurant.find(params[:restaurant_id])
    @menu_item = @restaurant.menu_items.build(menuItem_params)
  
    if @menu_item.save
      render json: @menu_item, status: :created
    else
      render json: { errors: @menu_item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    menuItem = MenuItem.find(params[:id])
    if menuItem.update(menuItem_params)
      render json: menuItem, status: :ok
    else
      render json: { errors: menuItem.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @menu_item = MenuItem.find(params[:id])
    @menu_item.destroy
      head :no_content
    rescue ActiveRecord::RecordNotFound => error
      render json: {message: error.message}, status: :not_found
  end

  private

  def menuItem_params
    params.require(:menu_item).permit(:name, :description, :price, :category, :is_vegetarian, :is_gluten_free, :restaurant_id)
  end

end
