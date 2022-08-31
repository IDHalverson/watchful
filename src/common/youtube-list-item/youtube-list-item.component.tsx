import { component$, useMount$, useStore, useStyles$ } from "@builder.io/qwik";
import * as YoutubeApi from "../../services/youtube.service";
import * as YoutubeListItemConstants from "./youtube-list-item.constants";
import { YoutubeListItemProps } from "./youtube-list-item.models";
import YoutubeListItemStyles from "./youtube-list-item.styles.scss";

interface TotalCommentCount {
  value: any;
}

export default component$(({ youtubeItem }: YoutubeListItemProps) => {
  const videoId = youtubeItem.id.videoId;
  const youtubeLink = YoutubeListItemConstants.YOUTUBE_LINK_TEMPLATE.replace(
    "$video_id",
    videoId
  );

  useStyles$(YoutubeListItemStyles);

  const totalCommentCount = useStore({
    value: undefined,
  } as TotalCommentCount);
  useMount$(async () => {
    try {
      const totalComments = await YoutubeApi.getTotalComments(videoId);
      totalCommentCount.value = totalComments;
    } catch (e) {
      totalCommentCount.value =
        "(Couldn't fetch total comments. They might be disabled.)";
    }
  });

  return (
    <div class="yt-item-container">
      <div class="yt-item-thumbnail-image">
        <img src={youtubeItem.snippet.thumbnails.medium.url} />
      </div>
      <div class="yt-item-details-container">
        <div class="yt-item-title">
          <a href={youtubeLink}>{youtubeItem.snippet.title}</a>
        </div>
        <div class="yt-item-description">
          {youtubeItem.snippet.description}
          <a href={youtubeLink}>
            <span>[read more]</span>
          </a>
        </div>
        <div class="yt-item-total-comments">
          Total Comments:{" "}
          {totalCommentCount.value === 100
            ? `${totalCommentCount.value}+`
            : totalCommentCount.value ?? "(Loading comment count..."}
        </div>
      </div>
    </div>
  );
});
