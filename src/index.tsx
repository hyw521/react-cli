import React from "react";
import { render } from "react-dom";
import Layout from "./layout";
import "./index.ts";

const rootElement = document.getElementById("root");
const App = () => {
  return (
    <section>
      <Layout />
    </section>
  );
};

render(<App />, rootElement);
