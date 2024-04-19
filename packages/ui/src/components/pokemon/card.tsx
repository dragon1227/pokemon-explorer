import { useMemo } from "react"
import { TPokemonTypeEnum, type TBasicItem, type TPokemon } from "@repo/types"
import { formatPokemonData, getPokemonImage, parsePokemonId } from "@repo/utils"
import PokemonTypeTagComponent, { pokemonTypeStyleVariants } from "./type"

export default function PokemonCardComponent({ item, data, isLoading }: { item: TBasicItem, data?: TPokemon | null, isLoading: boolean }): JSX.Element {

  const id = useMemo(() => {
    return parsePokemonId(item.url)
  }, [item])
  const imgSrc = useMemo(() => {
    if (!id) return undefined
    return getPokemonImage(id)
  }, [id])
  const itemDetails = useMemo(() => {
    if (!data) return undefined
    return formatPokemonData(data)
  }, [data])
  const itemType = useMemo(() => {
    return (itemDetails?.types[0]) ? itemDetails.types[0].name : TPokemonTypeEnum.Unknown
  }, [itemDetails])

  return (<div className="w-full border border-slate-300 rounded-3xl p-4 hover:shadow-xl group flex flex-col items-center">
    { }
    <div className={`w-full mb-2 rounded-2xl h-16 ${pokemonTypeStyleVariants[itemType]}`}>
      <img alt={item.name} className="object-contain group-hover:scale-110 transition-transform w-24 h-24 -translate-y-8" src={imgSrc} />
    </div>
    {isLoading ? <>...</> : itemDetails ? <div className="flex items-center gap-2">
      {itemDetails.types.map((type) => <PokemonTypeTagComponent key={type.name} type={type.name} />)}
    </div> : null}
    <div>{item.name}</div>
  </div>)
}