class GymCard < ApplicationRecord
    has_many :gym_sessions, dependent: :destroy
end
