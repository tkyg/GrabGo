class SessionsController < ApplicationController
  skip_before_action :authenticate_user, only: [:create, :destroy]

  def create
    user = User.find_by_username(params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: ["Invalid Username or Password"]}, status: :unauthorized
    end
  end
  
  # def destroy
  #   puts "Destroying session..."
  #   session.delete :user_id
  # end

  def destroy
    if session[:user_id]
      session.delete :user_id
      render json: { message: "Logged out successfully" }, status: :ok
    else
      render json: { errors: ["You are not logged in"] }, status: :unprocessable_entity
    end
  end
end