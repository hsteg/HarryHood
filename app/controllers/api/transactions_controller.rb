class Api::TransactionsController < ApplicationController 
  def create
    @transaction = Transaction.new(transaction_params)
    debugger
    if @transaction.save

    else
      render json: @transaction.errors.full_messages, status: 422
    end
  end
  
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