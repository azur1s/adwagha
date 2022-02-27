import { layers, loadLayersModel, sequential, tensor2d, train } from '@tensorflow/tfjs-node'
import { load } from '@tensorflow-models/universal-sentence-encoder'
import data from '../Data/data.json'
import { Log } from './Util'

export const Train = async (SpecIter?: number) => {
    Log(0, "Training...")
    let TrainingData: { type: string, message: string }[] = []

    for (let [key, value] of Object.entries(data)) {
        value.patterns.forEach(message => {
            TrainingData.push({ type: key, message: message })
        })
    }

    const SentenceEncoder = await load()
    let Sentences = TrainingData.map(t => t.message.toLowerCase())
    let XLayer = await SentenceEncoder.embed(Sentences)
    let YLayer = tensor2d(
        TrainingData.map(t => [
            t.type == 'greeting' ? 1 : 0,
            t.type == 'bye' ? 1 : 0,
            t.type == 'thanks' ? 1 : 0,
            t.type == 'yesno' ? 1 : 0,
            t.type == 'compliment' ? 1 : 0,
            t.type == 'insult' ? 1 : 0,
        ])
    )

    const Model = sequential()

    Model.add(layers.dense({
        units: 6,
        activation: "softmax",
        inputShape: [XLayer.shape[1]]
    }))
    Model.compile({
        loss: "categoricalCrossentropy",
        optimizer: train.adam(0.001),
        metrics: ["accuracy"]
    });

    let Iter = SpecIter || 100
    
    Log(0, `Fitting Model... (${Iter} iterations)`)
    await Model.fit(XLayer, YLayer, {
        batchSize: 32,
        epochs: Iter,
        validationSplit: 0.1,
        shuffle: true,
        verbose: 0,
    }).then(info => {
        Log(0, "Final accuracy: " + info.history.acc)
    })

    Log(0, "Saving Model...")
    
    Model.save("file://./Model")
}

const JaroWinklerDistance = (s1: string, s2: string): number => {
    let m = 0;

    if (s1.length === 0 || s2.length === 0) return 0
    if (s1 === s2) return 1

    let range     = Math.floor(Math.max(s1.length, s2.length) / 2) - 1
    let s1Matches = new Array(s1.length)
    let s2Matches = new Array(s2.length)

    for (let i = 0; i < s1.length; i++) {
        let low  = (i >= range) ? i - range : 0
        let high = (i + range <= s2.length) ? (i + range) : (s2.length - 1)
    
        for (let j = low; j <= high; j++) {
            if (s1Matches[i] !== true && s2Matches[j] !== true && s1[i] === s2[j]) {
                ++m;
                s1Matches[i] = s2Matches[j] = true;
                break;
            }
        }
    }

    if (m === 0) return 0

    let k = 0
    let n_trans = 0

    for (let i = 0; i < s1.length; i++) {
        if (s1Matches[i] === true) {
            let j;
            for (j = k; j < s2.length; j++) {
                if (s2Matches[j] === true) {
                    k = j + 1
                    break
                }
            }

            if (s1[i] !== s2[j]) ++n_trans
        }
    }

    let weight = (m / s1.length + m / s2.length + (m - (n_trans / 2)) / m) / 3
    let l = 0
    let p = 0.1

    if (weight > 0.7) {
        while (s1[l] === s2[l] && l < 4) l++

        weight = weight + l * p * (1 - weight)
    }

    return weight;
}

export const Talk = async (message: string) => {
    Log(0, "Predicting...")

    const Model = await loadLayersModel("file://./Model/model.json")

    const SentenceEncoder = await load()
    let Sentence = [{ message: message.toLowerCase() }].map(t => t.message)

    const XLayer = await SentenceEncoder.embed(Sentence)
    // @ts-ignore
    const Prediction = await Model.predict(XLayer).data()

    let Highest = [0, 0];
    for (let i = 0; i < Prediction.length; ++i) {
        Log(0, `${i}th: Score ${Prediction[i]}`)
        if (Highest[1] < Prediction[i]) {
            Log(0, `${i}th: Score ${Prediction[i]} (New Highest)`)
            Highest[0] = i;
            Highest[1] = Prediction[i];
        }
    }

    let Predicted = "";
    switch (Highest[0]) {
        case 0: Predicted = "greeting"; break
        case 1: Predicted = "bye"; break
        case 2: Predicted = "thanks"; break
        case 3: Predicted = "yesno"; break
        case 4: Predicted = "compliment"; break
        case 5: Predicted = "insult"; break
    }

    Log(0, `High: ${Highest} - Predicted: ${Predicted}`)
    let Input = ["", 0]
    // @ts-ignore
    data[Predicted].patterns.forEach((pattern: string) => {
        let Weight = JaroWinklerDistance(message, pattern)
        // @ts-ignore
        if (Weight > Input[1]) {
            // @ts-ignore
            Input[0] = pattern
            Input[1] = Weight
        }
        Log(0, `Comparing weight: ${message} <> ${pattern} -> ${Weight}`)
    })

    let Possible: any[] = []
    // @ts-ignore    
    if (Input[1] > 0.5) {
        // @ts-ignore
        data[Predicted].responses.forEach((pattern: string) => {
            Log(0, `Possible <- ${pattern}`)
            Possible.push(pattern)
        })
    }

    if (Possible.length > 0) {
        return Possible[Math.floor(Math.random() * Possible.length)]
    } else {
        return "I don't know what to say"
    }
}