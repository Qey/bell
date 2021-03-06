// Load modules

var Lab = require('lab');
var Hapi = require('hapi');
var Hoek = require('hoek');
var Bell = require('../');
var Mock = require('./mock');


// Declare internals

var internals = {};


// Test shortcuts

var expect = Lab.expect;
var before = Lab.before;
var after = Lab.after;
var describe = Lab.experiment;
var it = Lab.test;


describe('Bell', function () {

    describe('#facebook', function () {

        it('authenticates with mock', { parallel: false }, function (done) {

            var mock = new Mock.V2();
            mock.start(function (provider) {

                var server = new Hapi.Server('localhost');
                server.pack.register(Bell, function (err) {

                    expect(err).to.not.exist;

                    var custom = Bell.providers.facebook();
                    Hoek.merge(custom, provider);

                    var profile = {
                        id: '1234567890',
                        username: 'steve',
                        name: 'steve',
                        first_name: 'steve',
                        last_name: 'smith',
                        email: 'steve@example.com'
                    };

                    Mock.override('https://graph.facebook.com/me', profile);

                    server.auth.strategy('custom', 'bell', {
                        password: 'password',
                        isSecure: false,
                        clientId: 'facebook',
                        clientSecret: 'secret',
                        provider: custom
                    });

                    server.route({
                        method: '*',
                        path: '/login',
                        config: {
                            auth: 'custom',
                            handler: function (request, reply) {

                                reply(request.auth.credentials);
                            }
                        }
                    });

                    server.inject('/login', function (res) {

                        var cookie = res.headers['set-cookie'][0].split(';')[0] + ';';
                        mock.server.inject(res.headers.location, function (res) {

                            server.inject({ url: res.headers.location, headers: { cookie: cookie } }, function (res) {

                                expect(res.result).to.deep.equal({
                                    provider: 'custom',
                                    token: '456',
                                    refreshToken: undefined,
                                    query: {},
                                    profile: {
                                        id: '1234567890',
                                        username: 'steve',
                                        displayName: 'steve',
                                        name: {
                                            first: 'steve',
                                            last: 'smith',
                                            middle: undefined
                                        },
                                        email: 'steve@example.com',
                                        raw: profile
                                    }
                                });

                                Mock.clear();
                                mock.stop(done);
                            });
                        });
                    });
                });
            });
        });
    });

    describe('#github', function () {

        it('authenticates with mock', { parallel: false }, function (done) {

            var mock = new Mock.V2();
            mock.start(function (provider) {

                var server = new Hapi.Server('localhost');
                server.pack.register(Bell, function (err) {

                    expect(err).to.not.exist;

                    var custom = Bell.providers.github();
                    Hoek.merge(custom, provider);

                    var profile = {
                        id: '1234567890',
                        login: 'steve',
                        name: 'steve',
                        email: 'steve@example.com'
                    };

                    Mock.override('https://api.github.com/user', profile);

                    server.auth.strategy('custom', 'bell', {
                        password: 'password',
                        isSecure: false,
                        clientId: 'github',
                        clientSecret: 'secret',
                        provider: custom
                    });

                    server.route({
                        method: '*',
                        path: '/login',
                        config: {
                            auth: 'custom',
                            handler: function (request, reply) {

                                reply(request.auth.credentials);
                            }
                        }
                    });

                    server.inject('/login', function (res) {

                        var cookie = res.headers['set-cookie'][0].split(';')[0] + ';';
                        mock.server.inject(res.headers.location, function (res) {

                            server.inject({ url: res.headers.location, headers: { cookie: cookie } }, function (res) {

                                expect(res.result).to.deep.equal({
                                    provider: 'custom',
                                    token: '456',
                                    refreshToken: undefined,
                                    query: {},
                                    profile: {
                                        id: '1234567890',
                                        username: 'steve',
                                        displayName: 'steve',
                                        email: 'steve@example.com',
                                        raw: profile
                                    }
                                });

                                Mock.clear();
                                mock.stop(done);
                            });
                        });
                    });
                });
            });
        });

        it('authenticates with mock and custom uri', { parallel: false }, function (done) {

            var mock = new Mock.V2();
            mock.start(function (provider) {

                var server = new Hapi.Server('localhost');
                server.pack.register(Bell, function (err) {

                    expect(err).to.not.exist;

                    var custom = Bell.providers.github({ uri: 'http://example.com' });
                    Hoek.merge(custom, provider);

                    var profile = {
                        id: '1234567890',
                        login: 'steve',
                        name: 'steve',
                        email: 'steve@example.com'
                    };

                    Mock.override('http://example.com/user', profile);

                    server.auth.strategy('custom', 'bell', {
                        password: 'password',
                        isSecure: false,
                        clientId: 'github',
                        clientSecret: 'secret',
                        provider: custom
                    });

                    server.route({
                        method: '*',
                        path: '/login',
                        config: {
                            auth: 'custom',
                            handler: function (request, reply) {

                                reply(request.auth.credentials);
                            }
                        }
                    });

                    server.inject('/login', function (res) {

                        var cookie = res.headers['set-cookie'][0].split(';')[0] + ';';
                        mock.server.inject(res.headers.location, function (res) {

                            server.inject({ url: res.headers.location, headers: { cookie: cookie } }, function (res) {

                                expect(res.result).to.deep.equal({
                                    provider: 'custom',
                                    token: '456',
                                    refreshToken: undefined,
                                    query: {},
                                    profile: {
                                        id: '1234567890',
                                        username: 'steve',
                                        displayName: 'steve',
                                        email: 'steve@example.com',
                                        raw: profile
                                    }
                                });

                                Mock.clear();
                                mock.stop(done);
                            });
                        });
                    });
                });
            });
        });
    });

    describe('#google', function () {

        it('authenticates with mock', { parallel: false }, function (done) {

            var mock = new Mock.V2();
            mock.start(function (provider) {

                var server = new Hapi.Server('localhost');
                server.pack.register(Bell, function (err) {

                    expect(err).to.not.exist;

                    var custom = Bell.providers.google();
                    Hoek.merge(custom, provider);

                    var profile = {
                        id: '1234567890',
                        username: 'steve',
                        name: 'steve',
                        given_name: 'steve',
                        family_name: 'smith',
                        email: 'steve@example.com'
                    };

                    Mock.override('https://www.googleapis.com/oauth2/v1/userinfo', profile);

                    server.auth.strategy('custom', 'bell', {
                        password: 'password',
                        isSecure: false,
                        clientId: 'google',
                        clientSecret: 'secret',
                        provider: custom
                    });

                    server.route({
                        method: '*',
                        path: '/login',
                        config: {
                            auth: 'custom',
                            handler: function (request, reply) {

                                reply(request.auth.credentials);
                            }
                        }
                    });

                    server.inject('/login', function (res) {

                        var cookie = res.headers['set-cookie'][0].split(';')[0] + ';';
                        mock.server.inject(res.headers.location, function (res) {

                            server.inject({ url: res.headers.location, headers: { cookie: cookie } }, function (res) {

                                expect(res.result).to.deep.equal({
                                    provider: 'custom',
                                    token: '456',
                                    refreshToken: undefined,
                                    query: {},
                                    profile: {
                                        id: '1234567890',
                                        username: 'steve',
                                        displayName: 'steve',
                                        name: {
                                            first: 'steve',
                                            last: 'smith'
                                        },
                                        email: 'steve@example.com',
                                        raw: profile
                                    }
                                });

                                Mock.clear();
                                mock.stop(done);
                            });
                        });
                    });
                });
            });
        });
    });

    describe('#live', function () {

        it('authenticates with mock', { parallel: false }, function (done) {

            var mock = new Mock.V2();
            mock.start(function (provider) {

                var server = new Hapi.Server('localhost');
                server.pack.register(Bell, function (err) {

                    expect(err).to.not.exist;

                    var custom = Bell.providers.live();
                    Hoek.merge(custom, provider);

                    var profile = {
                        id: '1234567890',
                        username: 'steve',
                        name: 'steve',
                        first_name: 'steve',
                        last_name: 'smith',
                        emails: {
                            preferred: 'steve@example.com',
                            account: 'steve@example.net'
                        }
                    };

                    Mock.override('https://apis.live.net/v5.0/me', profile);

                    server.auth.strategy('custom', 'bell', {
                        password: 'password',
                        isSecure: false,
                        clientId: 'live',
                        clientSecret: 'secret',
                        provider: custom
                    });

                    server.route({
                        method: '*',
                        path: '/login',
                        config: {
                            auth: 'custom',
                            handler: function (request, reply) {

                                reply(request.auth.credentials);
                            }
                        }
                    });

                    server.inject('/login', function (res) {

                        var cookie = res.headers['set-cookie'][0].split(';')[0] + ';';
                        mock.server.inject(res.headers.location, function (res) {

                            server.inject({ url: res.headers.location, headers: { cookie: cookie } }, function (res) {

                                expect(res.result).to.deep.equal({
                                    provider: 'custom',
                                    token: '456',
                                    refreshToken: undefined,
                                    query: {},
                                    profile: {
                                        id: '1234567890',
                                        username: 'steve',
                                        displayName: 'steve',
                                        name: {
                                            first: 'steve',
                                            last: 'smith'
                                        },
                                        email: 'steve@example.com',
                                        raw: profile
                                    }
                                });

                                Mock.clear();
                                mock.stop(done);
                            });
                        });
                    });
                });
            });
        });

        it('authenticates with mock (no preferred email)', { parallel: false }, function (done) {

            var mock = new Mock.V2();
            mock.start(function (provider) {

                var server = new Hapi.Server('localhost');
                server.pack.register(Bell, function (err) {

                    expect(err).to.not.exist;

                    var custom = Bell.providers.live();
                    Hoek.merge(custom, provider);

                    var profile = {
                        id: '1234567890',
                        username: 'steve',
                        name: 'steve',
                        first_name: 'steve',
                        last_name: 'smith',
                        emails: {
                            account: 'steve@example.net'
                        }
                    };

                    Mock.override('https://apis.live.net/v5.0/me', profile);

                    server.auth.strategy('custom', 'bell', {
                        password: 'password',
                        isSecure: false,
                        clientId: 'live',
                        clientSecret: 'secret',
                        provider: custom
                    });

                    server.route({
                        method: '*',
                        path: '/login',
                        config: {
                            auth: 'custom',
                            handler: function (request, reply) {

                                reply(request.auth.credentials);
                            }
                        }
                    });

                    server.inject('/login', function (res) {

                        var cookie = res.headers['set-cookie'][0].split(';')[0] + ';';
                        mock.server.inject(res.headers.location, function (res) {

                            server.inject({ url: res.headers.location, headers: { cookie: cookie } }, function (res) {

                                expect(res.result).to.deep.equal({
                                    provider: 'custom',
                                    token: '456',
                                    refreshToken: undefined,
                                    query: {},
                                    profile: {
                                        id: '1234567890',
                                        username: 'steve',
                                        displayName: 'steve',
                                        name: {
                                            first: 'steve',
                                            last: 'smith'
                                        },
                                        email: 'steve@example.net',
                                        raw: profile
                                    }
                                });

                                Mock.clear();
                                mock.stop(done);
                            });
                        });
                    });
                });
            });
        });

        it('authenticates with mock (no emails)', { parallel: false }, function (done) {

            var mock = new Mock.V2();
            mock.start(function (provider) {

                var server = new Hapi.Server('localhost');
                server.pack.register(Bell, function (err) {

                    expect(err).to.not.exist;

                    var custom = Bell.providers.live();
                    Hoek.merge(custom, provider);

                    var profile = {
                        id: '1234567890',
                        username: 'steve',
                        name: 'steve',
                        first_name: 'steve',
                        last_name: 'smith'
                    };

                    Mock.override('https://apis.live.net/v5.0/me', profile);

                    server.auth.strategy('custom', 'bell', {
                        password: 'password',
                        isSecure: false,
                        clientId: 'live',
                        clientSecret: 'secret',
                        provider: custom
                    });

                    server.route({
                        method: '*',
                        path: '/login',
                        config: {
                            auth: 'custom',
                            handler: function (request, reply) {

                                reply(request.auth.credentials);
                            }
                        }
                    });

                    server.inject('/login', function (res) {

                        var cookie = res.headers['set-cookie'][0].split(';')[0] + ';';
                        mock.server.inject(res.headers.location, function (res) {

                            server.inject({ url: res.headers.location, headers: { cookie: cookie } }, function (res) {

                                expect(res.result).to.deep.equal({
                                    provider: 'custom',
                                    token: '456',
                                    refreshToken: undefined,
                                    query: {},
                                    profile: {
                                        id: '1234567890',
                                        username: 'steve',
                                        displayName: 'steve',
                                        name: {
                                            first: 'steve',
                                            last: 'smith'
                                        },
                                        email: undefined,
                                        raw: profile
                                    }
                                });

                                Mock.clear();
                                mock.stop(done);
                            });
                        });
                    });
                });
            });
        });

        it('authenticates with mock (empty email)', { parallel: false }, function (done) {

            var mock = new Mock.V2();
            mock.start(function (provider) {

                var server = new Hapi.Server('localhost');
                server.pack.register(Bell, function (err) {

                    expect(err).to.not.exist;

                    var custom = Bell.providers.live();
                    Hoek.merge(custom, provider);

                    var profile = {
                        id: '1234567890',
                        username: 'steve',
                        name: 'steve',
                        first_name: 'steve',
                        last_name: 'smith',
                        emails: {}
                    };

                    Mock.override('https://apis.live.net/v5.0/me', profile);

                    server.auth.strategy('custom', 'bell', {
                        password: 'password',
                        isSecure: false,
                        clientId: 'live',
                        clientSecret: 'secret',
                        provider: custom
                    });

                    server.route({
                        method: '*',
                        path: '/login',
                        config: {
                            auth: 'custom',
                            handler: function (request, reply) {

                                reply(request.auth.credentials);
                            }
                        }
                    });

                    server.inject('/login', function (res) {

                        var cookie = res.headers['set-cookie'][0].split(';')[0] + ';';
                        mock.server.inject(res.headers.location, function (res) {

                            server.inject({ url: res.headers.location, headers: { cookie: cookie } }, function (res) {

                                expect(res.result).to.deep.equal({
                                    provider: 'custom',
                                    token: '456',
                                    refreshToken: undefined,
                                    query: {},
                                    profile: {
                                        id: '1234567890',
                                        username: 'steve',
                                        displayName: 'steve',
                                        name: {
                                            first: 'steve',
                                            last: 'smith'
                                        },
                                        email: undefined,
                                        raw: profile
                                    }
                                });

                                Mock.clear();
                                mock.stop(done);
                            });
                        });
                    });
                });
            });
        });
    });

    describe('#twitter', function () {

        it('authenticates with mock', { parallel: false }, function (done) {

            var mock = new Mock.V1();
            mock.start(function (provider) {

                var server = new Hapi.Server('localhost');
                server.pack.register(Bell, function (err) {

                    expect(err).to.not.exist;

                    var custom = Bell.providers.twitter();
                    Hoek.merge(custom, provider);

                    Mock.override('https://api.twitter.com/1.1/users/show.json', {
                        property: 'something'
                    });

                    server.auth.strategy('custom', 'bell', {
                        password: 'password',
                        isSecure: false,
                        clientId: 'twitter',
                        clientSecret: 'secret',
                        provider: custom
                    });

                    server.route({
                        method: '*',
                        path: '/login',
                        config: {
                            auth: 'custom',
                            handler: function (request, reply) {

                                reply(request.auth.credentials);
                            }
                        }
                    });

                    server.inject('/login', function (res) {

                        var cookie = res.headers['set-cookie'][0].split(';')[0] + ';';
                        mock.server.inject(res.headers.location, function (res) {

                            server.inject({ url: res.headers.location, headers: { cookie: cookie } }, function (res) {

                                expect(res.result).to.deep.equal({
                                    provider: 'custom',
                                    token: 'final',
                                    secret: 'secret',
                                    query: {},
                                    profile: {
                                        id: '1234567890',
                                        username: 'Steve Stevens',
                                        displayName: undefined,
                                        raw: {
                                            property: 'something'
                                        }
                                    }
                                });

                                Mock.clear();
                                mock.stop(done);
                            });
                        });
                    });
                });
            });
        });

        it('authenticates with mock (without extended profile)', { parallel: false }, function (done) {

            var mock = new Mock.V1();
            mock.start(function (provider) {

                var server = new Hapi.Server('localhost');
                server.pack.register(Bell, function (err) {

                    expect(err).to.not.exist;

                    var custom = Bell.providers.twitter({ extendedProfile: false });
                    Hoek.merge(custom, provider);

                    server.auth.strategy('custom', 'bell', {
                        password: 'password',
                        isSecure: false,
                        clientId: 'twitter',
                        clientSecret: 'secret',
                        provider: custom
                    });

                    server.route({
                        method: '*',
                        path: '/login',
                        config: {
                            auth: 'custom',
                            handler: function (request, reply) {

                                reply(request.auth.credentials);
                            }
                        }
                    });

                    server.inject('/login', function (res) {

                        var cookie = res.headers['set-cookie'][0].split(';')[0] + ';';
                        mock.server.inject(res.headers.location, function (res) {

                            server.inject({ url: res.headers.location, headers: { cookie: cookie } }, function (res) {

                                expect(res.result).to.deep.equal({
                                    provider: 'custom',
                                    token: 'final',
                                    secret: 'secret',
                                    query: {},
                                    profile: {
                                        id: '1234567890',
                                        username: 'Steve Stevens'
                                    }
                                });

                                mock.stop(done);
                            });
                        });
                    });
                });
            });
        });
    });

    describe('#yahoo', function () {

        it('authenticates with mock', { parallel: false }, function (done) {

            var mock = new Mock.V1();
            mock.start(function (provider) {

                var server = new Hapi.Server('localhost');
                server.pack.register(Bell, function (err) {

                    expect(err).to.not.exist;

                    var custom = Bell.providers.yahoo();
                    Hoek.merge(custom, provider);

                    var profile = {
                        profile: {
                            guid: '1234567890',
                            givenName: 'steve',
                            familyName: 'smith'
                        }
                    };

                    Mock.override('https://social.yahooapis.com/v1/user/', profile);

                    server.auth.strategy('custom', 'bell', {
                        password: 'password',
                        isSecure: false,
                        clientId: 'yahoo',
                        clientSecret: 'secret',
                        provider: custom
                    });

                    server.route({
                        method: '*',
                        path: '/login',
                        config: {
                            auth: 'custom',
                            handler: function (request, reply) {

                                reply(request.auth.credentials);
                            }
                        }
                    });

                    server.inject('/login', function (res) {

                        var cookie = res.headers['set-cookie'][0].split(';')[0] + ';';
                        mock.server.inject(res.headers.location, function (res) {

                            server.inject({ url: res.headers.location, headers: { cookie: cookie } }, function (res) {

                                expect(res.result).to.deep.equal({
                                    provider: 'custom',
                                    token: 'final',
                                    secret: 'secret',
                                    query: {},
                                    profile: {
                                        id: '1234567890',
                                        displayName: 'steve smith',
                                        name: {
                                            first: 'steve',
                                            last: 'smith'
                                        },
                                        raw: profile
                                    }
                                });

                                Mock.clear();
                                mock.stop(done);
                            });
                        });
                    });
                });
            });
        });
    });
});
