# React + WP-API
### Headless WordPress.

This React boilerplate based on **create-react-app** helps you to create Single Page Applications which are powered by the WordPress API (WP-API).


## What's included?

* Bootstrap Framework
* 1 menu
* React Router
* WP REST API client
* Parse content from API
* Blog pagination: Load more posts dynamically
* Autocomplete component
* Easy setup via a JSON configuration


## Setup

The version needs to be rebuilt after making changes to the code.

1. Prerequisites: [Node.js](https://nodejs.org) (NPM) needs to be installed on your system. Furthermore a local web server **http://localhost** needs to be up and running.
2. You need to have access to a WordPress website which supports the WP-API and where you've published some pages and posts
    * e.g. `http://localhost/wordpress/wp-json`
    * Pretty permalinks need to be enabled: https://wordpress.org/support/article/using-permalinks/#choosing-your-permalink-structure
3. Download the source code of this repository to a new directory on your local webserver
    * e.g. `http://localhost/wp-react-app/`
4. Install all required dependencies
    * `$ npm install`
5. Modify **homepage** in **package.json** to match the url of the **build** version (this is the full path to the directory where the app gets built!)
    * e.g. `http://localhost/wp-react-app/build`
    * Router-Config: https://stackoverflow.com/a/48943753
6. Modify **/src/_setup.json**
    * **basename** needs to match the website base (If the website has no base simply add "**/**")
    * **slug_home** needs to match the Homepage slug of the WordPress website
    * **slug_posts** needs to match the Posts page slug of the WordPress website
    * Make sure that all pages defined in **menu** have been published and are accessible. **path** needs to match the according page slug of the published page.
7. Style your app
    * `/src/App.scss`
    * React Bootstrap documentation: https://react-bootstrap.netlify.com
8. Create a build version
    * `$ npm run build`
9. Test your app
    * e.g. `http://localhost/wp-react-app/`
10. Going live
    * Don't forget to edit `/public/favicon.json` and `/public/manifest.json` and rebuild the version before publishing the app on a live system.


## Technology

* [React](https://github.com/facebook/react), [MIT licence](https://github.com/facebook/react/blob/master/LICENSE)
* [React Bootstrap](https://github.com/react-bootstrap), [MIT licence](https://github.com/react-bootstrap/react-bootstrap/blob/master/LICENSE)
* [WordPress Block Library](https://github.com/WordPress/gutenberg/tree/master/packages/block-library), [GPLv2+ licence](https://github.com/WordPress/gutenberg/blob/master/LICENSE.md)
* [node-sass](https://github.com/sass/node-sass), [MIT licence](https://github.com/sass/node-sass/blob/master/LICENSE)
* [node-wpapi](https://github.com/wp-api/node-wpapi), [MIT licence](https://github.com/WP-API/node-wpapi/blob/master/LICENSE)


## Copyright & License

Code and Documentation &copy; [them.es](http://them.es)

Code released under [GPLv2+](http://www.gnu.org/licenses/gpl-2.0.html)