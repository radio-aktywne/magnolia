export type DownloadRecordInput = {
  event: string;
  start: string;
};

export type DownloadRecordOutput = {
  data: ReadableStream<Uint8Array>;
  etag: string;
  length: number;
  modified: string;
  type: string;
};
