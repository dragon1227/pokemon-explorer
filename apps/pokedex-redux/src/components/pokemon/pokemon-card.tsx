import type { TBasicItem } from "@repo/types";
import PokemonCardComponent from "@repo/ui/components/pokemon/card";
import { parsePokemonId } from "@repo/utils";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { fetchPokemonDetail } from "@/store/pokemon/thunk";
import useAppSelector from "@/hooks/use-app-selector";
import useAppDispatch from "@/hooks/use-app-dispatch";

export default function PokemonCardWrapper({
  item,
}: {
  item: TBasicItem;
}): JSX.Element {
  const { pokemons } = useAppSelector((state) => state.pokemon);
  const dispatch = useAppDispatch();
  const id = useMemo(() => {
    return parsePokemonId(item.url);
  }, [item]);
  const data = id ? pokemons[id] : undefined;
  const fetchData = (params: number) => {
    async () => {
      await dispatch(fetchPokemonDetail(params));
    };
  };
  useEffect(() => {
    if (id && !data) {
      fetchData(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- no need to define callback
  }, [id, data]);
  return (
    <Link href={`/pokemon/${id}`}>
      <PokemonCardComponent isLoading={false} item={item} itemDetails={data} />
    </Link>
  );
}

function async(arg0: () => void) {
  throw new Error("Function not implemented.");
}
