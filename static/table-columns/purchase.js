export const PurchaseColumn = [
  {
    field: "id",
    hidden: true,
  },
  {
    label: "Transaction ID",
    field: "transaction",
    sortable: true,
    filterOptions: {
      enabled: true, // enable filter for this column
      trigger: "",
    },
  },
  {
    label: "Price",
    field: "price",
    sortable: true,
  },
  {
    label: "Course",
    field: "course",
    sortable: false,
  },
  {
    label: "Status",
    field: "status",
    sortable: true,
  },
  {
    label: "By User",
    field: "byUser",
    sortable: false,
  },
  {
    label: "Created",
    field: "createdDate",
    sortable: true,
  },
];
