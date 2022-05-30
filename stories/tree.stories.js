import React from 'react';

import Tree from '../src/component/tree';
import Button from '../src/component/button';

export default {
    component: Tree,
};

const Template = (args) => <Tree {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    nodes: [
        {
            data: {
                label: 'First'
            },
            expanded: true,
            children: [
                {
                    data: {
                        label: 'Second'
                    },
                    expanded: false
                },
                {
                    data: {
                        label: 'Third'
                    },
                    expanded: false,
                    children: [
                        {
                            data: {
                                label: 'Fourth'
                            },
                            expanded: false
                        }
                    ]
                }
            ]
        }
    ],
    nodeComponent: Button
};