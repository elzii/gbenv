gbenv
======

use 
[gulp](https://www.npmjs.com/package/gulp), 
[browserify](https://www.npmjs.com/package/gulp-browserify), 
[contentful](https://www.npmjs.com/package/contentful), 
[fileinclude](https://www.npmjs.com/package/gulp-file-include) and 
[handlebars](https://www.npmjs.com/package/gulp-handlebars) to develop dynamic database-less sites and applications


### install

* `npm install`
* `bower install`


### setup

* create a file `config/secrets.js`. this file is omitted via .gitignore, used to store access tokens, etc
* example structure

```
var secrets = {
  contentful : {
    accessToken: '9a17e7916e062ebf70a371b773409a4a72bd67cea3385365c8b93992c7a05abc',
    space: 'hbaiko5ln2ix'
  }
}

module.exports = secrets;

```


### develop

* `gulp`


### documentation


* store 