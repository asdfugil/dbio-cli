import { Bio } from 'discord.bio'
const bio = new Bio()
const totalUsers = () => bio.totalUsers().then(console.log)
export = totalUsers