import { defineDictionary } from '@vayjs/vay';

export default defineDictionary('en', {
    scenes: {},
    components: {},
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
