// this  file shld be exist in the root folder ! and not in src/ forlder
module.exports = {
    // this is a webpack config
    // since vue use webpack for the configuration this file will be called
    devServer: {
        proxy: {
            '/api' : {
                // so now we have a proxy running in this target
                target: 'http://localhost:8081',
                changeOrigin: true,
            }
        }
    }
};