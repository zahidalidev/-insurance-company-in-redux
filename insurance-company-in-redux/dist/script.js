console.clear();
const { createStore, combineReducers } = Redux;

//initiak state
const state = {
  oldHistoryOfClaims: [],
  bagOfMoney: 20,
  listOfPolicies: ["zahid"]
};

//action creators (people droping of form)
const createClaim = (name, moneyToCollect) => {
  return {
    //action
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      moneyToCollect: moneyToCollect
    }
  };
};
const createPolicy = (name) => {
  return {
    //aciton
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: 20
    }
  };
};
const deletePolicy = (name) => {
  return {
    //action
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  };
};

//reducers (departments)
const claimHistory = (
  oldHistoryOfClaims = state.oldHistoryOfClaims,
  action
) => {
  switch (action.type) {
    case "CREATE_CLAIM":
      return [...oldHistoryOfClaims, action.payload];
    default:
      return oldHistoryOfClaims;
  }
};
const accounting = (bagOfMoney = state.bagOfMoney, action) => {
  switch (action.type) {
    case "CREATE_CLAIM":
      return bagOfMoney - action.payload.moneyToCollect;
    case "CREATE_POLICY":
      return bagOfMoney + action.payload.amount;
    default:
      return bagOfMoney;
  }
};
const policies = (listOfPolicies = state.listOfPolicies, action) => {
  switch (action.type) {
    case "CREATE_POLICY":
      return [...listOfPolicies, action.payload.name];
    case "DELETE_POLICY":
      return listOfPolicies.filter((policy) => policy != action.payload.name);
    default:
      return listOfPolicies;
  }
};

//combining reducers
const ourDepartments = combineReducers({
  accounting: accounting,
  claimHistory: claimHistory,
  policies: policies
});

//reating store

const store = createStore(ourDepartments);

//dispatching actions
store.dispatch(createPolicy("zahid2")); //passing actions with parameters to dispatch function
store.dispatch(createPolicy("zahid3"));
store.dispatch(createClaim("zahid2", 20));

console.log(store.getState());