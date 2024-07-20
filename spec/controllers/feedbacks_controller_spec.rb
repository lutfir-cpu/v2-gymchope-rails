# spec/controllers/feedbacks_controller_spec.rb
require 'rails_helper'

RSpec.describe FeedbacksController, type: :controller do
  describe 'POST #create' do
    context 'with valid attributes' do
      it 'creates a new feedback' do
        expect {
          post :create, params: { feedback: { feedback: 'Test feedback' } }, as: :json
        }.to change(Feedback, :count).by(1)
      end

      it 'returns a success response' do
        post :create, params: { feedback: { feedback: 'Test feedback' } }, as: :json
        expect(response).to have_http_status(:created)
      end
    end

    context 'with invalid attributes' do
      it 'does not create a new feedback' do
        expect {
          post :create, params: { feedback: { feedback: nil } }, as: :json
        }.to_not change(Feedback, :count)
      end

      it 'returns an error response' do
        post :create, params: { feedback: { feedback: nil } }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
