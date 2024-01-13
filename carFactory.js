function car(input){
    let smallEngine = { power: 90, volume: 1800 }
    let normalEngine = { power: 120, volume: 2400 }
    let monsterEngine = { power: 200, volume: 3500 }

    let output = {};
    let engine = {};

    output["model"] = input.model;

    if(input.power === smallEngine.power || input.power < smallEngine.power){
        engine["power"] = smallEngine.power;
        engine["volume"] = smallEngine.volume;
        output["engine"] = engine;
    } else if(input.power <= normalEngine.power && input.power > smallEngine.power){
        engine["power"] = normalEngine.power;
        engine["volume"] = normalEngine.volume;
        output["engine"] = engine;
    } else if(input.power <= monsterEngine.power && input.power > normalEngine.power){
        engine["power"] = monsterEngine.power;
        engine["volume"] = monsterEngine.volume;
        output["engine"] = engine;
    }

    let carriage = {"type": input.carriage, "color": input.color};
    output["carriage"] = carriage;

    let wheelsize = [];
    if(input.wheelsize % 2 !== 0){
        for(let i = 0; i < 4; i++){
            wheelsize.push(input.wheelsize);
        }
    } else {
        for(let i = 0; i < 4; i++){
            wheelsize.push(input.wheelsize - 1);
        }
    }

    output["wheels"] = wheelsize;

    return output;
     //console.log(engine);
     //console.log(carriage);
     //console.log(wheelsize);
}
car({ model: 'VW Golf II',

power: 90,

color: 'blue',

carriage: 'hatchback',

wheelsize: 14 })

console.log("-------------------------")
car({ model: 'Opel Vectra',

power: 110,

color: 'grey',

carriage: 'coupe',

wheelsize: 17 })
console.log("---------------------------");
car({
    model: 'Ferrari',
    power: 200,
    color: 'red',
    carriage: 'coupe',
    wheelsize: 21
})