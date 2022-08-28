export const UsersColumn = [
  {
    field: "id",
    hidden: true,
  },
  {
    label: "Confession Name",
    field: "confessName",
    filterOptions: {
      enabled: true, // enable filter for this column
      trigger: "",
    },
  },
  {
    label: "Username",
    field: "username",
    filterOptions: {
      enabled: true, // enable filter for this column
      trigger: "",
    },
  },
  {
    label: "Email",
    field: "email",
    filterOptions: {
      enabled: true, // enable filter for this column
      trigger: "",
    },
  },
  { label: "Status", field: "status" },
  {
    label: "Created",
    field: "createdDate",
  },
];
