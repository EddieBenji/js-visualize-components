import React, { forwardRef } from 'react';
import MuiTablePagination, { TablePaginationProps as MuiTablePaginationProps } from '@mui/material/TablePagination';
import { TableCellBaseProps } from '@mui/material';

type TablePaginationProps = MuiTablePaginationProps & {
    component: string | React.ElementType<TableCellBaseProps>
}
export const TablePagination = forwardRef<HTMLElement, TablePaginationProps>(({
    ...rest
}, ref) => {
    const { backIconButtonProps = {}, nextIconButtonProps = {}, ...restProps } = rest;
    const { className: backButtonClass = '', ...restBackIconButtonProps } = backIconButtonProps;
    const { className: nextButtonClass = '', ...restNextIconButtonProps } = nextIconButtonProps;
    return (
        <MuiTablePagination
            ref={ref}
            backIconButtonProps={{
                className: `jr-mButton ${backButtonClass} mui`,
                ...restBackIconButtonProps
            }}
            nextIconButtonProps={{
                className: `jr-mButton ${nextButtonClass} mui`,
                ...restNextIconButtonProps
            }}
            {...restProps}
        />
    )
})
