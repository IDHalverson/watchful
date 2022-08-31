import {
  component$,
  mutable,
  useClientEffect$,
  useStore,
  useStyles$,
} from "@builder.io/qwik";
import SearchButtonComponent from "../../common/search-button/search-button.component";
import SearchInputComponent from "../../common/search-input/search-input.component";
import SelectComponent from "../../common/select/select.component";
import YoutubeListItemComponent from "../../common/youtube-list-item/youtube-list-item.component";
import * as YoutubeApi from "../../services/youtube.service";
import * as APP_CONSTANTS from "./app.constants";
import AppStyles from "./app.styles.scss";
import { Logo } from "./components/logo/logo.component";

export const App = component$(() => {
  useStyles$(AppStyles);

  const formValues = useStore({
    searchValue: "",
    sortValue: "",
  });
  const executeSearchTimestamp = useStore({
    timestamp: 0,
  });
  const youtubeData = useStore({
    items: [],
  });
  const areYoutubeResultsLoading = useStore({
    isLoading: false,
  });

  // useWatch$(({ track }) => {
  //   track(formValues, "searchValue");
  //   console.log(formValues.searchValue);
  // });

  useClientEffect$(async ({ track }) => {
    track(executeSearchTimestamp, "timestamp");
    if (formValues.searchValue) {
      const youtubeResults = await YoutubeApi.searchYoutube(
        formValues.searchValue,
        formValues.sortValue
      );
      console.log(youtubeResults);
      areYoutubeResultsLoading.isLoading = false;
      youtubeData.items = youtubeResults;
    }
  });

  return (
    <div id="app-outer-container">
      <Logo />
      <h1 class="app-h1">{APP_CONSTANTS.APP_H1}</h1>
      <h2 class="app-h2">{APP_CONSTANTS.APP_H2}</h2>
      <div class="search-fields-container">
        <SearchInputComponent
          {...{
            onKeyDown$: (e: KeyboardEvent) => {
              if (e.key === "Enter") {
                if (formValues.searchValue) {
                  youtubeData.items = [];
                  areYoutubeResultsLoading.isLoading = true;
                  executeSearchTimestamp.timestamp = Date.now();
                }
              } else {
                formValues.searchValue =
                  (e.target as HTMLInputElement)?.value || "";
              }
            },
          }}
        />
        <SelectComponent
          {...{
            onChange$: (e: Event) => {
              formValues.sortValue = (e?.target as HTMLSelectElement)?.value;
            },
          }}
        />
        <SearchButtonComponent
          {...{
            onClick$: (e: Event) => {
              if (formValues.searchValue) {
                youtubeData.items = [];
                areYoutubeResultsLoading.isLoading = true;
                executeSearchTimestamp.timestamp = Date.now();
              }
            },
            disabled: mutable(!formValues.searchValue),
          }}
        />
      </div>
      <div class="youtube-items-container">
        {areYoutubeResultsLoading.isLoading
          ? "Searching..."
          : youtubeData.items.map((youtubeDataItem) => (
              <YoutubeListItemComponent
                youtubeItem={mutable(youtubeDataItem)}
              />
            ))}
      </div>
    </div>
  );
});
