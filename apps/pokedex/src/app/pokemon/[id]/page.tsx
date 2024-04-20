"use client";

import PokemonDetailCardComponent from "@repo/ui/components/pokemon/pokemon-detail-card";
import { formatPokemonData } from "@repo/utils";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { usePokemon } from "@/hooks/use-pokemon";

export default function PokemonPage(props: { params: { id: number } }) {
  const { id } = props.params;
  const { data, isPending, error } = usePokemon(id);
  const details = useMemo(() => {
    if (!data) return undefined;
    return formatPokemonData(data);
  }, [data]);
  const router = useRouter();
  const onBackClick = () => {
    router.push("/");
  };
  return (
    <div className="flex flex-col justify-center items-center w-screen min-h-screen p-4">
      {isPending ? (
        <>Loading</>
      ) : error ? (
        <>{error}</>
      ) : details ? (
        <PokemonDetailCardComponent
          details={details}
          onBackClick={onBackClick}
        />
      ) : null}
    </div>
  );
}
