import { useEffect } from "react";

export default function App() {
  // useEffect(() => {
  //   console.log("content view loaded");
  // }, []);

  console.log(document);

  return <div className="content-view">content view</div>;
}
