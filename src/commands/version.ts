import { Bio } from 'discord.bio'
const bio = new Bio()
export = function () { return bio.APIVersion().then(console.log) }
