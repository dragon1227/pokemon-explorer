import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { QUERY_KEYS } from "@/config/const";
import { getPokemonListRequest } from "@/lib/requests/pokemon-request";
import { TBasicItem } from "@repo/types";

export const usePokemons = ({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) => {
  const queryKey = [QUERY_KEYS.pokemons, limit, page];
  const offset = useMemo(() => {
    return (page - 1) * limit;
  }, [page, limit]);
  const [total, setTotal] = useState<number>();
  const [[hasPrev, hasNext], setHasMore] = useState<[boolean, boolean]>([
    false,
    true,
  ]);
  const totalPages = useMemo((): number => {
    return Math.ceil(total ?? 0 / limit);
  }, [total, limit]);
  const query = useQuery({
    queryKey,
    queryFn: () =>
      getPokemonListRequest({ limit, offset }).then((res) => {
        setTotal(res?.count);
        setHasMore([Boolean(res?.previous), Boolean(res?.next)]);
        return res?.results as TBasicItem[];
      }),
    enabled: page > 0,
  });
  return {
    queryKey,
    hasNext,
    hasPrev: hasPrev && page > 1,
    total,
    totalPages,
    ...query,
  };
};
