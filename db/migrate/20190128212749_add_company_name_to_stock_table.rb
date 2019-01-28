class AddCompanyNameToStockTable < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :name, :string
  end
end
