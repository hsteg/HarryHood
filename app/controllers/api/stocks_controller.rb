require 'json'

class Api::StocksController < ApplicationController
  def index
    @stocks = Stock.where('id IN (?)', JSON.parse(params[:ajax_stocks]))
    render 'api/stocks/index'
  end

  private
  def stock_params 
    params.require(:stock).permit(:symbol)
  end
end