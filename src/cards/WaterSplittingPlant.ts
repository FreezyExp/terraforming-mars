
import { CardType } from "./CardType";
import { Tags } from "./Tags";
import { IActiveProjectCard } from "./IActiveProjectCard";
import { Player } from "../Player";
import { Game } from "../Game";

export class WaterSplittingPlant implements IActiveProjectCard {
    public cost: number = 12;
    public tags: Array<Tags> = [Tags.STEEL];
    public name: string = "Water Splitting Plant";
    public cardType: CardType = CardType.ACTIVE;
    public text: string = "Requires 2 ocean tiles";
    public description: string = "Electrolysis of water yields oxygen and hydrogen, both very useful gases.";
    public play(player: Player, game: Game): void {
        if (game.getOceansOnBoard() < 2) {
            throw "Requires 2 ocean tiles";
        }
    }
    public actionText: string = "Spend 3 energy to increase oxygen level by 1";
    public action(player: Player, game: Game): Promise<void> {
        return new Promise((resolve, reject) => {
            if (player.energy < 3) {
                reject("Need 3 energy");
                return;
            }
            try {
                game.oxygenLevel++;
            } catch (err) { reject(err); return; }
            player.energy = Math.max(0, player.energy - 3);
            resolve();
        });
    }
} 
