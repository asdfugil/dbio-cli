import blessed, { box } from 'neo-blessed'
import { Bio } from 'discord.bio'
import asciify from 'asciify-image'
const bio = new Bio({ ws: { autoConnect: false } })
import fetch from 'node-fetch'
import colors, { bold } from 'colors'
import copy from 'copy-to-clipboard'
const screen = blessed.screen({
  smartCSR: true
})
if (screen.width < 80 || screen.height < 24) {
  console.error('Error: Terminal size must be at least 80x24')
  process.exit()
}
screen.title = "discord.bio"
const about = blessed.text({
  left: '40%',
  top: '20%',
  content: 'discord.bio CLI by Assfugil'
})
const list = blessed.list({
  parent: screen,
  items: ['Profile by slug/id', 'Search', 'top Profiles', 'Exit'],
  top: 'center',
  left: 'center',
  style: {
    selected: {
      bg: 'white',
      fg: 'black'
    }
  },
  interactive: true,
  mouse: true,
  tags: true,
  border: {
    type: 'line'
  },
  keys: true
})
list.on('select', (element, option) => {
  switch (option) {
    case 0: {
      list.hide()
      about.hide()
      const prompt = blessed.prompt({
        parent: screen,
        keys: true,
        mouse: true,
        interactive: true,
        top: 'center',
        left: 'center',
        bg: 'white',
        fg: 'black',
        tags: true
      })
      prompt.enableInput()
      prompt.input('Enter slug or user id', '', async (error, value) => {
        if (error) {
          prompt.destroy()
          list.show()
          about.show()
          screen.render()
          return
        }
        screen.remove(prompt)
        prompt.destroy()
        const loading = blessed.loading({
          width:'90%',
          height:1,
          top:1,
          left:1
        })
        screen.append(loading)
        loading.load('Loading profile...')
        screen.render()
        const slug = value.replace(' ', '')
        const profile = await bio.users.details(slug)
        loading.load('Connecting to websocket...')
        screen.render()
        await profile.connect()
        const imgURL = profile.discord.displayAvatarURL({ dynamic: false, size: 128, format: 'png' })
        const avatarBox = blessed.box({
          top: '5%',
          left: '1%',
          width: screen.width as number * 0.5 + 2,
          height: screen.height as number * 0.9 + 2,
          draggable:true,
          scrollable:true
        })
        loading.load('Downloading avatar...')
        screen.render()
        asciify(imgURL,{
          fit: 'box',
          width:screen.width as number * 0.5,
          height:screen.height as number * 0.9
        }).then(asciified => {
          const avatarASCII = blessed.text({ parent:avatarBox,content:asciified })
          const tag = blessed.text({
            content: bold(profile.discord.tag),
            color:'#00ff00',
            left: '60%',
            top:'5%',
            width: 'shrink',
            height: 'shrink',
            draggable:true
          })
          const info:['location','gender','birthday','email','createdAt','occupation','verified','staff']  = ['location','gender','birthday','email','createdAt','occupation','verified','staff']
          const detailsText = []
          for (const key of info) { 
            if (profile.user.details[key] !== null && typeof profile.user.details[key] !== 'undefined') {
              detailsText.push(`${bold(key + ":")} ${profile.user.details[key] }`)
            }
          } 
          const presence = blessed.text({
            left:'60%',
            top:'10%',
            width: 'shrink',
            height: '17%',
            content:'',
            draggable:true,
            scrollable:true,
          })
          profile.on('presenceUpdate',(_,pres) => {
            if (pres.activity) {
              const typeName = pres.activity.type.replace('_',' ').toLowerCase()
              presence.setContent(`${bold(typeName.charAt(0).toUpperCase() + typeName.slice(1))}\n${pres.activity.type === 'CUSTOM_STATUS' ? pres.activity.state : pres.activity.name}\n\nStatus: ${pres.status}`)
            } else {
              presence.setContent(`\n\nStatus: ${pres.status ? pres.status : 'offline'}`)
            }
            screen.append(presence)
            screen.render()
          })
          screen.append(presence)
          const details = blessed.text({
            border:'line',
            left:'60%',
            top:'27%',
            width:'40%',
            content: `${profile.user.details.description}
            

${bold("User ID:")} ${profile.discord.id}
` + detailsText.join('\n'),
draggable:true,
scrollable:true,
alwaysScroll:true
          })
          screen.append(details)
          const view_count = blessed.text({
            content: `0 views`,
            left: '92%',
            top:'5%',
            width: 'shrink',
            height: 'shrink',
            hidden: false,
            draggable:true
          })
          profile.on('viewCountUpdate',(_oldCount,newCount) => {
            view_count.setContent(`${newCount} views`)
            view_count.show()
            screen.render()
          })
          const like_count = blessed.text({
            content: `${profile.user.details.likes} likes`,
            left: '80%',
            top:'5%',
            width: 'shrink',
            height: 'shrink',
            draggable:true
          })
          tag.on('click',() => {
            return
            copy(profile.discord.tag,{})
          })
          screen.append(view_count)
          screen.append(like_count)
          avatarBox.append(avatarASCII)
          screen.append(tag)
          screen.append(avatarBox)
          loading.stop()
          loading.destroy()
          screen.render()
        })
      })
      screen.append(prompt)
      screen.render()
    }; break
    case 3: process.exit(); break
  }

})
screen.append(list)
screen.append(about)
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});
list.focus()
screen.render()
