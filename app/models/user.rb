class User < ApplicationRecord
    has_secure_password
    
    validates_presence_of :email
    validates_uniqueness_of :email

    has_many :bookings, dependent: :destroy
    has_many :histories, dependent: :destroy
    has_many :gym_sessions, dependent: :destroy
    has_many :slots, :through => :bookings
end
