class ChangeTimeAttributesInGymSession < ActiveRecord::Migration[7.1]
  def change
    rename_column :gym_sessions, :start_time, :collect_time
    rename_column :gym_sessions, :end_time, :return_time
  end
end
