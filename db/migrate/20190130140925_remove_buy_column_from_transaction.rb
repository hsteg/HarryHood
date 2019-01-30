class RemoveBuyColumnFromTransaction < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :buy
  end
end
