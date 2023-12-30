function bodyload(){
    loadCategory();
    loadProducts("https://dummyjson.com/products");
    GetCartCount();
}
//load cateories first
function loadCategory(){
    fetch("https://dummyjson.com/products/categories")
    .then(function(res){
        return res.json();
    })
    .then(function(categories){
        categories.unshift("all");
        for(var category of categories)
        {
            var option=document.createElement("option");
            option.text=category.toUpperCase();
            option.value=category;
            document.getElementById("lstcategories").appendChild(option);
        }
        
    })
}
function loadProducts(url){
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(products){
        document.querySelector("main").innerHTML = "";
        for(var product of products. products){
            var div=document.createElement("div");
            div.className="card mt-2 m-3";
            div.style.width="280px";
            div.innerHTML=`
            <img src=${product.thumbnail} class="card-img-top " height="150px">
            <div class="card-header" style:"height:30px;">
                <h4>${product.title}</h4>
            </div>
            <div class="card-body">
                <div class="overflow-auto" style="height=50px; ">
                    ${product.description}
                </div>
            </div>
            <div class="card-footer">
                <dl  >
                    <dt >Price</dt>
                    <dd>${product.price}</dd>
                    <dt>Ratings</dt>
                    <dd><span class="bi bi-star-fill" style="color:green";></span>${product.rating}</dd>
                </dl> 
                <button onclick="AddToCartClick(${product.id})" class="btn btn-danger w-100">
                    <span class="bi bi-cart2"></span> Add to Cart
                 </button>
            </div>
            `
            document.querySelector("main").appendChild(div);
        }
    })
}
function changedFilter(){
    var categoryName=document.getElementById("lstcategories").value;
    if(categoryName=="all"){
        loadProducts("https://dummyjson.com/products");
    }
    else{
        loadProducts(`https://dummyjson.com/products/category/${categoryName}`);
    }
}
var cartItems = [];
function GetCartCount(){
    document.getElementById("lblCount").innerHTML = cartItems.length;
 }
function AddToCartClick(id){
    fetch(`https://dummyjson.com/products/${id}`)
    .then(function(res){
        return res.json();
    })
    .then(function(product){
        cartItems.push(product);
        alert(`${product.title}\nAdded To Cart`);
        GetCartCount();
    })
 }
 function CartClick(){
 
    if( document.getElementById("lblCount").innerHTML=="0"){
     confirm("Your cart is Empty \n Please add the item that you want to buy");
    }
    else{
        document.querySelector("tbody").innerHTML= "";
        for(var item of cartItems)
        {
            
            var tr = document.createElement("tr");
            var tdTitle = document.createElement("td");
            var tdPrice  = document.createElement("td");
            var tdImage = document.createElement("td");
            var deleteOption=document.createElement("td");

            tdTitle.innerHTML = item.title;
            tdPrice.innerHTML = item.price;
            tdImage.innerHTML = `<img src=${item.thumbnail} width="50" height="50">`;
            deleteOption.innerHTML=`<button onclick="deleteCart()"class="btn btn-primary">Delete Item</button>`

            tr.appendChild(tdTitle);
            tr.appendChild(tdPrice);
            tr.appendChild(tdImage);
            tr.appendChild(deleteOption);

            document.querySelector("tbody").appendChild(tr);
        }
    }
}
function loginFirst(){
    document.querySelector("a").src="../sign.html";
}