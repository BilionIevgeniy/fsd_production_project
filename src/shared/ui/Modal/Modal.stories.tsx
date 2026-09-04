import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook';
import { Theme } from 'shared/config/theme';
import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    onClose: { action: 'closed' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const OpenedNormal = Template.bind({});
OpenedNormal.args = {
  isOpen: true,
  children: 'Modal content',
};

export const OpenedDark = Template.bind({});
OpenedDark.args = {
  isOpen: true,
  children: 'Modal content',
};
OpenedDark.decorators = [ThemeDecorator(Theme.DARK)];

// lazy=false so the (hidden) markup is actually there to look at — with the
// lazy default, a never-opened modal renders nothing.
export const Closed = Template.bind({});
Closed.args = {
  isOpen: false,
  lazy: false,
  children: 'Modal content',
};
