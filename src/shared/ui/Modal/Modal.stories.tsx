import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeContextDecorator } from 'shared/config/storybook';
import { Theme } from 'shared/config/theme';
import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    onClose: { action: 'closed' },
  },
  // Modal renders via Portal into document.body, outside #root — loki's default
  // chromeSelector only looks at #root's children, so widen it to the whole page.
  parameters: { loki: { chromeSelector: 'body' } },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const OpenedNormal = Template.bind({});
OpenedNormal.args = {
  isOpen: true,
  children: 'Modal content',
};
OpenedNormal.decorators = [ThemeContextDecorator(Theme.NORMAL)];

export const OpenedDark = Template.bind({});
OpenedDark.args = {
  isOpen: true,
  children: 'Modal content',
};
OpenedDark.decorators = [ThemeContextDecorator(Theme.DARK)];
