import { defineDictionary } from '@vayjs/vay';

export default defineDictionary('en', {
    scenes: {
        main: {
            controls: {
                start: 'Start',
                rules: 'How to play',
                solo: 'Play against AI',
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
            intro: 'Goal: Explore the depths and outplay your rivals. Claim tiles, complete missions, and control relics to win.',
            claiming:
                'Claim tiles: On your turn, claim any revealed tile. You can claim tiles anywhere — use this to block or advance.',
            missions:
                'Missions: Claiming next to a Hollow Henge grants a solo or diplomatic mission, your choice. All missions score at game end.',
            end: 'Scoring: The game ends when all tiles around Ancient Shrines are claimed. Shrine control goes to the player with the most adjacent tiles. The player with the highest score wins.',
            back: 'Back',
        },
    },
    components: {
        missionOverlay: {
            title: 'A whisper in your Ear.',
            instruction: 'You laid your hands on a HOLLOW HENGE. Choose a mission, but choose wisely.',
        },
    },
    tiles: {
        gemstoneCaverns: {
            title: 'Gemstone Caverns',
            description:
                'Glittering veins of crystals run through the rock, promising riches to those who dare claim them. +2 Points',
        },
        boneHoards: {
            title: 'Bone Hoards',
            description:
                'Piles of ancient remains—evidence of battles long past or creatures still lurking nearby. -1 Point',
        },
        fungalFields: {
            title: 'Fungal Fields',
            description:
                'Bioluminescent fungi light the damp ground with eerie hues. Life thrives where light barely reaches. +1 Point',
        },
        twistedTunnels: {
            title: 'Twisted Tunnels',
            description:
                'Winding paths that defy reason. Sound echoes strangely and shadows twist in impossible ways. -1 Point',
        },
        minersEnclaves: {
            title: 'Miners Enclaves',
            description:
                'Forgotten outposts of brave souls who dug too deep. Some walls still echo with picks and whispers. +1 Point',
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
                    description: 'At the end of the game, have at least claimed 5 Gemstone Cavern tiles. +5 Points',
                },
            },
            boneHoard: {
                collect: {
                    label: 'Master of Bones',
                    description: 'At the end of the game, have at least claimed 5 Bone Hoard tiles. +5 Points',
                },
            },
            fungalFields: {
                collect: {
                    label: 'Sporelord',
                    description: 'At the end of the game, have at least claimed 5 Fungal Field tiles. +5 Points',
                },
            },
            twistedTunnels: {
                collect: {
                    label: 'Twistwalker',
                    description: 'At the end of the game, have at least claimed 5 Twisted Tunnel tiles. +5 Points',
                },
            },
            minersEnclaves: {
                collect: {
                    label: 'Claim Jumper',
                    description: 'At the end of the game, have at least claimed 5 Miners Enclaves tiles. +5 Points',
                },
            },
        },
        uncommon: {
            bonus: {
                label: 'Fortunate Discovery',
                description:
                    'Some explorers are just luckier than others. Gain points for no reason other than fate. +7 points.',
            },
            cluster: {
                label: 'Rich Veins',
                description: 'End the game with a connected cluster of 3 Gemstone Caverns. +7 points.',
            },
            industrious: {
                label: 'Industrious Ways.',
                description: 'End the game with a connected cluster of 3 Miner`s Enclaves. +7 points.',
            },
        },
        rare: {
            henges: {
                label: 'Whispers in Every Hollow',
                description: 'Have at least one claimed tile adjacent to every Hollow Henge on the board. +12 points.',
            },
            relic: {
                label: 'Relicmaster',
                description: 'Control more relics than any other player when the game ends. +12 points.',
            },
            claims: {
                label: 'Dominion',
                description: 'Control more Miner`s Enclaves than any other player at the end of the game. +12 points.',
            },
            fortune: {
                label: 'Master of Veins',
                description: 'Control more Gemstone Caverns than any other player at the end of the game. +12 points.',
            },
        },
        diplomatic: {
            religiousConvention: {
                label: 'Religious Convention',
                description: 'Ensure there is a Hollow Henge with a tile claimed by every player. +15 points',
            },
            kingmaker: {
                label: 'Kingmaker',
                description: 'End the game with another player controlling more relics than you. +15 points',
            },
            myzeelsPact: {
                label: 'Myzeel`s Pact',
                description:
                    'Each Fungal Field you claim must have a neighboring tile claimed by another player. +15 points',
            },
            outsider: {
                label: 'Outsider',
                description: 'You are never adjacent to any player`s Entrance tile. +15 points',
            },
            divineSplit: {
                label: 'Divine Split',
                description: 'Each Ancient Shrine must have at least two players adjacent to it. +15 points',
            },
            sharedBorders: {
                label: 'Shared Borders',
                description:
                    'Have at least fifteen tiles that are directly adjacent to another player`s tile. +15 points',
            },
            twinClaims: {
                label: 'Twin Claims',
                description: 'Claim the same number of Gemstone Caverns as another player. +15 points',
            },
            siblingSpores: {
                label: 'Sibling Spores',
                description: 'Claim the same number of Fungal Fields as another player. +15 points',
            },
            equalEnclaves: {
                label: 'Equal Enclaves',
                description: 'Claim the same number of Miner`s Enclaves as another player. +15 points',
            },
            twistedFate: {
                label: 'Twisted Fate',
                description: 'Claim the same number of Twisted Tunnels as another player. +15 points',
            },
            boneAgreement: {
                label: 'Bone Agreement',
                description: 'You and another player have claimed the same number of Bone Hoards. +15 points',
            },
            echoesOfWar: {
                label: 'Echoes of War',
                description: 'You are adjacent to more tiles claimed by others than your own. +15 points',
            },
        },
    },
    notifications: {
        claimedATile: '{{player}} claimed a {{type}} tile!',
        claimedAShrine: '{{player}} took control of a Shrine!',
    },
});
