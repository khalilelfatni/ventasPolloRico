const items = document.getElementById('list-product');
const cardProduct = document.getElementById('card-prodcut').content; 
const listPrice = document.getElementById('list-price');
const listTable = document.getElementById('list-table'); 
const productCarrito = document.getElementById('product-carrito').content;
const fragment  = document.createDocumentFragment();
const totalTemplate = document.getElementById('total-product').content;
const footer = document.getElementById('footer');
let countProduct = 1;
var arrayProduct = [];
var quantityProduct = 1;





document.addEventListener('DOMContentLoaded', () => {

    fetchData();

});


const fetchData = async () => {
    try{
        const res = await fetch('api.json');
        const data = await res.json();
        const resPriceProdcut = await fetch('priceProduct.json');
        const dataPrice = await resPriceProdcut.json();
        pintarCrads(data,dataPrice);
    }catch (error){
        console.log(error);
    }


}


function pintarCrads(data,dataPrice){
    data.forEach(element => {
        cardProduct.querySelector('h5').textContent = element.name;
        cardProduct.querySelector('img').alt = element.name;
        cardProduct.querySelector('img').src = element.imgUrl;
        const fragment2  = document.createDocumentFragment();
        dataPrice.forEach(item => {
            if(item.idProdcut == element.id){
                const createPrice = document.createElement('button');
                createPrice.setAttribute("class","btn btn-primary btn-block" );
                createPrice.setAttribute("onclick", "addProduct(this)");
                createPrice.setAttribute("data-id", item.id );
                createPrice.setAttribute("data-price", item.price );
                createPrice.setAttribute("data-name", element.name + ' ' + item.name );
                createPrice.innerText =   item.name + ' ' + item.price + '€';
                const clone = createPrice.cloneNode(true);
                fragment2.appendChild(clone);             
            }
            

        });

        cardProduct.querySelector('#list-price').textContent = "";
        cardProduct.querySelector('#list-price').appendChild(fragment2);         
        
        const clone = cardProduct.cloneNode(true);
        fragment.appendChild(clone);
       
        
        
    });
    items.appendChild(fragment);
    //console.log(items);
}

function addProduct(obj){
    $("#quantity-product").text(countProduct++);
    var id = $(obj).data('id');
    var name = $(obj).data('name');
    var price = $(obj).data('price');

    const objectProduct = {
        id:id,
        name : name,
        quantityProduct : quantityProduct ,
        price : price

    };

    if(arrayProduct.hasOwnProperty(objectProduct.id)){
        arrayProduct[objectProduct.id].quantityProduct = arrayProduct[objectProduct.id].quantityProduct + 1;
    }
    else{
        arrayProduct[objectProduct.id] = {...objectProduct};
    }

    
    paintTable();
    //paintTableTotal();
}

function paintTable(){
    listTable.innerHTML = "";

    arrayProduct.forEach( item => { 
        productCarrito.querySelector('#name').textContent = item.name;
        productCarrito.querySelector('#price').textContent = item.price + '€';
        productCarrito.querySelector('#quantity').textContent = item.quantityProduct;
        productCarrito.querySelector('.btn-info').dataset.id = item.id;
        productCarrito.querySelector('.btn-danger').dataset.id = item.id;
        productCarrito.querySelector('#totalPrice').textContent = (item.quantityProduct * item.price) + '€';
        

        const clone  = productCarrito.cloneNode(true);
        fragment.appendChild(clone);

    });
    
    
    listTable.appendChild(fragment);
    

    paintFooter();
}

function paintFooter(){
    footer.innerHTML = "";
    if(Object.keys(arrayProduct).length === 0){
        footer.innerHTML = `<th colspan="2">Carrito Vacio - empieza a comprar </th>`;
    }else{
        const nQuantity = Object.values(arrayProduct).reduce((acc,{quantityProduct}) => acc + quantityProduct, 0);
        const priceTotal = Object.values(arrayProduct).reduce((acc,{quantityProduct, price}) => acc + quantityProduct * price, 0);
        totalTemplate.querySelector('#quantity-p').textContent = nQuantity;
        totalTemplate.querySelector('#total-price').textContent = priceTotal + '€';
        const clone = totalTemplate.cloneNode(true);
        fragment.appendChild(clone);
        footer.appendChild(fragment);
    }

}

function emptyAll(){
    arrayProduct = [];
    paintTable();
    $("#quantity-product").text('');

}
