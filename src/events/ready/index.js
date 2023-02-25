import {Events} from 'discord.js'

export const event = {
    name:Events.ClientReady,
    once:true
}

export const action = (c)=>{
        console.log(`----------------------${c.user.tag}bot online------------------------`)
}