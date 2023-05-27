import "@pages/popup/Popup.css";
import { useMemo, useState } from "react";
import { Conditional } from "@pandeymangg/react-conditional";
import Loader from "@src/components/Loader";
import { IoWarning } from "react-icons/io5";
import { AiFillSafetyCertificate } from "react-icons/ai";

type TData = {
  prediction: "unsafe" | "safe";
  score: number;
};

export const validateURL = (url: string) => {
  const urlRegex =
    /^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

  return urlRegex.test(url);
};

export const transformURL = (url: string): string => {
  const httpAbsent = !/^https?:\/\//i.test(url);
  const newUrl = `${httpAbsent ? "https://" : ""}${url}`;

  // return newUrl;
  return url;
};

const Popup = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<TData>();
  const [formError, setFormError] = useState("");

  // const transformedURL = useMemo(() => transformURL(inputUrl), []);

  const handleApiCall = async () => {
    setIsLoading(true);
    setResponse(undefined);
    const response = await fetch(
      // "https://raksh-ml-model-2xuov.ondigitalocean.app/api",
      "http://localhost:5000/api",
      {
        method: "POST",
        body: JSON.stringify({
          url: inputUrl,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const data = await response.json();
    setIsLoading(false);

    setResponse(data);
  };

  return (
    <form
      className="container"
      onSubmit={(e) => {
        e.preventDefault();
        if (validateURL(inputUrl)) {
          setFormError("");
          handleApiCall();
        } else {
          setFormError("Please enter a valid URL!");
        }
      }}
    >
      <div className="logo__wrapper">
        <img className="raksh-logo" src="/raksh.png" alt="Phishing icon" />
        <h1 className="title">Raksh</h1>
      </div>

      <p className="description">Enter website link to get started!</p>

      <div className="text-btn-container">
        <input
          type="text"
          className="url-text"
          id="username"
          placeholder="Enter website address URL"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />

        <button className="scan-url-btn" type="submit">
          Check URL
        </button>
      </div>

      <div>
        <Conditional condition={!!formError}>
          <p
            style={{
              color: "#d20f39",
              marginTop: "1em",
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {formError}
          </p>
        </Conditional>
        <Conditional condition={isLoading}>
          <Loader />
        </Conditional>

        <Conditional condition={!!response}>
          <div className="response-container">
            <Conditional condition={response?.prediction === "unsafe"}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  fontSize: 16,
                }}
              >
                <IoWarning color="#d20f39" />
                <p
                  style={{
                    fontWeight: 500,
                    color: "#d20f39",
                  }}
                >
                  This website is{" "}
                  <span className="unsafe">
                    {Math.floor(response?.score).toFixed(2)}% unsafe
                  </span>{" "}
                  to visit.
                </p>
              </div>
            </Conditional>

            <Conditional condition={response?.prediction === "safe"}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  fontSize: 16,
                }}
              >
                <AiFillSafetyCertificate color="#40a02b" />
                <p
                  style={{
                    fontWeight: 500,
                    color: "#40a02b",
                  }}
                >
                  This website is{" "}
                  <span className="unsafe">
                    {Math.floor(response?.score).toFixed(2)}% safe
                  </span>{" "}
                  to visit.
                </p>
              </div>
            </Conditional>
          </div>
        </Conditional>
      </div>
    </form>
  );
};

export default Popup;
