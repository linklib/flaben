import * as React from "react";
import clsx from "clsx";
import css from "./planner-table.module.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { TableDataType } from "@/types/table-data.type";

type Props = {
  id: string;
  data: TableDataType;
};

export default function PlannerTable(props: Props) {
  return (
    <div className={clsx(css.container)}>
      <Table>
        <TableHead>
          <TableRow>
            {props.data.headers.map((header, index) => (
              <TableCell
                key={`${header.name?.toString()}_table_${props.id}_header_${index}`}
              >
                {header.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.rows?.map((row, rowIndex) => (
            <TableRow key={`table_row_${rowIndex}_${props.id}`}>
              {props.data.headers.map((header, cellIndex) => (
                <TableCell
                  component="th"
                  scope="row"
                  key={`${header.name}_row_cell_${cellIndex}`}
                  className={css.cellInner}
                >
                  {header.getter(row, rowIndex)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
