import { Bio, ConnectionTypes,DBioAPIError } from 'discord.bio'
import { bold } from 'colors'
const bio = new Bio()
async function details (slug:string):Promise<void> {
    const profile = await bio.users.details(slug)
    .catch((error:DBioAPIError) => {
        if (error.statusCode === 404) console.error(`Profile "${slug}" not found.`)
        else console.error(error)
        process.exit(1)
    })
    //const presence = (await bio.users.presence(profile.discord.id))[0]
    const { details,userConnections,discordConnections } = profile.user
    const flags = [];
    for (const [key, value] of Object.entries(
      profile.discord.public_flags.serialize()
    )) {
      if (value) flags.push(key.replace(/_/g,' ').toLowerCase());
    }
    console.log(bold(profile.discord.tag + `(${details.slug})`))
     /*if (presence) console.log(
      `[${presence.type === 'CUSTOM_STATUS' ?
        presence.name :
        presence.type
          .replace('_',' ')
          .toLowerCase()
          .charAt(0)
          .toUpperCase() +
        presence.type
          .replace('_',' ')
          .toLowerCase()
          .slice(1)} ${bold(`${presence.type === 'CUSTOM_STATUS' ?
            presence.state : presence.name}`)}]`)
        */
    console.log(bold(`❤️ ${details.likes} likes`))
    console.log('')
    console.log(bold('Description:') + ' '+ details.description)
    console.log(bold('User ID:') + profile.discord.id)
    console.log(bold(`Flags: `) + (flags.join(', ') || '(none)'))
    console.log(bold('Details'))
    const info:['location','gender','birthday','email','createdAt','occupation','verified','staff'] = ['location','gender','birthday','email','createdAt','occupation','verified','staff']
    const data:{[key:string]:{ value:string | boolean | null | Date }} = {}
    for (const key of info) {
        if (details[key] as string | null| boolean) data[key] = { value: details[key] as string | null }
    }
    console.table(data)
    let connections_data:{[key in string]?:{value:string}} = {}
    for (const [_,connection] of discordConnections) {
      if (connection) connections_data[connection.type] = { value:connection.name }
  }
    for (const [key,value] of Object.entries(userConnections)) {
      if (value) connections_data[key as ConnectionTypes] = { value:value }
    }
    if (connections_data) {
    console.log(bold('Connections'))
    console.table(connections_data) 
    }
}
export = details
