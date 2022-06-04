import React from 'react';

import {RadioGroup, RadioButton} from '../src/component/radio';

export default {
  component: RadioGroup,
};

export const Normal = () => (
    <RadioGroup activeValue={1}>
      <RadioButton value={1} label="first"/>
      <RadioButton value={2} label="second"/>
      <RadioButton value={3} label="third"/>
    </RadioGroup>
);

export const Disabled = () => (
    <RadioGroup activeValue={2} disabled={true}>
      <RadioButton value={1} label="first"/>
      <RadioButton value={2} label="second"/>
      <RadioButton value={3} label="third"/>
    </RadioGroup>
);
