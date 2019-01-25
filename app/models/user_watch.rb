# == Schema Information
#
# Table name: user_watches
#
#  id         :bigint(8)        not null, primary key
#  stock_id   :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserWatch < ApplicationRecord
  validates :stock_id, :user_id
  belongs_to :user
end
