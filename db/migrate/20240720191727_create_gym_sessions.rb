class CreateGymSessions < ActiveRecord::Migration[7.1]
  def change
    create_table :gym_sessions do |t|
      t.references :user, null: false, foreign_key: true
      t.references :slot, null: false, foreign_key: true
      t.references :gym_card, null: false, foreign_key: true
      t.time :start_time
      t.time :end_time
      t.string :status, :default => 'ongoing'

      t.timestamps
    end
  end
end
