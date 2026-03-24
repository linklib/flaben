"use client";

import * as React from "react";
import { useEffect } from "react";
import AppForm from "@/app/components/app-form/app-form";
import { AppInput } from "@/types/inputs";
import { useFormState } from "react-dom";
import { phoneMask } from "@/utils/constants/constants";
import { redirect, RedirectType } from "next/navigation";
import { siteLinks } from "@/utils/links/site-links";
import { partnershipRequestsRepository } from "@/data/repositories/partnership-request.repository";

export default function Page() {
  const [state, action] = useFormState(partnershipRequestsRepository.create, {
    data: null,
  });

  const inputs: AppInput[][] = [
    [
      {
        type: "text",
        props: { type: "name", name: "name", label: "Ваше имя" },
      },
    ],

    [
      {
        type: "text",
        props: {
          type: "tel",
          name: "phone",
          label: "Номер телефона",
          required: true,
        },
        mask: phoneMask,
      },
    ],
    [
      {
        type: "text",
        props: {
          type: "email",
          name: "email",
          label: "E-mail",
        },
      },
    ],
    [
      {
        type: "text",
        props: {
          name: "comment",
          label: "Введите комментарий",
        },
      },
    ],
  ];

  useEffect(() => {
    const done = !!state.statusCode && state.statusCode < 400;
    if (done) {
      redirect(siteLinks.callbackRequest.link(), RedirectType.replace);
    }
  });

  return <AppForm props={{ action }} inputs={inputs} verticalFooter />;
}
