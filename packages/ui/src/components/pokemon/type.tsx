import { TPokemonTypeEnum } from "@repo/types";

export const pokemonTypeStyleVariants: Record<TPokemonTypeEnum, string> = {
  [TPokemonTypeEnum.Normal]: "bg-[var(--pokemon-type-bg-normal)]",
  [TPokemonTypeEnum.Bug]: "bg-[var(--pokemon-type-bg-bug)]",
  [TPokemonTypeEnum.Dark]: "bg-[var(--pokemon-type-bg-dark)]",
  [TPokemonTypeEnum.Dragon]: "bg-[var(--pokemon-type-bg-dragon)]",
  [TPokemonTypeEnum.Electric]: "bg-[var(--pokemon-type-bg-electric)]",
  [TPokemonTypeEnum.Fairy]: "bg-[var(--pokemon-type-bg-fairy)]",
  [TPokemonTypeEnum.Fighting]: "bg-[var(--pokemon-type-bg-fighting)]",
  [TPokemonTypeEnum.Fire]: "bg-[var(--pokemon-type-bg-fire)]",
  [TPokemonTypeEnum.Flying]: "bg-[var(--pokemon-type-bg-flying)]",
  [TPokemonTypeEnum.Ghost]: "bg-[var(--pokemon-type-bg-ghost)]",
  [TPokemonTypeEnum.Grass]: "bg-[var(--pokemon-type-bg-grass)]",
  [TPokemonTypeEnum.Ground]: "bg-[var(--pokemon-type-bg-ground)]",
  [TPokemonTypeEnum.Ice]: "bg-[var(--pokemon-type-bg-ice)]",
  [TPokemonTypeEnum.Poison]: "bg-[var(--pokemon-type-bg-poison)]",
  [TPokemonTypeEnum.Rock]: "bg-[var(--pokemon-type-bg-rock)]",
  [TPokemonTypeEnum.Steel]: "bg-[var(--pokemon-type-bg-steel)]",
  [TPokemonTypeEnum.Water]: "bg-[var(--pokemon-type-bg-water)]",
  [TPokemonTypeEnum.Unknown]: "bg-[var(--pokemon-type-bg-unknown)]",
  [TPokemonTypeEnum.Physical]: "bg-[var(--pokemon-type-bg-physical)]",
  [TPokemonTypeEnum.Shadow]: "bg-[var(--pokemon-type-bg-shadow)]",
};

export default function PokemonTypeTagComponent({
  type,
}: {
  type: TPokemonTypeEnum;
}): JSX.Element {
  return (
    <div
      className={`text-xs rounded-full ${pokemonTypeStyleVariants[type]} leading-3 py-1 px-2 text-white`}
      key={type}
    >
      {type}
    </div>
  );
}
