import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/config/const";
import { getPokemonDetailsRequest } from "@/lib/requests/pokemon-request";

export const usePokemon = (id?: number) => {
  const queryKey = [QUERY_KEYS.pokemon, id];
  const query = useQuery({
    queryKey,
    queryFn: () => (id ? getPokemonDetailsRequest(id) : null),
    enabled: Boolean(id),
  });
  return { queryKey, ...query };
};
