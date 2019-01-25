class Api::TransactionsController < ApplicationController 
  def show
    user_id = params[:id]
    @transactions = Transaction.where("user_id = #{user_id}")
    render 'api/transactions/show'
  end

  private
  def transaction_params
    params.require(:transaction).permit(:buy, :stock_id, :user_id, :num_shares, :price_per_share)
  end
end