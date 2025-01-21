import requests

def head(url):
    headers = {"X-Finnhub-Token": "ctomcv1r01qhpppijejgctomcv1r01qhpppijek0"}
    response2 = requests.get(url, headers=headers)
    jos = response2.json()
    return jos


def stock_list():
    return [
            {"ticker": "AAPL", "weburl": "https://www.apple.com/",
             "logo": 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.png',
             "name": "APPLE INC"},
            {"ticker": "MSFT", "weburl": "https://www.microsoft.com/en-us",
             "logo": 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/MSFT.png',
             "name": "MICROSOFT CORP"},
            {"ticker": "AMZN", "weburl": "https://www.amazon.com/",
             "logo": 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AMZN.png',
             "name": "AMAZON.COM INC"},
            {"ticker": "GOOGL", "weburl": "https://abc.xyz/",
             "logo": 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/GOOG.png',
             "name": "ALPHABET INC-CL A"},
            {"ticker": "META", "weburl": "https://www.meta.com/",
             "logo": 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/FB.png',
             "name": "META PLATFORMS INC-CLASS A"},
            {"ticker": "TSLA", "weburl": "https://www.tesla.com/",
             "logo": 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/TSLA.png',
             "name": "TESLA INC"},
            {"ticker": "NVDA", "weburl": "https://www.nvidia.com/",
             "logo": 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/NVDA.png',
             "name": "NVIDIA CORP"},
            {"ticker": "GS", "weburl": "https://www.goldmansachs.com/",
             "logo": 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/GS.png',
             "name": "GOLDMAN SACHS GROUP INC"},
            {"ticker": "V", "weburl": "https://usa.visa.com/",
             "logo": 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/V.png',
             "name": "VISA INC-CLASS A SHARES"},
            {"ticker": "JNJ", "weburl": "https://www.jnj.com/",
             "logo": 'https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/JNJ.png',
             "name": "JOHNSON & JOHNSON"}]

def Stock_Symbol():  # to get list of all stock name
    stock = stock_list()
    for x in range(0,10):
                temp = stock[x]
                quote(stock[x]["ticker"], temp)
    return stock


def quote(symbol, temp):  # price
    # symbol='AAPL'
    url = f"https://finnhub.io/api/v1/quote?symbol={symbol}"
    response = head(url)
    temp["current_price"] = precision(response["c"])  # Current price

    temp["Price Change"] = precision(response["d"])  # change (24 hours)
    temp["change_24h"] = round(response["dp"], 2) if response["dp"] is not None else "null"  # % change (24 hours)

    temp["24h_high"] = precision(response["h"])
    temp["24h_low"] = precision(response["l"])
    temp["today_open_price"] = precision(response["o"])
    temp["previous_closing_price"] = precision(response["pc"])


def precision(value):
    if value == None:
        price = "N/A"
    else:
        if abs(value) >= 10 or abs(value) >= 1:
            price = round(value, 2)  # {  # $25.42, $25.42, $0.9991 , $0.4966, #}
        elif abs(value) < 1 and abs(value) > 0.0001:
            price = round(value, 4)
        else:
            price = round(value, 2)
    return price


def profite_calculate(lists):
    my_list=[]
    invested_amount=0
    stock_ticker=[]
    stock_quantity=[]
    top_stock=[]
    stock_no_max_prof= -1
    max_profit=-float('inf')
    stock = stock_list()

    for list in lists:
        url = f"https://finnhub.io/api/v1/quote?symbol={list.ticker}"
        response = head(url)
        current_price = precision(response["c"])

        for x in range(0, 10):
            if stock[x]['ticker']== list.ticker:
                stock[x]['buy_price']= precision(list.price)
                stock[x]['current_price']= precision(current_price)
                stock[x]["profit"]= precision(current_price - list.price)
                stock[x]["per_profit"]= precision( (stock[x]["profit"] / stock[x]['buy_price'] )*100 )
                stock[x]['quantity']= precision(list.quantity)
                stock[x]['invest']= precision( list.quantity * list.price )
                invested_amount+=( stock[x]['buy_price']* (list.quantity) )
                my_list.append(stock[x])
                stock_ticker.append(list.ticker)
                stock_quantity.append(stock[x]['quantity'])
                if stock[x]["profit"] >= max_profit:
                    max_profit=stock[x]["profit"]
                    stock_no_max_prof= x
    my_list.append( {'invested_amount' : precision(invested_amount), "stock_ticker":stock_ticker, "stock_quantity":stock_quantity } )
    top_stock.append(stock[stock_no_max_prof ])
    return {"my_list":my_list,"top_stock":top_stock}



if __name__ == '__main__':
    print('PyCharm')
