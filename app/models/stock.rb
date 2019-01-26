# == Schema Information
#
# Table name: stocks
#
#  id         :bigint(8)        not null, primary key
#  symbol     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Stock < ApplicationRecord
  validates :symbol, presence: true
  validates :symbol, uniqueness: true

  has_many :watches,
  foreign_key: :stock_id,
  class_name: :UserWatch


  has_many :transactions,
  foreign_key: :stock_id,
  class_name: :Stock
end
