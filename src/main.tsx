import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// HMR cache bust
const rootEl = document.getElementById("root")!;
createRoot(rootEl).render(<App />);
