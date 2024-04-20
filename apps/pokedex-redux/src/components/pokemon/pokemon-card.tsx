import useAppDispatch from "@/hooks/use-app-dispatch";
import useAppSelector from "@/hooks/use-app-selector";
import { fetchPokemonDetail } from "@/store/pokemon/thunk";
import type { TBasicItem } from "@repo/types";
import PokemonCardComponent from "@repo/ui/components/pokemon/card";
import { parsePokemonId } from "@repo/utils";
import Link from "next/link";
import { useEffect, useMemo } from "react";

export default function PokemonCardWrapper({ item }: { item: TBasicItem }): JSX.Element {
  const { pokemons } = useAppSelector((state) => state.pokemon)
  const dispatch = useAppDispatch()
  const id = useMemo(() => {
    return parsePokemonId(item.url)
  }, [item])
  const data = id && pokemons ? pokemons[id] : undefined
  useEffect(() => {
    if (id && !data) {
      dispatch(fetchPokemonDetail(id))
    }
  }, [id, data])
  return (
    <Link href={`/pokemon/${id}`}>
      <PokemonCardComponent itemDetails={data} isLoading={false} item={item} />
    </Link>
  )
}