import { QUERY, ROUTES } from "./orderQueryConstants"
import { setMessage, setMessageWithTimeout } from "../message/messageActions"
import $ from "jquery";

export function updateQuery (e) {
  e.preventDefault();
  let updatedValues = e.target.value;
  return {
    type: QUERY.UPDATE_QUERY,
    payload: updatedValues
  }
}

export function setSubmitQueryStatus(status){
  return {
    type: QUERY.SUBMISSION_STATUS,
    payload: status
  }
}

export function updateQueryTable(table){
  return {
    type: QUERY.UPDATE_TABLE,
    payload: table
  }
}

export function clearTable(){
  return {
    type: QUERY.CLEAR_TABLE,
  }
}

export function handlePostQuery (query){
  const url = ROUTES.SUBMIT_QUERY;
  return(dispatch) => {
    let payLoad = {query: query};
    dispatch(setSubmitQueryStatus(true));
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify(payLoad),
      dataType: 'json',
      contentType: 'application/json',
      success: function (result) {
        dispatch(setSubmitQueryStatus(false));
        // ToDo: If result is empty, display no results found?
        dispatch(updateQueryTable(result.products));
        dispatch(setMessageWithTimeout('Query Updated Successfully!', "success"));
      }.bind(this),
      error: function () {
        dispatch(setSubmitQueryStatus(false));
        dispatch(setMessage('Could not successfully send information to server', "danger"));
      }.bind(this)
    })
  }
}