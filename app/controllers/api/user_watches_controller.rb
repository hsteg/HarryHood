class Api::UserWatchesController < ApplicationController
  def show
    user_id = params[:id]
    @user_watches = UserWatch.where("user_id = #{user_id}")
    render 'api/user_watches/show'
  end

  def create
    @user_id = params[:user_id]
    @stock_id = params[:stock_id]
    @user_watch = UserWatch.new({user_id: @user_id, stock_id: @stock_id})

    if @user_watch.save
      @user_watches = UserWatch.where("user_id = #{@user_id}")
      render 'api/user_watches/show'
    else 
      render json: @user_watch.errors.full_messages, status: 422
    end
  end

  def destroy
    @user_watch = UserWatch.find(params[:id])
    @user_id = @user_watch.user_id
    @user_watch.destroy
    @user_watches = UserWatch.where("user_id = #{@user_id}")
    render 'api/user_watches/show'
  end

  private
  def user_watch_params 
    params.require(:user_watch).permit(:stock_id, :user_id)
  end
end