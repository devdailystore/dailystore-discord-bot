import { SlashCommandBuilder } from "discord.js";

export class CommandBuilder extends SlashCommandBuilder {
  public isDisabled: boolean = true;

  constructor() {
    super();
  }

  public setDisabled(isDisabled: boolean) {
    this.isDisabled = isDisabled;
    return this;
  }
}
