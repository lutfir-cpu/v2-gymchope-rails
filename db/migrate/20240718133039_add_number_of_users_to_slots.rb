class AddNumberOfUsersToSlots < ActiveRecord::Migration[7.1]
  def change
    add_column :slots, :number_of_users, :integer
  end
end
