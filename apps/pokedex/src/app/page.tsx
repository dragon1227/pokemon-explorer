"use client";

import { useState } from "react";
import type { TBasicItem } from "@repo/types";
import Button from "@repo/ui/components/common/button";
import { usePokemons } from "@/hooks/use-pokemons";
import PokemonCardWrapper from "@/components/pokemon/pokemon-card";

export default function Page(): JSX.Element {
  const [[page, limit], setPagination] = useState<[number, number]>([1, 12]);
  const {
    data: items,
    isPending,
    hasNext,
    hasPrev,
  } = usePokemons({
    page,
    limit,
  });
  return (
    <div className="relative flex flex-col place-items-center p-4 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {isPending
          ? "Loading..."
          : items?.map((item: TBasicItem) => (
              <PokemonCardWrapper item={item} key={item.name} />
            ))}
      </div>
      <div className="w-full flex items-center justify-center mt-4 gap-2">
        <Button
          className=""
          disabled={!hasPrev}
          onClick={() => {
            setPagination((val) => [val[0] - 1, val[1]]);
          }}
        >
          &lt;
        </Button>
        <Button
          className=""
          disabled={!hasNext}
          onClick={() => {
            setPagination((val) => [val[0] + 1, val[1]]);
          }}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
}
