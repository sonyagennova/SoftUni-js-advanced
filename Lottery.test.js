let chai = require("chai");
let expect = chai.expect;

const lottery = {
  buyLotteryTicket(ticketPrice, ticketCount, buy) {
    if (buy === false) {
      throw new Error("Unable to buy lottery ticket!");
    } else {
      if (
        ticketPrice <= 0 ||
        ticketCount < 1 ||
        typeof ticketPrice !== "number" ||
        typeof ticketCount !== "number"||
        typeof buy !== "boolean"
      ) {
        throw new Error("Invalid input!");
      } else {
        let totalPrice = ticketPrice * ticketCount;
        return `You bought ${ticketCount} tickets for ${totalPrice}$.`;
      }
    }
  },
 checkTicket(ticketNumbers, luckyNumbers) {
    if (
      !Array.isArray(ticketNumbers) ||
      !Array.isArray(luckyNumbers) ||
      ticketNumbers.length !== 6 ||
      luckyNumbers.length !== 6
    ) {
      throw new Error("Invalid input!");
    }
  
    const uniqueTicketNumbers = ticketNumbers.filter(
      (number, index, array) => array.indexOf(number) === index
    );
    let winningNumbers = 0;
  
    for (const number of uniqueTicketNumbers) {
      if (luckyNumbers.includes(number)) {
        winningNumbers++;
      }
    }
  
    if (winningNumbers >= 3 && winningNumbers < 6) {
      return "Congratulations you win, check your reward!";
    } else if (winningNumbers === 6) {
      return "You win the JACKPOT!!!";
    }
  }
  ,
  secondChance(ticketID, secondChanceWinningIDs) {
    if (typeof ticketID !== "number" || !Array.isArray(secondChanceWinningIDs)) {
      throw new Error("Invalid input!");
    }
    if (secondChanceWinningIDs.includes(ticketID)) {
      return "You win our second chance prize!";
    } else {
      return "Sorry, your ticket didn't win!";
    }
  },
};


module.exports = lottery;

describe("Tests lottery functionality", function() {
  describe("buyLotteryTicket", function() {
      it("buy is false", function() {
          expect(() => lottery.buyLotteryTicket(15, 2, false)).to.throw(Error, "Unable to buy lottery ticket!");
      });

      it("ticketPrice < 0", () => {
        expect(() => lottery.buyLotteryTicket(-1, 2, true)).to.throw(Error, "Invalid input!");
      })

      it("ticketPrice = 0", () => {
        expect(() => lottery.buyLotteryTicket(0, 2, true)).to.throw(Error, "Invalid input!");
      })

      it("ticketCount < 1", () => {
        expect(() => lottery.buyLotteryTicket(4, 0, true)).to.throw(Error, "Invalid input!");
      })

      it("ticketPrice is string", () => {
        expect(() => lottery.buyLotteryTicket("4", 2, true)).to.throw(Error, "Invalid input!");
      })

      it("ticketCount is string", () => {
        expect(() => lottery.buyLotteryTicket(4, "2", true)).to.throw(Error, "Invalid input!");
      })

      it("buy is string", () => {
        expect(() => lottery.buyLotteryTicket(4, 2, "true")).to.throw(Error, "Invalid input!");
      })

      it("buy is number", () => {
        expect(() => lottery.buyLotteryTicket(4, 2, 45)).to.throw(Error, "Invalid input!");
      })

      it("buy is true", () => {
        expect(lottery.buyLotteryTicket(4, 2, true)).to.eq(`You bought 2 tickets for 8$.`);
      })
   });
   
   describe("checkTicket", () => {
      it("thicketNumbers is string", () => {
        expect(() => lottery.checkTicket("6789", [5, 6, 7])).to.throw(Error, "Invalid input!");
      })

      it("luckyNumbers is string", () => {
        expect(() => lottery.checkTicket([678, 678], "[5, 6, 7]")).to.throw(Error, "Invalid input!");
      })

      it("thicketNumbers length is 5", () => {
        expect(() => lottery.checkTicket([6, 8, 9, 3, 45], [5, 6, 7, 3, 2])).to.throw(Error, "Invalid input!");
      })

      it("3 winning numbers", () => {
        expect(lottery.checkTicket([1, 2, 3, 4, 6, 8], [1, 2, 3, 96, 87, 78])).to.eq("Congratulations you win, check your reward!");
      })

      it("4 winning numbers", () => {
        expect(lottery.checkTicket([1, 2, 3, 4, 6, 8], [1, 2, 3, 4, 87, 78])).to.eq("Congratulations you win, check your reward!");
      })

      it("5 winning numbers", () => {
        expect(lottery.checkTicket([1, 2, 3, 4, 6, 8], [1, 2, 3, 4, 6, 78])).to.eq("Congratulations you win, check your reward!");
      })

      it("6 winning numbers", () => {
        expect(lottery.checkTicket([1, 2, 3, 4, 6, 8], [1, 2, 3, 4, 6, 8])).to.eq("You win the JACKPOT!!!");
      })
   })

   describe("secondChance", () => {
      it("ticketId is not a number", () => {
        expect(() => lottery.secondChance("543", [543, 678])).to.throw(Error, "Invalid input!");
      })

      it("secondChanceWinningIDs is string", () => {
        expect(() => lottery.secondChance(543, "654")).to.throw(Error, "Invalid input!");
      })

      it("ticketId is included in secondChanceWinningIDs", () => {
        expect(lottery.secondChance(543, [543, 654, 890])).to.eq("You win our second chance prize!");
      })

      it("ticketId is not included in secondChanceWinningIDs", () => {
        expect(lottery.secondChance(555, [543, 654, 890])).to.eq("Sorry, your ticket didn't win!");
      })
   })
});
