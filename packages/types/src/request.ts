export type TPokemonAPIPaginatedRequest = {
  offset: number | undefined;
  limit: number | undefined;
};

export enum TPokemonAPIEndpointEnum {
  Pokemon = "pokemon",
  PokemonForm = "pokemon-form",
}
