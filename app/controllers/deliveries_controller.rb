class DeliveriesController < ApplicationController

  def index
    render json: Delivery.all, status: :ok
  end

  def show 
    delivery = Delivery.find(params[:id])
    render json: delivery, status: :ok
  rescue ActiveRecord::RecordNotFound => error
    render json: {message: error.message}, status: :not_found
  end

  def destroy
    delivery = Delivery.find(params[:id])
      delivery.destroy
      head :no_content
    rescue ActiveRecord::RecordNotFound => error
      render json: {message: error.message}, status: :not_found
  end

end
