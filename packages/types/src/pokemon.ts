import type { TBasicItem } from "./response";

export enum TPokemonStatEnum {
  HP = "hp",
  Attack = "attack",
  Defense = "defense",
  SpecialAttack = "special-attack",
  SpecialDefense = "special-defense",
  Speed = "speed",
}

export interface TPokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: TPokemonStatEnum;
    url: string;
  };
}

export interface TSprite {
  back_default: string;
  back_female?: string;
  back_shiny: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny: string;
  front_shiny_female?: string;
}

export enum TPokemonTypeEnum {
  Normal = "normal",
  Fighting = "fighting",
  Flying = "flying",
  Poison = "poison",
  Ground = "ground",
  Rock = "rock",
  Bug = "bug",
  Ghost = "ghost",
  Steel = "steel",
  Fire = "fire",
  Water = "water",
  Grass = "grass",
  Electric = "electric",
  Physical = "physical",
  Ice = "ice",
  Dragon = "dragon",
  Dark = "dark",
  Fairy = "fairy",
  Unknown = "unknown",
  Shadow = "shadow",
}

export interface TPokemon {
  id: number;
  name: string;
  order: number;
  species: TBasicItem;
  sprites: TSprite & {
    other: {
      dream_world: Partial<TSprite>;
      home: Partial<TSprite>;
      "official-artwork": Partial<TSprite>;
      showdown: Partial<TSprite>;
    };
  };
  is_default: boolean;
  types: {
    slot: number;
    type: TBasicItem<TPokemonTypeEnum>;
  }[];
  abilities: {
    ability: TBasicItem[];
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: TBasicItem[];
  stats: TPokemonStat[];
  height: number;
  weight: number;
}

export interface TPokemonDetails {
  id: number;
  order: number;
  species: TPokemon["species"];
  sprites: TPokemon["sprites"];
  is_default: TPokemon["is_default"];
  types: TBasicItem<TPokemonTypeEnum>[];
  abilities: TPokemon["abilities"];
  base_experience: TPokemon["base_experience"];
  cries: TPokemon["cries"];
  forms: TPokemon["forms"];
  stats: { name: string; value: number; max: number }[];
  height: TPokemon["height"];
  weight: TPokemon["weight"];
  imgSrc?: string;
  name: string;
  paddedId: string;
}
