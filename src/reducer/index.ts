import { handleActions } from "redux-actions";

import modelReducer from "./model";
import viewReducer from "./view";

export default function( state, action ){
  if( !state ){
    console.log("init");
  }
  state = {
    models: modelReducer( state, action ),
    views: viewReducer( state, action )
  };
  console.log(state);

  return state;
}

//export default handleActions({},defaultState);