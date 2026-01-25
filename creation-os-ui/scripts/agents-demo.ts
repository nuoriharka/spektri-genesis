#!/usr/bin/env ts-node
import { generate } from "@creationos/agents";

(async () => {
  const res = await generate("Write a catchy one-liner about Creation OS.");
  console.log(res);
})();
