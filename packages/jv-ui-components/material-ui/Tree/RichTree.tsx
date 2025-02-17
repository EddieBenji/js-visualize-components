/*
 * Copyright © 2024. Cloud Software Group, Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

import { forwardRef } from "react";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";

export const RichTree = forwardRef<HTMLUListElement, any>(
  ({ className = "", ...rest }, ref) => {
    return (
      <>
        <RichTreeView ref={ref} className={`${className}  mui`} {...rest} />
      </>
    );
  },
);
