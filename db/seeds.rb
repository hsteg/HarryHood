# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

User.create( {account_balance: 77946, email: "asdf@asdf.com", first_name: "Harry", last_name: "Test", username: "asdf", password: "asdfasdf"} )
User.create( {account_balance: 77946, email: "demo@demouser.com", first_name: "Demo", last_name: "McDemo", username: "DemoMcDemoface", password: "demodemo"} )