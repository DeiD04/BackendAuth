import { Module } from "@nestjs/common";
import { AbilityFactory } from "./abilities.factory";

@Module({
    providers: [AbilityFactory],
    exports: [AbilityFactory],
})
export class AbilitiesModule {}