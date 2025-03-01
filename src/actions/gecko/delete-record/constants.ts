import { msg } from "@lingui/core/macro";

export const errors = {
  generic: msg({ message: "An error occurred while deleteing record." }),
  invalidInput: msg({ message: "Invalid input." }),
  notFound: msg({ message: "Record not found." }),
  unauthorized: msg({
    message: "You are not authorized to delete the record.",
  }),
};
