import fs from 'fs'
import NlpManager from './NlpManager'
import data from '../Data/data.json'

export const Manager = new NlpManager({ languages: ['en'], nlu: { log: false } })

export const GenerateResponse = async (prompt: string) => {
    const input  = data.inputs
    const output = data.outputs

    // Input (message from user)
    for (let [type, value] of Object.entries(input)) {
        value.forEach(message => {
            Manager.addDocument('en', message, type)
        })
    }

    // Output (the response)
    for (let [type, value] of Object.entries(output)) {
        value.forEach(message => {
            Manager.addAnswer('en', type, message)
        })
    }

    await Manager.train()
    Manager.save()

    const result = await Manager.process('en', prompt)
    return result.answer
}

export const Train = (io: string, type: string, message: string): [boolean | undefined, string] => {
    let NewData = JSON.parse(fs.readFileSync('./Data/data.json', 'utf8'))
    switch (io) {
        case 'input':
            let input_found = false;
            for (let [key, value] of Object.entries(NewData.inputs)) {
                if (key === type) {
                    // @ts-ignore
                    value.push(message)
                    input_found = true
                    break
                }
            }
            if (input_found) {
                NewData = JSON.stringify(NewData, null, 4)
            }
            return [input_found, NewData]
        case 'output':
            let output_found = false;
            for (let [key, value] of Object.entries(NewData.inputs)) {
                if (key === type) {
                    // @ts-ignore
                    value.push(message)
                    output_found = true
                    break
                }
            }
            if (output_found) {
                NewData = JSON.stringify(NewData, null, 4)
            }
            return [output_found, NewData]
        default:
            return [undefined, NewData]
    }
}