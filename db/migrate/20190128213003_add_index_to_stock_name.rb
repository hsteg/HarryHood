class AddIndexToStockName < ActiveRecord::Migration[5.2]
  def change
    add_index :stocks, :name
  end
end
