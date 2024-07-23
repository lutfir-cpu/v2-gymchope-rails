require 'rails_helper'

RSpec.describe User, type: :model do
  context 'validations' do
    it 'is valid with valid attributes' do
      user = User.new(email: 'user@example.com', password: 'password', first_name: 'John')
      expect(user).to be_valid
    end

    it 'is not valid without an email' do
      user = User.new(email: nil, password: 'password', first_name: 'John')
      expect(user).not_to be_valid
    end

    it 'is not valid without an password' do
      user = User.new(email: 'user@example.com', password: nil, first_name: 'John')
      expect(user).not_to be_valid
    end
  end
end