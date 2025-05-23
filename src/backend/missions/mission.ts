import { TranslationKey } from '../../providers/language.provider';

type Rarity = 'common' | 'uncommon' | 'rare' | 'diplomatic';

export type Mission = {
    id: string;
    name: TranslationKey;
    description: TranslationKey;
    rarity: Rarity;
    reward: number;
};

type MissionInput = Omit<Mission, 'id'>;

export const mission = <T extends string>(id: T, mission: MissionInput) => {
    return [id, { id, ...mission }] as [T, Mission];
};

export const commonMission = <T extends string>(id: T, input: Omit<MissionInput, 'rarity' | 'reward'>) => {
    return mission(id, { ...input, rarity: 'common', reward: 5 });
};

export const uncommonMission = <T extends string>(id: T, input: Omit<MissionInput, 'rarity' | 'reward'>) => {
    return mission(id, { ...input, rarity: 'uncommon', reward: 8 });
};

export const rareMission = <T extends string>(id: T, input: Omit<MissionInput, 'rarity' | 'reward'>) => {
    return mission(id, { ...input, rarity: 'rare', reward: 10 });
};

export const diplomaticMission = <T extends string>(id: T, input: Omit<MissionInput, 'rarity' | 'reward'>) => {
    return mission(id, { ...input, rarity: 'diplomatic', reward: 10 });
};
