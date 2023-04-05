class MenuItemsController < ApplicationController

  def index
    render json: MenuItem.all, status: :ok
  end

  def show 
    menuItem = MenuItem.find(params[:id])
    render json: menuItem, status: :ok
  rescue ActiveRecord::RecordNotFound => error
    render json: {message: error.message}, status: :not_found
  end

  def destroy
    menuItem = MenuItem.find(params[:id])
      menuItem.destroy
      head :no_content
    rescue ActiveRecord::RecordNotFound => error
      render json: {message: error.message}, status: :not_found
  end

end
