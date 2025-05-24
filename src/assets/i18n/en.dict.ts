import { defineDictionary } from '@vayjs/vay';

export default defineDictionary('en', {
    scenes: {
        main: {
            controls: {
                start: 'Start',
                rules: 'Rules',
                solo: 'Play Solo',
            },
        },
        settings: {
            title: 'Settings',
            controls: {
                mirror: {
                    label: 'Mirror Ui',
                    description: 'Mirror the ui layout, to make reaching the control easier',
                },
                language: {
                    label: 'Select Language',
                    description: 'Change the language',
                    options: {
                        english: 'English 🇬🇧',
                        german: 'German 🇩🇪',
                        spanish: 'Spanish 🇪🇸',
                    },
                },
            },
        },
        rules: {
            title: 'Relics of the Netherdark',
            intro: 'Relics of the Netherdark is a competitive board game where players explore a mysterious underground world by revealing and claiming hexagonal tiles. The goal is to earn the most points by the end of the game through strategic tile placement, completing missions, and securing ancient relics.',
            claiming:
                'Each player starts at an entrance tile. On your turn, you place your marker to claim one discovered tile, then reveal all adjacent tiles. While you cannot claim undiscovered tiles, you can claim any revealed one — even those far from your current territory. Use this to block rivals or claim key locations ahead of them.',
            tileRewardIntro: 'Tiles vary in their rewards:',
            tiles: {
                gemstone: 'Gemstone Caverns: +2 points',
                fungal: 'Fungal Fields: +1 point',
                miners: "Miners' Enclaves: +1 point",
                bone: 'Bone Hoards: -1 point',
                tunnels: 'Twisted Tunnels: -1 point',
                shrines: 'Ancient Shrines: +10 points (if controlled at game end)',
            },
            missions:
                "Adjacent to some tiles you'll find Hollow Henges. Claiming a tile beside one grants a choice between a Solo mission, which you complete in secret, or a Diplomatic mission, which involves another player but yields greater rewards. Missions are only scored at the end of the game, and while cooperation is possible, betrayal is common — trust no one.",
            end: "The game ends when all tiles surrounding Ancient Shrines have been claimed. The player with the most influence (claimed tiles) around each shrine gains control of that shrine's relic. Ties go to the current relic holder.",
            scoring:
                'At game end, players sum up their points from claimed tiles, controlled relics, and completed missions. The player with the highest total score claims victory and control over the Netherdark.',
            back: 'Back',
        },
    },
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
        hollowHenge: {
            title: 'Hollow Henge',
            description:
                'A circle of ancient monoliths, slowly reawakening. Each stone hums with forgotten pacts and shared purpose, waiting for the chosen to claim their place.',
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
        labels: {
            title: ({ type }: { type: string }) => {
                return type === 'solo' ? 'Fulfill your own Agenda' : 'A chance for Diplomacy';
            },
            description: ({ type }: { type: string }) => {
                return type === 'solo'
                    ? 'Pursue goals that serve only your own faction. No allies. No witnesses.'
                    : `Forge fleeting alliances or manipulate others to your advantage. Just make sure you'll benefit the most.`;
            },
        },
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
