import { ListRecordsData } from "../../../../actions";

export type RecordTileLabels = {
  text: (start: string) => string;
  toasts: {
    delete: {
      success: (start: string) => string;
      error: (start: string) => string;
    };
  };
};

export type RecordTileProps = {
  record: ListRecordsData["records"][number];
  labels: RecordTileLabels;
};
