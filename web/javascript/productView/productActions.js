import { CART, PRODUCTS, ROUTES } from "./productConstants"
import $ from "jquery";
import { setMessage } from "../message/messageActions";

export function addProduct (product) {
  return {
    type: CART.ADD,
    payload: product
  }
}

export function updateQuant (productId, quant) {
  return {
    type: PRODUCTS.UPDATE_QUANT,
    payload: {id:productId, quant:quant}
  }
}

export function removeProduct (productId) {
  return {
    type: CART.REMOVE,
    payload: productId
  }
}

export function clearProducts () {
  return {
    type: CART.CLEAR,
  }
}

export function setLoadingProducts(status){
  return {
    type: PRODUCTS.SET_LOADING_PRODUCTS,
    payload: status,
  }
}

export function setProducts(products){
  return {
    type: PRODUCTS.SET_PRODUCTS,
    payload: products,
  }
}

function parseResponse(result){
  let payload = {};
  result.products.map((product) => {
     payload[product.id] = product;
    }
  );
  return payload;
}

export function handleGETProducts(){
  const url = ROUTES.products;
  return (dispatch) => {
    dispatch(setLoadingProducts(true));
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'json',
      success: function(result){
        let payload = parseResponse(result);
        dispatch(setProducts(payload));
        dispatch(setLoadingProducts(false));
      }.bind(this),
      error: function(){
        dispatch(setMessage('Could not successfully retrieve information from server', "danger"));
      }.bind(this),
    });
  };
}

export function selectProduct(product){
  return {
    type: PRODUCTS.SELECT_PRODUCT,
    payload: product,
  }
}

