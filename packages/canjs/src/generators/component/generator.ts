import {
  formatFiles,
  generateFiles,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { ComponentGeneratorSchema } from './schema';

interface NormalizedSchema extends ComponentGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(tree: Tree, options: ComponentGeneratorSchema): NormalizedSchema {

  // const project = readProjectConfiguration(tree, options.project);

  return {
    ...options,
  } as any// TODO:;
}

function addFiles(tree: Tree, options: NormalizedSchema) {
    const templateOptions = {
      ...options,
      template: ''
    };
    generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

export default async function (tree: Tree, options: ComponentGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  console.log('Generator component', normalizedOptions);

  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
