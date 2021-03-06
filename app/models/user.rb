# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  email           :string           not null
#  first_name      :string           not null
#  last_name       :string           not null
#  cash_balance    :float            not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

require 'uri'

class User < ApplicationRecord
    attr_reader :password

    validates :username, :email, :first_name, :last_name, :cash_balance, :password_digest, :session_token, presence: true
    validates :username, :email, uniqueness: true
    validates :password, length: { minimum: 7 }, allow_nil: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'address is not valid' } 

    has_many :transactions

    has_many :watches,
    foreign_key: :user_id,
    class_name: :UserWatch

    has_many :watch_stocks,
    through: :watches,
    source: :stock

    has_many :transaction_stocks,
    through: :transactions, 
    source: :stock

    has_many :portfolio_snapshots


    after_initialize :ensure_session_token

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        return nil unless user && user.is_password?(password)
        return user
    end

    def reset_session_token
        self.session_token = SecureRandom.urlsafe_base64
        self.save!
        self.session_token
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    # def self.get_num_asset_shares(user_id, stock_id)
    #   Transaction.where("user_id = #{user_id} and stock_id = #{stock_id}").sum(:num_shares)
    # end

    def get_all_shares()
      transactions = Transaction.where("user_id = #{self.id}").group(:stock_id).sum(:num_shares)
    end


    private 
    def ensure_session_token
        self.session_token ||= SecureRandom.urlsafe_base64
    end
    


end
