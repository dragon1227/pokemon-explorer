import type { TBasicItem } from "@repo/types";
import PokemonCardComponent from "@repo/ui/components/pokemon/card";
import { formatPokemonData, parsePokemonId } from "@repo/utils";
import Link from "next/link";
import { useMemo } from "react";
import { usePokemon } from "@/hooks/use-pokemon";

export default function PokemonCardWrapper({
  item,
}: {
  item: TBasicItem;
}): JSX.Element {
  const id = useMemo(() => {
    return parsePokemonId(item.url);
  }, [item]);
  const { data, isPending } = usePokemon(id);
  const itemDetails = useMemo(() => {
    if (!data) return undefined;
    return formatPokemonData(data);
  }, [data]);
  return (
    <Link href={`/pokemon/${id}`}>
      <PokemonCardComponent
        isLoading={isPending}
        item={item}
        itemDetails={itemDetails}
      />
    </Link>
  );
}
