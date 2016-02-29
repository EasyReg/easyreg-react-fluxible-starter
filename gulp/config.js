var dest = './build/assets';
var src = './src';
var port = parseInt(process.env.PORT, 10) || 3000;

module.exports = {
    nodemon: {
        script: './server.js',
        ext: 'js jsx',
        ignore: ['build/*', 'node_modules/*'],
        env: {
            'NODE_ENV': 'development',
            'DEBUG': 'Server',
            'PORT': port
        }
    },
    browserify: {
        bundleConfigs: [{
            entries: `${src}/js/client/client.js`,
            dest: `${dest}/js`,
            outputName: 'client.js',
            extensions: ['.js', '.jsx']
        },
        // {
        //     entries: `${src}/js/admin/index.js`,
        //     dest: `${dest}/js`,
        //     outputName: 'admin.js',
        //     extensions: ['.js', '.jsx']
        // }
        ]
    },
    sass: {
        src: [`${src}/sass/**/*.{sass,css}`],
        dest: `${dest}/css`,
        settings: {
            sourceComments: 'map',
            imagePath: '/assets/images'
        }
    }

};
