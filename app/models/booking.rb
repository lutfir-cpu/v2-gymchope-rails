class Booking < ApplicationRecord
  belongs_to :slot
  belongs_to :user

  validates_uniqueness_of :slot, scope: :user_id,  message: "You have already booked this slot."
end
