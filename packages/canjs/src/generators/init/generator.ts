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
            ['can-route']: '^5.0.2',
            ['can-stache-route-helpers']: '^2.0.0',
            ['can-route-pushstate']: '^6.0.0',
            ['can-stache-element']: '^1.2.0',
            ['steal']: '^2.3.0',
        },
        {// List dev-dependencies and version
            // ['@bitovi-nx-workshop/canjs']: //''file:../bitovi-nx-workshop/dist/packages/canjs',
            ['fs-extra']: '^10.1.0',
            ['moo-stache-helper']: '^1.0.8',
            ['steal-css']: '^1.3.2',
            ['steal-stache']: '^5.0.0',
            ['steal-tools']: '^2.3.0',
        }
    );
}

function addStealPlugins(host: Tree) {
    updateJson(host, 'package.json', (pkgJson) => {
        // Source: https://nx.dev/recipes/generators/modifying-files#modify-json-files
        
        // if steal is undefined, set it to an empty object
        pkgJson.steal = pkgJson.steal ?? {};

        // add babelOptions
        pkgJson.steal.babelOptions = pkgJson.steal.babelOptions ?? {};
        // add babelOptions plugins
        pkgJson.steal.babelOptions.plugins = pkgJson.steal.babelOptions.plugins ?? [];
        if (!pkgJson.steal.babelOptions.plugins.includes('transform-class-properties')) {
            pkgJson.steal.babelOptions.plugins.push('transform-class-properties')
        }

        // add plugins
        pkgJson.steal.plugins = pkgJson.steal.plugins ?? [];
        // add steal-css
        if (!pkgJson.steal.plugins.includes('steal-css')) {
            pkgJson.steal.plugins.push('steal-css')
        }
        // add steal-stache
        if (!pkgJson.steal.plugins.includes('steal-stache')) {
            pkgJson.steal.plugins.push('steal-stache')
        }

        // return modified JSON object
        return pkgJson;
    });
}

export default updateDependencies;
export const myPluginInit = convertNxGenerator(updateDependencies);
