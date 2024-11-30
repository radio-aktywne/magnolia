import { msg } from "@lingui/macro";

export const errors = {
  download: {
    generic: msg({
      message: "An error occurred while downloading the record.",
    }),
    notFound: msg({
      message: "Record not found.",
    }),
  },
};
