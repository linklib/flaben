import { action } from "@/data/actions/actions";
import qs from "qs";
import { ProjectType } from "@/types/dto/project/project.type";
import { AppResponse } from "@/types/app-response";

const segment = "projects";

const query = (category?: string) =>
  qs.stringify(
    {
      filters: { category: { slug: { $eq: category } } },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    },
  );

export const projectRepository = {
  findAll: (category?: string): Promise<AppResponse<ProjectType[]>> =>
    action().get(`${segment}?` + query(category)),
  findOne: (id?: string): Promise<AppResponse<ProjectType>> =>
    action().get(`${segment}/${id}?` + query()),
};
