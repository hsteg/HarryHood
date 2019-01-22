# == Schema Information
#
# Table name: transactions
#
#  id              :integer          not null, primary key
#  buy             :boolean          not null
#  stock_id        :integer          not null
#  user_id         :integer          not null
#  num_shares      :integer          not null
#  price_per_share :float            not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Transaction < ApplicationRecord
    
    
end
