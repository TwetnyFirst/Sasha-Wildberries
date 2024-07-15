import Swiper from '../../node_modules/swiper/swiper-bundle.min.mjs';
import { createElement,header } from './index.js';
import { fetchProducts } from './fetch.js';
async function createSlider(){
  let products = await fetchProducts('https://6688f7220ea28ca88b868e3f.mockapi.io/Wildberies');
  const swiperBlock = createElement('section','swiper-block',null);
  header.after(swiperBlock);
  const swiper = createElement('div','swiper',null);
  swiperBlock.append(swiper);
  const swiperWrap = createElement('div','swiper-wrapper',null);
  swiper.append(swiperWrap);
  for(let i = 0; i < 7; i++){
      const swiperElem = createElement('div','swiper-slide',null);
      swiperWrap.append(swiperElem);
      const swiperImg = createElement('img','swiper-img',null);
      swiperImg.setAttribute('src',products[i].picture);
      swiperElem.append(swiperImg);
  }
  const pagination = createElement('div','swiper-pagination',null);
  swiper.append(pagination);
  const prevButton = createElement('div','swiper-button-prev',null);
  swiper.append(prevButton);
  const nextButton = createElement('div','swiper-button-next',null);
  swiper.append(nextButton);
  const newSwiper = new Swiper('.swiper', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
}
export {createSlider};