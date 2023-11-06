let cart = JSON.parse(localStorage.getItem("cart"));
let Total = JSON.parse(localStorage.getItem("total"));
let t_head = document.getElementsByClassName("total");
let ul = document.getElementsByClassName("list")
let Order = JSON.parse(localStorage.getItem("order"));
let Pay = JSON.parse(localStorage.getItem("pay"));

//First check if cart is null,if not then print
if (cart!=null ) {
   printItem();
}
if (Order != null) {
   printOrder();
}
function printItem() {
   if(cart.length>0)
   {ul[0].innerHTML = '';
   for (let i = 0; i < cart.length; i++) {
      const l = `<li class="list-items">${i + 1}<span> ${cart[i].name}</span><span>Quantity: ${cart[i].quantity}</span> </li>`;
      ul[0].innerHTML += l;
   }
   t_head[0].innerHTML = `Total: ${Total}`;}
}
function printOrder() {

   ul[1].innerHTML = '';
   for (let i = 0; i < Order.length; i++) {
      const l = `<li class="list-items">${i + 1}<span> ${Order[i].name}</span><span>Quantity: ${Order[i].quantity}</span> </li>`;
      ul[1].innerHTML += l;
   }
   t_head[1].innerHTML = `Bill: ${Pay}`;
}

function Clear() {
   localStorage.removeItem("cart");
   localStorage.removeItem("total");
   ul[0].innerHTML = "Empty";
   t_head[0].innerHTML = `Total: 0`;
}

function Ordering() {
   if (cart.length != 0) {
      console.log("sending");
      alert("Thankyou For your order");
      fetch('http://localhost:4000/order', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            order: cart,
            total: Total
         })

      }).then(
         res => { return res.Json() }
      ).then(data => console.log(data))
         .catch(error => {
            console.log('ERROR');
         })

         storeOrder()
         printOrder()
         Clear();

   }
   else {
      alert("Add items in cart first");
   }
}

function storeOrder() {
   Order=cart;
   Pay=Total;
   localStorage.setItem("order", JSON.stringify(cart));
   localStorage.setItem("pay", JSON.stringify(Total));
}

function loggingOut(){
   localStorage.clear();
   }