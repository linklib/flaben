import * as React from "react";
import clsx from "clsx";
import css from "./advantages.module.scss";
import { SystemAdvantagesType } from "@/types/dto/system-advantages/system-advantages.type";
import FirstAdvantageIcon from "@/app/components/icons/first-advantage.icon";
import SecondAdvantageIcon from "@/app/components/icons/second-advantage.icon";
import ThirdAdvantageIcon from "@/app/components/icons/third-advantage.icon";
import FourthAdvantageIcon from "@/app/components/icons/fourth-advantage.icon";

export default function Advantages({
  advantages,
}: Readonly<{
  advantages?: SystemAdvantagesType;
}>) {
  const mappedAdvantages = [
    {
      title: advantages?.attributes.firstAdvantageTitle,
      description: advantages?.attributes.firstAdvantageDescription,
      icon: FirstAdvantageIcon,
    },
    {
      title: advantages?.attributes.secondAdvantageTitle,
      description: advantages?.attributes.secondAdvantageDescription,
      icon: SecondAdvantageIcon,
    },
    {
      title: advantages?.attributes.thirdAdvantageTitle,
      description: advantages?.attributes.thirdAdvantageDescription,
      icon: ThirdAdvantageIcon,
    },
    {
      title: advantages?.attributes.fourthAdvantageTitle,
      description: advantages?.attributes.fourthAdvantageDescription,
      icon: FourthAdvantageIcon,
    },
  ];
  return (
    <div className={clsx(css.container)}>
      <div className={css.container__title}>
        <div className={css.container__titleText}>
          преимущества наших систем
        </div>
        <h2>{advantages?.attributes.title}</h2>
      </div>
      <div className={css.advantages}>
        {mappedAdvantages.map((advantage) => (
          <div key={advantage.title} className={css.advantage}>
            <div className={css.advantage__text}>
              <div className={css.advantage__title}>{advantage.title}</div>
              <div className={css.advantage__description}>
                {advantage.description}
              </div>
            </div>
            <div className={css.advantage__icon}>{advantage.icon()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
