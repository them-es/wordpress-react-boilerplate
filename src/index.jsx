import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@wordpress/block-library/build-style/style.css";
import "bootstrap/scss/bootstrap.scss";
import "./index.scss";
import App from "./App.jsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
