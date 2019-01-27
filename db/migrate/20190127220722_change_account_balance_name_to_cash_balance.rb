class ChangeAccountBalanceNameToCashBalance < ActiveRecord::Migration[5.2]
  def change
    rename_column :users, :account_balance, :cash_balance
  end
end
