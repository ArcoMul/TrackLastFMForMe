# TrackLastFMForMe

_Track LastFM scrobbles to TrackThisForMe_

Not usable at all for normal use. Needs (at the moment) quite some configuring to setup.

* http://www.last.fm  
* https://www.trackthisfor.me

---

### How to use

Fill in options in main.js

```
var options {
    trackthisforme: {
        access_token: '',
        category_id: 0 
    },
    lastfm: {
        api_key: 'x',
        secret: 'x',
        username: 'x'
    }
}
```

Run with NodeJS

```
$ git clone git@github.com:ArcoMul/TrackLastFMForMe.git  
$ npm install  
| Update options in main.js  
$ node main.js
```
