import { expect, test } from '@oclif/test'

import cmd = require('../../src')

describe('conf-cli-basic', () => {
  test
    .stdout()
    .do(() => cmd.run(['key', 'value']))
    .it('put', ctx => {
      expect(ctx.stdout).to.eq('');
    })

  test
    .stdout()
    .do(() => cmd.run(['key']))
    .it('get', ctx => {
      expect(ctx.stdout).to.eq('value');
    })

  test
    .stdout()
    .do(() => cmd.run(['key', '-d']))
    .it('delete', ctx => {
      expect(ctx.stdout).to.contain('')
    })

  test
    .stdout()
    .do(() => cmd.run(['key']))
    .it('get after delete', ctx => {
      expect(ctx.stdout).to.eq('');
    })
})
