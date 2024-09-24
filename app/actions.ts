"use server";

import { ShopifyCostState, schema } from "@/lib/types";
import { FieldErrors } from "react-hook-form";
import { z } from "zod";

export const onDataAction = async (
  prevState: ShopifyCostState,
  formData: FormData
): Promise<ShopifyCostState> => {
  const data = Object.fromEntries(formData);
  const parsed = schema.safeParse(data);

  type personType = z.infer<typeof schema>;

  if (parsed.success) {
    // if (parsed.data.first.includes("John")) {
    //   const errors: FieldErrors<personType> = {
    //     first: {
    //       type: "validation",
    //       message: "Duplicate user",
    //     },
    //   };

    //   return {
    //     message: "User John is already registered",
    //     fields: parsed.data,
    //     errors,
    //   };
    // }

    const fields: Record<string, string> = {};
    for (const key of Object.keys(data)) {
      fields[key] = data[key].toString();
    }

    console.log("Shopify costing saved");
    return { message: "Shopify Costing Saved", fields: fields };
  } else {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(data)) {
      fields[key] = data[key].toString();
    }

    const errors: FieldErrors<personType> = parsed.error.errors.reduce(
      (acc, error) => {
        const fieldName = error.path[0];
        console.log("Message: " + error.message);
        if (fieldName) {
          acc[fieldName as keyof personType] = {
            type: error.code,
            message: error.message,
          };
        }

        return acc;
      },
      {} as FieldErrors<personType>
    );

    return {
      errors,
      fields,
      message: "Invalid data provided, failed to calculate saving.",
    };
  }
};
