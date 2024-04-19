import type { TPokemon, TPokemonDetails, TPokemonStat } from "@repo/types";

export const parsePokemonId = (url: string): number | undefined => {
  const idStr = /\/(\d+)\//.exec(url)?.[1];
  const id = idStr ? Number(idStr) : undefined;
  return id;
};

export const getPokemonImage = (id: number): string => {
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

export function formatStats(
  stats: TPokemonStat[],
): { name: string; value: number; max: number }[] {
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

  const totalValue = stats.reduce(
    (total, { base_stat }) => total + base_stat,
    0,
  );

  return [
    ...statsObject,
    { name: "total", value: totalValue, max: totalValue },
  ];
}

export const formatPokemonData = (pokemon: TPokemon): TPokemonDetails => {
  const { id, name, sprites, weight, height, types } = pokemon;

  const weightInKg = weight / 10;
  const heightInMeter = height / 10;
  const paddedId = String(id).padStart(3, "0");
  const formattedTypes = types.map(({ type }) => type);
  const formattedStats = formatStats(pokemon.stats);
  const pokemonImg =
    sprites.other.dream_world.front_default ||
    sprites.other["official-artwork"].front_default;

  return {
    id: pokemon.id,
    order: pokemon.order,
    species: pokemon.species,
    sprites: pokemon.sprites,
    is_default: pokemon.is_default,
    abilities: pokemon.abilities,
    base_experience: pokemon.base_experience,
    cries: pokemon.cries,
    forms: pokemon.forms,
    paddedId,
    weight: weightInKg,
    imgSrc: pokemonImg,
    height: heightInMeter,
    types: formattedTypes,
    stats: formattedStats,
    name: removeHyphens(name),
  };
};
