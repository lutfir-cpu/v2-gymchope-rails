class CreateSlots < ActiveRecord::Migration[7.1]
  def change
    create_table :slots do |t|
      t.integer :start_time
      t.integer :end_time
      t.references :day_slot, null: false, foreign_key: true

      t.timestamps
    end
  end
end
