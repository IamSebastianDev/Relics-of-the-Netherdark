import { MemoExoticComponent, ReactElement } from 'react';
import { Game } from './game.scene';
import { Main } from './main.scene';
import { Rules } from './rules.scene';

export const scenes = new Map<string, MemoExoticComponent<() => ReactElement>>();
scenes.set('game', Game);
scenes.set('main', Main);
scenes.set('rules', Rules);
