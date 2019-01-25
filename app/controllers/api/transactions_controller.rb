class Api::TransactionsController < ApplicationController 
  def index
    @transactions = Transaction.find_by(transaction_params[:user_id])
    render 'api/transactions/index'
  end

  private
  def transaction_params
    params.require(:transaction).permit(:buy, :stock_id, :user_id, :num_shares, :price_per_share)
  end
end