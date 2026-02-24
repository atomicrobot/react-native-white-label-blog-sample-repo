const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Ensure Metro uses this example as the project root (not the monorepo root)
config.projectRoot = projectRoot;

// Watch all files in the monorepo (needed for bot-sdk changes)
config.watchFolders = [monorepoRoot];

// Resolve packages from both project and root node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

// Unique cache per example so expo-router's app root doesn't cross-contaminate
config.cacheVersion = 'acme-health';

module.exports = config;
