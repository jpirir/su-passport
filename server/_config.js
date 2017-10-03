var ids = {
  openID: {
    clientID: '2ce9ffe2-c756-48a9-84c2-0269013bad62',
    clientSecret: 'UTgLD4QYMlj2GP8wc-XWgfcmQeReXhHbr-ptjkR62HHXlTp7ibfRywN9cP_Fdfd4LKmDg-kgJEmnaCjVhlbq-Q',
    returnURL: "http://localhost:3000/auth/openid/callback"
  },
  github: {
    clientID: '8aa04e8523c3294d590d',
    clientSecret: 'e3d59406869baf9ae0784f04a765f0a7581355d4',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  linkedin: {
    clientID: '780h2lggehvm82',
    clientSecret: 'JrEub87fd6jD16zA',
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
  },
  twitter: {
    consumerKey: 'XMfjKB6hHrWUlKH3Ovye3hOpK',
    consumerSecret: 's6H06cVrynnTmizt4y1TYIc8G9voAo3YUd0vUTYNhNTwl0eS40',
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  facebook: {
      clientID: '674843309375194',
      clientSecret: '12571e713c95a95f924e5f53c2b677d2',
      callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  google: {
      clientID: '982942412999-11i6kqrsv07d3kf4ev3tg6o5eluurvrd.apps.googleusercontent.com',
      clientSecret: 'WKv9CRmzpTVyAZ_IAZmYLmD_',
      callbackURL: "http://localhost:3000/auth/google/callback"
  },
  azure: {
      clientID: 'db7eda68-29dd-4615-a14a-156717c5bc7d',
      clientSecret: 'ZiyFFMPDbYzGdqpXoDY6TY2',
      callbackURL: "http://localhost:3000/auth/azure/callback"
  }
};

module.exports = ids;