import { RequestQueryBuilder } from "@nestjsx/crud-request";

export default function ({ params, fields, join }) {
  let sort = [];
  params.sort.forEach((item) => {
    if (item.type === "asc" || item.type === "desc") {
      sort.push({ field: item.field, order: item.type.toUpperCase() });
    }
  });
  let filter = [];
  for (const key in params.columnFilters) {
    if (params.columnFilters[key] !== "") {
      filter.push({
        field: key,
        operator: key === "type" ? "$eq" : key === "status" ? "$eq" : "$cont",
        value: params.columnFilters[key],
      });
    }
  }
  return {
    convertedParams: RequestQueryBuilder.create({
      fields: fields,
      join: join,
      filter: filter,
      sort: sort,
      page: params.page,
      limit: params.perPage,
    }).query(),
  };
}
