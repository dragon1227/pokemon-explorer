import { useMemo } from "react"
import type { TBasicItem } from "@repo/types"
import { getPokemonImage } from "@repo/utils"

export default function PokemonCardComponent({ item }: { item: TBasicItem }): JSX.Element {
  const imgSrc = useMemo(() => {
    return getPokemonImage(item)
  }, [item])
  return (<div className="w-full group flex flex-col items-center">
    <img alt={item.name} className="object-contain group-hover:scale-110 transition-transform w-24 h-24" src={imgSrc} />
    <div>{item.name}</div>
  </div>)
}