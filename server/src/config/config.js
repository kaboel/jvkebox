module.exports = {
    name: 'Jvkebox',
    port: '8081',
    db: {
        database: 'jvkebox',
        user: 'jvkebox',
        password: 'jvkebox',
        options: {
            dialect: 'sqlite',
            host: 'localhost',
            storage: './jvkebox.sqlite'
        }
    },
    auth: {
        jwtSecret: 'jvkeboxecr3t!!!'
    }
 }
