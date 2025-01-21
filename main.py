from flask import Flask,render_template,request, jsonify, redirect
from datetime import datetime
from api import Stock_Symbol,profite_calculate
from models import db,Buysell
from buy_sell_avg import average_buy_price, average_sell_price



app = Flask(__name__)

    # Flask configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

    # Initialize database
db.init_app(app)
with app.app_context():
    db.create_all()

@app.route("/")
def home():
        return render_template("index.html")

@app.route("/list")
def list():
            return render_template("list.html")



@app.route("/profit_list", methods=['POST'])
def profit_list():
        list = Buysell.query.order_by(Buysell.ticker.asc()).all()
        my_list = profite_calculate(list)
        return jsonify(my_list)




@app.route("/<string:task>/<string:id2>", methods=['POST'])
def buy(task,id2):
        if request.method == 'POST':
            stock_list = {'AAPL':"APPLE INC", 'MSFT':"MICROSOFT CORP" , 'AMZN': "AMAZON.COM INC" , 'GOOGL': "ALPHABET INC-CL A" , 'META': "META PLATFORMS INC-CLASS A", 'TSLA':"TESLA INC", 'NVDA': "NVIDIA CORP" , 'GS': "GOLDMAN SACHS GROUP INC", 'V':"VISA INC-CLASS A SHARES" , 'JNJ': "JOHNSON & JOHNSON"}

            info = Buysell.query.filter_by(ticker=id2).first()
            if info == None:  # coin not present in list so we add in commit to add on in list
                quantity = float(request.form.get('Quantity'))
                buy_price = request.form.get('Price_per_coin')
                date = request.form.get("Date_&_Time") or datetime.now()
                profit_entry = Buysell(buy_sell=task[0].upper(), ticker=id2 , sname=stock_list[id2], quantity=quantity,
                                       price=buy_price, time=date)

                db.session.add(profit_entry)
                db.session.commit()
                return redirect("/list")

            else:
                old_quantity = info.quantity
                old_buy_price = info.price
                quantity = float(request.form.get('Quantity'))
                buy_price = float(request.form.get('Price_per_coin'))
                date = request.form.get("Date_&_Time") or datetime.now()

                if task == "buy":
                    new_quantity_buy_price = average_buy_price(old_quantity, old_buy_price, quantity, buy_price)
                    info.quantity = new_quantity_buy_price[0]
                    info.price = new_quantity_buy_price[1]
                    info.date_time = date

                    db.session.add(info)
                    db.session.commit()
                    return redirect("/list")
                else:
                    if old_quantity == quantity:
                        db.session.delete(info)
                    else:
                        new_quantity_sell_price = average_sell_price(old_quantity, old_buy_price, quantity, buy_price)
                        info.quantity = new_quantity_sell_price[0]
                        info.date_time = date

                        db.session.add(info)
                    db.session.commit()
                    return redirect("/list")
        return redirect('/')

@app.route("/update", methods=['POST'])
def update():
        return jsonify(Stock_Symbol())


if __name__ == "__main__":
    # with app.app_context():
    #     db.create_all()
    app.run(debug=True)
    # app.run(host='0.0.0.0', port=8000)
