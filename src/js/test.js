let a = {
    counter: 2,
    price: 12,
    priceInCard: function(){
        return this.price * this.counter
    }
};

let cartObject = {
    allCount:0,
    allPrice: function (){
        let res = this.productsInCart.reduce((accum,item) => accum + item.priceInCard,0);
        return res
    },
    productsInCart: [
        {priceInCard:10},
        {priceInCard:10},
        {priceInCard:20},
    ]
};
console.log(cartObject.allPrice());
// const cartSummary = createElement('div','summary',null);
    // const cartCountProducts = createElement('div','summaty__count',`Item in cart : ${allCount(productsInCart)}`);
    // const cartFinallyPrice = createElement('div','sunnary__price',`Price : ${allPrice(productsInCart)}`);
    // cart.append(cartSummary);
    // cartSummary.append(cartCountProducts);
    // cartSummary.append(cartFinallyPrice);
    // // const cartSubmit = createElement('div','submit','submit');
    // // cart.append(cartSubmit);
    // let cartCountProducts = document.querySelector('.summaty__count');
    // let cartFinallyPrice = document.querySelector('.sunnary__price');
    // // cartCountProducts.innerHTML = `Item in cart : ${cartObject.allCount()}`;