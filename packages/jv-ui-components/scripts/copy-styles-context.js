/*
 * Copyright © 2024. Cloud Software Group, Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

// create a script that copies a folder to another location
import fs from "fs";
import path from "path";

const copyFolder = (source, target) => {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  fs.readdirSync(source).forEach((element) => {
    const sourcePath = path.join(source, element);
    const targetPath = path.join(target, element);

    if (fs.lstatSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
    } else {
      copyFolder(sourcePath, targetPath);
    }
  });
};

// These are the following paths to use:
// src = js-visualize-components/packages/jv-ui-components/styles
// target = js-visualize-components/packages/jv-ui-components/dist/styles
copyFolder(
  path.resolve(process.cwd(), "styles"),
  path.resolve(process.cwd(), "dist/styles"),
);
