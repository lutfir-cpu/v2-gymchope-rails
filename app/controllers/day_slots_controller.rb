class DaySlotsController < ApplicationController
  def index
    @dayslots = DaySlot.all
    render json: @dayslots  
  end
end
