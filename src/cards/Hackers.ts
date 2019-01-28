
import { IProjectCard } from "./IProjectCard";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { Tags } from "./Tags";
import { SelectPlayer } from "../inputs/SelectPlayer";

export class Hackers implements IProjectCard {
    public cost: number = 3;
    public tags: Array<Tags> = [];
    public name: string = "Hackers";
    public cardType: CardType = CardType.AUTOMATED;
    public text: string = "Decrease your energy production 1 step and any mega credit production 2 steps. Increase your mega credit production 2 steps. Lose 1 victory point.";
    public description: string = "Very unethical, very illegal, very lucrative.";
    public play(player: Player, game: Game): Promise<void> {
        if (player.energyProduction < 1) {
            return Promise.reject("Must have energy production to decrease");
        }
        return new Promise((resolve, reject) => {
            player.setWaitingFor(new SelectPlayer(this, game.getPlayers(), "Select player to decrease mega credit production", (foundPlayer: Player) => {
                if (foundPlayer.megaCreditProduction < 2) {
                    reject("Player must have 2 mega credit production to decrease");
                    return;
                }
                player.energyProduction--;
                foundPlayer.megaCreditProduction -= 2;
                player.megaCreditProduction += 2;
                player.victoryPoints--;
                resolve();
            }));
        });
    }
}

