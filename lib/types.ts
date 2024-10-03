import { FieldErrors } from "react-hook-form";
import { z } from "zod";

export const schema = z.object({
  shopify_fees: z.coerce.number().min(299, {
    message: "Shopify Cost cannot be less than $299",
  }),
  orders: z.coerce.number().min(10, {
    message: "Monthly Orders cannot be less than 10",
  }),
  avg_order_value: z.coerce.number().min(10, {
    message: "Avg Order Value cannot be less than $10",
  }),
  transaction_fee: z.coerce.number().min(0, {
    message: "Transaction Fee is required",
  }),
  order_growth: z.coerce.number().min(0, {
    message: "Order Growth is required",
  }),
  nos_apps: z.coerce.number().min(0, {
    message: "Nos of Apps is required",
  }),
  total_app_cost: z.coerce.number().min(0, {
    message: "App Cost cannot be less than 0",
  }),
});

export type ShopifyCostState = {
  fields?: Record<string, string>;
  errors?: FieldErrors;
  message?: string | null;
};

export type ShopifyCostData = {
  shopify_fees: number;
  orders: number;
  avg_order_value: number;
  transaction_fee: number;
  order_growth: number;
  nos_apps: number;
  total_app_cost: number;
}
