import { CPokemonBaseUrl } from "@repo/utils";
import type {
  TPokemon,
  TPokemonAPIPaginatedRequest,
  TPokemonAPIPaginatedResponse,
} from "@repo/types";

export async function getPokemonListRequest(
  params: TPokemonAPIPaginatedRequest,
): Promise<TPokemonAPIPaginatedResponse | undefined> {
  const { offset, limit } = params;
  return fetch(`${CPokemonBaseUrl}/pokemon?offset=${offset}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (response) => {
      return (await response.json()) as Promise<TPokemonAPIPaginatedResponse>;
    })
    .catch((err) => {
      throw err;
    });
}

export async function getPokemonDetailsRequest(id: number): Promise<TPokemon> {
  if (!id) throw new Error("Invalid Pokemon ID");
  return fetch(`${CPokemonBaseUrl}/pokemon/${id}`).then(async (response) => {
    return (await response.json()) as Promise<TPokemon>;
  });
}
