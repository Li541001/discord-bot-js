import { REST, Routes, Collection } from "discord.js"
import fg from 'fast-glob'
import { botGlobalData } from '../store/data.js'


//將指令使用api註冊到網路上
const updateSlashCommands = async (commands) => {
    const rest = new REST({ version: 10 }).setToken(process.env.TOKEN)
    const result = await rest.put(
        Routes.applicationCommands(
            process.env.APPLICATION_ID
        ),
        {
            body: commands
        }
    )
}

//將commands 的name與action fuc對應並存入store和註冊到網路上
export const loadCommands = async () => {
    const files = await fg('./src/commands/**/index.js')
    const commands = []
    const actions = new Collection()

    for (const file of files) {
        const fileName = file.substring(2, 50)
        const cmd = await import(`../../${fileName}`)
        commands.push(cmd.command)
        actions.set(cmd.command.name, cmd.action)
    }
    await updateSlashCommands(commands)
    botGlobalData.actions = actions
    console.log(actions)
}

//將events 全部取出並且註冊
export const loadEvents = async () => {
    const files = await fg('./src/events/**/index.js')
    for (const file of files) {
        const fileName = file.substring(2, 50)
        const event = await import(`../../${fileName}`)

        if (event.event.once) {
            botGlobalData.bot.once(event.event.name, event.action)
        }
        else {
            botGlobalData.bot.on(event.event.name, event.action)
        }

    }

}




// axios({
//     method:"PUT",
//     url: 'https://discord.com/api/v10/applications/',
//     headers:{
//         Authorization:"Bot"
//     },
//     data:{
//         body:[
//             {name:"ping",description:"ping"}
//         ]
//     }
// })