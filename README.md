# fifagenerator-weeksplugin
A plugin for http://fifagenerator.com that gives us a week view over the games

## Give it a try

The plugin is already published on the chrome store. You can find it here: https://chrome.google.com/webstore/detail/fifa-generator-week-view/iagfkpnmgfgmmlifhfjokfnjolmnfdbm

If you want to test the plugin, all you have to do is sign up on the website: http://fifagenerator.com, create a competition and install the plugin.

Alternatively, you can use this competition: http://www.fifagenerator.com/tournament/54725/table/

## Development instructions

The plugin is written with angular2: https://angular.io and typescript: https://www.typescriptlang.org/

You can find useful information about how to combine angular2 and typescript here: https://angular.io/docs/ts/latest/

There are also a couple of really nice tutorials there that can get you started.

### Get it running
First things, first. So, before anything else, you should get all the dependencies to be able to run it:

```
npm install
```

Get all the typings for typescript compiler:

```
tsd install
```

Build and concat the plugin scripts:

```
npm run concat
```

This will compile the scripts and concat them on a single script file `dist/bundle.js`

#### Test it on the website
As this is a webpage plugin, the only way to test it is to create a chrome plugin.

Go to `Chrome Extensions -> Load unpacked extension` and choose the folder where the project is.

Every time you change the script, do not forget to:

1. Run the command: `npm run concat`
2. Reload the chrome extension

## How to contribute

Pull requests and improvements are welcome. So, if you find a bug or you really want a feature, you can fork this repo, do the change and pull request it. I will be glad to deploy it :).
