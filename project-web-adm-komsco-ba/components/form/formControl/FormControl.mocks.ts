import { IFormControl } from './FormControl';

const base: IFormControl = {
  size: 'sm',
  isLabel: true,
  label: '원',
  placeholder: '값을 입력하세요.',
  disabled: false,
};

export const mockProps = {
  base,
};
