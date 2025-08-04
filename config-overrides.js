import { resolve } from 'path';
import crypto from 'crypto-browserify';
import stream from 'stream-browserify';
import timers from 'timers-browserify';
import vm from 'vm-browserify';
import zlib from 'browserify-zlib';
import assert from 'assert';
import buffer from 'buffer';
import os from 'os-browserify/browser.js';
import path from 'path-browserify';

export default function override(config) {
   
   config.resolve.fallback = {
      crypto,
      stream,
      timers,
      fs: false,
      vm,
      zlib,
      assert,
      buffer,
      os,
      path,
   }

   // configuration for jest testing 
   config.jest = (jestConfig) => {
    jestConfig.moduleNameMapper = {
      ...jestConfig.moduleNameMapper,
      '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
    };
    jestConfig.moduleDirectories = ['node_modules'];
    return jestConfig;
  };

   return config
}

