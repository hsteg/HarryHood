class AddDateColumnToPortfolioSnapsots < ActiveRecord::Migration[5.2]
  def change
    add_column :portfolio_snapshots, :date, :integer, null: false
  end
end
