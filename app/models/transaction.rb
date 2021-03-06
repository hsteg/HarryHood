# == Schema Information
#
# Table name: transactions
#
#  id              :bigint(8)        not null, primary key
#  stock_id        :integer          not null
#  user_id         :integer          not null
#  num_shares      :integer          not null
#  price_per_share :float            not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Transaction < ApplicationRecord
  validates :stock_id, :user_id, :num_shares, :price_per_share, presence: true;
  
  belongs_to :user
  belongs_to :stock

  

end
