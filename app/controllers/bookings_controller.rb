class BookingsController < ApplicationController
    protect_from_forgery with: :null_session, only: [:create]
    #Trying to connect to frontend
    def new
      @booking = Booking.new
    end
  
    def create
      @booking = Booking.new(booking_params)
  
      if @booking.save
        #redirect_to bookings_path, notice: 'Booking Successfully Created'
  
        render json: {
          message: 'Booking Successfully Created' ,
          status: :created
        }
      else
        #render :new, alert: "Booking Unsuccessful"
        render json: {
          error: 'Booking Unsuccessful' ,
          reasons: @booking.errors.full_messages,
          status: :unprocessable_entity
        }
        end
    end
  
    def booking_params
      params.require(:booking).permit(:slot_id, :user_id)
    end
  
    def index
      @bookings = Booking.all
      render json: @bookings
    end
  
    def show
      render json: @booking
    end
end
