require 'json'

class Api::StocksController < ApplicationController

  def show
    stock_symbol = params[:id].upcase
    @stock = Stock.where("symbol = '#{stock_symbol}'")
    render 'api/stocks/show'
  end

  private
  def stock_params 
    params.require(:stock).permit(:symbol)
  end
end