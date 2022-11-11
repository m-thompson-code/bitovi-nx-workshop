import * as stealTools from 'steal-tools';
import * as path from 'path';
import { readJsonSync, ensureDirSync, emptyDirSync } from "fs-extra";
import { migrateToDist } from 'moo-stache-helper';
import { BuildExecutorSchema } from './schema';

export default async function runExecutor(
  options: BuildExecutorSchema,
) {
  console.log('Executor ran for Build', options);

  const stealConfigPath = path.join(process.cwd(), options.root, options.stealConfig);
  const config = readJsonSync(stealConfigPath);

  ensureDirSync(options.dist);
  emptyDirSync(options.dist);

  await stealTools.build(config, {
    bundleSteal: true,
    // steal-tools' bundles should always be placed inside a 'dist' directory for relative paths to work
    dest: path.join(options.dist, 'dist'),
  });

  await migrateToDist({
    index: options.index,
    copyPaths: options.assets,
    dist: options.dist,
    root: options.root
  });

  return {
    success: true,
  };
}

