class Api::TransactionsController < ApplicationController 
  def create
    @transaction = Transaction.new(transaction_params)
    @user = User.find(transaction_params[:user_id])
    if @transaction.num_shares < 0 
      @transaction_total = (@transaction.num_shares * @transaction.price_per_share) * -1
      @new_cash_balance = @user.cash_balance + @transaction_total
    else
      @transaction_total = @transaction.num_shares * @transaction.price_per_share
      @new_cash_balance = @user.cash_balance - @transaction_total
    end

    if @transaction.save
      @user.update(cash_balance: @new_cash_balance)
      render 'api/transactions/new'
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
    params.require(:transaction).permit(:stock_id, :user_id, :num_shares, :price_per_share)
  end
end