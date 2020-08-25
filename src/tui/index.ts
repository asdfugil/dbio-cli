/// <reference path="../../neo-blessed.d.ts" />
import blessed, { box } from 'neo-blessed'
import { Bio } from 'discord.bio'
const bio = new Bio({ ws: { autoConnect:true } })
import fetch from 'node-fetch'
const screen  = blessed.screen({ 
  smartCSR:true 

})
screen.title = "discord.bio"
const about = blessed.text({
  left:'40%',
  top:'20%',
  content:'discord.bio CLI by Assfugil'
})
const list = blessed.list({
  parent:screen,
  items:['Profile by slug/id','Search','top Profiles','Exit'],
  top: 'center',
  left: 'center',
  style:{
    selected:{
      bg:'white',
      fg:'black'
    }
  },
  interactive:true,
  mouse:true,
  tags: true,
  border: {
    type: 'line'
  },
  keys:true
})
list.on('select',(element,option) => {
  switch(option) {
    case 0 : {
      list.hide()
      about.hide()
      const prompt = blessed.prompt({
        parent:screen,
        keys:true,
        mouse:true,
        interactive:true,
        top: 'center',
        left: 'center',
        bg:'white',
        fg:'black',
        tags:true
      })
      prompt.enableInput()
      prompt.input('Enter slug or user id','',async (error,value) => {
        screen.remove(prompt)
        prompt.destroy()
        screen.render()
        const slug = value.replace(' ','')
        const profile = await bio.users.details(slug)
        const imgURL = profile.discord.displayAvatarURL({ dynamic:false,size:64 })
        const img = await fetch(imgURL).then(res => res.body)
        const chunkArray:Buffer[] = [] 
        img.on('data',chunk => chunkArray.push(chunk))
        const avatarBox = blessed.box({
          top:'5%',
          left:'1%',
          width:40,
          height:40,
          border:'line'
        })
        try {
        img.once('end',() => {
          const imgBuffer = Buffer.concat(chunkArray)
        //@ts-ignore
        const image = blessed.image({
          parent:avatarBox,
          type:'overlay'
        })
        image.setImage(imgBuffer,console.error)
        avatarBox.append(image)
        const tag = blessed.text({ 
          content:profile.discord.tag,
          left:'70%',
          height:'70%'
        })
        screen.append(tag)
        screen.append(avatarBox)
        screen.render()
        console.log('hi')
        })
      } catch (error) {
        console.log(error)
      }
      })
      screen.append(prompt)
      screen.render()
    };break
    case 3:process.exit();break
  }

})
screen.append(list)
screen.append(about)
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});
list.focus()
screen.render()
