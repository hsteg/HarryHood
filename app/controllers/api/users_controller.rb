class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        @user.account_balance = 0
        
        if @user.save
            login(@user)
            # render 'api/users/show'
            # render json: {'it worked'}
        else
            render json: @user.errors.full_messages, status: 422
        end
    end


    private
    def user_params
        params.require(:user).permit(:username, :password, :email, :first_name, :last_name)
    end

end
