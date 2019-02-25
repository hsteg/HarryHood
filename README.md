# README
## HarryHood
[Live Site](https://harryhood.herokuapp.com/)

![screenshot](./app/assets/images/readme/toplevelscreenshot2.png?raw=true)
  

## About
This project is a full-stack, single-page stock investment app baseed on Robinhood, mimicking their nighttime styling.  

## Technologies
Frontend: React/Redux

Backend: Ruby on Rails / PostgreSQL database

Graphing: Recharts Library

IEX Trading API.

CSS and HTML5 for styling.

## Features 
#### Asset Name and Symbol Search
![search](./app/assets/images/readme/searchscreenshot.png?raw=true)

  Dropdown searchbar that queries database, return matches on either asset name or symbol.  In the future, I will implement debouncing to prevent a premature query through a massive database and will toggle styling of search results based on matching characters entered.

#### Asset Data Charts
![stock show](./app/assets/images/readme/chartdetail2.png?raw=true)

  Multiple Ajax requests to IEX API and database obtains various datapoints depending on which chart the user selects. Utilizes Recharts react library to display the data in a visually appealing way. 

#### Asset Transactions
![buy](./app/assets/images/readme/goodbuy2.png?raw=true)

  Transacations are held in the ```Transactions``` table.  Users can buy an asset, assuming they have enough funds, and can sell assets assuming they have those assets to sell.  If a user tries to buy an asset that they cannot afford the purchase button will change styles and prevent them from doing so.  Additionally, if a user does not have that particular asset to sell, the sell tab will not be displayed.  
![badbuy](./app/assets/images/readme/badbuy2.png?raw=true)

  Lastly, if a user tries to sell an more shares than they have of a particular asset the button will again change styles and prevent them from doing so. The market price and estimated cost/credit is based on lastest market price (up to the minute accuracy during market hours) so users can simulate real-time stock trading. Asset purchases are represented by a positive number of shares in the ```Transactions``` table and sales are represented by a negative number.  A user's total asset holds are calculated by subtracting the the sold assets from the purchased ones. 

  ![sell](./app/assets/images/readme/goodsell.png?raw=true)


#### User's Held Assets and Watchlist
The right hand side of the dashboard contains two lists, one containing the user's held assets and another containing their watchlist. These two lists are generated via associations between the ```Users``` table and the ```User_Watches``` and ```Stocks``` table.  After fetching the correct associations AJAX requests are dispatched to receive the approriate up to the minute data for display in the user's dashboard. The charts in the dashboard scale approriately to represent the time passed since the market opened and include a faint gray line to represent the previous day's close price. 
  
  ![watchlist](./app/assets/images/readme/watchlist2.png?raw=true)

