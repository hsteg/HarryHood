class CreateUserWatches < ActiveRecord::Migration[5.2]
  def change
    create_table :user_watches do |t|
      t.integer :stock_id, null: false
      t.integer :user_id, null: false
      t.string :title, null: false
      t.timestamps
    end
    add_index :user_watches, :stock_id
    add_index :user_watches, :user_id
  end
end
