import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
} from "@mui/material";

type Props = {
  summary: React.ReactNode;
  details: React.ReactNode;

  props?: Omit<AccordionProps, "children">;
  summaryProps?: AccordionSummaryProps;
  detailsProps?: AccordionDetailsProps;
};

export default function AppAccordion(props: Readonly<Props>) {
  return (
    <Accordion {...props.props}>
      <AccordionSummary {...props.summaryProps}>
        {props.summary}
      </AccordionSummary>
      <AccordionDetails {...props.detailsProps}>
        {props.details}
      </AccordionDetails>
    </Accordion>
  );
}
