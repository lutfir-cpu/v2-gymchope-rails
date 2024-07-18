class SlotsController < ApplicationController
  def index
    @slots = Slot.all
    render json: @slots
  end

  def show
    render json: @slot
  end
end
