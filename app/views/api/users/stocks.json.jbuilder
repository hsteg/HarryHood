@user.watch_stocks.each do |stock|
  json.set! stock.id do 
    json.extract! stock, :id, :symbol
  end
end

@user.transaction_stocks.each do |stock|
  json.set! stock.id do
    json.extract! stock, :id, :symbol
  end
end