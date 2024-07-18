class CreateDaySlots < ActiveRecord::Migration[7.1]
  def change
    create_table :day_slots do |t|
      t.string :day

      t.timestamps
    end
  end
end
