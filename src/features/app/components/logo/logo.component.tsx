import { component$, useStyles$ } from "@builder.io/qwik";
import LogoStyles from "./logo.styles.scss";

export const Logo = component$(() => {
  useStyles$(LogoStyles);
  return (
    <div id="logo-container">
      <img
        alt="Watchful logo"
        width={400}
        src="/images/lighthouse-spinning.gif"
      />
      <div className="logo-overlay top"></div>
      <div className="logo-overlay right"></div>
      <div className="logo-overlay bottom"></div>
      <div className="logo-overlay left"></div>
    </div>
  );
});
