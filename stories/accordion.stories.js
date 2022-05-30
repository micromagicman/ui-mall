import React from 'react';

import Accordion from '../src/component/accordion';

export default {
    component: Accordion,
};

const Template = (args) => <Accordion {...args} />;

const AccordionContent = () => (
    <div style={{
        width: '100%',
        height: '400px',
        backgroundColor: '#eaeaea',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <h1>Accordion content</h1>
    </div>
)

export const Normal = Template.bind({});
Normal.args = {
    label: 'Button',
    children: <AccordionContent />
};