import { action } from "@/data/actions/actions";
import { AppResponse } from "@/types/app-response";
import { TextType } from "@/types/dto/text/text.type";
import { ContactType } from "@/types/dto/contact/contact.type";
import { SectionContentType } from "@/types/dto/section-content/section-content.type";
import qs from "qs";
import { RichTextType } from "@/types/dto/rich-text/rich-text.type";

// const textRevalidate = 604800;
const textRevalidate = 0;

const contentPopulateQuery = qs.stringify(
  {
    populate: ["content", "content.image"],
  },
  {
    encodeValuesOnly: true,
  },
);

export const contentRepository = {
  getTitleText: (): Promise<AppResponse<TextType>> =>
    action().get("title-heading", textRevalidate),
  getTitleDescription: (): Promise<AppResponse<RichTextType>> =>
    action().get("title-description", textRevalidate),
  getAboutTitle: (): Promise<AppResponse<TextType>> =>
    action().get("about-heading", textRevalidate),
  getAboutDescription: (): Promise<AppResponse<TextType>> =>
    action().get("about-description", textRevalidate),
  getContactInfo: (): Promise<AppResponse<ContactType>> =>
    action().get("contact", textRevalidate),
  getPartnershipAdvantagesHeading: (): Promise<AppResponse<TextType>> =>
    action().get("partners-advantages-heading", textRevalidate),
  getPartnershipAdvantagesDescription: (): Promise<AppResponse<TextType>> =>
    action().get("partners-advantages-description", textRevalidate),
  getProjectSectionContent: (): Promise<AppResponse<SectionContentType>> =>
    action().get(`projects-content?${contentPopulateQuery}`, textRevalidate),
  getArticleSectionContent: (): Promise<AppResponse<SectionContentType>> =>
    action().get(`articles-content?${contentPopulateQuery}`, textRevalidate),
  getDeliveryContentResponse: (): Promise<AppResponse<SectionContentType>> =>
    action().get(`delivery-content?${contentPopulateQuery}`, textRevalidate),
};
