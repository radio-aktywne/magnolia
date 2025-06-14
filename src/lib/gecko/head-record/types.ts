export type HeadRecordInput = {
  event: string;
  start: string;
};

export type HeadRecordOutput = {
  etag: string;
  length: number;
  modified: string;
  type: string;
};
