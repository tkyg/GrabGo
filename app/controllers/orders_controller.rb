class OrdersController < ApplicationController

  def index
    render json: Order.all, status: :ok
  end

  def show 
    @order = Order.find(params[:id])
    render json: @order, status: :ok
  rescue ActiveRecord::RecordNotFound => error
    render json: {message: error.message}, status: :not_found
  end

  def create
    @order = Order.create(order_params)
    if @order.valid?
      render json: @order, status: :created
    else
      render json: { errors: @order.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update 
    @order = Order.find(params[:id])
    @order.update(order_params)
    render json: @order, status: :ok
  rescue ActiveRecord::RecordNotFound => error
    render json: { message: error.message }, status: :not_found
  end

  def destroy 
    @order = Order.find(params[:id])
    @order.destroy
    head :no_content
  rescue ActiveRecord::RecordNotFound => error
    render json: { message: error.message }, status: :not_found
  end

  private 

  def order_params
    params.require(:order).permit(:delivery_address, :total_price, :delivery_status, :user_id. :restaurant_id)
  end

end
