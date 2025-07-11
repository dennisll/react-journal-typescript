import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { JournalApp } from "./presentation/JournalApp";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./presentation/redux/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={ store }>
    <BrowserRouter>
      <JournalApp />
    </BrowserRouter>
    </Provider>
  </StrictMode>
);
