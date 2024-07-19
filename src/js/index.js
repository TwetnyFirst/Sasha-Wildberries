'use strict'
//1.ДОбавить при нажалии на + жлемента, чтобы увеличивалась общее количесво + зависимость цены 
//2.Дизайн
//3.Поиск 
import { fetchProducts } from './fetch.js';
import {createSlider} from './swiper.js';
import { createCart,cartList,cart } from './cart.js';
const root = document.querySelector('.root');
const container = createElement('div','container',null);
const header = createElement('header','header',null);
productsInCart = [];
cartObject = {
    count:0,
    price:0,
    productsInCart: productsInCart
}
function allPrice(){
    let res = productsInCart.reduce((accum,el) => accum + +priceInCart(el),0);
    cartObject.price = res;
    if(productsInCart.length != 0){
        let summaryPrice = document.querySelector('.summary__price ');
        summaryPrice.innerHTML = `Summary price: ${res}`;
    }
    return res
}
function allCount(){
    let res = productsInCart.reduce((accum,el) => accum + el.counter,0);
    cartObject.count = res;
    if(productsInCart != 0){
        let summaryCount = document.querySelector('.summary__count ');
        summaryCount.innerHTML = `Products in car:${res}`;
    }
    return res
}
function priceInCart(item){
    let res =  item.price * item.counter;
    return res
}
function repleaseCountAndPriceItemInCart (item){
    let count = document.querySelector(`#i${item.id} .item-count`);
    let price = document.querySelector(`#i${item.id} .item__price`);
    count.innerHTML = item.counter;
    price.innerHTML = priceInCart(item);
};
createSlider();
createHeader();
createProducts();
createCart();
getItem();

function createElement(tagName,className,text){
    const elem = document.createElement(tagName);
    if(className != null){
        elem.classList.add(className);
    }

    if(text != null){
        elem.innerHTML = text;
    }else{
        elem.innerHTML = '';
    }
    return elem;
}
function createHeader(){
    root.append(container);
    container.prepend(header);
    const headerLogo = createElement('h1','header__logo',"Wildberries");
    header.append(headerLogo);
    const searchForm = createElement('form','search',null);
    header.append(searchForm);
    const searchInput = createElement('input',null,null);
    searchInput.setAttribute('type','text');
    searchInput.setAttribute('placeholder','Search');
    searchForm.append(searchInput);
    const cartButton = createElement('button','cart-botton','Cart');
    cartButton.addEventListener('click',() => cart.classList.toggle('cart-open'));
    header.append(cartButton);
}
async function createProducts(){
    let products = await fetchProducts('https://6688f7220ea28ca88b868e3f.mockapi.io/Wildberies');
    console.log(products);
    products.forEach(element => {
        element.counter = 1;
    }); // Каждому улемента добавляет счетчик 
    const productsSection = createElement('section','products',null);
    container.append(productsSection);

    const title = createElement('h2',null,'Хиты продаж');
    productsSection.append(title);
    const wrap = createElement('div','products-wrap',null);
    productsSection.append(wrap);
    for(let i = 0; i < 10; i++){
        const card = createElement('div','products__card',null);
        card.setAttribute('id',products[i].id);
        wrap.append(card);
        //Часть с изображением
        const cardMain = createElement('div','card__main',null);
        card.append(cardMain);
        //Само изображение 
        const cardMainImg = createElement('div','card-main__img',null);
        cardMainImg.setAttribute('style',`background-image: url(${products[i].picture});`);
        cardMain.append(cardMainImg);
        //кнопки предпросмотра и добавление в корзину 
        const cardMainPreWatch = createElement('div','card-main__prewatch','prewatch');
        cardMainImg.append(cardMainPreWatch);
        const cardMainAdd = createElement('div','card-main__add','add');
        cardMainAdd.addEventListener('click',(e)=>{
            let id = e.target.parentElement.parentElement.parentElement.getAttribute('id');
            let itemInCart = products[products.findIndex((elem) => elem.id == id)];
            if(productsInCart.find((elem) => elem.id == itemInCart.id )){
                let alreadyInCart = productsInCart.find((elem) => elem.id == itemInCart.id);
                alreadyInCart.counter++;
                allCount();
                allPrice();
                repleaseCountAndPriceItemInCart(alreadyInCart);
                setItem();
            }else{
                productsInCart.push(itemInCart);
                createItemInCart(itemInCart);
                allCount();
                allPrice();
                setItem();
            }
                
  
            
        });
        cardMainImg.append(cardMainAdd);
        //часть с описанием и ценой 
        const cardDiscription = createElement('div','card__discription',null);
        card.append(cardDiscription);
        const cardPrice = createElement('div','card-discription__price',products[i].price);
        cardDiscription.append(cardPrice);
        const cardName = createElement('div','card-discrioption__name',products[i].title);
        cardDiscription.append(cardName);
    }

}
async function createItemInCart(item){
    let products = await fetchProducts('https://6688f7220ea28ca88b868e3f.mockapi.io/Wildberies');
    const cartItem = createElement('div','cart__item',null);
    cartItem.setAttribute('id',`i${item.id}`);
    const itemImgWrap = createElement('div','item-img__wrap',null);
    const itemImg = createElement('img','item__img',null);
    itemImg.setAttribute('src',item.picture);//Функция ищет желемент в массиве данных, в котором Id который мы указали в аргументе фенкции, совпадает с Id елемента.
    const itemDescription = createElement('div','count__wrap',null);
    const itemText = createElement('span','item__text',item.title);
    const itemCountWrap = createElement('div','item-count__wrap',null);
    const itemCountMinus = createElement('div','item-count__minus','-');
    itemCountMinus.addEventListener('click',() => {
        item.counter--;
        if(item.counter <= 0){
            itemDelete.parentElement.parentElement.remove();
            item.counter = 1;
            cartObject.productsInCart = cartObject.productsInCart.filter((el) => el.id != item.id);
            productsInCart = productsInCart.filter((el) => el.id != item.id);
            if(productsInCart.length == 0){
                let summaryPrice = document.querySelector('.summary__price ');
                summaryPrice.innerHTML = `Summary price: 0`;
                let summaryCount = document.querySelector('.summary__count ');
                summaryCount.innerHTML = `Products in car: 0`;
            }
        }else{
            repleaseCountAndPriceItemInCart(item);
        }
        allPrice();
        allCount();
        setItem();
        
    });
    const itemCount = createElement('div','item-count',item.counter);
    const itemCountAdd = createElement('div','item-count__plus','+');
    itemCountAdd.addEventListener('click',() => {
        item.counter++;
        repleaseCountAndPriceItemInCart(item);
        allPrice();
        allCount();
        setItem();
    });


    const itemFinally = createElement('div','item__finally',null);
    const itemDelete = createElement('div','item__delete','delete');
    itemDelete.addEventListener('click',() => {
        item.counter = 1;
        itemDelete.parentElement.parentElement.remove();
        cartObject.productsInCart = cartObject.productsInCart.filter((el) => el.id != item.id);
        productsInCart = productsInCart.filter((el) => el.id != item.id);
        if(productsInCart.length == 0){
            let summaryPrice = document.querySelector('.summary__price ');
            summaryPrice.innerHTML = `Summary price: 0`;
            let summaryCount = document.querySelector('.summary__count ');
            summaryCount.innerHTML = `Products in car: 0`;
        }
        allCount();
        allPrice();
        setItem();
    });
    const itemPrice = createElement('div','item__price',priceInCart(item));
    cartList.append(cartItem);
    cartItem.append(itemImgWrap);
    cartItem.append(itemDescription);
    itemDescription.append(itemText);
    itemDescription.append(itemCountWrap);
    itemCountWrap.append(itemCountMinus);
    itemCountWrap.append(itemCount);
    itemCountWrap.append(itemCountAdd);
    cartItem.append(itemFinally);
    itemImgWrap.append(itemImg);
    itemFinally.append(itemDelete);
    itemFinally.append(itemPrice);
    
    
}

//LocalStorage
function setItem(){
    localStorage.setItem('cart',JSON.stringify(cartObject));
}
function getItem(){
    if(localStorage.getItem('cart')){
        cartObject = JSON.parse(localStorage.getItem('cart'));
        productsInCart = cartObject.productsInCart;
        console.log(cartObject);
        for(let i = 0; i < cartObject.productsInCart.length;i++){
            createItemInCart(cartObject.productsInCart[i]);
        }
        allPrice();
        allCount();
    }
}



export {createElement,header,root,setItem,allPrice,allCount};