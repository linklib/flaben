import { AirTypeEnum } from "@/utils/enums/air-type.enum";
import { RoomType } from "@/types/room.type";

export const phoneNumber = "+7 343 414-00-47";
export const secondPhoneNumber = "+8 800 550-16-52";

export const officeAddress = "г. Екатеринбург, ул. Павла Шаманова 5/5";
export const email = "info@fliben.ru";
export const youtubeLink = "https://www.youtube.com/@Fliben";
export const tgLink = "https://t.me/+313221100434";
export const waLink =
  "https://api.whatsapp.com/send/?phone=73434140047&text&type=phone_number&app_absent=0";
export const copyrightText = `© All right reserved, Fliben ${new Date().getFullYear()}`;

export const policyDocLink = "/docs/policy.pdf";
export const policyAgreementlLink = "/docs/agreement.pdf";
export const policyCookiesLink = "/docs/cookies.pdf";
export const storageCartProductsKey = "products";
export const storageCartKey = "cart";
export const storageEventName = "storageEvent";
export const storageCartProductsAmountKey = "amount";
export const storageCartProductsIdKey = "id";

export const phoneMask = "+7 (000) 000-00-00";
const baseRoomWidth = 5;
const baseRoomLength = 5;
const baseRoomPeople = 1;
export const baseRoom = {
  number: 1,
  name: "Помещение",
  airType: AirTypeEnum.Exhaust,
  width: baseRoomWidth,
  length: baseRoomLength,
  people: baseRoomPeople,
} as RoomType;

export const plannerValues = {
  airDuctPipeBandwidth: 30,
  airDuctPipeLength: 15,
  distanceBetweenStages: 30 / 100,
};

export const yandexGoalsMap = {
  SOCIAL: "497708253",
  PARTNERSHIP: "497707219",
  EMAIL: "497706951",
  PHONE: "497706846",
  CART: "497706658",
  REQUEST: "497706528",
};
