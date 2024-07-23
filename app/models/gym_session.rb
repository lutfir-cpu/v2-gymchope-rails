class GymSession < ApplicationRecord
  belongs_to :user
  belongs_to :slot
  belongs_to :gym_card
  validates :status, presence: true
end
