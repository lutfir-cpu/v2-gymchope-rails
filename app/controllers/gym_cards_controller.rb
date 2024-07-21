class GymCardsController < ApplicationController
  def index
    @gym_cards = GymCard.all
    render json: @gym_cards
  end

  def get_available_gym_cards
    @gym_cards = GymCard.all
    available_gym_cards = @gym_cards.select do |card|
      card.gym_sessions.nil? || card.gym_sessions.find_by(status: 'ongoing') == nil 
    end
    render json: available_gym_cards, status: :ok
  end
end
