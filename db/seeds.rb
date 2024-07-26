# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

dayArr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
gymCardArr = ["Gym Card 1 (GC1)", "Gym Card 2 (GC2)", "Gym Card 3 (GC3)"]

dayArr.each do |day|
    d = DaySlot.create!(:day => day)

    gym_opens = 1000

    while gym_opens <= 1600
        Slot.create!(
                    :day_slot_id => d.id, 
                    :start_time => gym_opens, 
                    :end_time => gym_opens + 30,
                    :number_of_users => 0
                    )
        Slot.create!(
                    :day_slot_id => d.id, 
                    :start_time => gym_opens + 30, 
                    :end_time => gym_opens + 100,
                    :number_of_users => 0
                    )
        gym_opens += 100
    end
end

gymCardArr.each do |card|
    GymCard.create!(name: card)
end
