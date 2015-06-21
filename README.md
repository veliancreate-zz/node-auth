# Mean template with Node authentication

Includes Mongo, Mongoose, Bower, Grunt, SASS, Karma, Travis CI, Protractor. Karma not being used for current setup, but is included to enable usage if required.

Authentication:

 * Passport
 * Bcrypt
 * Passport sessions enabled

Database:

 * Mongo
 * Mongoose

Bower dependencies:

 * JQuery
 * Angular - resource, route, messages, mocks
 * Modernizr
 * Underscore.js
 * Bootstrap

Grunt tasks:

* grunt watch for sass and jslint
* grunt travis for Travis CI tests
* grunt for protractor e2e and unit tests

Generic server.js file for routes, error handling, asset pipeline and views.

- app
	- public
		- css
		- images
		- js
		 	- controllers
		 	- directives
		 	- services
		 	- views
		 	- filters
	- routes
	- views
	- models
		- services
- bin
- bower_components
- node_modules
- sass
- spec
	- features
	- unit
- uploads
- config	
