import {
  formatFiles,
  generateFiles,
  readProjectConfiguration,
  names,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { ComponentGeneratorSchema } from './schema';

interface NormalizedSchema extends ComponentGeneratorSchema {
  projectRoot: string;// TODO: replace with better properties

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
    // TODO: handle where these files should be generated
    generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

export default async function (tree: Tree, options: ComponentGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  console.log('Generator component', normalizedOptions);

  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
