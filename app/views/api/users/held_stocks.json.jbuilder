@held_stocks.each do |stock_id, num_shares|
  json.set! stock_id do 
    json.stock_id stock_id
    json.num_shares num_shares
  end
end
