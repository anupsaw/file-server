#! /usr/bin/env node
console.log('test');

process.title = 'file-server';

require('../dist/server.js');