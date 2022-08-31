import { component$ } from "@builder.io/qwik";
import { YoutubeListItemProps } from "./youtube-list-item.models";

export default component$(({ youtubeItem }: YoutubeListItemProps) => {
  return (
    <div class="yt-item-container">
      <div class="yt-item-thumbnail-image">
        <img src="" />
      </div>
      <div class="yt-item-details-container">
        <div class="yt-item-title">
          <a href="">test</a>
        </div>
        <div class="yt-item-description">test</div>
        <div class="yt-item-total-comments">
          <a href="">test</a>
        </div>
      </div>
    </div>
  );
});
