class BookingsController < ApplicationController
  include CurrentUserConcern
  protect_from_forgery with: :null_session, only: [:create]
  #Trying to connect to frontend
  def new
    @booking = Booking.new
  end

  def index
    @bookings = Booking.all
    render json: @bookings
  end

  def show
    render json: @booking
  end

  def create
    @booking = Booking.new(booking_params)

    if @booking.save
      #redirect_to bookings_path, notice: 'Booking Successfully Created'

      slot_to_update = Slot.find(booking_params[:slot_id])
      slot_to_update.update(:number_of_users => slot_to_update.users.count)

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

  def get_bookings_from_user
    if @current_user
      @bookings_from_user = Booking.where(user_id: @current_user.id)
      render json: {
        bookings: @bookings_from_user.as_json(include: { slot: { include: :day_slot } }),
        logged_in: true
      }
    else
      render json: {
        logged_in: false,
        bookings: [],
        errors: ['Not Logged In']
      }
    end
  end

  def booking_params
    params.require(:booking).permit(:slot_id, :user_id)
  end
end
