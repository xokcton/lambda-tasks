import type { AWS } from '@serverless/typescript';

import firstTask from '@functions/firstTask';
import secondTask from '@functions/secondTask';
import thirdTask from '@functions/thirdTask';
import fourthTask from '@functions/fourthTask';
import fifthTask from '@functions/fifthTask';

const serverlessConfiguration: AWS = {
  service: 'aws-serverless-ts',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
    stage: 'dev',
    region: 'us-east-1'
  },
  // import the function via paths
  functions: { firstTask, secondTask, thirdTask, fourthTask, fifthTask },
};

module.exports = serverlessConfiguration;
