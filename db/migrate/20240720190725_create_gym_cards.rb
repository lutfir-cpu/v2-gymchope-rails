class CreateGymCards < ActiveRecord::Migration[7.1]
  def change
    create_table :gym_cards do |t|
      t.string :name

      t.timestamps
    end
  end
end
