# Stock Exchange - Stock Market Simulator
Website which simulates Stock Market enabling you to buy and sell stocks of companies whose prices keep varying, helping you to understand how the real stock market works and thereby helping you avoid practices which might result in huge losses.

Stock Exchange is a web application which simulates the Stock Market by allowing the users to buy and sell virtual stocks of companies by fluctuating the prices of the stocks by a computer program thereby simulating the fluctuation of prices of stocks in real world according to the news and other factors like supply-demand ratio. On the frontend the list of investments of the user are shown in a tabulated form which are calculated on the backend by joining multiple relational database tables and performing arithmetic operations on them. A graph will be shown to the user which shows how his portfolio is performing over different time scales. On the backend all the buy-sell entries of the user are recorded in relational tables which are further linked to other tables by various constraints to properly manage the data of the user. Other than stock equity various other investment products like mutual funds, bonds, commodities like gold,silver,crude oil etc. are provided to the user so he can get well versed in trading and investments strategies and options before diving into the world of stock market and exploring the unlimited opportunities and potential the stock market presents.

<p align='center'> The ER Diagram for the application </p>

![](https://github.com/Adithya-S-Bhat/Stock-Exchange-Simulator-DBMS_Project/blob/main/A2/Updated%20ER%20diagram.jpg)

<p align='center'> The Relational Schema for the application </p>

![](https://github.com/Adithya-S-Bhat/Stock-Exchange-Simulator-DBMS_Project/blob/main/A2/Relational%20Schema.jpg)

# List of Technologies Used

Backend :
1. Express JS
2. nodemon
3. dotenv
4. bcryptjs
5. concurrently
6. cors
7. pg

The database used for storing all the details is [PostgreSQL](https://www.postgresql.org/)

Frontend :
1. Matrial-UI
2. React JS
3. React-Dom
4. React-Router-Dom
5. Axios
6. React-Google-Charts

# How to run the project

1. Clone this repository
2. Head over to `StockExchangeSimulator` folder which will be Root Directory of the Project.
3. Install [npm](https://nodejs.org/en/download/)
4. In the Root directory of the project run ```npm install```
5. Go into `Client` folder and run ```npm install```
6. From the Root directory of the project launch terminal and run ``npm start``
