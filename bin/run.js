#!/usr/bin/env node

import {handle} from '@oclif/core'

import ConfCommand from '../lib/index.js'

await ConfCommand.run(process.argv.slice(2), import.meta.url).catch(handle)
