const items = document.getElementById('list-product');
const cardProduct = document.getElementById('card-prodcut').content; 
const listPrice = document.getElementById('list-price');
const fragment  = document.createDocumentFragment();




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