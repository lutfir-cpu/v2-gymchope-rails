class DaySlotsController < ApplicationController
  def index
    @dayslots = DaySlot.all
    render json: @dayslots  
  end

  def show
    @day_slot = DaySlot.find_by(params[:id])

    if @day_slot
      render json: @day_slot.slots
    else
      render json: @day_slot
    end
  end
end
