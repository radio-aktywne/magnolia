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
      title: "magnolia",
      description: "magnolia",
    },
    events: {
      title: "Events • magnolia",
      description: "magnolia",
    },
    records: {
      title: "Records • magnolia",
      description: "magnolia",
    },
    recordsEventNotFound: {
      text: "Event not found",
    },
    notFound: {
      title: "Not Found • magnolia",
      description: "magnolia",
      text: "Page not found",
    },
    error: {
      title: "Error • magnolia",
      description: "magnolia",
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
