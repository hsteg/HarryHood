# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

UserWatch.destroy_all
Transaction.destroy_all
Stock.destroy_all
User.destroy_all


user1 = User.create( {account_balance: 77946, email: "asdf@asdf.com", first_name: "Harry", last_name: "Test", username: "asdf", password: "asdfasdf"} )
user2 = User.create( {account_balance: 77946, email: "demo@demouser.com", first_name: "Demo", last_name: "McDemo", username: "DemoMcDemoface", password: "demodemo"} )
stock1 = Stock.create( {symbol: "AAPL"} )
stock2 = Stock.create( {symbol: "STWD"} )
stock3 = Stock.create( {symbol: "V"} )
stock4 = Stock.create( {symbol: "DG"} )
stock5 = Stock.create( {symbol: "PZZA"} )
stock6 = Stock.create( {symbol: "CMG"} )
stock7 = Stock.create( {symbol: "TSLA"} )
stock8 = Stock.create( {symbol: "TWTR"} )

transaction1 = Transaction.create({ buy: true, stock_id: stock1.id, user_id: user1.id, num_shares: 3, price_per_share: 130 })
transaction2 = Transaction.create({ buy: true, stock_id: stock2.id, user_id: user1.id, num_shares: 10, price_per_share: 20.58 })
transaction3 = Transaction.create({ buy: true, stock_id: stock3.id, user_id: user1.id, num_shares: 1, price_per_share: 130.32 })
transaction4 = Transaction.create({ buy: true, stock_id: stock4.id, user_id: user1.id, num_shares: 14, price_per_share: 85.93 })
transaction5 = Transaction.create({ buy: true, stock_id: stock5.id, user_id: user1.id, num_shares: 7, price_per_share: 34.91 })
transaction6 = Transaction.create({ buy: false, stock_id: stock5.id, user_id: user1.id, num_shares: 3, price_per_share: 40.05 })
transaction7 = Transaction.create({ buy: true, stock_id: stock3.id, user_id: user1.id, num_shares: 1, price_per_share: 135.05 })

user_watch1 = UserWatch.create( {stock_id: stock6.id, user_id: user1.id } )
user_watch1 = UserWatch.create( {stock_id: stock7.id, user_id: user1.id } )
user_watch1 = UserWatch.create( {stock_id: stock8.id, user_id: user1.id } )
user_watch1 = UserWatch.create( {stock_id: stock1.id, user_id: user2.id } )
user_watch1 = UserWatch.create( {stock_id: stock3.id, user_id: user2.id } )

 
