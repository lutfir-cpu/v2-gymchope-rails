class GymSessionsController < ApplicationController
  include CurrentUserConcern

  
  def index
    @gym_sessions = GymSession.all
    render json: @gym_sessions
  end

  def create
    user_id = params['booking']['user_id']
    slot_id = params['booking']['slot_id']
    gym_card_id = params['gym_card'] ? params['gym_card']['id'] : -1

    @gym_session = GymSession.new(
      user_id: user_id, 
      slot_id: slot_id,
      gym_card_id: gym_card_id,
      collect_time: Time.now
    )
    
    if @gym_session.save
      booking = Booking.find_by(id: params['booking']['id'])
      slot_to_update = booking.slot
      booking.destroy
      slot_to_update.update(:number_of_users => slot_to_update.users.count)

      History.create!(
        user_id: booking.user_id,
        log_message: "Card " + @gym_session.gym_card.name + " collected for booking at " + slot_to_update.day_slot.day + " from " + slot_to_update.start_time.to_s + " to " + slot_to_update.end_time.to_s + "."
      )

      render json: {
        message: 'Gym Session Successfully Created' ,
        status: :created,
        gym_session_created: true
      }, status: :created
    else
      render json: {
        error: 'Gym Session Unsuccessful' ,
        reasons: @gym_session.errors.full_messages,
        status: :unprocessable_entity,
        gym_session_created: false
      }, status: :unprocessable_entity
    end
  end

  def update
    @gym_session = GymSession.find(params[:id])
    if @gym_session.update(status: params['status'])
      History.create!(
        user_id: @gym_session.user_id,
        log_message: "Card " + @gym_session.gym_card.name + " returned! Thanks for gymming with us!"
      )
      render json: {
        ongoing_gym_session: @gym_session,
        status: :ok,
        updated: true
    }, status: :ok
    else
      render json: {
        errors: @gym_session.errors,
        updated: false
    }, status: :unprocessable_entity
    end
  end

  def get_ongoing_gym_session
    @ongoing_gym_session = @current_user.gym_sessions.find_by(status: 'ongoing')
    if @ongoing_gym_session
      render json: @ongoing_gym_session, include: [:gym_card], status: :ok
    else
      render json: @ongoing_gym_session, status: :no_content
    end
  end
end
