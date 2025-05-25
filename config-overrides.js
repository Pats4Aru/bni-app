import module from 'module'

module.exports = function override(config) {
   
   config.resolve.fallback = {
         "crypto": require.resolve("crypto-browserify"),
         "stream" : require.resolve("stream-browserify"),
         "timers": require.resolve("timers-browserify"),
         fs: false,
         "vm": require.resolve("vm-browserify"),
         "zlib": require.resolve("browserify-zlib"),
         "assert": require.resolve("assert/"),
         "buffer": require.resolve("buffer"),
         "os": require.resolve("os-browserify/browser"),
         "path": require.resolve("path-browserify"),
   }
   return config
}

