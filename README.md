preLint
=======

preLint passes your git staged files through [ESLint](http://eslint.org/) utility.

Requirements
------------

 * NodeJS 6+ and npm installed

Installation
------------

 * ``$ npm install prelint --save-dev``

Usage
-----

 * Add the ``lint`` command to the ``scripts`` section of your ``package.json`` like this: ``"lint": "./node_modules/.bin/prelint",``
 * Install [pre-commit](https://www.npmjs.com/package/pre-commit) module ``npm install --save-dev pre-commit``
 * Add ``precommit`` section to your ``package.json``
 * Add ``lint`` task to ``precommit`` section
 
Example
-------
package.json

```
{
  ...
  "scripts": {
    ...
    "lint": "./node_modules/.bin/prelint",
    ...
  },
  "precommit": [
    ...
    "lint",
    ...
  ],
  ...
}
```
