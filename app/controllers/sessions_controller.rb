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
  
  def destroy
    puts "Destroying session..."
    session.delete :user_id
  end
end