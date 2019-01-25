# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Stock.destroy_all


user1 = User.create( {account_balance: 77946, email: "asdf@asdf.com", first_name: "Harry", last_name: "Test", username: "asdf", password: "asdfasdf"} )
user2 = User.create( {account_balance: 77946, email: "demo@demouser.com", first_name: "Demo", last_name: "McDemo", username: "DemoMcDemoface", password: "demodemo"} )
stock1 = Stock.create( {name: "Apple", symbol: "AAPL"} )
stock2 = Stock.create( {name: "Starwood Property Trust, Inc.", symbol: "STWD"} )
stock3 = Stock.create( {name: "Visa", symbol: "V"} )
stock4 = Stock.create( {name: "Dollar General", symbol: "DG"} )
stock5 = Stock.create( {name: "Papa Johns", symbol: "PZZA"} )

transaction1 = Transaction.create({ buy: true, stock_id: stock1, user_id: user1, num_shares: 3, price_per_share: 130 })
transaction1 = Transaction.create({ buy: true, stock_id: stock2, user_id: user1, num_shares: 10, price_per_share: 20.58 })
transaction1 = Transaction.create({ buy: true, stock_id: stock3, user_id: user1, num_shares: 1, price_per_share: 130.32 })
transaction1 = Transaction.create({ buy: true, stock_id: stock4, user_id: user1, num_shares: 14, price_per_share: 85.93 })
transaction1 = Transaction.create({ buy: true, stock_id: stock5, user_id: user1, num_shares: 7, price_per_share: 34.91 })

 
