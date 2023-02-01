import { SpinnerCircular } from "spinners-react";

const Spinner = ({ isLoading }) => {
  return (
    <SpinnerCircular
      thickness={300}
      color="#ffffff"
      size={20}
      enabled={isLoading}
    />
  );
};

export default Spinner;
