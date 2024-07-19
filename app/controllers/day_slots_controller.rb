class DaySlotsController < ApplicationController
  def index
    @dayslots = DaySlot.all
    render json: @dayslots, include: [:slots]
  end

  def show
    @day_slot = DaySlot.find_by(params[:id])
    render json: @day_slot
  end

  def slots_in_day
    @day_slot = DaySlot.find_by(day: params['day'])

    if @day_slot
      render json: @day_slot.slots
    else
      render json: {
        errors: ["No such day exists"]
      }
    end
  end
end
