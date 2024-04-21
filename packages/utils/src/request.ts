/* eslint-disable @typescript-eslint/no-unsafe-member-access -- no need to worry about env file */
export const CPokemonBaseUrl = String(
  process.env.NEXT_PUBLIC_API_URL || "https://pokeapi.co/api/v2",
);
