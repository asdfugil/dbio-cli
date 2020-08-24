/// <reference path="../../neo-blessed.d.ts" />
import blessed from 'neo-blessed'
import { Bio } from 'discord.bio'
const bio = new Bio({ ws: { autoConnect:true } })
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
        const tag = blessed.text({ content:profile.discord.tag })
      })
      screen.append(prompt)
      screen.render()
    };break
    case 3:process.exit();break
  }

})
screen.append(list)
screen.append(about)
list.focus()
screen.render()
