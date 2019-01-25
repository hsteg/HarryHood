@transactions.each do |transaction|
  json.set! transaction.id do 
    json.extract! transaction, :id, :buy, :stock_id, :user_id, :num_shares, :price_per_share
  end
end
