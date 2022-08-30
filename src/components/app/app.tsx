import { component$ } from "@builder.io/qwik";
import { Logo } from "../logo/logo";
import * as APP_CONSTANTS from "./constants";

export const App = component$(() => {
  return (
    <div class="app-outer-container">
      <Logo />
      <h1 class="app-h1">{APP_CONSTANTS.APP_H1}</h1>
      <h2 class="app-h2">{APP_CONSTANTS.APP_H2}</h2>
    </div>
  );
});
