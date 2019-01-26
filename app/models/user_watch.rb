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
  validates :stock_id, :user_id, presence: true

  belongs_to :user, 
  foreign_key: :user_id, 
  class_name: :User

  belongs_to :stock,
  foreign_key: :stock_id,
  class_name: :Stock
  
end
