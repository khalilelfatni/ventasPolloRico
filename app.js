const items = document.getElementById('list-product');
const cardProduct = document.getElementById('card-prodcut').content; 
const listPrice = document.getElementById('list-price');
const listTable = document.getElementById('list-table'); 
const productCarrito = document.getElementById('product-carrito').content;
const fragment  = document.createDocumentFragment();
const totalTemplate = document.getElementById('total-product').content;
const footer = document.getElementById('footer');
var nQuantityprint = 0;
var nTotalPriceprint = 0;

let countProduct = 0;
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
    countProduct = countProduct + 1;
    $("#quantity-product").text(countProduct);
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
    countProduct = 0;

}

function sumProduct(obj){
    id = $(obj).data('id');
    countProduct++;
    $("#quantity-product").text(countProduct);
    arrayProduct[id].quantityProduct =  arrayProduct[id].quantityProduct + 1;
    paintTable();

}

function subtractProduct(obj){
    id = $(obj).data('id');
    countProduct--;
    if(arrayProduct[id].quantityProduct == 1){
        delete arrayProduct[id];
        paintTable();
    }else{
        arrayProduct[id].quantityProduct =  arrayProduct[id].quantityProduct - 1;
        paintTable();
    }
    
    if(countProduct == 0){
        $("#quantity-product").text('');
    }
    else{
        $("#quantity-product").text(countProduct);
    }

}

window.onscroll = function() {goUp()};

function goUp() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    $("#go-up").show();
  } else {
    $("#go-up").hide();
  }
}

function imprimir() {

    myDate = new Date();
    
    var html = '<!DOCTYPE html> <html lang="es"><head> <meta charset="UTF-8"><meta name="viewport" ';
    
    html = html + 'content="width=device-width, initial-scale=1.0">';
    
    html = html + '<title>ticket</title></head>';
    html = html + '<body style="margin-left: 20%; margin-right: 20%; margin-top: 40%; ">'
    html = html + '<center><h1>POLLO RICO</h1>';
    html = html + 'fecha:' + ' ' + myDate.getUTCDate()+ '/' + myDate.getUTCMonth() + '/' + myDate.getUTCFullYear();
    html = html + '<br>hora: ' + myDate.getHours() + ':' + myDate.getMinutes();
    html = html+ '<br>ticket nº:' + '1' + '<br><small>--------------------------</small>';
    html = html + '<br><small>--------------------------</small><br>';


    arrayProduct.forEach(item => {
        html = html + item.quantityProduct + '&nbsp;&nbsp;' + item.name + '&nbsp;&nbsp;&nbsp;&nbsp;' + item.price*item.quantityProduct + '€<br>';
        nQuantityprint = nQuantityprint +  item.quantityProduct;
        nTotalPriceprint = nTotalPriceprint + (item.quantityProduct * item.price);

    });
    
    html = html + '<small>---------------------------</small><br>';
    html = html + '<small> ' + 'Total &nbsp;&nbsp;&nbsp;' +  nQuantityprint +  '&nbsp;&nbsp;&nbsp;'  +  nTotalPriceprint + '€' + '</small> <br>';
    html = html + '<small>---------------------------</small><br>';
    html = html + '<b><small> Gracias </small><br> </b>';
    html = html + '<b><small> Nos vemos pronto</small> <br></b> ';
    html = html + '</center>';
    html = html + '</body>';
    html = html + '</html>';
    
    
    newWin= window.open();
    newWin.document.write(html);
    newWin.print();
    newWin.close();
    
}
