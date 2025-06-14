import { msg } from "@lingui/core/macro";

export const errors = {
  generic: msg({ message: "An error occurred while listing events records." }),
  invalidInput: msg({ message: "Invalid input." }),
  unauthorized: msg({
    message: "You are not authorized to list events records.",
  }),
};
