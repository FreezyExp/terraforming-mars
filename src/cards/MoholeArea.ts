
import { TileType } from "../TileType";
import { CardType } from "./CardType";
import { IProjectCard } from "./IProjectCard";
import { SpaceType } from "../SpaceType";
import { Player } from "../Player";
import { Game } from "../Game";
import { Tags } from "./Tags";

export class MoholeArea implements IProjectCard {
    public cost: number = 20;
    public tags: Array<Tags> = [Tags.STEEL];
    public name: string = "Mohole Area";
    public cardType: CardType = CardType.AUTOMATED;
    public text: string = "Increase your heat production 4 steps. Place a special tile on an area reserved for ocean";
    public description: string = "Tunnels deep down to the molton magma, releasing heat and gases";
    public play(player: Player, game: Game): Promise<void> {
        return new Promise((resolve, reject) => {
            player.setWaitingFor({
                initiator: "card",
                card: this,
                type: "SelectASpace"
            }, (spaceId: string) => {
                try { game.addTile(player, SpaceType.OCEAN, game.getSpace(spaceId), { tileType: TileType.SPECIAL }); } catch (err) { reject(err); return; }
                player.heatProduction += 4;
                resolve();
            });
        });
    }
}

