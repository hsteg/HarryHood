# == Schema Information
#
# Table name: user_watches
#
#  id         :integer          not null, primary key
#  stock_id   :integer          not null
#  user_id    :integer          not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserWatch < ApplicationRecord
    
end
