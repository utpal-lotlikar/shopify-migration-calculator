"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ShopifyCostData } from "@/lib/types";

export const description = "A multiple bar chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

function calculateShopifyCost(
  shopify_fees: number,
  orders: number,
  avg_order_value: number,
  transaction_fee: number,
  order_growth: number,
  total_app_cost: number
): number[] {
  const annualCosts: number[] = [];

  let transaction_cost = orders * avg_order_value * (transaction_fee / 100);

  // Calculate total annual cost for the first year
  let totalAnnualCost = (shopify_fees + transaction_cost + total_app_cost) * 12;
  annualCosts.push(totalAnnualCost);

  // Loop through and calculate costs for the next 4 years
  for (let year = 1; year < 5; year++) {
    orders *= 1 + order_growth / 100;

    transaction_cost = orders * avg_order_value * (transaction_fee / 100);

    totalAnnualCost = (shopify_fees + transaction_cost + total_app_cost) * 12;
    annualCosts.push(totalAnnualCost);
  }

  return annualCosts;
}

function calculateMedusaCost(shopify_cost: number) {
  console.log("Shopify Cost: " + shopify_cost);
  const annualCosts: number[] = [];

  const migration_fees = shopify_cost * 0.85;

  const hosting_cost = 2400;
  const amc_cost = shopify_cost * 0.2;

  annualCosts.push(migration_fees + hosting_cost);

  let total_cost = hosting_cost + amc_cost;
  annualCosts.push(total_cost);

  // Loop through and calculate costs for the next 3 years
  for (let year = 2; year < 5; year++) {
    total_cost *= 1.1; //10% increase in cost for each year
    annualCosts.push(total_cost);
  }

  return annualCosts;
}

export function ShopifyCostBarChart({
  shopify_fees,
  orders,
  avg_order_value,
  transaction_fee,
  order_growth,
  total_app_cost,
}: ShopifyCostData) {
  const shopifyAnnualCosts = calculateShopifyCost(
    shopify_fees,
    orders,
    avg_order_value,
    transaction_fee,
    order_growth,
    total_app_cost
  );
  const medusaAnnualCosts = calculateMedusaCost(shopifyAnnualCosts[0]);

  const chartData = [
    {
      year: "Year 1",
      shopify: shopifyAnnualCosts[0],
      medusa: medusaAnnualCosts[0],
    },
    {
      year: "Year 2",
      shopify: shopifyAnnualCosts[1],
      medusa: medusaAnnualCosts[1],
    },
    {
      year: "Year 3",
      shopify: shopifyAnnualCosts[2],
      medusa: medusaAnnualCosts[2],
    },
    {
      year: "Year 4",
      shopify: shopifyAnnualCosts[3],
      medusa: medusaAnnualCosts[3],
    },
    {
      year: "Year 5",
      shopify: shopifyAnnualCosts[4],
      medusa: medusaAnnualCosts[4],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shopify Vs Medusa Expenses</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="shopify" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="medusa" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          You will save <b className="font-semibold">67.2%</b> over next 5 years{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}
