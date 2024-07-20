class GymCardsController < ApplicationController
  def index
    @gym_cards = GymCard.all
    render json: @gym_cards
  end
end
