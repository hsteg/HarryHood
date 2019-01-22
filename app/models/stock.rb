# == Schema Information
#
# Table name: stocks
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  symbol     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Stock < ApplicationRecord
        
end
