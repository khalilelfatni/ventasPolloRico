const items = document.getElementById('list-product');
const cardProduct = document.getElementById('card-prodcut').content; 
const fragment  = document.createDocumentFragment();



document.addEventListener('DOMContentLoaded', () => {

    fetchData();

});


const fetchData = async () => {
    try{
        const res = await fetch('api.json');
        const data = await res.json();
        pintarCrads(data);
    }catch (error){
        console.log(error);
    }


}


function pintarCrads(data){
    data.forEach(element => {
        cardProduct.querySelector('h5').textContet = element.name;


        const clone = cardProduct.cloneNode(true);
        console.log(clone);
        fragment.appendChild(clone)
    });
    items.appendChild(fragment);
}