export type TBasicItem<T = string> = {
  name: T;
  url: string;
};

export type TPokemonAPIPaginatedResponse<T = TBasicItem> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
};
