import { MemoExoticComponent, ReactElement } from 'react';
import { Game } from './game.scene';
import { Main } from './main.scene';

export const scenes = new Map<string, MemoExoticComponent<() => ReactElement>>();
scenes.set('game', Game);
scenes.set('main', Main);
