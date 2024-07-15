import {createElement,root} from './index.js';
const cart = createElement('div','cart',null);
const cartList = createElement('div','cart__list',null);

function createCart(){
    root.append(cart);

    const cartTitle = createElement('div','cart__title',null);
    const title = createElement('h2','title','Cart');
    const cartClose = createElement('div','cart__close','Close');
    cart.append(cartTitle);
    cartTitle.append(title);
    cartTitle.append(cartClose);
    cart.append(cartList);

    const cartSummary = createElement('div','summary',null);
    const cartCountProducts = createElement('div','summaty__count','count of item : 1');
    const cartFinallyPrice = createElement('div','sunnary__price','10000');
    cart.append(cartSummary);
    cartSummary.append(cartCountProducts);
    cartSummary.append(cartFinallyPrice);

    const cartSubmit = createElement('div','submit','submit');
    cart.append();

}

export{createCart,cartList};