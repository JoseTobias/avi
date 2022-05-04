export interface IDataFormProps {
  onSubmit: (date: string) => Promise<void>;
  loading?: boolean;
}
