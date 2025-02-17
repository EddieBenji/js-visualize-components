/*
 * Copyright © 2024. Cloud Software Group, Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import { ElementType, forwardRef } from "react";
import MuiTablePagination, {
  TablePaginationProps as MuiTablePaginationProps,
} from "@mui/material/TablePagination";
import { TableCellBaseProps } from "@mui/material";

type TablePaginationProps = MuiTablePaginationProps & {
  component: string | ElementType<TableCellBaseProps>;
};
export const TablePagination = forwardRef<HTMLElement, TablePaginationProps>(
  ({ ...rest }, ref) => {
    const {
      backIconButtonProps = {},
      nextIconButtonProps = {},
      ...restProps
    } = rest;
    const { className: backButtonClass = "", ...restBackIconButtonProps } =
      backIconButtonProps;
    const { className: nextButtonClass = "", ...restNextIconButtonProps } =
      nextIconButtonProps;
    return (
      <MuiTablePagination
        ref={ref}
        backIconButtonProps={{
          className: `jv-mButton ${backButtonClass} mui`,
          ...restBackIconButtonProps,
        }}
        nextIconButtonProps={{
          className: `jv-mButton ${nextButtonClass} mui`,
          ...restNextIconButtonProps,
        }}
        {...restProps}
      />
    );
  },
);
