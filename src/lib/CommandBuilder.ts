import { SlashCommandBuilder } from "discord.js";

export class CommandBuilder extends SlashCommandBuilder {
  public isDisabled: boolean = false;

  constructor() {
    super();
  }

  public setDisabled(isDisabled: boolean) {
    this.isDisabled = isDisabled;
    return this;
  }
}
