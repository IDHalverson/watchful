import { component$, useStyles$ } from "@builder.io/qwik";
import { DEFAULT_PROPS } from "./search-input.constants";
import { SearchInputProps } from "./search-input.models";
import SearchInputStyles from "./search-input.styles.scss";

export default component$(
  ({
    placeholder = DEFAULT_PROPS.placeholder,
    onKeyDown$,
  }: SearchInputProps = {}) => {
    useStyles$(SearchInputStyles);
    return (
      <div class="search-input-container">
        <input placeholder={placeholder} onKeyDown$={onKeyDown$} />
      </div>
    );
  }
);
