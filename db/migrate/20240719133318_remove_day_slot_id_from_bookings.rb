class RemoveDaySlotIdFromBookings < ActiveRecord::Migration[7.1]
  def change
    remove_reference(:bookings, :day_slot, index: true, foreign_key: true)
  end
end
