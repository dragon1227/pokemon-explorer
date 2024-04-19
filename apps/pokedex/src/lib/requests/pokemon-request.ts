import { CPokemonBaseUrl, parsePokemonId } from "@repo/utils";
import type {
  TBasicItem,
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

export async function getPokemonDetailsRequest(item: TBasicItem) {
  const { url } = item;
  const id = parsePokemonId(url);
  if (!id) throw new Error("Invalid Pokemon ID");
  return fetch(`${CPokemonBaseUrl}/pokemon/${id}`).then(async (response) => {
    return (await response.json()) as Promise<TPokemon>;
  });
}
