#!/usr/bin/env node
// The CLI
import { program } from 'commander'
program.name('dbio').version(require('../package.json').version)
program
  .command('details <slug_or_user_id>')
  .description('Display user details')
  .action(require('./commands/details'));
program
  .command('search <query>')
  .description('Search for profiles, sorted by upvotes')
  .action(require('./commands/search'));
program
  .command('topLikes')
  .description('Show the most upvoted profiles, sorted by upvotes')
  .action(require('./commands/topLikes'));
program
  .command('version')
  .description('Displays the API version')
  .action(require('./commands/version'))
program
  .command('totalUsers')
  .description('Display approximate discord.bio user count')
  .action(require("./commands/totalUsers"))
program.parse(process.argv)
