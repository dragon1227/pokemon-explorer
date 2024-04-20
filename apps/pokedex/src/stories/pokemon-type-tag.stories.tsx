import type { Meta, StoryObj } from "@storybook/react";

import { TPokemonTypeEnum } from "@repo/types";
import PokemonTypeTagComponent from "@repo/ui/components/pokemon/type";

const meta: Meta<typeof PokemonTypeTagComponent> = {
  title: "UI/Pokemon/PokemonTypeTag",
  component: PokemonTypeTagComponent,
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

type Story = StoryObj<typeof PokemonTypeTagComponent>;

export const Normal: Story = {
  args: {
    type: TPokemonTypeEnum.Normal,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Fighting: Story = {
  args: {
    type: TPokemonTypeEnum.Fighting,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Flying: Story = {
  args: {
    type: TPokemonTypeEnum.Flying,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Poison: Story = {
  args: {
    type: TPokemonTypeEnum.Poison,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Ground: Story = {
  args: {
    type: TPokemonTypeEnum.Ground,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Rock: Story = {
  args: {
    type: TPokemonTypeEnum.Rock,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Bug: Story = {
  args: {
    type: TPokemonTypeEnum.Bug,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Ghost: Story = {
  args: {
    type: TPokemonTypeEnum.Ghost,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Steel: Story = {
  args: {
    type: TPokemonTypeEnum.Steel,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Fire: Story = {
  args: {
    type: TPokemonTypeEnum.Fire,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Water: Story = {
  args: {
    type: TPokemonTypeEnum.Water,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Grass: Story = {
  args: {
    type: TPokemonTypeEnum.Grass,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Electric: Story = {
  args: {
    type: TPokemonTypeEnum.Electric,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Physical: Story = {
  args: {
    type: TPokemonTypeEnum.Physical,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Ice: Story = {
  args: {
    type: TPokemonTypeEnum.Ice,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Dragon: Story = {
  args: {
    type: TPokemonTypeEnum.Dragon,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Dark: Story = {
  args: {
    type: TPokemonTypeEnum.Dark,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Fairy: Story = {
  args: {
    type: TPokemonTypeEnum.Fairy,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Unknown: Story = {
  args: {
    type: TPokemonTypeEnum.Unknown,
  },
  parameters: {
    controls: { expanded: true },
  },
};

export const Shadow: Story = {
  args: {
    type: TPokemonTypeEnum.Shadow,
  },
  parameters: {
    controls: { expanded: true },
  },
};
