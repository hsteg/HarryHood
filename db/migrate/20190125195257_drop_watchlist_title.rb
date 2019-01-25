class DropWatchlistTitle < ActiveRecord::Migration[5.2]
  def change
    remove_column :user_watches, :title
  end
end
