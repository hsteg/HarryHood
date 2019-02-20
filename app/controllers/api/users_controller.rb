class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        @user.cash_balance = 1000000
        free_stock = Stock.all.map {|stock| stock.id }.sample
        watch_stock = Stock.all.map {|stock| stock.id }.sample
        if @user.save
            Transaction.create!({user_id: @user.id, stock_id: free_stock, num_shares: 1, price_per_share: 0})
            Transaction.create!({user_id: @user.id, stock_id: watch_stock, num_shares: 1, price_per_share: 0})
            UserWatch.create!({stock_id: watch_stock, user_id: @user.id })
            login(@user)
            render 'api/users/show'
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def show 
      @user = User.find(params[:id])
      render 'api/users/stocks'
    end
    
    def held_stocks 
      @user = User.find(params[:id])
      @held_stocks = @user.get_all_shares
      render 'api/users/held_stocks'
    end

    def cash_balance
      @user = User.find(params[:id])
      render 'api/users/show'
    end

    def portfolio_data
      @user = User.find(params[:id])
      @portfolio_snapshots = @user.portfolio_snapshots.order(date: :asc)
      render 'api/users/portfolio_data'
    end


    private
    def user_params
        params.require(:user).permit(:username, :password, :email, :first_name, :last_name)
    end

end
