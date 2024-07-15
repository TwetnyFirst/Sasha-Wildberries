import { fetchProducts } from './fetch.js';
import {createSlider} from './swiper.js';
import { createCart,cartList } from './cart.js';

const root = document.querySelector('.root');
const container = createElement('div','container',null);
const header = createElement('header','header',null);
let productsInCart = [];

createSlider();
createHeader();
createProducts();
getItem();
createCart();

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
    const addButton = createElement('button','cart-botton','Cart');
    header.append(addButton);
}
async function createProducts(){
    let products = await fetchProducts('https://6688f7220ea28ca88b868e3f.mockapi.io/Wildberies');
    console.log(products);

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
            createItemInCart(id);
            productsInCart.push(products[products.findIndex((elem) => elem.id == id)]);
            setItem();
            console.log(id);
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
async function createItemInCart(id){
    let products = await fetchProducts('https://6688f7220ea28ca88b868e3f.mockapi.io/Wildberies');
    const cartItem = createElement('div','cart__item',null);

    const itemImgWrap = createElement('div','item-img__wrap',null);
    const itemImg = createElement('img','item__img',null);
    itemImg.setAttribute('src',products[products.findIndex((elem) => elem.id == id)].picture);//Функция ищет желемент в массиве данных, в котором Id который мы указали в аргументе фенкции, совпадает с Id елемента.
    const itemText = createElement('div','item__text',products[id].title);
    const itemFinally = createElement('div','item__finally',null);
    const itemDelete = createElement('div','item__delete','delete');
    itemDelete.addEventListener('click',() => {
        itemDelete.parentElement.parentElement.remove();
        productsInCart.splice(productsInCart.indexOf(id),1);
        setItem();
    });
    const itemPrice = createElement('div','item__price',products[id].price);
    cartList.append(cartItem);
    cartItem.append(itemImgWrap);
    cartItem.append(itemText);
    cartItem.append(itemFinally);
    itemImgWrap.append(itemImg);
    itemFinally.append(itemDelete);
    itemFinally.append(itemPrice);
}

//LocalStorage
function setItem(){
    localStorage.setItem('cart',JSON.stringify(productsInCart));
}
function getItem(){
    if(localStorage.getItem('cart')){
        productsInCart = JSON.parse(localStorage.getItem('cart'));
        for(let i = 0; i < productsInCart.length;i++){
            createItemInCart(productsInCart[i].id);
        }
    }
}



export {createElement,header,root,setItem,productsInCart};