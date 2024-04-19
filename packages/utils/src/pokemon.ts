import { TBasicItem, TPokemon, TPokemonStat } from "@repo/types";

export const parsePokemonId = (url: string) => {
  const idStr = url.match(/\/(\d+)\//)?.[1];
  const id = idStr ? Number(idStr) : undefined;
  return id;
};

export const getPokemonImage = (item: TBasicItem) => {
  const { url } = item;
  const id = parsePokemonId(url);
  const isPokemonHasSvg = id && id < 650;
  const base = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other`;

  if (isPokemonHasSvg) {
    return `${base}/dream-world/${id}.svg`;
  }

  return `${base}/official-artwork/${id}.png`;
};

export const removeHyphens = (str: string): string => {
  return str.replace(/-/g, " ");
};

/**
 * Formats the stats array obtained from the API into a well-structured object for easier usage.
 *
 * @param {Array} stats - The stats array obtained from the API.
 * @returns {Array} - The formatted stats array.
 */
export function formatStats(stats: Array<TPokemonStat>) {
  const statsMaxValues = {
    hp: 714,
    attack: 714,
    defense: 614,
    "special-attack": 504,
    "special-defense": 614,
    speed: 504,
  };

  const statsObject = stats.map(({ stat, base_stat }) => {
    return {
      name: removeHyphens(stat.name),
      value: base_stat,
      max: statsMaxValues[stat.name],
    };
  });

  const total = stats.reduce((total, { base_stat }) => total + base_stat, 0);

  return [...statsObject, { name: "total", value: total }];
}

export const formatPokemonData = (pokemon: TPokemon) => {
  const { id, name, sprites, weight, height, types } = pokemon;

  const weightInKg = weight / 10;
  const heightInMeter = height / 10;
  const paddedId = String(id).padStart(3, "0");
  const formattedTypes = types.map(({ type }) => type);
  const pokemonImg =
    sprites.other.dream_world.front_default ||
    sprites.other["official-artwork"].front_default;

  return {
    ...pokemon,
    paddedId,
    weight: weightInKg,
    imgSrc: pokemonImg,
    height: heightInMeter,
    types: formattedTypes,
    name: removeHyphens(name),
  };
};
