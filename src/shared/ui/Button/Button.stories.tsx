import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook';
import { Theme } from 'shared/config/theme';
import { Button, ButtonTheme, ButtonSize } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const ClearNormal = Template.bind({});
ClearNormal.args = {
  children: 'Button',
  theme: ButtonTheme.CLEAR,
};

export const ClearDark = Template.bind({});
ClearDark.args = {
  children: 'Button',
  theme: ButtonTheme.CLEAR,
};
ClearDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlineNormal = Template.bind({});
OutlineNormal.args = {
  children: 'Button',
  theme: ButtonTheme.OUTLINE,
};

export const OutlineDark = Template.bind({});
OutlineDark.args = {
  children: 'Button',
  theme: ButtonTheme.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundNormal = Template.bind({});
BackgroundNormal.args = {
  children: 'Button',
  theme: ButtonTheme.BACKGROUND,
};

export const BackgroundDark = Template.bind({});
BackgroundDark.args = {
  children: 'Button',
  theme: ButtonTheme.BACKGROUND,
};
BackgroundDark.decorators = [ThemeDecorator(Theme.DARK)];

export const BackgroundInvertedNormal = Template.bind({});
BackgroundInvertedNormal.args = {
  children: 'Button',
  theme: ButtonTheme.BACKGROUND_INVERTED,
};

export const BackgroundInvertedDark = Template.bind({});
BackgroundInvertedDark.args = {
  children: 'Button',
  theme: ButtonTheme.BACKGROUND_INVERTED,
};
BackgroundInvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

// Renders all three sizes side by side so they can be compared at a glance,
// rather than exploding into a Size × Theme × Normal/Dark story per combo.
const sizes: { value: ButtonSize; label: string }[] = [
  { value: ButtonSize.M, label: 'M' },
  { value: ButtonSize.L, label: 'L' },
  { value: ButtonSize.XL, label: 'XL' },
];

const SizesTemplate: ComponentStory<typeof Button> = (args) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    {sizes.map(({ value, label }) => (
      <Button {...args} size={value} key={value}>
        {label}
      </Button>
    ))}
  </div>
);

export const Sizes = SizesTemplate.bind({});
Sizes.args = {
  theme: ButtonTheme.BACKGROUND_INVERTED,
};

export const Square = SizesTemplate.bind({});
Square.args = {
  theme: ButtonTheme.BACKGROUND_INVERTED,
  square: true,
};
