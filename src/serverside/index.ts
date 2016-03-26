'use strict';
import * as http from 'http';
import {makeHttpListener, RuleSet} from 'routist';
import {file} from 'routist';





let httpListener = makeHttpListener(new RuleSet({
    "GET /{...path} #1": file('mrdragon/public/{path}'),
    "GET /scripts/phaser.js": file('mrdragon/node_modules/phaser/dist/phaser.js'),
    "GET /scripts/{...path}.js": file('mrdragon/built/clientside/{path}.js')
}));
http.createServer(httpListener).listen(1337);
console.log('listening on port 1337...');
