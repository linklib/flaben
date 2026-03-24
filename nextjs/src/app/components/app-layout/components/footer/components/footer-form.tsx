import * as React from "react";
import AppForm from "@/app/components/app-form/app-form";
import { AppInput } from "@/types/inputs";
import { useFormState } from "react-dom";
import { requestsRepository } from "@/data/repositories/request.repository";
import { phoneMask } from "@/utils/constants/constants";

export default function FooterForm() {
  const [state, action] = useFormState(requestsRepository.create, {
    data: null,
  });

  const footerInputs: AppInput[][] = [
    [{ type: "text", props: { name: "name", label: "Ваше имя" } }],
    [
      {
        type: "text",
        props: { name: "phone", label: "Номер телефона", required: true },
        mask: phoneMask,
      },
      {
        type: "text",
        props: { name: "email", label: "e-mail" },
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
  const done = !!state.statusCode && state.statusCode < 400;

  return (
    <AppForm
      props={{ action }}
      done={done}
      title={"Мы готовы ответить на все ваши вопросы"}
      inputs={footerInputs}
    />
  );
}
