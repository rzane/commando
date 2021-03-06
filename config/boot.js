import { env } from './index';
import packageJSON from '../package.json';
import debug from 'debug';

const info = debug('commando:plugins');
const packages = Object.keys(packageJSON.dependencies);

function dependencyFilter (dependency) {
  return /^commando-/.test(dependency);
}

function pluginNames () {
  return packages.filter(dependencyFilter);
}

if (!env.test) {
  require('../server/commands');

  pluginNames().forEach(plugin => {
    info(`loading plugin: ${plugin}`);
    require(plugin);
  });
}
