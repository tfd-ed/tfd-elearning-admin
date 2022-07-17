export const CourseColumn = [
  {
    field: "id",
    hidden: true,
  },
  {
    label: "Title",
    field: "title",
    filterOptions: {
      enabled: true, // enable filter for this column
      trigger: "",
    },
  },
  {
    label: "Instructor",
    field: "instructor",
    sortable: true,
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
    label: "Created",
    field: "createdDate",
  },
];
