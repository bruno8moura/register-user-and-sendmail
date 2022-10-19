import moduleAlias from 'module-alias'
import path from 'path'

if (process.env.NODE_ENV === 'production') {
  moduleAlias.addAliases({
    '@': path.join(__dirname, '../../../dist')
  })
} else {
  moduleAlias.addAliases({
    '@': path.join(__dirname, '../../../src')
  })
}
