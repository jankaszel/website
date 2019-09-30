const {promises: fs} = require('fs')
const path = require('path')
const fm = require('front-matter')

async function main() {
  const logPath = `${__dirname}/content/log`

  const posts = []
  const files = (await fs.readdir(logPath, {withFileTypes: true})).filter(
    file =>
      file.isFile() &&
      !file.name.startsWith('.') &&
      path.extname(file.name) === '.md',
  )

  for (file of files) {
    const text = await fs.readFile(path.join(logPath, file.name), 'utf-8')
    const post = fm(text)

    posts.push({
      ...post.attributes,
      slug: path.basename(file.name, '.md'),
    })
  }

  const sortedPosts = posts.sort((a, b) => a.date - b.date)
  await fs.writeFile(
    `${__dirname}/log-index.json`,
    JSON.stringify(sortedPosts),
  )
}

main()