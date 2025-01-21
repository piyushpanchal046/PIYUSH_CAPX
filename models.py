# models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
db = SQLAlchemy()


class Buysell(db.Model):
    sno= db.Column(db.Integer, primary_key=True)
    buy_sell=db.Column(db.String(1),nullable=False)
    ticker = db.Column(db.String(60), nullable=False)
    sname = db.Column(db.String(60), nullable=False)
    quantity=db.Column(db.Float,nullable=False)
    price=db.Column(db.Float,nullable=False)
    time=db.Column(db.DateTime,default=datetime.now(),nullable=False)
    def __repr__(self):
        return f'<BUYSELL {self.ticker} {self.buy_sell} {self.quantity}>'


