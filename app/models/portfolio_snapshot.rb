# == Schema Information
#
# Table name: portfolio_snapshots
#
#  id                    :bigint(8)        not null, primary key
#  user_id               :integer          not null
#  total_portfolio_value :float            not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  date                  :integer          not null
#

class PortfolioSnapshot < ApplicationRecord
  validates :user_id, :total_portfolio_value, presence: true
  belongs_to :user
end
