type Props = {
  error: string;
  status: string;
};
export const ErrorMessage = ({ error, status }: Props) => {
  return (
    status === `rejected` && (
      <p style={{ color: `red`, fontSize: 15, textAlign: `center` }}>
        {JSON.stringify(error).split(`:`)[1].replace(`}`, "")}
      </p>
    )
  );
};
