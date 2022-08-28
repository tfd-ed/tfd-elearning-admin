export const CourseColumn = [
  {
    field: "id",
    hidden: true,
  },
  {
    label: "Title",
    field: "title",
    sortable: true,
    filterOptions: {
      enabled: true, // enable filter for this column
      trigger: "",
    },
  },
  {
    label: "Instructor",
    field: "instructor",
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
    label: "Duration",
    field: "duration",
    sortable: true,
  },
  {
    label: "Purchases",
    field: "purchases",
    sortable: false,
  },
  {
    label: "Created",
    field: "createdDate",
    sortable: true,
  },
];
