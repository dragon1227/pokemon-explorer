import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { getPokemonImage, parsePokemonId } from "@repo/utils";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import Image from "next/image";
import { fetchPokemons } from "@/store/pokemon/thunk";
import useAppSelector from "@/hooks/use-app-selector";
import useAppDispatch from "@/hooks/use-app-dispatch";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export default function IndexPage() {
  const { items, page, limit, hasNext, isLoading, total } = useAppSelector(
    (state) => state.pokemon,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!items) {
      dispatch(fetchPokemons({ page, limit }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only first rendering
  }, []);

  const router = useRouter();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "imgSrc",
      headerName: "Image",
      width: 100,
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
    {
      field: "name", headerName: "Name", flex: 1, renderCell(params) {
        return (<span className="capitalize font-bold">{params.value}</span>)
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell(params) {
        return (
          <IconButton
            onClick={() => {
              router.push(`/pokemon/${params.id}`);
            }}
          >
            <RemoveRedEyeIcon />
          </IconButton>
        );
      },
    },
  ];

  const rows = useMemo(() => {
    return (
      items?.map((item, idx) => {
        const id = parsePokemonId(item.url);
        return id
          ? { id, name: item.name, imgSrc: getPokemonImage(id) }
          : { id: idx, name: item.name, imgSrc: null };
      }) ?? []
    );
  }, [items]);

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
    <div className="w-full min-h-[80vh] h-[500px] p-4">
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
