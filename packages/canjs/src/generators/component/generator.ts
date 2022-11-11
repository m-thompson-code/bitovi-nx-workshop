import {
  formatFiles,
  generateFiles,
  names,
  readProjectConfiguration,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { ComponentGeneratorSchema } from './schema';

interface NormalizedSchema extends ComponentGeneratorSchema {
  componentPath: string;
  fileName: string;
  className: string;
}

function normalizeOptions(tree: Tree, options: ComponentGeneratorSchema): NormalizedSchema {
  const fileName = names(options.name).fileName;
  const className = names(options.name).className;

  const project = readProjectConfiguration(tree, options.project);

  if (!project.sourceRoot) {
    throw new Error("Unexpected missing project.sourceRoot")
  }

  const componentPath = path.join(project.sourceRoot, 'app', options.relativePath);

  return {
    ...options,
    fileName,
    className,
    componentPath,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    template: ''
  };
  // TODO: handle where these files should be generated
  generateFiles(tree, path.join(__dirname, 'files'), options.componentPath, templateOptions);
}

export default async function (tree: Tree, options: ComponentGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  console.log('Generator component', normalizedOptions);

  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
