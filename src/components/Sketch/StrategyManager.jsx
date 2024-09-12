class StrategyManager {
    constructor(oppChoices) {
        this.oppChoices = oppChoices;
    }

    getFriedman() {
        const choice = !this.oppChoices.some((item) => item === false);
        console.log(choice);
        return choice;
    }

    getJoss() {
        const currChoice = this.oppChoices.at(-1);
        return currChoice ? Math.random() >= 0.1 : false;
    }

    getRandom() {
        return Math.random() >= 0.5;
    }

    getTwoChances() {
        const [currChoice, prevChoice] = this.oppChoices.slice(-2);
        return !(currChoice === false && prevChoice === false);
    }

    getTit4Tat() {
        // return this.oppChoices.at(-1);
        return true;
    }

    getPoints(strategy1, strategy2) {
        let x, y;

        if (strategy1 && strategy2) {
            x = 3;
            y = 3;
        } else if (strategy1 && !strategy2) {
            x = 0;
            y = 5;
        } else if (!strategy1 && strategy2) {
            x = 5;
            y = 0;
        } else {
            x = 1;
            y = 1;
        }

        return { x, y };
    }
}

export default StrategyManager;
