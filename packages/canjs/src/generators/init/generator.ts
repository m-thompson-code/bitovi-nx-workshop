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
        ['@moo-org/my-plugin', 'fs-extra'],// List dev-dependencies
        ['can-route']// List dependencies
    );

    addStealPlugins(host);

    return addDependenciesToPackageJson(
        host,
        {// List dependencies and version
            // ['<package-name>']: '<version>',
            ['can-route']: '^5.0.2',
        },
        {// List dev-dependencies and version
            // ['<package-name>']: '<version>',
            // ['@bitovi-nx-workshop/canjs']: //''file:../bitovi-nx-workshop/dist/packages/canjs',
            ['fs-extra']: '^10.1.0',
        }
    );
}

function addStealPlugins(host: Tree) {
    updateJson(host, 'package.json', (pkgJson) => {
        // TODO: Update package.json to include steal plugins
        // Example: https://nx.dev/recipes/generators/modifying-files#modify-json-files
        return pkgJson;
    });
}

export default updateDependencies;
export const myPluginInit = convertNxGenerator(updateDependencies);
