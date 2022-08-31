import { PropFunction } from "@builder.io/qwik";

export interface SearchInputProps {
  placeholder?: string;
  onKeyDown$?: PropFunction<(e: Event) => void>;
}
