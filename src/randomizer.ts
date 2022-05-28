import {
  LETTERS_LOWERCASE,
  LETTERS_UPPERCASE,
  NUMBERS,
  SYMBOLS,
} from 'globalConstants';

const knuthShuffle = require('knuth-shuffle-seeded');

export interface IRandomizerConfig {
  passwordLength: number;
  useLetters: boolean;
  useUppercaseChars: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
}

export const generateRandomPassword = ({ passwordLength, useLetters, useNumbers, useSymbols, useUppercaseChars }: IRandomizerConfig): string => {
  let dataset: string[] = [];

  if (useLetters) {
    dataset = [
      ...dataset,
      ...LETTERS_LOWERCASE,
    ]
  }

  if (useUppercaseChars) {
    dataset = [
      ...dataset,
      ...LETTERS_UPPERCASE,
    ]
  }

  if (useNumbers) {
    dataset = [
      ...dataset,
      ...NUMBERS,
    ]
  }

  if (useSymbols) {
    dataset = [
      ...dataset,
      ...SYMBOLS,
    ]
  }

  const shuffledDataset: string[] = knuthShuffle(dataset, Date.now());
  return shuffledDataset.slice(0, passwordLength).join('');
}