class Api::StocksController < ApplicationRecord
  def index
    @stocks = params[:stocks]
    debugger
    render 'api/stocks/index'
  end

  private
  def stock_params 
    params.require(:stock).permit(:symbol)
  end
end