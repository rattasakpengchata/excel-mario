export type MOSLevel = 'Associate' | 'Expert';

export interface MOSObjective {
  code: string;
  nameTh: string;
  nameEn: string;
  descriptionTh: string;
}

export interface QuizQuestion {
  id: string;
  questionTh: string;
  options: string[];
  correctIndex: number;
  explanationTh: string;
  mosTipTh?: string;
}

export interface FormulaExample {
  name: string;
  syntax: string;
  descriptionTh: string;
  exampleData: { [key: string]: string | number }[];
  formulaCode: string;
  result: string | number;
  breakdownTh: string;
}

export interface SubTopic {
  id?: string;
  titleTh: string;
  titleEn?: string;
  ribbonPath?: string;
  shortcut?: string;
  descriptionTh: string;
  stepByStepTh: string[];
  mosExamRuleTh?: string;
  exampleFormula?: string;
}

export interface LessonBlock {
  id: string;
  blockNumber: number; // 1-8 per world
  titleTh: string;
  titleEn: string;
  worldId: number;
  stageId: number;
  level: MOSLevel;
  mosObjectiveCode: string;
  summaryTh: string;
  powerUpItem: 'mushroom' | 'fireflower' | 'star' | 'coin';
  unlocked: boolean;
  completed: boolean;
  content: {
    overviewTh: string;
    keyPointsTh: string[];
    subTopics?: SubTopic[];
    ribbonPath?: string; // e.g. "Home > Editing > Fill > Flash Fill"
    keyboardShortcuts?: { key: string; actionTh: string }[];
    formulas?: FormulaExample[];
    interactiveSheetData?: {
      headers: string[];
      rows: (string | number)[][];
      formulaCell?: { row: number; col: number; formula: string; expectedResult: string | number };
    };
    mosExamTipsTh: string[];
    commonMistakesTh: string[];
  };
  quiz: QuizQuestion;
}

export interface BossTask {
  taskNumber: number;
  taskTitleTh: string;
  taskInstructionTh: string;
  targetSheet: string;
  targetRange: string;
  formulaRequired?: string;
  ribbonPathRequired?: string;
  expectedResultTh: string;
  solutionStepByStepTh: string[];
  explanationTh: string;
  excelTipsTh: string;
}

export interface BossChallenge {
  id: string;
  worldId: number;
  level: MOSLevel;
  bossName: string;
  bossTitleTh: string;
  scenarioDoc: {
    companyName: string;
    projectTitleTh: string;
    scenarioBackgroundTh: string;
    examDurationMinutes: number;
    tasks: BossTask[];
  };
  excelWorkbook: {
    filename: string;
    sheets: {
      name: string;
      descriptionTh: string;
      headers: string[];
      rows: (string | number)[][];
      solutionRows?: (string | number)[][];
    }[];
  };
  bowserHealth: number; // e.g. 5 tasks = 5 HP
}

export interface WorldData {
  id: number;
  worldNumber: string;
  worldNameTh: string;
  worldNameEn: string;
  level: MOSLevel;
  theme: 'grass' | 'desert' | 'sky' | 'castle';
  descriptionTh: string;
  blocks: LessonBlock[];
  bossChallenge?: BossChallenge;
}

export interface UserProgress {
  score: number;
  coins: number;
  stars: number;
  currentWorld: number;
  powerUpState: 'small' | 'super' | 'fire' | 'star';
  completedBlockIds: string[];
  completedBossIds: string[];
  quizScores: Record<string, boolean>;
  studentName: string;
}
