class footballTeam{
    constructor(clubName, country){
        this.clubName = clubName;
        this.country = country;
        this.invitedPlayers = [];
    }
    
    newAdditions(footballPlayers){
        let player;
        let buff = "";
        for(let i = 0; i < footballPlayers.length; i++){
            let splitted = footballPlayers[i].split("/");
            //console.log(splitted)
            for(let j = 0; j < splitted.length; j++){
                player = {
                    name: splitted[0],
                    age: splitted[1],
                    playerValue: splitted[2]
                }
                //console.log(player)
                this.invitedPlayers = this.invitedPlayers.filter(play => play.name !== splitted[0]);
                this.invitedPlayers.push(player);
                if(player.name === splitted[0]){
                    if(player.playerValue < splitted[2]){
                        player.playerValue = splitted[2];
                    }
                }else {
                    this.invitedPlayers.push(player);
                }
            }
        }
       // console.log(this.invitedPlayers[0])
        buff += "You successfully invite ";
        this.invitedPlayers.forEach(player => buff += `${player.name}, `);
        return buff.substring(0, buff.length - 2) + ".";
    }

    signContract(selectedPlayer){
        let splitted = selectedPlayer.split("/");
        //console.log(splitted);
        let player = this.invitedPlayers.find(play => play.name === splitted[0]);
        if(!player){
            throw Error(`${splitted[0]} is not invited to the selection list!`);
        }
        if(player.playerValue > Number(splitted[1])){
            let priceDifference = player.playerValue - Number(splitted[1]);
            throw Error(`The manager's offer is not enough to sign a contract with ${splitted[0]}, ${priceDifference} million more are needed to sign the contract!`)
        } else {
            player.playerValue = 'Bought';
            let BoughtPlayer = player.name;
            return `Congratulations! You sign a contract with ${BoughtPlayer} for ${splitted[1]} million dollars.`
        }

    }

    ageLimit(name, age){
        let player = this.invitedPlayers.find(play => play.name === name);
        if(!player){
            throw Error(`${splitted[0]} is not invited to the selection list!`);
        }
        if(age > player.age){
            if(age - player.age < 5){
                let ageDifference = age - player.age
                return `${name} will sign a contract for ${ageDifference} years with ${this.clubName} in ${this.country}!`
            } else if(age - player.age >= 5) {
                return `${name} will sign a full 5 years contract for ${this.clubName} in ${this.country}!`
            }
        } else if(age <= player.age){
            return `${name} is above age limit!`;
        }
    }

    transferWindowResult(){
        let buff = "";
        buff += "Players list:\n";
        this.invitedPlayers.sort((a,b) => a.name.localeCompare(b.name)).forEach(play => buff += `Player ${play.name}-${play.playerValue}\n`);
        return buff;
    }
}
let fTeam = new footballTeam("Barcelona", "Spain");
console.log(fTeam.newAdditions(["Kylian Mbappé/23/160", "Lionel Messi/35/50", "Pau Torres/25/52"]));
console.log(fTeam.signContract("Kylian Mbappé/240"));
console.log(fTeam.ageLimit("Kylian Mbappé", 30));
console.log(fTeam.transferWindowResult());
