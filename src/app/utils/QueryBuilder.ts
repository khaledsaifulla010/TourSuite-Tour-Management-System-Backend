/* eslint-disable @typescript-eslint/no-dynamic-delete */
import { Query } from "mongoose";
import { excludeFields } from "../constant";

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public readonly query: Record<string, string>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  filter(): this {
    const filter = { ...this.query };

    // Dynamically delete excluded fields from filter
    for (const field of excludeFields) {
      delete filter[field];
    }

    this.modelQuery = this.modelQuery.find(filter);
    return this;
  }
  search(searchableFields: string[]): this {
    const searchTerm = this.query.searchTerm || "";
    const searchQuery = {
      $or: searchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    };

    this.modelQuery = this.modelQuery.find(searchQuery);
    return this;
  }

  sort(): this {
    const sort = this.query.sort || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }
  fields(): this {
    const fields = this.query.fields?.split(",").join(" ") || "";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  paginate(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 5;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  build() {
    return this.modelQuery;
  }

  async getMeta() {
    const totalDocuments = await this.modelQuery.model.countDocuments();
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 5;
    const totalPage = Math.ceil(totalDocuments / limit);

    return {
      page: page,
      limit: limit,
      totalPage: totalPage,
      total: totalDocuments,
    };
  }
}
