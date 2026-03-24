import * as React from "react";

export type TableDataType = {
  headers: {
    name: React.ReactNode;
    getter: (
      object: any,
      rowIndex?: number,
    ) => string | number | undefined | React.ReactNode;
  }[];
  rows?: Record<string, any>[] | null;
};
