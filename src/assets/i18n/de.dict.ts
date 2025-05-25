import { defineDictionary } from '@vayjs/vay';

export default defineDictionary('de', {
    scenes: {
        main: {
            controls: {
                start: 'Beitreten',
                rules: 'Spielanleitung',
                solo: 'Gegen KI spielen',
            },
        },
        settings: {
            title: 'Einstellungen',
            controls: {
                mirror: {
                    label: 'UI spiegeln',
                    description: 'Spiegelt das Layout, um die Steuerung zu erleichtern',
                },
                language: {
                    label: 'Sprache wählen',
                    description: 'Sprache ändern',
                    options: {
                        english: 'Englisch 🇬🇧',
                        german: 'Deutsch 🇩🇪',
                        spanish: 'Spanisch 🇪🇸',
                    },
                },
            },
        },
        rules: {
            intro: 'Ziel: Erkunde die Tiefen und überliste deine Rivalen. Beanspruche Felder, erfülle Missionen und sichere dir Relikte.',
            claiming:
                'Felder beanspruchen: In deinem Zug kannst du ein aufgedecktes Feld beanspruchen — egal wo. Nutze das strategisch.',
            missions:
                'Missionen: Wer neben einem Hohlhenge zieht, darf eine Solo- oder Diplomatische Mission wählen. Alle Missionen werden am Spielende gewertet.',
            end: 'Wertung: Das Spiel endet, wenn alle Felder um die Schreine beansprucht sind. Relikte gehen an den Spieler mit den meisten benachbarten Feldern. Der Spieler mit den meisten Punkten gewinnt.',
            back: 'Zurück',
        },
    },
    components: {
        missionOverlay: {
            title: 'Ein Flüstern in deinem Ohr.',
            instruction: 'Du hast ein HOHLHENGE berührt. Wähle eine Mission – aber wähle weise.',
        },
    },
    tiles: {
        gemstoneCaverns: {
            title: 'Edelsteinhöhlen',
            description: 'Funkelnde Kristalle durchziehen das Gestein – ein Versprechen für Reichtum. +2 Punkte',
        },
        boneHoards: {
            title: 'Knochenhaufen',
            description: 'Haufen uralter Überreste – Spuren vergangener Schlachten oder lauernder Gefahren. -1 Punkt',
        },
        fungalFields: {
            title: 'Pilzfelder',
            description: 'Biolumineszierende Pilze erleuchten den feuchten Boden in seltsamen Farben. +1 Punkt',
        },
        twistedTunnels: {
            title: 'Verdrehte Tunnel',
            description:
                'Pfadführungen, die keinen Sinn ergeben. Geräusche hallen seltsam, Schatten wirken falsch. -1 Punkt',
        },
        minersEnclaves: {
            title: 'Bergarbeiter-Enklaven',
            description: 'Verlassene Außenposten mutiger Seelen. In den Wänden hallen noch alte Geräusche. +1 Punkt',
        },
        hollowHenge: {
            title: 'Hohlhenge',
            description:
                'Ein Kreis uralter Monolithen, der langsam erwacht. Jeder Stein summt vor vergessenen Pakten und Erwartungen.',
        },
        ancientShrines: {
            title: 'Alte Schreine',
            description: 'Heiliger Boden vergangener Zeiten. Ein Relikt ruht in seinem Herzen.',
        },
        theMouth: {
            title: 'Der Schlund',
            description: 'Ein gähnender Abgrund, der lebt. Er sieht. Er erinnert sich.',
        },
        entrance: {
            title: 'Eingang',
            description: 'Der einzige bekannte Weg in die Netherdunkelheit. Kaum jemand kehrt zurück.',
        },
        undiscovered: {
            title: 'Unentdeckt',
            description: 'Dieser Teil der Karte liegt noch im Schatten verborgen.',
        },
        void: {
            title: 'Leere',
            description: 'Ein Riss in der Welt. Hier existiert nichts – nicht einmal Erinnerung.',
        },
    },
    missions: {
        labels: {
            title: ({ type }: { type: string }): string => {
                return type === 'solo' ? 'Verfolge deinen eigenen Plan' : 'Eine Chance für Diplomatie';
            },
            description: ({ type }: { type: string }) => {
                return type === 'solo'
                    ? 'Verfolge Ziele nur für deine Fraktion. Keine Verbündeten. Keine Zeugen.'
                    : 'Schmiede flüchtige Allianzen oder manipuliere andere. Stelle sicher, dass du am meisten profitierst.';
            },
        },
        common: {
            gemstoneCaverns: {
                collect: {
                    label: 'Gier kennt kein Ende',
                    description: 'Am Spielende hast du mindestens 5 Edelsteinhöhlen beansprucht. +5 Punkte',
                },
            },
            boneHoard: {
                collect: {
                    label: 'Herr der Knochen',
                    description: 'Am Spielende hast du mindestens 5 Knochenhaufen beansprucht. +5 Punkte',
                },
            },
            fungalFields: {
                collect: {
                    label: 'Sporenfürst',
                    description: 'Am Spielende hast du mindestens 5 Pilzfelder beansprucht. +5 Punkte',
                },
            },
            twistedTunnels: {
                collect: {
                    label: 'Wegverdreher',
                    description: 'Am Spielende hast du mindestens 5 verdrehte Tunnel beansprucht. +5 Punkte',
                },
            },
            minersEnclaves: {
                collect: {
                    label: 'Schürfer',
                    description: 'Am Spielende hast du mindestens 5 Bergarbeiter-Enklaven beansprucht. +5 Punkte',
                },
            },
        },
        uncommon: {
            bonus: {
                label: 'Glücklicher Fund',
                description: 'Einige Entdecker haben einfach Glück. Erhalte Punkte – einfach so. +7 Punkte.',
            },
            cluster: {
                label: 'Reiche Adern',
                description: 'Am Spielende hast du eine Gruppe aus 3 verbundenen Edelsteinhöhlen. +7 Punkte.',
            },
            industrious: {
                label: 'Fleißiger Geist',
                description: 'Am Spielende hast du 3 verbundene Bergarbeiter-Enklaven. +7 Punkte.',
            },
        },
        rare: {
            henges: {
                label: 'Flüstern in jedem Henge',
                description: 'Du hast an jedem Hohlhenge mindestens ein benachbartes Feld beansprucht. +12 Punkte.',
            },
            relic: {
                label: 'Reliktmeister',
                description: 'Kontrolliere mehr Relikte als jeder andere Spieler. +12 Punkte.',
            },
            claims: {
                label: 'Dominanz',
                description: 'Kontrolliere am Spielende mehr Bergarbeiter-Enklaven als jeder andere. +12 Punkte.',
            },
            fortune: {
                label: 'Meister der Adern',
                description: 'Kontrolliere am Spielende mehr Edelsteinhöhlen als jeder andere. +12 Punkte.',
            },
        },
        diplomatic: {
            religiousConvention: {
                label: 'Religiöse Versammlung',
                description: 'Ein Hohlhenge hat angrenzende Felder von allen Spielern. +15 Punkte',
            },
            kingmaker: {
                label: 'Königsmacher',
                description: 'Ein anderer Spieler kontrolliert am Ende mehr Relikte als du. +15 Punkte',
            },
            myzeelsPact: {
                label: 'Myzeels Pakt',
                description: 'Jedes beanspruchte Pilzfeld grenzt an ein Feld eines anderen Spielers. +15 Punkte',
            },
            outsider: {
                label: 'Außenseiter',
                description: 'Du befindest dich nie neben dem Eingang eines anderen Spielers. +15 Punkte',
            },
            divineSplit: {
                label: 'Geteilte Andacht',
                description: 'Jeder Schrein hat mindestens zwei angrenzende Spieler. +15 Punkte',
            },
            sharedBorders: {
                label: 'Geteilte Grenzen',
                description: 'Mindestens 15 deiner Felder grenzen an Felder anderer Spieler. +15 Punkte',
            },
            twinClaims: {
                label: 'Doppelte Gier',
                description: 'Beanspruche gleich viele Edelsteinhöhlen wie ein anderer Spieler. +15 Punkte',
            },
            siblingSpores: {
                label: 'Sporengeschwister',
                description: 'Beanspruche gleich viele Pilzfelder wie ein anderer Spieler. +15 Punkte',
            },
            equalEnclaves: {
                label: 'Gleiche Enklaven',
                description: 'Beanspruche gleich viele Bergarbeiter-Enklaven wie ein anderer Spieler. +15 Punkte',
            },
            twistedFate: {
                label: 'Verdrehtes Schicksal',
                description: 'Beanspruche gleich viele verdrehte Tunnel wie ein anderer Spieler. +15 Punkte',
            },
            boneAgreement: {
                label: 'Knochenpakt',
                description: 'Du und ein anderer Spieler haben gleich viele Knochenhaufen beansprucht. +15 Punkte',
            },
            echoesOfWar: {
                label: 'Echos des Krieges',
                description: 'Du bist an mehr fremde als eigene Felder angrenzend. +15 Punkte',
            },
        },
    },
    notifications: {
        claimedATile: '{{player}} hat ein {{type}}-Feld beansprucht!',
        claimedAShrine: '{{player}} hat die Kontrolle über einen Schrein übernommen!',
        foundAHenge: '{{player}} hat ein Hohlhenge entdeckt!',
    },
});
