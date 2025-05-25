import { commonMission, rareMission, uncommonMission } from './mission';

const commonGemstoneMission = <T extends string>(title: T) => {
    return commonMission(title, {
        name: 'missions.common.gemstoneCaverns.collect.label',
        description: 'missions.common.gemstoneCaverns.collect.description',
    });
};

const commonBoneHoardMission = <T extends string>(title: T) => {
    return commonMission(title, {
        name: 'missions.common.boneHoard.collect.label',
        description: 'missions.common.boneHoard.collect.description',
    });
};

const commonMinersEnclavesMission = <T extends string>(title: T) => {
    return commonMission(title, {
        name: 'missions.common.minersEnclaves.collect.label',
        description: 'missions.common.minersEnclaves.collect.description',
    });
};

const commonFungalFieldsMission = <T extends string>(title: T) => {
    return commonMission(title, {
        name: 'missions.common.fungalFields.collect.label',
        description: 'missions.common.fungalFields.collect.description',
    });
};

const commonTwistedTunnelsMission = <T extends string>(title: T) => {
    return commonMission(title, {
        name: 'missions.common.twistedTunnels.collect.label',
        description: 'missions.common.twistedTunnels.collect.description',
    });
};

const uncommonBonusMission = <T extends string>(title: T) => {
    return uncommonMission(title, {
        name: 'missions.uncommon.bonus.label',
        description: 'missions.uncommon.bonus.description',
    });
};

const uncommonGemstoneClusterMission = <T extends string>(title: T) => {
    return uncommonMission(title, {
        name: 'missions.uncommon.cluster.label',
        description: 'missions.uncommon.cluster.description',
    });
};

const uncommonMinersClusterMission = <T extends string>(title: T) => {
    return uncommonMission(title, {
        name: 'missions.uncommon.industrious.label',
        description: 'missions.uncommon.industrious.description',
    });
};

const rareHengeMission = <T extends string>(title: T) => {
    return rareMission(title, {
        name: 'missions.rare.henges.label',
        description: 'missions.rare.henges.description',
    });
};

const rareRelicDominationMission = <T extends string>(title: T) => {
    return rareMission(title, {
        name: 'missions.rare.relic.label',
        description: 'missions.rare.relic.description',
    });
};

const rareClaimantDominationMission = <T extends string>(title: T) => {
    return rareMission(title, {
        name: 'missions.rare.claims.label',
        description: 'missions.rare.claims.description',
    });
};

const rareFortuneMission = <T extends string>(title: T) => {
    return rareMission(title, {
        name: 'missions.rare.fortune.label',
        description: 'missions.rare.fortune.description',
    });
};

/**
 * Mission Composition:
 * 2 Henges + 1 Henge per player, maximum of 8 henges.
 * If every player chooses a standard mission, we need a maximum of
 * 64 missions to cover that case
 *
 * 30 common missions (mostly collect)
 * 20 uncommon missions (mostly bonus and or chains)
 * 14 rare missions (mostly more complex things)
 *
 * There will also be at least two diplomatic missions per player available
 * so 12.
 */

export const missionDeck = new Map([
    /**
     * 30 Common missions
     * 6 x 5 Collect missions are the basic backbone of the mission
     * system
     */
    // --
    commonGemstoneMission('collect-gemstone-caverns-1'),
    commonGemstoneMission('collect-gemstone-caverns-2'),
    commonGemstoneMission('collect-gemstone-caverns-3'),
    commonGemstoneMission('collect-gemstone-caverns-4'),
    commonGemstoneMission('collect-gemstone-caverns-5'),
    commonGemstoneMission('collect-gemstone-caverns-6'),
    // --
    commonBoneHoardMission('collect-bone-hoard-1'),
    commonBoneHoardMission('collect-bone-hoard-2'),
    commonBoneHoardMission('collect-bone-hoard-3'),
    commonBoneHoardMission('collect-bone-hoard-4'),
    commonBoneHoardMission('collect-bone-hoard-5'),
    commonBoneHoardMission('collect-bone-hoard-6'),
    // --
    commonMinersEnclavesMission('collect-miners-enclaves-1'),
    commonMinersEnclavesMission('collect-miners-enclaves-2'),
    commonMinersEnclavesMission('collect-miners-enclaves-3'),
    commonMinersEnclavesMission('collect-miners-enclaves-4'),
    commonMinersEnclavesMission('collect-miners-enclaves-5'),
    commonMinersEnclavesMission('collect-miners-enclaves-6'),
    // --
    commonFungalFieldsMission('collect-fungal-fields-1'),
    commonFungalFieldsMission('collect-fungal-fields-2'),
    commonFungalFieldsMission('collect-fungal-fields-3'),
    commonFungalFieldsMission('collect-fungal-fields-4'),
    commonFungalFieldsMission('collect-fungal-fields-5'),
    commonFungalFieldsMission('collect-fungal-fields-6'),
    // --
    commonTwistedTunnelsMission('collect-twisted-tunnels-1'),
    commonTwistedTunnelsMission('collect-twisted-tunnels-2'),
    commonTwistedTunnelsMission('collect-twisted-tunnels-3'),
    commonTwistedTunnelsMission('collect-twisted-tunnels-4'),
    commonTwistedTunnelsMission('collect-twisted-tunnels-5'),
    commonTwistedTunnelsMission('collect-twisted-tunnels-6'),

    /**
     * 20 Uncommon missions
     * - 12 bonus points
     * - 8 Find clusters
     */

    // --
    uncommonBonusMission('bonus-points-1'),
    uncommonBonusMission('bonus-points-2'),
    uncommonBonusMission('bonus-points-3'),
    uncommonBonusMission('bonus-points-4'),
    uncommonBonusMission('bonus-points-5'),
    uncommonBonusMission('bonus-points-6'),
    uncommonBonusMission('bonus-points-7'),
    uncommonBonusMission('bonus-points-8'),
    uncommonBonusMission('bonus-points-9'),
    uncommonBonusMission('bonus-points-10'),
    uncommonBonusMission('bonus-points-11'),
    uncommonBonusMission('bonus-points-12'),

    // --
    uncommonGemstoneClusterMission('gemstone-cluster-1'),
    uncommonGemstoneClusterMission('gemstone-cluster-2'),
    uncommonGemstoneClusterMission('gemstone-cluster-3'),
    uncommonGemstoneClusterMission('gemstone-cluster-4'),

    // --
    uncommonMinersClusterMission('miners-cluster-1'),
    uncommonMinersClusterMission('miners-cluster-2'),
    uncommonMinersClusterMission('miners-cluster-3'),
    uncommonMinersClusterMission('miners-cluster-4'),

    /**
     * 14 Rare missions
     * - 4 Henge missions
     * - 4 Relic domination
     * - 4 Claimant domination
     * - 2 Bonus missions
     */

    // --
    rareHengeMission('claim-henge-tiles-1'),
    rareHengeMission('claim-henge-tiles-2'),
    rareHengeMission('claim-henge-tiles-3'),
    rareHengeMission('claim-henge-tiles-4'),

    // --
    rareRelicDominationMission('relic-domination-1'),
    rareRelicDominationMission('relic-domination-2'),
    rareRelicDominationMission('relic-domination-3'),
    rareRelicDominationMission('relic-domination-4'),

    // --
    rareClaimantDominationMission('claims-domination-1'),
    rareClaimantDominationMission('claims-domination-2'),
    rareClaimantDominationMission('claims-domination-3'),

    // --
    rareFortuneMission('fortune-1'),
    rareFortuneMission('fortune-2'),
    rareFortuneMission('fortune-3'),
]);

type KeyOfMap<T> = T extends Map<infer K, unknown> ? K : never;
export type MissionKey = KeyOfMap<typeof missionDeck>;
