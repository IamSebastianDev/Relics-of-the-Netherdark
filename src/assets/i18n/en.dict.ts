import { defineDictionary } from '@vayjs/vay';

export default defineDictionary('en', {
    scenes: {},
    components: {},
    tiles: {
        gemstoneCaverns: {
            title: 'Gemstone Caverns',
            description:
                'Glittering veins of crystals run through the rock, promising riches to those who dare claim them.',
        },
        boneHoards: {
            title: 'Bone Hoards',
            description: 'Piles of ancient remains—evidence of battles long past or creatures still lurking nearby.',
        },
        fungalFields: {
            title: 'Fungal Fields',
            description:
                'Bioluminescent fungi light the damp ground with eerie hues. Life thrives where light barely reaches.',
        },
        twistedTunnels: {
            title: 'Twisted Tunnels',
            description: 'Winding paths that defy reason. Sound echoes strangely and shadows twist in impossible ways.',
        },
        minersEnclaves: {
            title: 'Miners Enclaves',
            description:
                'Forgotten outposts of brave souls who dug too deep. Some walls still echo with picks and whispers.',
        },
        wizardsTowers: {
            title: 'Wizards Towers',
            description:
                'Impossible spires filled with arcane residue. No one knows who built them, only that they endure.',
        },
        ancientShrines: {
            title: 'Ancient Shrines',
            description: 'Sacred ground lost to time. A relic hums softly at its heart, waiting to be awakened.',
        },
        theMouth: {
            title: 'The Mouth',
            description: 'A yawning chasm that hungers for the living. It watches. It remembers.',
        },
        entrance: {
            title: 'Entrance',
            description:
                'The only known passage into the Netherdark. Few return through it, fewer still remain unchanged.',
        },
        undiscovered: {
            title: 'Undiscovered',
            description: 'This part of the map remains hidden in shadow, waiting to be explored.',
        },
        void: {
            title: 'Void',
            description: 'A tear in the world. Nothing exists here—not even the memory of what was.',
        },
    },
    missions: {
        common: {
            gemstoneCaverns: {
                collect: {
                    label: 'Greed Runs Deep',
                    description: 'At the end of the game, hold 5 Gemstone Cavern tiles.',
                },
            },
            boneHoard: {
                collect: {
                    label: 'Master of Bones',
                    description: 'At the end of the game, hold 6 Bone Hoard tiles.',
                },
            },
            fungalFields: {
                collect: {
                    label: 'Sporelord',
                    description: 'At the end of the game, hold 4 Fungal Field tiles.',
                },
            },
            narrowTunnels: {
                collect: {
                    label: 'Twistwalker',
                    description: 'At the end of the game, hold 3 Narrow Tunnel tiles.',
                },
            },
            minersEnclaves: {
                collect: {
                    label: 'Claim Jumper',
                    description: 'At the end of the game, hold 3 Miners Enclave tiles.',
                },
            },
        },
    },
});
