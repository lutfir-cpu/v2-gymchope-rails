class DaySlot < ApplicationRecord
    has_many :slots, dependent: :destroy
end
