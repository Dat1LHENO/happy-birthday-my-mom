export interface OpeningData {
  greeting: string;
  day: number;
  month: number;
}

export interface IntroData {
  line1: string;
  line2: string;
  idleHint: string;
  holdingHint: string;
  lightingHint: string;
}

export interface WishData {
  kicker: string;
  question: string;
  options: string[];
  reply: string;
}

export interface HeartData {
  caption: string;
  title: string;
  subtitle: string;
  next: string;
}

export interface LetterData {
  kicker: string;
  body: string;
  signature: string;
  next: string;
}

export interface FinalData {
  kicker: string;
  title: string;
  from: string;
  message: string;
  starButton: string;
  repeatButton: string;
}

export interface StarlightData {
  kicker: string;
  title: string;
  subtitle: string;
  wishFallback: string;
  sentTitle: string;
  sentMessage: string;
  tapHint: string;
  backButton: string;
  repeatButton: string;
}

export interface UIData {
  months: string[];
  monthLabel: string;
  heartTapHint: string;
  viewPhoto: string;
  tapToClose: string;
  languageLabel: string;
  musicOn: string;
  musicOff: string;
  customizeTitle: string;
  customizeBtn: string;
}

export interface CardContent {
  senderName: string;
  receiverName: string;
  opening: OpeningData;
  intro: IntroData;
  beats: string[];
  blackoutCaption: string;
  wish: WishData;
  heart: HeartData;
  letter: LetterData;
  final: FinalData;
  starlight: StarlightData;
  ui: UIData;
}

export interface CardImages {
  garland: string;
  cake: string;
  wishTag: string;
  heartConfetti: string;
  sparkle: string;
  paper: string;
  letterPhoto: string;
  girls: string[];
  petals: string[];
}

export type CardStage =
  | 'opening'
  | 'intro'
  | 'beats'
  | 'blackout'
  | 'wish'
  | 'heart'
  | 'letter'
  | 'final'
  | 'starlight';
