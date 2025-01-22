function start(){
        const activeModal = document.querySelector('.modal.show');
        const xml= new XMLHttpRequest();
        xml.open("post",'/update',true)
        xml.setRequestHeader('Content-Type',"application/json")

        xml.onload= function() {
            const data=JSON.parse(this.responseText);
            var models='';
            var i=1;
            var list="";
            var sell='';
            data.forEach( (values, index) => {
                        const ticker= values.ticker
                        const name = values.name;
                        const current_price= values.current_price
                        const Price_Change= values["Price Change"]
                        const change_24h= values.change_24h
                        const h24h_high= values["24h_high"]
                        const l24h_low= values["24h_low"]
                        const today_open_price= values.today_open_price
                        const previous_closing_price= values.previous_closing_price
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

                                                          <!--         {# comment using {{ "%.2f"|format(price) }} price=string,int, float change to float with 2 decimal place "%.i"|format(price) or "%d"|format(price) or "%.0f"|format(price)to change to int #} -->

                                                        <td class="text text-center align-middle  fw-6 ${ current_price >= today_open_price ? 'text-success' :'text-danger'} "> <i class="${ current_price >= today_open_price ? 'bi bi-caret-up-fill' :'bi bi-caret-down-fill' }"></i> $${current_price}</td>

                                                        <td class="text text-center align-middle ${ today_open_price>= previous_closing_price? 'text-success' :'text-danger'} "><i class="${ today_open_price>= previous_closing_price? 'bi bi-caret-up-fill' :'bi bi-caret-down-fill' }"></i> $${today_open_price} </td>

                                                        <!-- to set the precision of the price -->

                                                            <td class="text-center align-middle ${ current_price >= today_open_price? 'text-success' :'text-danger'} "> <i class="${ current_price >= today_open_price? 'bi bi-caret-up-fill' :'bi bi-caret-down-fill' }"></i> ${Math.abs(change_24h)}% </td>

                                                        <!--           market cap and volume check-->
                                                                   <td class="text-center align-middle ${ Price_Change >= 0 ? 'text-success' :'text-danger'} "> <i class="${ Price_Change >= 0 ? 'bi bi-caret-up-fill' :'bi bi-caret-down-fill' }"></i>$${Math.abs(Price_Change)} </td>

                                                            <td class="text-center align-middle text-success "> <i class="bi bi-caret-up-fill"></i>$${h24h_high} </td>
                                                            <td class="text-center align-middle text-danger "> <i class="bi bi-caret-down-fill"></i>$${l24h_low} </td>
                                                            <td class="text-center align-middle  "> $${previous_closing_price} </td>









                                                        <!-- to check -->
                                                                   <td class="text-center align-middle px-1 " style="min-width:125px;" colspan="2">
                                                                       <button type="button" class="col border-0 btn btn-primary btn-sm m-1" data-bs-toggle="modal" data-bs-target="#exampleModal${ticker}"   >BUY</button>
                                                                       <button type="button" class="col border-0 btn btn-danger btn-sm m-1" data-bs-toggle="modal" data-bs-target="#exampleModalsell${ticker}">SELL</button>
                                                                   </td>
                                                        <!--           <td class="text-center align-middle "> <button type="button" class="col border-0 btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModalSell x.market_cap_rank">SELL</button>  </td>-->
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
            )
            if (!activeModal) {
            document.getElementById("jsdata").innerHTML = list; // Update the table
            document.getElementById("models").innerHTML = models; // Update the modals list
            console.log("Modal is NOT active")
            }
        }

        xml.send()
}
setInterval(start, 40000);




window.onload=start
