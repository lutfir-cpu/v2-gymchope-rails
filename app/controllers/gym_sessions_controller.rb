class GymSessionsController < ApplicationController
  def index
    @gym_sessions = GymSession.all
    render json: @gym_sessions
  end
end
