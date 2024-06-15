import { ZodSchema, z } from 'zod';

// const BASE_URL = 'http://172.19.16.1:3000';
const BASE_URL = 'http://localhost:3000';

export const fetcher = async <OutSchema extends ZodSchema, InSchema extends ZodSchema = OutSchema>(
  [key, outSchema, inSchema]: [key: string, schema: OutSchema, InSchema?],
  options: {
    [Property in keyof Omit<RequestInit, 'body'>]: RequestInit[Property];
  } & { body?: z.infer<OutSchema> },
): Promise<z.infer<OutSchema>> => {
  const res = await fetch(
    BASE_URL + key,
    options && {
      ...options,
      headers: { 'Content-Type': 'application/json' },
      body: options.body && JSON.stringify(outSchema.parse(options.body)),
    },
  );
  const json = await res.json();
  if (!res.ok) {
    throw json;
  }
  return (inSchema || outSchema).parse(json);
};
