import { component$, useStyles$ } from "@builder.io/qwik";
import { SelectProps } from "./select.models";
import SelectStyles from "./select.styles.scss";

export default component$(({ onChange$ }: SelectProps) => {
  useStyles$(SelectStyles);

  return (
    <select class="select" onChange$={onChange$}>
      <option class="select-option">Date</option>
      <option class="select-option">Rating</option>
      <option class="select-option">Relevance</option>
    </select>
  );
});
