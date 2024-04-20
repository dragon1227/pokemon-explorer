'use client';

import PokemonDetailCardComponent from '@repo/ui/components/pokemon/pokemon-detail-card';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { fetchPokemonDetail } from '@/store/pokemon/thunk';
import useAppSelector from '@/hooks/use-app-selector';
import useAppDispatch from '@/hooks/use-app-dispatch';

export default function PokemonPage() {
  const router = useRouter()
  const { id: _id } = router.query
  const id: number | undefined = _id instanceof Array ? Number(_id[0]) : Number(_id)
  const { pokemons } = useAppSelector((state) => state.pokemon)
  const dispatch = useAppDispatch()

  const details = useMemo(() => {
    return !id ? undefined : pokemons[id]
  }, [pokemons, id])

  useEffect(() => {
    if (id) {
      if (!details) dispatch(fetchPokemonDetail(id))
    }
  }, [id, details, dispatch])

  const onBackClick = () => {
    router.push('/')
  }
  return (
    <div className="flex flex-col justify-center items-center w-screen flex-1 p-4">
      {!details ? (
        <>Loading</>
      ) : (
        <PokemonDetailCardComponent
          details={details}
          onBackClick={onBackClick}
        />
      )}
    </div>
  );
}