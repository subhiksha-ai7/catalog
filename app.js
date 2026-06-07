let cart =
JSON.parse(localStorage.getItem("cart")) || [];

const app =
document.getElementById("app");

function updateCartCount(){

document.getElementById("cartCount")
.textContent = cart.length;

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

}

function homePage(){

app.innerHTML = `
<section class="hero">

<h2>Welcome To ShopHub</h2>

<p>
Modern E-Commerce Product Catalog
</p>

</section>
`;

}

function productsPage(){

app.innerHTML = `

<div class="search-bar">

<input
type="text"
id="search"
placeholder="Search products">

<select id="category">

<option value="All">
All Categories
</option>

<option value="Electronics">
Electronics
</option>

<option value="Accessories">
Accessories
</option>

</select>

</div>

<div class="products"
id="productContainer">
</div>

`;

renderProducts(products);

document
.getElementById("search")
.addEventListener(
"input",
filterProducts
);

document
.getElementById("category")
.addEventListener(
"change",
filterProducts
);

}

function renderProducts(list){

const container =
document.getElementById(
"productContainer"
);

container.innerHTML = "";

list.forEach(product=>{

container.innerHTML += `

<div class="card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<p>${product.category}</p>

<button
onclick="addToCart(${product.id})">

Add To Cart

</button>

</div>

`;

});

}

function filterProducts(){

const search =
document
.getElementById("search")
.value
.toLowerCase();

const category =
document
.getElementById("category")
.value;

const filtered =
products.filter(product=>{

const matchesSearch =
product.name
.toLowerCase()
.includes(search);

const matchesCategory =
category==="All"
||
product.category===category;

return matchesSearch
&&
matchesCategory;

});

renderProducts(filtered);

}

function addToCart(id){

const product =
products.find(
p=>p.id===id
);

cart.push(product);

updateCartCount();

alert("Added To Cart");

}

function cartPage(){

let html =
"<h2>Shopping Cart</h2>";

if(cart.length===0){

html +=
"<p>Cart is Empty</p>";

}
else{

cart.forEach(item=>{

html += `

<div class="cart-item">

<h3>${item.name}</h3>

<p>₹${item.price}</p>

</div>

`;

});

}

app.innerHTML = html;

}

function aboutPage(){

app.innerHTML = `

<h2>About Us</h2>

<p>
ShopHub is a modern
E-Commerce Product Catalog
built using HTML, CSS,
JavaScript and localStorage.
</p>

`;

}

function router(){

const route =
location.hash.slice(1)
||
"home";

switch(route){

case "products":
productsPage();
break;

case "cart":
cartPage();
break;

case "about":
aboutPage();
break;

default:
homePage();

}

}

window.addEventListener(
"hashchange",
router
);

updateCartCount();
router();
