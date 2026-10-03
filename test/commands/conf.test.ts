import {runCommand} from '@oclif/test'
import {expect} from 'chai'
import {mkdtempSync, rmSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

describe('conf-cli-basic', () => {
  let cwd: string
  const run = (...argv: string[]) => runCommand(['conf', ...argv, '--cwd', cwd], {root: import.meta.url})

  before(() => {
    cwd = mkdtempSync(join(tmpdir(), 'conf-cli-test-'))
  })

  after(() => {
    rmSync(cwd, {recursive: true, force: true})
  })

  it('put', async () => {
    const {stdout, error} = await run('key', 'value')
    expect(error).to.equal(undefined)
    expect(stdout).to.eq('')
  })

  it('get', async () => {
    const {stdout} = await run('key')
    expect(stdout).to.eq('value\n')
  })

  it('put with flags', async () => {
    await run('-k', 'other', '-v', 'thing')
    const {stdout} = await run('other')
    expect(stdout).to.eq('thing\n')
  })

  it('list', async () => {
    const {stdout} = await run()
    expect(stdout).to.eq('key\nother\n')
  })

  it('delete', async () => {
    const {stdout, error} = await run('key', '-d')
    expect(error).to.equal(undefined)
    expect(stdout).to.eq('')
  })

  it('get after delete', async () => {
    const {stdout, error} = await run('key')
    expect(stdout).to.eq('')
    expect(error?.oclif?.exit).to.eq(1)
  })

  for (const key of ['__proto__.polluted', 'constructor.prototype.polluted', 'a.prototype']) {
    it(`rejects unsafe key ${key}`, async () => {
      const {error} = await run(key, 'yes')
      expect(error?.message).to.contain('invalid key')
      expect(error?.oclif?.exit).to.eq(2)
    })
  }

  for (const [flag, value] of [['--name', '../escaped'], ['--name', 'sub/file'], ['--project', '../../escaped'], ['--project', '@scope/../x']]) {
    it(`rejects ${flag} ${value}`, async () => {
      const {error} = await run('a', 'b', flag, value)
      expect(error?.message).to.contain(`invalid ${flag}`)
      expect(error?.oclif?.exit).to.eq(2)
    })
  }

  it('accepts a scoped package name as --project', async () => {
    const {error} = await run('scoped', 'yes', '--project', '@scope/app')
    expect(error).to.equal(undefined)
  })

  it('prints the version', async () => {
    const {stdout} = await run('--version')
    expect(stdout).to.match(/^conf-cli\/\d+\.\d+\.\d+\n$/)
  })
})
