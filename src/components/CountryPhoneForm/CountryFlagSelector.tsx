import { Dispatch, SetStateAction, useState } from "react";
import { useGetCountries } from "../../hooks/useGetCountries";
import { convertObjectToArray } from "../../utils";
import ReactCountryFlag from "react-country-flag";
import PopUp from "./PopUp";
import { Country } from "../../types";

type ICountryFlagSelector = {
  setCountry: Dispatch<SetStateAction<Country | null>>;
};

const CountryFlagSelector = ({ setCountry }: ICountryFlagSelector) => {
  const { data, isLoading, error } = useGetCountries();
  const [activeCountry, setActiveCountry] = useState<string>("3");
  const [filterString, setFilterString] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;

  const converted = convertObjectToArray(data);

  const [country, countryData] = converted.find(([_, countryData]) => {
    return countryData.id === activeCountry;
  }) || [null, { calling_code: "" }];

  if (country) {
    setCountry(countryData);
  }

  const filteredOptions = converted.filter(([_, countryData]) => {
    return countryData.name.toLowerCase().includes(filterString.toLowerCase());
  });

  return (
    <div style={{ padding: "0px 16px", border: "1px solid #ccc" }}>
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={{ padding: 0 }} onClick={togglePopup} type="button">
            <ReactCountryFlag
              style={{
                fontSize: "1.7em",
              }}
              countryCode={country ? country : "us"}
              svg
            />
          </button>
          <p>{countryData.calling_code}</p>
        </div>
        <PopUp
          isOpen={isPopupOpen}
          onClose={togglePopup}
          filterString={filterString}
          setFilterString={setFilterString}
          filteredOptions={filteredOptions}
          setCountry={setCountry}
          setActiveCountry={setActiveCountry}
        />
      </div>
    </div>
  );
};

export default CountryFlagSelector;
