
export interface Question {
  id: number;
  text: string;
  imageUrl: string;
}

export enum ProposalStage {
  INTRO = 'INTRO',
  QUESTIONS = 'QUESTIONS',
  PROPOSAL = 'PROPOSAL',
  SUCCESS = 'SUCCESS'
}
