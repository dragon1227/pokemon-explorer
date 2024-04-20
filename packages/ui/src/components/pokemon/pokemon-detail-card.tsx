import type { TPokemonDetails } from "@repo/types";
import Button from "../common/button";
import PokemonTypeTagComponent, { pokemonTypeStyleVariants } from "./type";

export default function PokemonDetailCardComponent({
  details,
  onBackClick,
}: {
  details: TPokemonDetails;
  onBackClick?: () => void;
}): JSX.Element {
  return (
    <div className="bg-slate-400 rounded-3xl w-64 lg:w-80 text-white flex flex-col items-center gap-2 relative">
      <div
        className={`w-full relative h-40 flex justify-center z-0 ${pokemonTypeStyleVariants[details.types[0].name]} !bg-opacity-30 rounded-t-3xl`}
      >
        <div className="z-0 text-white/10 absolute bottom-10 left-[1/2] text-6xl uppercase text-center w-full align-middle overflow-hidden">
          {details.name}
        </div>
        <img
          alt={details.name}
          className="-translate-y-36 w-60 h-60 lg:w-72 lg:h-72"
          height={96}
          src={details.imgSrc ?? ""}
          width={96}
        />
        {onBackClick ? (
          <Button
            className="absolute left-4 top-4 z-10"
            color="light"
            onClick={() => {
              onBackClick();
            }}
            rounded="full"
          >
            Back
          </Button>
        ) : null}
        <Button
          className="absolute right-4 bottom-4 z-10"
          color="dark"
          rounded="full"
        >
          #{details.paddedId}
        </Button>
      </div>
      <div className="flex flex-col items-center gap-2 w-full p-4 relative">
        <img
          alt="pokeball"
          className="absolute opacity-10 w-full h-full top-0 left-0 z-0"
          src="/pokeball.svg"
        />
        <div className="grid grid-cols-4 gap-y-1 w-full z-10">
          <div className="col-span-4 flex items-center gap-1 justify-center">
            {details.types.map((type) => (
              <PokemonTypeTagComponent key={type.name} type={type.name} />
            ))}
          </div>
          <div className="col-span-1">Name:</div>
          <div className="col-span-3 capitalize">{details.name}</div>
          <div className="col-span-1">Height:</div>
          <div className="col-span-3">{details.height} m</div>
          <div className="col-span-1">Weight:</div>
          <div className="col-span-3">{details.weight} Kg</div>
        </div>
        <div className="flex flex-col space-y-1 w-full z-10">
          {details.stats.map((stat) => (
            <div className="flex items-center" key={stat.name}>
              <div className="col-span-1 w-2/6 capitalize">{stat.name}</div>
              <div className="col-span-3 w-4/6 relative">
                {stat.name === "total" ? (
                  stat.value
                ) : (
                  <div className="bg-white w-full h-2 rounded-full">
                    <div
                      className="bg-slate-700 h-full rounded-[1rem]"
                      style={{ width: `${(100 * stat.value) / stat.max}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
