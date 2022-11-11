import {
  addDependenciesToPackageJson,
  convertNxGenerator,
  removeDependenciesFromPackageJson,
  Tree,
  updateJson
} from '@nrwl/devkit';

export function updateDependencies(host: Tree) {
    removeDependenciesFromPackageJson(
        host,
        [],// List dev-dependencies
        []// List dependencies
    );

    addStealPlugins(host);

    return addDependenciesToPackageJson(
        host,
        {// List dependencies and version
            // ['<package-name>']: '<version>',
        },
        {// List dev-dependencies and version
            // ['@bitovi-nx-workshop/canjs']: //''file:../bitovi-nx-workshop/dist/packages/canjs',
            // ['<package-name>']: '<version>',
        }
    );
}

function addStealPlugins(host: Tree) {
    updateJson(host, 'package.json', (pkgJson) => {
        // TODO: Update package.json to include steal plugins
        // Example: https://nx.dev/recipes/generators/modifying-files#modify-json-files
    });
}

export default updateDependencies;
export const myPluginInit = convertNxGenerator(updateDependencies);
