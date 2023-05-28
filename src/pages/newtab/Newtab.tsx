import "@pages/newtab/Newtab.css";
import "@pages/newtab/Newtab.scss";
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

const Newtab = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<TData>();
  const [formError, setFormError] = useState("");

  const transformedURL = useMemo(() => transformURL(inputUrl), []);

  const handleApiCall = async () => {
    setIsLoading(true);
    setResponse(undefined);
    const response = await fetch(
      "http://localhost:5000/api",
      {
        method: "POST",
        body: JSON.stringify({
          url: transformedURL,
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
        <img className="phish-logo" src="/phishing.png" alt="Phishing icon" />
      <div className="logo__wrapper">
        <br />
        <h1 className="title">Phishing Detector</h1>
      </div>

      <p className="description">
        Enter text in Search Bar and hover over links to check them
      </p>
      <p className="made-by"> Made By Varun, Yuvraj and Aakash</p>
    </form>
  );
};

export default Newtab;
