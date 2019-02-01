require 'json'

class Api::StocksController < ApplicationController

  def show
    stock_symbol = params[:id].upcase
    @stock = Stock.where("symbol = '#{stock_symbol}'")
    render 'api/stocks/show'
  end

  def search
    key = params[:search_string].upcase
    @stock = Stock.where("symbol ILIKE '%#{key}%' OR name ILIKE '%#{key}%'")
    render 'api/stocks/show'
  end

  private
  def stock_params 
    params.require(:stock).permit(:symbol, :name)
  end
end