require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  render_views

  describe 'POST #create' do
    let!(:user) {User.create(email: 'user@example.com', password: 'password', first_name: 'John') }

    context 'with valid credentials' do
      it 'logs in the user and returns a successful response' do
        post :create, params: { user: { email: 'user@example.com', password: 'password'} }
        expect(response).to have_http_status(201)
        json_response = JSON.parse(response.body)
        expect(json_response['logged_in']).to be true
        expect(session[:user_id]).to eq(user.id)
      end
    end

    context 'with invalid credentials' do
      it 'does not log in user and returns an unsuccessful response' do
        post :create, params: { user: { email: 'user@example.com', password: 'wrongpassword'} }
        expect(response).to have_http_status(:unauthorized)
        json_response = JSON.parse(response.body)
        expect(json_response['logged_in']).to be_nil
        expect(session[:user_id]).to be_nil
      end
    end
  end
end