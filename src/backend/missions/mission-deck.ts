import { commonMission } from './mission';

export const missionDeck = new Map([
    // Common gemstone cavern collect missions
    commonMission('collect-gemstone-caverns-1', {
        name: 'missions.common.gemstoneCaverns.collect.label',
        description: 'missions.common.gemstoneCaverns.collect.description',
    }),
    commonMission('collect-gemstone-caverns-2', {
        name: 'missions.common.gemstoneCaverns.collect.label',
        description: 'missions.common.gemstoneCaverns.collect.description',
    }),
    commonMission('collect-gemstone-caverns-3', {
        name: 'missions.common.gemstoneCaverns.collect.label',
        description: 'missions.common.gemstoneCaverns.collect.description',
    }),

    // // Common bone hoard collect missions,
    // commonMission('collect-bone-hoard-1', {
    //     name: 'missions.common.boneHoard.collect.label',
    //     description: 'missions.common.boneHoard.collect.description',
    // }),
    // commonMission('collect-bone-hoard-2', {
    //     name: 'missions.common.boneHoard.collect.label',
    //     description: 'missions.common.boneHoard.collect.description',
    // }),
    // commonMission('collect-bone-hoard-3', {
    //     name: 'missions.common.boneHoard.collect.label',
    //     description: 'missions.common.boneHoard.collect.description',
    // }),

    // //  Fungal Fields
    // commonMission('collect-fungal-fields-1', {
    //     name: 'missions.common.fungalFields.collect.label',
    //     description: 'missions.common.fungalFields.collect.description',
    // }),
    // commonMission('collect-fungal-fields-2', {
    //     name: 'missions.common.fungalFields.collect.label',
    //     description: 'missions.common.fungalFields.collect.description',
    // }),
    // commonMission('collect-fungal-fields-3', {
    //     name: 'missions.common.fungalFields.collect.label',
    //     description: 'missions.common.fungalFields.collect.description',
    // }),

    // //  Narrow Tunnels
    // commonMission('collect-narrow-tunnels-1', {
    //     name: 'missions.common.narrowTunnels.collect.label',
    //     description: 'missions.common.narrowTunnels.collect.description',
    // }),
    // commonMission('collect-narrow-tunnels-2', {
    //     name: 'missions.common.narrowTunnels.collect.label',
    //     description: 'missions.common.narrowTunnels.collect.description',
    // }),
    // commonMission('collect-narrow-tunnels-3', {
    //     name: 'missions.common.narrowTunnels.collect.label',
    //     description: 'missions.common.narrowTunnels.collect.description',
    // }),

    // //  Miners Enclaves
    // commonMission('collect-miners-enclave-1', {
    //     name: 'missions.common.minersEnclaves.collect.label',
    //     description: 'missions.common.minersEnclaves.collect.description',
    // }),
    // commonMission('collect-miners-enclave-2', {
    //     name: 'missions.common.minersEnclaves.collect.label',
    //     description: 'missions.common.minersEnclaves.collect.description',
    // }),
    // commonMission('collect-miners-enclave-3', {
    //     name: 'missions.common.minersEnclaves.collect.label',
    //     description: 'missions.common.minersEnclaves.collect.description',
    // }),
]);

type KeyOfMap<T> = T extends Map<infer K, unknown> ? K : never;
export type MissionKey = KeyOfMap<typeof missionDeck>;
