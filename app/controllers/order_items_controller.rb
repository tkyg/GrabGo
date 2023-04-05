class OrderItemsController < ApplicationController

  def index
    render json: OrderItem.all, status: :ok
  end

  def show 
    @order_item = OrderItem.find(params[:id])
    render json: @order_item, status: :ok
  rescue ActiveRecord::RecordNotFound => error
    render json: {message: error.message}, status: :not_found
  end

  def create
    @order_item = OrderItem.create(order_item_params)
    if @order_item.valid?
      render json: @order_item, status: :created
    else
      render json: { errors: @order_item.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update 
    @order_item = OrderItem.find(params[:id])
    @order_item.update(order_item_params)
    render json: @order_item, status: :ok
  rescue ActiveRecord::RecordNotFound => error
    render json: { message: error.message }, status: :not_found
  end

  def destroy 
    @order_item = OrderItem.find(params[:id])
    @order_item.destroy
    head :no_content
  rescue ActiveRecord::RecordNotFound => error
    render json: { message: error.message }, status: :not_found
  end

  private 

  def order_item_params
    params.require(:order_item).permit(:quantity, :price, :customization, :order_id, :menu_id)
  end

end
