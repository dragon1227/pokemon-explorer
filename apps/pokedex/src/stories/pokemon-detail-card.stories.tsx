import type { Meta, StoryObj } from "@storybook/react";
import PokemonDetailCardComponent from "@repo/ui/components/pokemon/pokemon-detail-card";
import type { TPokemonDetails } from "@repo/types";
import sampleDetails from "./pokemon-detail.json";

const meta: Meta<typeof PokemonDetailCardComponent> = {
  title: "UI/Pokemon/PokemonDetailCard",
  component: PokemonDetailCardComponent,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "auto",
          margin: "auto",
          paddingTop: "160px",
        }}
      >
        <div>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PokemonDetailCardComponent>;

export const Primary: Story = {
  args: {
    details: sampleDetails as unknown as TPokemonDetails,
  },
};

export const BackButton: Story = {
  args: {
    details: sampleDetails as unknown as TPokemonDetails,
    onBackClick: () => {
      console.log('Back button clicked')
    },
  },
};
