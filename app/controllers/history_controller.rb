class HistoryController < ApplicationController
  def index
    @histories = History.all
    render json: @histories
  end

  def get_histories_by_user
    user = User.find_by(id: params['user']['id'])
    histories_by_user = user.histories
    render json: histories_by_user
  end
end
