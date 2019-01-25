class Api::UserWatchesController < ApplicationController
  def show
    user_id = params[:id]
    @user_watches = UserWatch.where("user_id = #{user_id}")
    render 'api/user_watches/show'
  end

  private
  def user_watch_params 
    params.require(:user_watch).permit(:stock_id, :user_id)
  end
end