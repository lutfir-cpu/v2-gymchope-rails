class GymSession < ApplicationRecord
  belongs_to :user
  belongs_to :slot
  belongs_to :gym_card
end
