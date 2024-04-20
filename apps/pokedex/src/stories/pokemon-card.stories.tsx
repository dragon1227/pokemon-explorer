import type { Meta, StoryObj } from "@storybook/react";

import PokemonCardComponent from "@repo/ui/components/pokemon/card";
import sampleDetails from "./pokemon-detail.json";
import { TPokemonDetails } from "@repo/types";

const meta: Meta<typeof PokemonCardComponent> = {
  title: "UI/Pokemon/PokemonCard",
  component: PokemonCardComponent,
  tags: ['autodocs'],
  decorators: [((Story) => <div style={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "auto",
    margin: "auto"
  }}><div><Story /></div></div>)]
};

export default meta;

type Story = StoryObj<typeof PokemonCardComponent>;

export const Primary: Story = {
  args: {
    item: {
      url: "https://pokeapi.co/api/v2/pokemon/1/",
      name: "bulbasaur",
    },
    itemDetails: sampleDetails as unknown as TPokemonDetails,
  },
  parameters: {
    controls: { expanded: true },
  },
};
