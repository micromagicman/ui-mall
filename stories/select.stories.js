import React from 'react';

import Select from '../src/component/select';

export default {
    component: Select,
};

const Template = (args) => <Select {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    activeId: 1,
    options: [
        {id: 1, text: 'First'},
        {id: 2, text: 'Second'},
        {id: 3, text: 'Third'},
    ]
};