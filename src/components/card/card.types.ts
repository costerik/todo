export type CardType = {
  title?: string;
  placeholder?: string;
  edit?: boolean;
  owner?: string;
  id?: string;
  onChangeValueText?: (value: string) => void;
};
