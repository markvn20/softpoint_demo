import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import ReactCountryFlag from "react-country-flag";
import { Country } from "../../types";

type IPopUp = {
  isOpen: boolean;
  onClose: () => void;
  filterString: string;
  setFilterString: Dispatch<SetStateAction<string>>;
  filteredOptions: any;
  setCountry: Dispatch<SetStateAction<Country | null>>;
  setActiveCountry: Dispatch<SetStateAction<string>>;
};

const PopUp = ({
  isOpen,
  onClose,
  filterString,
  setFilterString,
  filteredOptions,
  setCountry,
  setActiveCountry,
}: IPopUp) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup">
      <div
        ref={popupRef}
        style={{
          position: "absolute",
          zIndex: 3,
          top: "100%",
          left: 0,
          background: "white",
          boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, .25)",
          minWidth: "90%",
          maxWidth: 400,
          borderRadius: 8,
        }}
      >
        <div
          style={{
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <input
            autoComplete="off"
            type="text"
            value={filterString}
            onChange={(e) => setFilterString(e.target.value)}
            style={{
              border: "1px solid #ccc",
              borderRadius: 6,
              padding: 12,
              zIndex: 5,
              background: "white",
              width: "100%",
              boxSizing: "border-box",
              fontSize: "1em",
            }}
          />
          <div style={{ maxHeight: 270, overflowY: "auto", padding: "0 8px" }}>
            {filteredOptions.map(
              ([country, countryData]: [string, Country], index: number) => {
                return (
                  <div
                    className="country"
                    key={index}
                    onClick={() => {
                      setCountry(countryData);
                      setActiveCountry(countryData.id);
                      onClose();
                    }}
                    style={{
                      padding: "12px 0",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onTouchStart={(e) => e.stopPropagation()}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f0f0f0")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "transparent")
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 16,
                        alignItems: "center",
                      }}
                    >
                      <ReactCountryFlag
                        countryCode={country}
                        style={{ fontSize: "1.7em" }}
                        svg
                      />
                      <p style={{ margin: 0 }}>{countryData.name}</p>
                      <p style={{ margin: 0 }}>{countryData.calling_code}</p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
