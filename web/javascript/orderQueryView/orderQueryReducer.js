import { QUERY } from "./orderQueryConstants"

const initialState = {
  query: "",
  submission_in_process: false,
  table: [],
};

const orderQueryReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUERY.UPDATE_QUERY: {
      state = {...state};
      state.query = action.payload;
      break;
    }
    case QUERY.SUBMISSION_STATUS: {
      state = {...state};
      state.submission_in_process = action.payload;
      break;
    }
    case QUERY.UPDATE_TABLE: {
      state = {...state};
      state.table = action.payload;
      break;
    }
    case QUERY.CLEAR_TABLE: {
      state = {...state};
      state.table = [];
      break;
    }
  }

  return state;
};

export default orderQueryReducer;
