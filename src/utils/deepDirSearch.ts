import fs from "fs";
import path from "path";

export const deepDirSearch = async (dir: string): Promise<string[]> => {
  const files: string[] = [];

  const items = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      const subFiles = await deepDirSearch(fullPath);
      files.push(...subFiles);
    } else files.push(fullPath);
  }

  return files;
};
