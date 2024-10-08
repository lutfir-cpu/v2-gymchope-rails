class Slot < ApplicationRecord
  belongs_to :day_slot
  has_many :bookings, dependent: :destroy
  has_many :gym_sessions, dependent: :destroy
  has_many :users, :through => :bookings
end
