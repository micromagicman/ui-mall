import React from 'react';

import Checkbox from '../src/component/checkbox';

export default {
    component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    disabled: false,
    checked: false,
    label: 'Check me pls',
};