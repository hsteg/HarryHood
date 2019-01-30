class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        @user.cash_balance = 0
        
        if @user.save
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
      render json: @held_stocks
    end



    private
    def user_params
        params.require(:user).permit(:username, :password, :email, :first_name, :last_name)
    end

end
