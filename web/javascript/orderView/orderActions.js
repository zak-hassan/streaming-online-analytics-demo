import $ from "jquery";

import { setMessageWithTimeout } from "../message/messageActions";
import { clearProducts } from "../productView/productActions";
import { ORDER } from "./orderConstants";

export function checkout(cart){
  const url = "/mock/orderService";

  return(dispatch) => {
    $.ajax({
      type: "POST",
      url: url,
      data: cart,
      success: function() {
        dispatch(clearProducts)
        dispatch(setMessageWithTimeout("Successfully checkedout", "success"));
      },
      error: function() {
        dispatch(setMessageWithTimeout("Unable to checkout", "danger"));
      }
    })
  }
}

export function updateTotal(updateBy) {
  return {
    type: ORDER.UPDATE_TOTAL,
    payload: updateBy
  }
}



