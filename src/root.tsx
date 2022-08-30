import { App } from './components/app/app';

import "css-resetter";
import './global.css';

export default () => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Watchful | Never miss out. Find the best videos.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <App />
      </body>
    </html>
  );
};
