class SessionsController < ApplicationController
  include CurrentUserConcern

  def index
    if @current_user
      render json: {
        user: @current_user
      }
    else
      render json: {
        errors: ['No current user'],
        session: session
      }
    end
  end
  
  def create
    user = User
      .find_by(email: params["user"]["email"])
      .try(:authenticate, params["user"]["password"])
    
    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        logged_in: true,
        user: user
      }, status: :created
    else
      render json: {
        status: :unauthorized,
        message: "Invalid credentials"
      }, status: :unauthorized
    end
  end

  def logged_in
    if @current_user
      render json: {
        logged_in: true,
        user: @current_user
      }
    else
      render json: {
        logged_in: false
      }
    end
  end

  def logout
    reset_session
    render json: {
      status: 200,
      logged_out: true
    }
  end

end
