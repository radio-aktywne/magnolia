export const labels = {
  toasts: {
    titles: {
      error: "Error",
      warning: "Warning",
      success: "Success",
      info: "Info",
    },
  },
  pages: {
    index: {
      title: "webrecords",
      description: "webrecords",
    },
    events: {
      title: "Events • webrecords",
      description: "webrecords",
    },
    records: {
      title: "Records • webrecords",
      description: "webrecords",
    },
    recordsEventNotFound: {
      text: "Event not found",
    },
    notFound: {
      title: "Not Found • webrecords",
      description: "webrecords",
      text: "Page not found",
    },
    error: {
      title: "Error • webrecords",
      description: "webrecords",
      text: "Something went wrong",
      buttons: {
        retry: {
          label: "Retry",
        },
      },
    },
  },
  widgets: {
    events: {
      tiles: {
        event: {
          text: (id: string) => `${id}`,
        },
      },
      empty: {
        text: "No events...",
      },
    },
    records: {
      tiles: {
        record: {
          text: (start: string) => `${start}`,
          toasts: {
            delete: {
              error: (start: string) => `Failed to delete record ${start}`,
              success: (start: string) => `Record ${start} deleted`,
            },
          },
        },
      },
      empty: {
        text: "No records...",
      },
    },
  },
};
