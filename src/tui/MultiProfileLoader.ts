/// <reference path="../external_types/neo-blessed.d.ts" />
import blessed from 'neo-blessed'
import { PartialProfile } from 'discord.bio'
import { Collection, Snowflake } from 'discord.js'
import asciify from 'asciify-image'
import { bold } from 'colors'
class PartialProfileBox extends blessed.Widgets.BoxElement {
  constructor({ boxOptions,
    profile,
    asciifiedAvatar }: {
      boxOptions: blessed.Widgets.BoxOptions,
      profile: PartialProfile,
      asciifiedAvatar: string
    }) {
    super(boxOptions)
    const avatarBoxHeight = this.height as number - 4
    const avatarBox = blessed.box({
      top: '0%',
      left: '0%',
      height: avatarBoxHeight,
      width: avatarBoxHeight as number * 2,
      content:asciifiedAvatar
    })
    this.append(avatarBox)
    const tag = blessed.text({
      width:40,
      height:1,
      content:bold(profile.discord.tag),
      top:'20%',
      left:'40%'
    })
    this.append(tag)
  }
}
function loader(screen: blessed.Widgets.Screen, profiles: Collection<Snowflake, PartialProfile>) {
  Promise.all(profiles.map<Promise<[Snowflake, string]>>(async x =>
    [x.discord.id,
    await asciify(x.discord.displayAvatarURL({
      size: 32, dynamic: false, format: 'png'
    }), {
      height:16,
      width:32,
      fit:'box'
    })]
  ))
    .then(avatarPoolArray => new Collection<Snowflake, string>(avatarPoolArray))
    .then(avatarPool => {
      for (const [user_id, asciifiedAvatar] of avatarPool) {
        const profileBox = new PartialProfileBox({
          boxOptions: {
            height: 20,
            width: 60
          },
          profile: profiles.get(user_id) as PartialProfile, asciifiedAvatar
        })
      }
    })
}
export { PartialProfileBox,loader }