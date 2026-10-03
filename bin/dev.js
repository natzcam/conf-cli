#!/usr/bin/env -S node --import tsx

import {handle} from '@oclif/core'

import ConfCommand from '../src/index.ts'

await ConfCommand.run(process.argv.slice(2), import.meta.url).catch(handle)
