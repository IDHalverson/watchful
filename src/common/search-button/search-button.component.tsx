import { component$, useStyles$ } from "@builder.io/qwik";
import { SearchButtonProps } from "./search-button.models";

import SearchButtonStyles from "./search-button.styles.scss";

export default component$(({ onClick$, disabled }: SearchButtonProps) => {
  useStyles$(SearchButtonStyles);
  return (
    <div class="search-button-container">
      <button type="button" disabled={disabled} onClick$={onClick$}>
        SEARCH
      </button>
    </div>
  );
});
