

function start(){
        const xml= new XMLHttpRequest();
        xml.open("post",'/profit_list',true)
        xml.setRequestHeader('Content-Type',"application/json")

        xml.onload= function() {
                    const response = JSON.parse(this.responseText);
                    const top_stock = response["top_stock"][0];
                    const data = response["my_list"];
                    topstock(top_stock)

                    var models='';
                    var i=1;
                    var list="";
                    var sell='';
                    data.forEach( (values, index) => {
                             if("invested_amount" in values){
                                const invested_amount = values.invested_amount
                                document.getElementById("invested_amount").innerHTML= `$${invested_amount}`
                                var xValues = values.stock_ticker
                                var yValues = values.stock_quantity
                                var barColors = [
                                  "#b91d47",
                                  "#00aba9",
                                  "#2b5797",
                                  "#e8c3b9",
                                  "#1e7145",
                                  "#1e8145" //
                                ];
                                new Chart("myChart", {
                                  type: "doughnut",
                                  data: {
                                    labels: xValues,
                                    datasets: [{
                                      backgroundColor: barColors,
                                      data: yValues
                                    }]
                                  },
                                  options: {
                                    title: {
                                      display: true,
                                      text: "Portfolio distribution"
                                    }
                                  }
                                });

                             }
                         else{
                            const ticker= values.ticker
                            const name = values.name;
                            const current_price= values.current_price
                            const per_profit= values.per_profit
                            const profit= values['profit']
                            const buy_price= values.buy_price
                            const invest=values.invest
                            const quantity= values.quantity
                            const logo = values.logo
                            const weburl= values.weburl



                            list = list+ `<tr>
                                                                           <th class="bg bg-white col text-center  " scope="col" style="min-width: 40px; position: sticky; left: 0;">
                                                                               <div class="col-1 px-1 me-1 align-middle  ">${index + 1}</div>
                                                                           </th>
                                                                <!--        text-decoration-none to remove underline of hyperlink <a href="#" >          -->
                                                                <td class="text text-center align-middle  px-1 bg-white " style="min-width: 100px; max-width:150px; position: sticky; left: 40px; z-index:1; ">
                                                                    <a href="${weburl}" class="d-flex text-decoration-none text-dark align-items-center ">
                                                                        <img class=" col-6 col-sm-7 col-md-7 col-lg-7 col-xl-5 col-xxl-6 object-fill px-2" src="${logo}">
                                                                        <div  style="font-size: .90rem; " >
                                                                                 ${ticker}
                                                                        </div>
                                                                    </a>
                                                                </td>

                                                                <td class="text-center align-middle"> </td>

                                                                <td class=" text align-middle bg-white text-gray-900" style=" font-size: 0.85rem; ">
                                                                    ${name}
                                                                </td>

                                                                <td class="text text-center align-middle  fw-6 "> $${current_price}</td>

                                                                <td class="text text-center align-middle ${ current_price>= buy_price? 'text-success' :'text-danger'} "><i class="${ current_price>= buy_price ? 'bi bi-caret-up-fill' :'bi bi-caret-down-fill' }"></i> $${buy_price} </td>

                                                                    <td class="text-center align-middle ${ per_profit >= 0 ? 'text-success' :'text-danger'} "> <i class="${ per_profit >= 0 ? 'bi bi-caret-up-fill' :'bi bi-caret-down-fill' }"></i> ${Math.abs(per_profit) }% </td>

                                                                           <td class="text-center align-middle ${ profit >= 0 ? 'text-success' :'text-danger'} "> <i class="${ profit >= 0 ? 'bi bi-caret-up-fill' :'bi bi-caret-down-fill' }"></i> $${Math.abs(profit)} </td>
                                                                           <td class="text-center align-middle  ">  $${invest} </td>
                                                                           <td class="text-center align-middle  ">  ${quantity} </td>

                                                                           <td class="text-center align-middle px-1 " style="min-width:125px;" colspan="2">
                                                                               <button type="button" class="col border-0 btn btn-primary btn-sm m-1" data-bs-toggle="modal" data-bs-target="#exampleModal${ticker}"   >BUY</button>
                                                                               <button type="button" class="col border-0 btn btn-danger btn-sm m-1" data-bs-toggle="modal" data-bs-target="#exampleModalsell${ticker}">SELL</button>
                                                                           </td>
                                                                       </tr> `

                                    models= models+ `  <div class="modal fade" id="exampleModal${ticker}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                              <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                  <div class="modal-header">

                                                                      <div class="d-flex row row-cols-2 ">
                                                                              <img class="col-2" src=${logo} >
                                                                              <div class="col d-flex  align-items-center ">
                                                                                  <h5>${ticker} </h5>
                                                                                  <div class="d-block d-lg-inline px-2 "> <h5>${name} </h5> </div>
                                                                              </div>
                                                                      </div>


                                                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                  </div>

                                                                  <div class="modal-body">
                                                                <form action="/buy/${ticker}" method="post">

                                                              <div class="mb-3">
                                                                <label for="Quantity" class="col-form-label">Quantity Buy:</label>
                                                                <input type="number" class="form-control" id="Quantity" name="Quantity" placeholder="1.00" value="1.00" step="0.01">
                                                              </div>

                                                              <div class="mb-3 col">
                                                                <label for="Price_per_stock" class="col-form-label">Price per stock:</label>
                                                                <input type="number" class="form-control" id="Price_per_coin" name="Price_per_coin" value="${current_price}" step="0.01">
                                                              </div>

                                                              <div class="mb-3">
                                                                <label for="Date_&_Time" class="col-form-label">Date:</label>
                                                                <input type="datetime-local" class="form-control" id="Date_&_Time" name="Date_&_Time" >
                                                              </div>

                                                              <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="submit" class="btn btn-primary">Track PNL</button>
                                                              </div>

                                                            </form>


                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>


                                                            <!-- sell -->
                                                            <div class="modal fade" id="exampleModalsell${ticker}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                              <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                  <div class="modal-header">
                                                                      <div class="d-flex row row-cols-2 ">
                                                                              <img class="col-2" src=${logo} >
                                                                              <div class="col d-flex  align-items-center ">
                                                                                  <h5>${ticker} </h5>
                                                                                  <div class="d-block d-lg-inline px-2 "> <h5>${name} </h5> </div>
                                                                              </div>
                                                                      </div>


                                                                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                  </div>

                                                                  <div class="modal-body">
                                                                <form action="/sell/${ticker}" method="post">

                                                              <div class="mb-3">
                                                                <label for="Quantity" class="col-form-label">Quantity Buy:</label>
                                                                <input type="number" class="form-control" id="Quantity" name="Quantity" placeholder="1.00" value="1.00" step="0.01">
                                                              </div>

                                                              <div class="mb-3 col">
                                                                <label for="Price_per_stock" class="col-form-label">Price per stock:</label>
                                                                <input type="number" class="form-control" id="Price_per_coin" name="Price_per_coin" value="${current_price}" step="0.01">
                                                              </div>

                                                              <div class="mb-3">
                                                                <label for="Date_&_Time" class="col-form-label">Date:</label>
                                                                <input type="datetime-local" class="form-control" id="Date_&_Time" name="Date_&_Time" >
                                                              </div>

                                                              <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="submit" class="btn btn-danger">Track PNL</button>
                                                              </div>

                                                            </form>


                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                    `
                    }
                }
            )
            document.getElementById("jsdata").innerHTML= list
            document.getElementById("models").innerHTML= models
        }

        xml.send()
}
setInterval(start, 40000);

function topstock(values){
    const ticker= values.ticker
    const name = values.name;
    const profit= values['profit']
    const logo = values.logo
    document.getElementById("top_stocks").innerHTML= ` <div class="col pt-1 " > <img src=${logo} style="width:50px; height:50px" > <h5>${ticker} </h5> </div>
                                                       <div class="col">Top-Performing stock</div> `


}
setInterval(topstock, 40000);



window.onload=start