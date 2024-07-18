class Booking < ApplicationRecord
  belongs_to :day_slot
  belongs_to :user
end
