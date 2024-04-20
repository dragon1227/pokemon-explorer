import useAppDispatch from '@/hooks/use-app-dispatch';
import useAppSelector from '@/hooks/use-app-selector';
import { setPagination } from '@/store/pokemon/slice';
import { fetchPokemonDetail, fetchPokemons } from '@/store/pokemon/thunk';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { TBasicItem, TPokemon, TPokemonDetails, TPokemonTypeEnum } from '@repo/types';
import Button from '@repo/ui/components/common/button';
import PokemonTypeTagComponent from '@repo/ui/components/pokemon/type';
import { parsePokemonId } from '@repo/utils';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

export default function IndexPage() {
  const { items, pokemons, page, limit, hasNext, hasPrev, isLoading, total } = useAppSelector((state) => state.pokemon)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!items) {
      dispatch(fetchPokemons({ page, limit }))
    }
  }, [])
  useEffect(() => {
    if (items) {
      items.forEach((item) => {
        const id = parsePokemonId(item.url)
        if (id && !pokemons[id])
          dispatch(fetchPokemonDetail(id))
      })
    }
  }, [items])

  const router = useRouter()

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 20 },
    {
      field: 'imgSrc', headerName: 'Image', width: 20, renderCell(params) {
        return (<img src={params.value} className='w-full h-full' />)
      },
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'height', headerName: 'Height (m)', width: 150 },
    { field: 'weight', headerName: 'Weight (kg)', width: 150 },
    {
      field: 'types', headerName: 'Type', width: 150, renderCell(params) {
        return (<div className='flex items-center h-full gap-1'>
          {params?.value?.map((type: TBasicItem<TPokemonTypeEnum>) => <PokemonTypeTagComponent key={type.name} type={type.name} />)}
        </div>)
      },
    },
    {
      field: 'stats', headerName: 'Total Stats', width: 150, renderCell(params) {
        if (!params?.value) return null
        const stats = params.value as TPokemonDetails['stats']
        const total = stats.find((item) => item.name === 'total')?.value
        return (<div>{total}</div>)
      },
    },
    {
      field: 'action', headerName: 'Action', width: 150, renderCell(params) {
        return <Button className='p-1 leading-3' variant='none' onClick={() => {
          router.push(`/pokemon/${params.id}`)
        }}>View</Button>
      }
    }
  ];
  const rows = useMemo(() => {
    return items?.map((item, idx) => {
      const id = parsePokemonId(item.url)
      return id && pokemons[id] ? pokemons[id] : { id: id ?? idx, name: item.name, paddedId: id }
    }) ?? []
  }, [items, pokemons])
  const onPagination = ({ pageSize, page }: { pageSize: number, page: number }) => {
    dispatch(fetchPokemons({ page: page + 1, limit: pageSize }))
  }
  return (
    <div className='w-full h-[800px] p-4'>
      <DataGrid rows={rows} rowCount={total} loading={isLoading} columns={columns} pagination={true} pageSizeOptions={[10]} paginationModel={{
        page: page - 1,
        pageSize: limit,
      }} onPaginationModelChange={onPagination} paginationMeta={{
        hasNextPage: hasNext,
      }} paginationMode='server' />
    </div>
  );
}
