#!/usr/bin/env ts-node
import { generate } from "@spektri/agents";

(async () => {
  const res = await generate("Write a catchy one-liner about Spektri.");
  console.log(res);
})();
