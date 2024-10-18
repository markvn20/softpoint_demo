import CountryPhoneForm from "../components/CountryPhoneForm/CountryPhoneForm";
import { useSubmitCountryPhone } from "../hooks/useSubmitCountryPhone";

const Home = () => {
  const { isLoading, handleSubmit } = useSubmitCountryPhone();

  return <CountryPhoneForm handleSubmit={handleSubmit} isLoading={isLoading} />;
};

export default Home;
