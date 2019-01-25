# == Schema Information
#
# Table name: stocks
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  symbol     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Stock < ApplicationRecord
  validates :name, :symbol, presence: true
  validates :symbol, uniqueness: true



end
