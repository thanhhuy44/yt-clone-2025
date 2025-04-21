"use client";

import { trpc } from "@/trpc/client";

const ClientComp = () => {
  const [data] = trpc.hello.useSuspenseQuery({ text: "Huy dep try" });
  return <h1>{data.greeting}</h1>;
};

export default ClientComp;
