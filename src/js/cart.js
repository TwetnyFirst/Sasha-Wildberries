import {createElement,root,allCount,allPrice} from './index.js';
const cart = createElement('div','cart',null);
const cartList = createElement('div','cart__list',null);

function createCart(){
    root.append(cart);

    const cartTitle = createElement('div','cart__title',null);
    const title = createElement('h2','title','Cart');
    const cartClose = createElement('div','cart__close','Close');
    cartClose.addEventListener('click',() => cart.classList.toggle('cart-open'));
    cart.append(cartTitle);
    cartTitle.append(title);
    cartTitle.append(cartClose);
    cart.append(cartList);

    const cartSummary = createElement('div','summary',null);
    const summaryCount = createElement('div','summary__count',`Products in car: ${allCount()}`);
    const summaryPrice = createElement('div','summary__price',`Summary price: ${allPrice()}`);
    cart.append(cartSummary);
    cartSummary.append(summaryCount);
    cartSummary.append(summaryPrice);

        

   

}

export{createCart,cartList,cart};