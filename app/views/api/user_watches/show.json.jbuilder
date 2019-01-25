@user_watches.each do |watch|
  json.set! watch.id do 
    json.extract! watch, :id, :stock_id, :user_id
  end
end
