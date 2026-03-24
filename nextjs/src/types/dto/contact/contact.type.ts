import { BaseType } from "@/types/dto/base/base.type";

interface Contact {
  description: string;
  firstPhone: string;
  secondPhone: string;
  email: string;
  address: string;
  youtubeLink: string;
  waLink: string;
  tgLink: string;
}

export interface ContactType extends BaseType<Contact> {}
