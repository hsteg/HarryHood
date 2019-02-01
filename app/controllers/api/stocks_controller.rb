require 'json'

class Api::StocksController < ApplicationController

  def show
    stock_symbol = params[:id].upcase
    @stock = Stock.where("symbol = '#{stock_symbol}'")
    render 'api/stocks/show'
  end

  def search
    key = params[:search_string]
    @stock = Stock.where("symbol LIKE '%#{key}%' OR name LIKE '%#{key}%'")
    debugger
    render 'api/stocks/show'

  end

  private
  def stock_params 
    params.require(:stock).permit(:symbol, :name)
  end
end