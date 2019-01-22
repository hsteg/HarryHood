class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.boolean :buy, null: false
      t.integer :stock_id, null: false
      t.integer :user_id, null: false
      t.integer :num_shares, null: false
      t.float :price_per_share, null: false
      t.timestamps
    end
    add_index :transactions, :user_id
  end
end
