import { updateField } from "vuex-map-fields";

export default {
  SET_PURCHASES(state, { purchase, length }) {
    state.purchases = purchase;
    state.totalRecord = length;
  },
  ADD_PURCHASE(state, purchase) {
    state.purchases = state.courses.unshift(purchase);
  },
  VERIFY_PURCHASE(state, id) {
    let purchase = state.purchases.find((item) => {
      return item.id === id;
    });
    purchase.status = "VERIFIED";
  },
  updateField,
};
