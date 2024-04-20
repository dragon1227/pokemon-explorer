import Button from "@repo/ui/components/common/button";
import { useEffect } from "react";
import useAppSelector from "@/hooks/use-app-selector";
import { fetchPokemons } from "@/store/pokemon/thunk";
import PokemonCardWrapper from "@/components/pokemon/pokemon-card";
import useAppDispatch from "@/hooks/use-app-dispatch";

function Home() {
  const { items, isLoading, page, limit, hasNext, hasPrev } = useAppSelector(
    (state) => state.pokemon,
  );
  const dispatch = useAppDispatch();
  if (!items) {
    dispatch(fetchPokemons({ page, limit }));
  }
  return (
    <div className="relative flex flex-col place-items-center p-4 mt-4">
      <div className="">
        {isLoading ? (
          "Loading..."
        ) : items ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <PokemonCardWrapper item={item} key={item.name} />
            ))}
          </div>
        ) : (
          <Button
            onClick={() => {
              dispatch(fetchPokemons({ page, limit }));
            }}
          >
            LOAD
          </Button>
        )}
        <div className="w-full flex items-center justify-center mt-4 gap-2">
          <Button
            className=""
            disabled={!hasPrev}
            onClick={() => {
              dispatch(fetchPokemons({ page: page - 1, limit }));
            }}
          >
            &lt;
          </Button>
          {page}
          <Button
            className=""
            disabled={!hasNext}
            onClick={() => {
              dispatch(fetchPokemons({ page: page + 1, limit }));
            }}
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
