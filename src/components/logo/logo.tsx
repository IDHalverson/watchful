import { component$ } from '@builder.io/qwik';

import LogoImage from "/images/logo.png";

export const Logo = component$(() => {
  return (
    <div>
      <img alt="Watchful logo" width={400} src="/images/logo.png" />
    </div>
  );
});
