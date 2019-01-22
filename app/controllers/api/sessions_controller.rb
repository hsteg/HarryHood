class Api::SessionsController < ApplicationController 

    def create
        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
        if @user
            login(@user)
            # render 'api/users/show'
            # render json: {'login worked'}
        else
            render json: ["Invalid login credentails"], status: 401
        end
    end

    def destroy
        @user = current_user
        if @user
            logout
            # render {}
            # render json: {'logout worked'}
        else 
            render json: ["No one to sign out"], status: 404
        end
    end



end