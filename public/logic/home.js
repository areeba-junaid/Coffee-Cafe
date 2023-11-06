let m = document.getElementsByClassName("minus");
let p = document.getElementsByClassName("plus");
let inputs = document.getElementsByName("number");
let carts = document.getElementsByClassName("cart");
let Total = 0;
/*Product List*/
product = [
    {
        id: 0,
        name: "express",
        price: 10,
        incart: 0

    },
    {
        id: 1,
        name: "mocha",

        price: 15,
        incart: 0
    },
    {
        id: 2,
        name: "Cappuccino",
        price: 20,
        incart: 0
    },
    {
        id: 3,
        name: "frappuccino",
        price: 10,
        incart: 0
    },
    {
        id: 4,
        name: "Black Cofee",
        price: 15,
        incart: 0

    },
    {
        id: 5,
        name: "Americano coffee",
        price: 20,
        incart: 0

    }]


if (localStorage.getItem("cart")===null)
{
    cart_items = [];
    
}
else{
    cart_items=JSON.parse(localStorage.getItem("cart"));
    Total=JSON.parse(localStorage.getItem("total"));
    values();
}

//Setting product boolean
function values(){
 for (let i=0; i< cart_items.length;i++)
{ 
    index=cart_items[i].id;
    product[index].incart=1;
}
}



/*Event Listners*/
for (let i = 0; i < m.length; i++) {

    m[i].addEventListener("click", function () {
        if (inputs[i].value > 1) {
            let a = parseInt(inputs[i].value) - 1
            inputs[i].value = a.toString();
        };
    })


    p[i].addEventListener("click", function () {
        if (inputs[i].value < 100) {
            let a = parseInt(inputs[i].value) + 1;
            inputs[i].value = a.toString();
        };
    })
    carts[i].addEventListener("click", function () {
        addCart(i);
        Total = calc_Total();
       
    });
};


/*Adding to cart and checking if it is already added or not*/
async function addCart(index) {
    q = inputs[index].value;

    if (product[index].incart === 0) {
        let info = {};
        product[index].incart = 1;
        let { id, name, price, } = product[index];
        info.id = id;
        info.name = name;
        info.price = price;
        info.quantity = q;
        await cart_items.push(info);
        alert("Item added to Cart");
        console.log(cart_items);
    }
    else {
        console.log("else")
        for (let i = 0; i < cart_items.length; i++) {
            if (cart_items[i].id === index) {
                console.log("matched");
                cart_items[i].quantity = inputs[index].value;
                alert(`Already was added to your cart and now quantity is ${q}`);
                break;
            }

        }
        console.log(cart_items);
    }
    
}

/*Total Cost of Everything in cart*/
function calc_Total() {
    sum = 0;
    for (let i = 0; i < cart_items.length; i++) {
        item_price = cart_items[i].price * cart_items[i].quantity;
        sum = sum + item_price;
    }
    return sum;
}
function store(){
    localStorage.removeItem("cart");
    localStorage.removeItem("total");
    localStorage.setItem("cart", JSON.stringify(cart_items));
    localStorage.setItem("total",JSON.stringify(Total)); 
}

function Order() {
    if (cart_items.length != 0) {
        console.log("sending");
        alert("Thankyou For your order");
        fetch('http://localhost:4000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: cart_items,
                total: Total
            })

        }).then(
            res => { return res.Json() }
        ).then(data => console.log(data))
            .catch(error => 
                {   
                    console.log('ERROR');})
        storeOrder();        
        Clear();
        
    }
    else {
        alert("Add items in cart first");
    }
}
function storeOrder()
{
    localStorage.setItem("order", JSON.stringify(cart_items));
    localStorage.setItem("pay",JSON.stringify(Total)); 
}
function Clear(){
    cart_items=[];
    Total=0;
    
}

function loggingOut(){
localStorage.clear();
}