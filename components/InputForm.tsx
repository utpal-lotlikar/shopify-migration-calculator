"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCallback, useState } from "react";
import { schema } from "@/lib/types";
import { DollarSign } from "lucide-react";
import { ShopifyCostBarChart } from "./ShopifyCostBarChart";
import { inputStore } from "@/lib/store";

export const InputForm = () => {
  const [showForm, setShowForm] = useState(true);
  const setFormData = inputStore((state) => state.setFormData);
  const resetFormData = inputStore((state) => state.reset);

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
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    setFormData(
      values.shopify_fees,
      values.orders,
      values.avg_order_value,
      values.transaction_fee,
      values.order_growth,
      values.nos_apps,
      values.total_app_cost
    );
    setShowForm(false);
  }

  const handleBack = useCallback(() => {
    setShowForm(true);
    resetFormData();
    form.reset();
  }, [form, resetFormData]);

  return (
    <>
      <div className="border rounded-lg p-4 shadow-sm mt-1">
        <h2 className="text-2xl">Shopify Plus Cost Comparison</h2>
        <h4 className="mb-5 text-sm">
          Check saving when you migrate from Shopify Plus Plan to Medusa
        </h4>
        {showForm ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:flex gap-2">
                <FormField
                  control={form.control}
                  name="orders"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Orders (Monthly):</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="md:flex gap-2">
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
              <div className="md:flex gap-2">
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
        ) : (
          <div className="space-y-4">
            <ShopifyCostBarChart />
            {/* <p className="text-2">
              If you want to discuss how you can achieve this saving click on
              the button below
            </p>
            <Button className="w-full">I want to discuss migration</Button> */}
            <Button onClick={handleBack}>Back</Button>
          </div>
        )}
      </div>
    </>
  );
};
