class FeedbacksController < ApplicationController
  def create
    @feedback = Feedback.new(feedback_params)
    if @feedback.save
      render json: { status: 'Success', message: @feedback }, status: :created
    else
      render json: { status: 'error', message: @feedback.errors.full_messages.join(", ") },
             status: :unprocessable_entity
    end
  end

  def index
    @feedbacks = Feedback.all
    render json: @feedbacks
  end

  private
  def feedback_params
    params.require(:feedback).permit(:feedback)
  end
end
