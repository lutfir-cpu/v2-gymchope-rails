class RegistrationsController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def create
    user = User.new(
      email: params['user']['email'],
      password: params['user']['password'],
      first_name: params['user']['first_name']
    )

    if user.save
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }
    else
      render json: {
        status: 200
      }
    end
  end
end
