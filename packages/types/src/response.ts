export interface TBasicItem<T = string> {
  name: T;
  url: string;
}

export interface TPokemonAPIPaginatedResponse<T = TBasicItem> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
