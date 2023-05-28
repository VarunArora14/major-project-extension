import { createRoot } from "react-dom/client";
import "@pages/popup/index.css";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/popup");

const Confirmation = () => (
  <div
    style={{
      background: "#dce0e8",
      height: "100vh",
      color: "#4c4f69",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px",
    }}
  >
    <div
      style={{
        display: "flex",
        gap: "32px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: 240,
          width: 240,
          objectFit: "cover",
        }}
      >
        <img
          src="/phishing.png"
          style={{
            width: "100%",
            height: "100%",
          }}
        ></img>
      </div>

      <h1
        style={{
          fontSize: "64px",
        }}
      >
        Phishing Detector
      </h1>
    </div>

    <h2
      style={{
        color: "maroon",
      }}
    >
      This site has been blocked as it has been detected as malicious!
    </h2>

    <button
      style={{
        background: "maroon",
        color: "white",
        padding: "16px",
        fontSize: "24px",
        border: "none",
        borderRadius: "8px",
        marginTop: "32px",
        cursor: "pointer",
      }}
      onClick={() => {
        window.history.back();
      }}
    >
      Take me back!
    </button>

    {/* <button
      onClick={() => {
        chrome.storage.local.get("currentUrl", (result) => {
          // console.log({ currentUrl: result });
          const { currentUrl } = result;

          chrome.storage.local.set({
            [currentUrl]: true,
          });

          document.location.href = currentUrl;
        });
      }}
    >
      YES
    </button>
    <button>NO</button> */}
  </div>
);

function init() {
  const confirmationContainer = document.querySelector(
    "#confirmation-container"
  );

  if (!confirmationContainer) {
    throw new Error("Can not find #confirmation-container");
  }

  const root = createRoot(confirmationContainer);
  root.render(<Confirmation />);
}

init();

// TODO: popup model CHECK FIRST