# PIYUSH_CAPX
Portfolio Tracker is a web application that helps users track their stock portfolio in real time. The frontend is built using Bootstrap, HTML, and CSS, while the backend uses Python Flask. Real-time data updates are handled using JavaScript with the XMLHttpRequest method. The application fetches real-time stock data from Finnhub.io.

## Table of Contents
  * #### About
  * #### Features
  * #### Project Structure
  * #### Installation
  * #### Usage

## About
The Portfolio Tracker application allows users to:
  * View a dashboard of 10 stocks with buy and sell options.
  * Add stocks to a tracking list via a modal form.
  * Track portfolio performance, including total value, top-performing stocks, and portfolio distribution.
  
## Features
  * **Dashboard:** Displays 10 stocks with real-time data and buy/sell buttons.
  * **Modal Form:** Collects buy price, quantity, and optional buy date when adding a stock to the tracking list.
  * **My List Page:** Displays the tracked portfolio, total value, top-performing stocks, and distribution charts.
  * **Real-Time Updates:** Uses JavaScript and XMLHttpRequest for dynamic updates.
  * **Finnhub.io Integration:** Fetches live stock data.

## Project Structure
    Portfolio Tracker/
    |-- Instance/
    |   |-- app.db                      # SQLite database file
    |-- static/
    |   |-- info.js                     # JavaScript for real-time updates
    |   |-- list.js                     # JavaScript for My List functionality
    |   |-- logo.jpg                    # Website logo
    |   |-- Piyush_Panchal_Resume.pdf   # Resume file
    |-- templates/
    |   |-- index.html                  # Dashboard page
    |   |-- list.html                   # My List page
    |-- api.py                          # API integration with Finnhub.io
    |-- buy_sell_avg.py                 # Utility functions for buy/sell calculations
    |-- main.py                         # Main Flask application
    |-- models.py                       # Database models
    |-- requirements.txt                # Project dependencies

## Installation
Follow these steps to install and set up the project:

### Prerequisites
    Python 3.10+
    Virtual environment (optional but recommended)
    

### Steps
1. ##### Clone the Repository: #####
        git clone https://github.com/your-username/portfolio-tracker.git
        cd portfolio-tracker
2. ##### Set Up Virtual Environment (optional): #####
        python -m venv venv
        source venv/bin/activate   # macOS/Linux
        venv\Scripts\activate    # Windows
3. ##### Install Dependencies: #####
        pip install -r requirements.txt
4. ##### Set Up the Database:  Initialize the SQLite database by creating the app.db file in the Instance folder. You can customize the database schema using models.py.
5. ##### Run the Application: 
        python main.py
6. ##### Access the Application: Open your browser and navigate to: #####
        http://127.0.0.1:5000

## Usage

1. **Dashboard:**
    * View 10 real-time stocks.
    * Use the "Buy" button to open a modal form.
    * Enter the stock details and click "Track PNL" to add it to the tracking list.
2. **My List:**
    * View your tracked portfolio.
    * Check the total portfolio value, top-performing stocks, and distribution charts.
3. **Customizations:**
    * Modify api.py to adjust the API integration with Finnhub.io.
    * Update info.js and list.js for custom JavaScript functionality.




  
