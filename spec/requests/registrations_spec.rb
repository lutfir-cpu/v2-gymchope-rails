require 'rails_helper'

RSpec.describe "Registrations", type: :request do
  describe 'POST /register' do
    context 'with valid attributes' do
      it 'registers a new user' do
        expect {
          post '/register', params: { user: { email: 'user@example.com', password: 'password', first_name: 'John' } }, as: :json
          puts response.body
        }.to change(User, :count).by(1)
      end

      it 'returns a success response' do
        post '/register', params: { user: { email: 'user@example.com', password: 'password', first_name: 'John' } }, as: :json
        puts response.body
        expect(response).to have_http_status(:created)
        expect(JSON.parse(response.body)['user']['email']).to eq('user@example.com')
      end
    end

    context 'with invalid attributes' do
      it 'does not register a new user' do
        expect {
          post '/register', params: { user: { email: 'user@example.com', password: 'short', first_name: '' } }, as: :json
          puts response.body
        }.to_not change(User, :count)
      end

      it 'returns an error response' do
        post '/register', params: { user: { email: 'user@example.com', password: 'short', first_name: '' } }, as: :json
        puts response.body
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end