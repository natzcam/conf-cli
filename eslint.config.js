import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {ignores: ['lib', 'coverage', 'example']},
  js.configs.recommended,
  tseslint.configs.recommended,
  {languageOptions: {globals: globals.node}},
)
