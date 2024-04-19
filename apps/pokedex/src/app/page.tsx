'use client'

import { useEffect, useState } from "react";
import type { TBasicItem } from "@repo/types";
import { getPokemonListRequest } from "@/lib/requests/pokemon-request";
import PokemonCardComponent from "@repo/ui/components/pokemon/card";

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={`absolute mix-blend-normal will-change-[filter] rounded-[100%] ${small ? "blur-[32px]" : "blur-[75px]"
        } ${conic ? "bg-glow-conic" : ""} ${className}`}
    />
  );
}

export default function Page(): JSX.Element {
  const [[offset, limit], setPagination] = useState<[number, number]>([0, 24])
  const [[count, next, previous], setMetadata] = useState<[number, string | null, string | null]>([0, null, null])
  const [items, setItems] = useState<TBasicItem[]>()

  useEffect(() => {
    const fetchData = async () => {
      getPokemonListRequest({ offset, limit }).then((response) => {
        if (response) {
          setItems(response.results)
          setMetadata([response.count, response.next, response.previous])
        }
      }).catch((error) => {
        console.log(error)
        setItems([])
        setMetadata([0, null, null])
      })
    }
    fetchData()
  }, [offset, limit])
  useEffect(() => {
    console.log(items)
  }, [items])
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="relative flex place-items-center ">
        <div className="grid grid-cols-4 gap-2">
          {items?.map(item => <PokemonCardComponent key={item.name} item={item} />)}
        </div>
      </div>
    </main>
  );
}
