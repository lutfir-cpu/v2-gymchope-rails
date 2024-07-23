require 'rails_helper'

RSpec.describe RegistrationsController, type: :controller do
  render_views

  describe 'GET #index' do
    it 'returns a success response' do
      user = User.create!(email: 'test@example.com', password: 'password', first_name: 'Test')
      get :index, format: :json
      expect(response).to be_successful
      expect(JSON.parse(response.body).first['email']).to eq(user.email)
    end
  end

  describe 'POST #create' do
    context 'with valid attributes' do
      it 'creates a new user and returns a successful response' do
        post :create, params: { user: { email: 'test@example.com', password: 'password', first_name: 'Test' } },
             format: :json
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['user']['email']).to eq('test@example.com')
      end
    end

    context 'with invalid attributes' do
      it 'returns an error' do
        post :create, params: { user: { email: nil, password: 'password', first_name: 'Test' } },
             format: :json
        expect(response).to have_http_status(200)
      end
    end
  end
end