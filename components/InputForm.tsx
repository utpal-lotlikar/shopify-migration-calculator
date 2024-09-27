"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { onDataAction } from "@/app/actions";
import { schema } from "@/lib/types";
import { DollarSign } from "lucide-react";
import { ShopifyCostBarChart } from "./ShopifyCostBarChart";

export const InputForm = () => {
  const initialState = { message: "" };
  const [state, formAction] = useFormState(onDataAction, initialState);
  const [showForm, setShowForm] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      shopify_fees: 2500,
      orders: 500,
      avg_order_value: 100,
      transaction_fee: 0.2,
      order_growth: 10,
      nos_apps: 10,
      total_app_cost: 500,
      ...(state?.fields ?? {}),
    },
    errors: state.errors,
  });

  useEffect(() => {
    if (state.message) {
      setShowForm(false);
    }
  }, [state.message]);

  const handleBack = () => {
    setShowForm(true);
  };

  return (
    <>
      <div className="border rounded-lg p-6 shadow-sm mt-10">
        <h2 className="text-2xl">Shopify Plus Cost Comparison</h2>
        <h4 className="mb-5">
          Check your saving when you migrate from Shopify Plus Plan to Medusa
        </h4>
        {showForm ? (
          <Form {...form}>
            {/* {state?.message !== "" && !state.errors && (
            <div className="text-sm font-medium text-green-500">
              {state.message}
            </div>
          )} */}
            {state?.message !== "" && state.errors && (
              <div className="text-sm font-medium text-destructive">
                {state.message}
              </div>
            )}
            <form
              ref={formRef}
              action={formAction}
              onSubmit={(evt) => {
                evt.preventDefault();
                form.handleSubmit(() => {
                  console.log("called form submit");
                  formRef.current?.submit();
                })(evt);
              }}
              className="space-y-2"
            >
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="shopify_fees"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Shopify Plus Cost (Monthly):</FormLabel>
                      <FormControl>
                        <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                          <DollarSign className="h-[16px] w-[16px]" />
                          <input
                            {...field}
                            type="number"
                            className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                      </FormControl>
                      {/* <FormDescription>Shopify Plus monthly fees</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="orders"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Orders (Monthly):</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      {/* <FormDescription>Monthly orders</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="avg_order_value"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Average Order Value</FormLabel>
                      <FormControl>
                        <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                          <DollarSign className="h-[16px] w-[16px]" />
                          <input
                            {...field}
                            type="number"
                            className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                      </FormControl>
                      {/* <FormDescription>Average value of orders</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="transaction_fee"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Transaction Fee (%):</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step=".01"
                          inputMode="decimal"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>Rate of transaction fee</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="order_growth"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Order Growth (% Year):</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          step=".01"
                          inputMode="decimal"
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>Yearly order growth rate</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="nos_apps"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>No. of Shopify Apps:</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      {/* <FormDescription>Rate of transaction fee</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="total_app_cost"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Total App Fees (Monthly):</FormLabel>
                      <FormControl>
                        <div className="flex h-10 items-center rounded-md border border-input bg-white pl-3 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
                          <DollarSign className="h-[16px] w-[16px]" />
                          <input
                            {...field}
                            type="number"
                            className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                      </FormControl>
                      {/* <FormDescription>Yearly order growth rate</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit">Calculate My Savings</Button>
            </form>
          </Form>
        ) : state?.message ? (
          <div className="space-y-4">
            {/* <div className="p-4 bg-green-100 text-green-700 rounded-md">
            {state.message}
          </div> */}
            <ShopifyCostBarChart
              shopify_fees={Number(state.fields?.shopify_fees)}
              orders={Number(state.fields?.orders)}
              avg_order_value={Number(state.fields?.avg_order_value)}
              transaction_fee={Number(state.fields?.transaction_fee)}
              order_growth={Number(state.fields?.order_growth)}
              nos_apps={Number(state.fields?.nos_apps)}
              total_app_cost={Number(state.fields?.total_app_cost)}
            />
            <p className="text-2">
              If you want to discuss how you can achieve this saving click on
              the button below
            </p>
            <Button className="w-full">I want to discuss migration</Button>
            <Button onClick={handleBack}>Back</Button>
          </div>
        ) : null}
      </div>
    </>
  );
};
