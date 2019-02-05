json.array! @portfolio_snapshots do |snapshot|
  json.extract! snapshot, :total_portfolio_value, :date
end