import { createRoot } from "react-dom/client";

import App from "./sample/";

import "modern-normalize";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
