@stock.each do |stock|
  json.set! stock.id do 
    json.extract! stock, :id, :symbol, :name
  end
end
