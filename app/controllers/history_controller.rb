class HistoryController < ApplicationController
  def index
    @histories = History.all
    render json: @histories
  end

  def get_histories_by_user
    user = User.find_by(id: params['user']['id'])
    histories_by_user = user.histories.sort_by(&:created_at).reverse
    render json: histories_by_user
  end
end
