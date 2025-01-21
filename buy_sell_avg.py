def average_buy_price(old_quantity,old_price,current_buy_quantity,current_buy_price):
    total_amount= (old_quantity * old_price) + (current_buy_quantity*current_buy_price)
    total_buy_quantity= old_quantity +current_buy_quantity
    average_buy_price=total_amount / total_buy_quantity
    print(average_buy_price)
    ans=[]
    ans.append(total_buy_quantity)
    ans.append(average_buy_price)
    return ans

def average_sell_price(old_quantity,old_price,current_sell_quantity,current_sell_price):
    total_quantity= old_quantity - current_sell_quantity
    profit = ( current_sell_price - old_price ) * current_sell_quantity
    ans=[]
    ans.append(total_quantity)
    ans.append(current_sell_price)
    ans.append(profit)
    print(f"sell {ans[0],ans[1], ans[2]} " )
    return ans





