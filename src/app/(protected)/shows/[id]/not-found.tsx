import { ShowNotFoundMetadata } from "../../../../components/metadata/details/show-not-found-metadata";
import { ShowNotFoundView } from "../../../../components/views/details/show-not-found-view";
import { ShowNotFoundInput } from "./types";

export const dynamic = "force-dynamic";

export default function ShowNotFound({}: ShowNotFoundInput) {
  return (
    <>
      <ShowNotFoundMetadata />
      <ShowNotFoundView />
    </>
  );
}
