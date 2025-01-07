import App from "./App";
import "./styles/Map.css";
import "./styles/StyleButtons.css";
import "./styles/DistanceDisplay.css";
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';


// This is the ID of the div in your index.html file

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
    <App />
    </StrictMode>,
);

