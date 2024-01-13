class Garden {
    constructor(spaceAvailable){
        this.space = Number(spaceAvailable);
        this.plants = [];
        this.storage = [];
    }

    addPlant (plantName, spaceRequired){
        if(this.space < spaceRequired){
            throw Error("Not enough space in the garden.");
        } else {
            let currentPlant = {
                plantName,
                spaceRequired,
                ripe: false,
                quantity: 0
            }
            this.space += spaceRequired;
            this.plants.push(currentPlant);
            return `The ${plantName} has been successfully planted in the garden.`;
        }
    }

    ripenPlant(plantName, quantity){
        let currentPlant = this.plants.find(plant => plant.plantName === plantName)
        if(!currentPlant){
            throw Error(`There is no ${plantName} in the garden.`);
        } else if(currentPlant.ripe){
            throw Error(`The ${plantName} is already ripe.`);
        } else if(quantity <= 0){
            throw Error(`The quantity cannot be zero or negative.`);
        } else {
            currentPlant.ripe = true;
            currentPlant.quantity = quantity;

            if(quantity == 1){
                return `${quantity} ${plantName} has successfully ripened.`;
            } else if(quantity > 1){
                return `${quantity} ${plantName}s have successfully ripened.`;
            }
        }
    }

    harvestPlant(plantName){
        let currentPlant = this.plants.find(plant => plant.plantName === plantName)
        if(!currentPlant){
            throw Error(`There is no ${plantName} in the garden.`);
        } else if(!currentPlant.ripe){
            throw Error(`The ${plantName} cannot be harvested before it is ripe.`);
        } else {
            this.plants = this.plants.filter(plant => plant.plantName !== plantName);
            let storagePlants = {
                plantName: currentPlant.plantName,
                quantity: currentPlant.quantity
            }
            this.storage.push(storagePlants);
            this.space -= currentPlant.spaceRequired;
           
            return `The ${plantName} has been successfully harvested.`;
        }
    }

    generateReport(){
        let buff = "";
        buff += `The garden has ${ Number(this.space) } free space left.\n`;

        buff += "Plants in the garden: ";
        this.plants.sort((a,b) => a.plantName.localeCompare(b.plantName)).forEach(plant => buff += `${plant.plantName}, `);
        buff.substring(0, buff.length - 2);

        return buff;
    }
}

const myGarden = new Garden(250)

console.log(myGarden.addPlant('apple', 20));

console.log(myGarden.addPlant('orange', 200));

console.log(myGarden.addPlant('raspberry', 10));

console.log(myGarden.ripenPlant('apple', 10));

console.log(myGarden.ripenPlant('orange', 1));

console.log(myGarden.harvestPlant('orange'));

console.log(myGarden.generateReport());