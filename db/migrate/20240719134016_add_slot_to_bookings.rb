class AddSlotToBookings < ActiveRecord::Migration[7.1]
  def change
    add_reference :bookings, :slot, null: false, foreign_key: true
  end
end
