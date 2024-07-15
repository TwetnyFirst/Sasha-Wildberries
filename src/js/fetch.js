async function fetchProducts(url){
    let response = fetch(url);
    let products = (await response).json();
    return products;
}
export {fetchProducts};