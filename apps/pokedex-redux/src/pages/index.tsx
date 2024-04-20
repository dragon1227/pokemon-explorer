import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import type {
  TBasicItem,
  TPokemonDetails,
  TPokemonTypeEnum,
} from "@repo/types";
import Button from "@repo/ui/components/common/button";
import PokemonTypeTagComponent from "@repo/ui/components/pokemon/type";
import { parsePokemonId } from "@repo/utils";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import { fetchPokemonDetail, fetchPokemons } from "@/store/pokemon/thunk";
import useAppSelector from "@/hooks/use-app-selector";
import useAppDispatch from "@/hooks/use-app-dispatch";

export default function IndexPage() {
  const { items, pokemons, page, limit, hasNext, hasPrev, isLoading, total } =
    useAppSelector((state) => state.pokemon);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!items) {
      dispatch(fetchPokemons({ page, limit }));
    }
  }, []);
  useEffect(() => {
    if (items) {
      items.forEach((item) => {
        const id = parsePokemonId(item.url);
        if (id && !Object.keys(pokemons).includes(String(id)))
          dispatch(fetchPokemonDetail(id));
      });
    }
  }, [dispatch, items, pokemons]);

  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },
    {
      field: "imgSrc",
      headerName: "Image",
      width: 20,
      renderCell(params) {
        return (
          <Image
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- no need to worry
            alt={params.row.name}
            className="w-full h-full"
            height={40}
            src={params.value}
            width={40}
          />
        );
      },
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "height", headerName: "Height (m)", width: 150 },
    { field: "weight", headerName: "Weight (kg)", width: 150 },
    {
      field: "types",
      headerName: "Type",
      width: 150,
      renderCell(params) {
        return (
          <div className="flex items-center h-full gap-1">
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- no need to worry */}
            {params.value?.map((type: TBasicItem<TPokemonTypeEnum>) => (
              <PokemonTypeTagComponent key={type.name} type={type.name} />
            ))}
          </div>
        );
      },
    },
    {
      field: "stats",
      headerName: "Total Stats",
      width: 150,
      renderCell(params) {
        if (!params.value) return null;
        const stats = params.value as TPokemonDetails["stats"];
        const totalValue = stats.find((item) => item.name === "total")?.value;
        return <div>{totalValue}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell(params) {
        return (
          <Button
            className="p-1 leading-3"
            onClick={() => {
              router.push(`/pokemon/${params.id}`);
            }}
            variant="none"
          >
            View
          </Button>
        );
      },
    },
  ];
  const rows = useMemo(() => {
    return (
      items?.map((item, idx) => {
        const id = parsePokemonId(item.url);
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- should check
        return id && pokemons[id]
          ? pokemons[id]
          : { id: id ?? idx, name: item.name, paddedId: id };
      }) ?? []
    );
  }, [items, pokemons]);
  const onPagination = ({
    pageSize,
    page: _page,
  }: {
    pageSize: number;
    page: number;
  }) => {
    dispatch(fetchPokemons({ page: _page + 1, limit: pageSize }));
  };
  return (
    <div className="w-full h-[800px] p-4">
      <DataGrid
        columns={columns}
        loading={isLoading}
        onPaginationModelChange={onPagination}
        pageSizeOptions={[10]}
        pagination
        paginationMeta={{
          hasNextPage: hasNext,
        }}
        paginationMode="server"
        paginationModel={{
          page: page - 1,
          pageSize: limit,
        }}
        rowCount={total}
        rows={rows}
      />
    </div>
  );
}
