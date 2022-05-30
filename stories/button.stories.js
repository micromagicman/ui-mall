import React from 'react';

import Button from '../src/component/button';

export default {
    component: Button,
};

const Template = (args) => <Button {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    disabled: false,
    label: 'Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    label: 'I\'m disabled!',
};