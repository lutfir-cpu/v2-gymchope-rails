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

      History.create!(
        user_id: @booking.user_id,
        log_message: "Booking at " + slot_to_update.day_slot.day + " from " + slot_to_update.start_time.to_s + " to " + slot_to_update.end_time.to_s + " successful!"
      )

      render json: {
        message: 'Booking Successfully Created' ,
        status: :created,
        booking_created: true
      }
    else
      #render :new, alert: "Booking Unsuccessful"
      render json: {
        error: 'Booking Unsuccessful' ,
        reasons: @booking.errors.full_messages,
        status: :unprocessable_entity,
        booking_created: false
      }
    end
  end

  def destroy
    @booking = Booking.find(params[:id])

    if @booking 

      slot_to_update = @booking.slot
      @booking.destroy
      slot_to_update.update(:number_of_users => slot_to_update.users.count)

      History.create!(
        user_id: @booking.user_id,
        log_message: "Booking at " + slot_to_update.day_slot.day + " from " + slot_to_update.start_time.to_s + " to " + slot_to_update.end_time.to_s + " removed successfuly."
      )

      render json: {
        booking_deleted: true
      }
    else
      render json: {
        booking_deleted: false
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
