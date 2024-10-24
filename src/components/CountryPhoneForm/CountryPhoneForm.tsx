import { useState } from "react";
import CountryFlagSelector from "./CountryFlagSelector";
import { Country, TwoFactorAuth } from "../../types";
import { PatternFormat } from "react-number-format";
import Login from "../Login/Login";

type ICountryPhoneForm = {
  handleSubmit: (payload: TwoFactorAuth) => void;
  isLoading: boolean;
};

const CountryPhoneForm = ({ handleSubmit, isLoading }: ICountryPhoneForm) => {
  const [phoneNumber, setPhoneNumber] = useState<number | string | null>(null);
  const [country, setCountry] = useState<Country | null>(null);

  let placeHolder =
    Number(country?.phone_length) < 10
      ? "(###) ###-###"
      : Number(country?.phone_length) === 10
      ? "(###) ###-####"
      : "(###) ####-####";

  return (
    <div>
      <form
        style={{ marginBottom: 16 }}
        onSubmit={(e) => {
          let converted = String(phoneNumber).replace(/\D/g, "");
          e.preventDefault();
          handleSubmit({
            phone_number: Number(converted),
            country_id: country?.id,
          });
        }}
      >
        <div style={{ border: "1px solid #ccc", padding: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", gap: 16 }}>
              <CountryFlagSelector setCountry={setCountry} />
              <PatternFormat
                required
                id="phoneField"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                format={placeHolder}
                mask="_"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 6,
                  padding: "0 16px",
                  width: "100%",
                }}
                placeholder={
                  Number(country?.phone_length) < 10
                    ? "(000) 000-000"
                    : Number(country?.phone_length) == 10
                    ? "(000) 000-0000"
                    : "(000) 0000-0000"
                }
              />
            </div>
            <button type="submit">{isLoading ? "..." : "Submit"}</button>
          </div>
        </div>
      </form>
      {/*Temporary Method to get access token*/}
      <Login />
    </div>
  );
};

export default CountryPhoneForm;
