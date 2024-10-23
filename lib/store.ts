import { create } from "zustand";
import { FormDataState } from "./types";

export const inputStore = create<FormDataState>((set) => ({
  shopify_fees: 2500,
  orders: 500,
  avg_order_value: 100,
  transaction_fee: 0.2,
  order_growth: 10,
  nos_apps: 10,
  total_app_cost: 500,

  setFormData: (
    shopify_fees,
    orders,
    avg_order_value,
    transaction_fee,
    order_growth,
    nos_apps,
    total_app_cost
  ) =>
    set({
      shopify_fees,
      orders,
      avg_order_value,
      transaction_fee,
      order_growth,
      nos_apps,
      total_app_cost,
    }),

  reset: () =>
    set({
      shopify_fees: 2500,
      orders: 500,
      avg_order_value: 100,
      transaction_fee: 0.2,
      order_growth: 10,
      nos_apps: 10,
      total_app_cost: 500,
    }),
}));
