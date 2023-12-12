import { IFormSelect } from './FormSelect';

const base: IFormSelect = {
  type: 'type1',
  size: 'medium',
  items: [
    {
      label: '선택1',
      value: '1',
    },
    {
      label: '선택2',
      value: '2',
    },
    {
      label: '선택3',
      value: '3',
    },
  ],
};

export const mockProps = {
  base,
};
