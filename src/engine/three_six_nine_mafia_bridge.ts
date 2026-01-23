export type MafiaInput = {
  identity: string;
  action: string;
  payload: string;
  responsibility: boolean;
};

export type MafiaOutput = {
  stateHash: string;
};

export const runMafia = (_input: MafiaInput): MafiaOutput => {
  throw new Error('three_six_nine_mafia bridge not built');
};
