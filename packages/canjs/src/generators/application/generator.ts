import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { ApplicationGeneratorSchema } from './schema';

interface NormalizedSchema extends ApplicationGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
}

function normalizeOptions(tree: Tree, options: ApplicationGeneratorSchema): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).appsDir}/${projectDirectory}`;

  return {
    ...options,
    routing: !!options.routing,
    projectName,
    projectRoot,
    projectDirectory
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
    const templateOptions = {
      ...options,
      ...names(options.name),
      offsetFromRoot: offsetFromRoot(options.projectRoot),
      template: ''
    };
    generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

export default async function (tree: Tree, options: ApplicationGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);

  console.log('Generator application', normalizedOptions);
  
  addProjectConfiguration(
    tree,
    normalizedOptions.projectName,
    {
      root: normalizedOptions.projectRoot,
      projectType: 'application',
      sourceRoot: normalizedOptions.projectRoot,
      targets: {
        build: {
          executor: "@bitovi-nx-workshop/canjs:build",
          options: {
            index: 'index.html',
            root: normalizedOptions.projectRoot,
            stealConfig: 'steal-config.json',
            assets: ['assets'],
            dist: path.join('dist', normalizedOptions.projectRoot),
          }
        },
        serve: {
          executor: '@bitovi-nx-workshop/canjs:serve',
          options: {
            index: 'index.html',
            root: normalizedOptions.projectRoot,
            stealConfig: 'steal-config.json',
            port: 8080,
          }
        },
        'serve-prod': {
          executor: '@bitovi-nx-workshop/canjs:serve',
          options: {
            index: 'index.html',
            root: path.join('dist', normalizedOptions.projectRoot),
            // No need for `stealConfig` since this is a production build being served
            port: 8080,
          },
          dependsOn: ["build"]
        },
      },
    }
  );
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
