import { defineDictionary } from '@vayjs/vay';

export default defineDictionary('de', {
    scenes: {
        main: {
            controls: {
                start: 'Spielen',
                rules: 'Regeln',
                solo: 'Gegen KI spielen',
            },
        },
        settings: {
            title: 'Einstellungen',
            controls: {
                mirror: {
                    label: 'UI spiegeln',
                    description: 'Spiegelt das UI-Layout, um die Bedienung zu erleichtern',
                },
                language: {
                    label: 'Sprache wählen',
                    description: 'Ändere die Sprache',
                    options: {
                        english: 'Englisch 🇬🇧',
                        german: 'Deutsch 🇩🇪',
                        spanish: 'Spanisch 🇪🇸',
                    },
                },
                tutorial: {
                    label: 'Tutorial zurücksetzen',
                    description: 'Zeigt alle Tipps erneut an',
                },
            },
        },
        rules: {
            intro: 'Ziel: Erkunde die Tiefen und überliste deine Rivalen. Beanspruche Felder, erfülle Missionen und kontrolliere Relikte, um zu gewinnen.',
            claiming:
                'Felder beanspruchen: In deinem Zug kannst du jedes aufgedeckte Feld beanspruchen - auch entfernt liegende. Nutze das `Krone`-Symbol um ein Feld zu beanspruchen.',
            missions:
                'Missionen: Beanspruchst du erstmals ein Feld neben einem `Verfallenen Steinkreis`, erhältst du eine Mission - solo oder diplomatisch. Diese bringen am Spielende Punkte.',
            end: 'Ende: Das Spiel endet, wenn alle Felder um Alte Schreine herum beansprucht wurden. Wer die meisten angrenzenden Felder hat, kontrolliert den Schrein. Höchste Punktzahl gewinnt.',
            back: 'Zurück',
        },
    },
    components: {
        missionOverlay: {
            title: 'Ein Flüstern in deinem Ohr.',
            instruction: 'Du hast einen VERFALLENEN STEINKREIS betreten. Wähle eine Mission - aber wähle mit Bedacht.',
        },
    },
    tiles: {
        gemstoneCaverns: {
            title: 'Edelstein-Kavernen',
            description:
                'Glitzernde Kristalle durchziehen das Gestein - ein Versprechen von Reichtum für Wagemutige. +2 Punkte',
        },
        boneHoards: {
            title: 'Knochenhorte',
            description: 'Haufen alter Überreste - Hinweise auf vergangene Schlachten oder lauernde Wesen. -1 Punkt',
        },
        fungalFields: {
            title: 'Pilzfelder',
            description: 'Leuchtpilze erhellen den feuchten Boden. Wo kaum Licht ist, blüht das Leben. +1 Punkt',
        },
        twistedTunnels: {
            title: 'Verdrehte Tunnel',
            description: 'Pfade, die der Logik trotzen. Geräusche hallen seltsam, Schatten tanzen falsch. -1 Punkt',
        },
        minersEnclaves: {
            title: 'Bergarbeiter-Enklaven',
            description: 'Vergessene Posten mutiger Gräber. Einige Wände hallen noch von Pickeln und Stimmen. +1 Punkt',
        },
        hollowHenge: {
            title: 'Verfallener Steinkreis',
            description:
                'Ein Kreis uralter Monolithen, erfüllt von alten Pakten. Die Steine warten auf ihre Auserwählten.',
        },
        ancientShrines: {
            title: 'Alte Schreine',
            description: 'Heiliger Boden, vergessen von der Zeit. Ein Relikt wartet tief im Inneren.',
        },
        theMouth: {
            title: 'Das Maul',
            description: 'Ein gähnender Abgrund, der das Lebendige verschlingt. Es sieht. Es erinnert sich.',
        },
        entrance: {
            title: 'Eingang',
            description: 'Der einzige bekannte Zugang zur Netherdunkelheit. Nur wenige kehren je zurück.',
        },
        undiscovered: {
            title: 'Unentdeckt',
            description: 'Dieser Bereich ist noch nicht erkundet.',
        },
        void: {
            title: 'Leere',
            description: 'Ein Riss in der Welt. Nichts existiert hier - nicht einmal Erinnerung.',
        },
    },
    missions: {
        labels: {
            title: ({ type }: { type: string }): string => {
                return type === 'solo' ? 'Verfolge deine eigenen Ziele' : 'Eine Chance zur Diplomatie';
            },
            description: ({ type }: { type: string }): string => {
                return type === 'solo'
                    ? 'Verfolge Ziele, die nur deiner Fraktion dienen. Keine Verbündeten. Keine Zeugen.'
                    : 'Schließe flüchtige Allianzen oder manipuliere andere zu deinem Vorteil. Hauptsache, du profitierst am meisten.';
            },
        },
        common: {
            gemstoneCaverns: {
                collect: {
                    label: 'Gier kennt keine Tiefe',
                    description: 'Beanspruche bis Spielende mindestens 5 Edelstein-Kavernen. +5 Punkte',
                },
            },
            boneHoard: {
                collect: {
                    label: 'Knochenmeister',
                    description: 'Beanspruche bis Spielende mindestens 5 Knochenhorte. +5 Punkte',
                },
            },
            fungalFields: {
                collect: {
                    label: 'Sporenfürst',
                    description: 'Beanspruche bis Spielende mindestens 5 Pilzfelder. +5 Punkte',
                },
            },
            twistedTunnels: {
                collect: {
                    label: 'Pfadverdreher',
                    description: 'Beanspruche bis Spielende mindestens 5 Verdrehte Tunnel. +5 Punkte',
                },
            },
            minersEnclaves: {
                collect: {
                    label: 'Feldräuber',
                    description: 'Beanspruche bis Spielende mindestens 5 Bergarbeiter-Enklaven. +5 Punkte',
                },
            },
        },
        uncommon: {
            bonus: {
                label: 'Glücklicher Fund',
                description: 'Manche Entdecker haben einfach Glück. Erhalte Punkte - einfach so. +7 Punkte.',
            },
            cluster: {
                label: 'Reiche Vorkommen',
                description: 'Beende das Spiel mit einem verbundenen Cluster aus 3 Edelstein-Kavernen. +7 Punkte.',
            },
            industrious: {
                label: 'Fleißige Hände',
                description: 'Beende das Spiel mit einem verbundenen Cluster aus 3 Bergarbeiter-Enklaven. +7 Punkte.',
            },
        },
        rare: {
            henges: {
                label: 'Flüstern in jedem Kreis',
                description: 'Habe mindestens ein beanspruchtes Feld neben jedem Verfallenen Steinkreis. +12 Punkte.',
            },
            relic: {
                label: 'Reliktmeister',
                description: 'Kontrolliere am Spielende mehr Relikte als jeder andere Spieler. +12 Punkte.',
            },
            claims: {
                label: 'Herrschaft',
                description:
                    'Kontrolliere am Spielende mehr Bergarbeiter-Enklaven als jeder andere Spieler. +12 Punkte.',
            },
            fortune: {
                label: 'Meister der Adern',
                description: 'Kontrolliere am Spielende mehr Edelstein-Kavernen als jeder andere Spieler. +12 Punkte.',
            },
        },
        diplomatic: {
            religiousConvention: {
                label: 'Religiöse Versammlung',
                description: 'Ein Verfallener Steinkreis muss ein Feld von jedem Spieler angrenzend haben. +15 Punkte',
            },
            kingmaker: {
                label: 'Königsmacher',
                description:
                    'Beende das Spiel, während ein anderer Spieler mehr Relikte kontrolliert als du. +15 Punkte',
            },
            myzeelsPact: {
                label: 'Myzeels Pakt',
                description:
                    'Jedes beanspruchte Pilzfeld muss ein angrenzendes Feld haben, das von einem anderen Spieler beansprucht wurde. +15 Punkte',
            },
            outsider: {
                label: 'Außenseiter',
                description: 'Du bist nie angrenzend zum Eingang eines anderen Spielers. +15 Punkte',
            },
            divineSplit: {
                label: 'Göttliche Spaltung',
                description: 'Jeder Alte Schrein muss mindestens zwei angrenzende Spieler haben. +15 Punkte',
            },
            sharedBorders: {
                label: 'Geteilte Grenzen',
                description:
                    'Habe mindestens fünfzehn Felder, die direkt an Felder anderer Spieler angrenzen. +15 Punkte',
            },
            twinClaims: {
                label: 'Zwillingsansprüche',
                description: 'Beanspruche genauso viele Edelstein-Kavernen wie ein anderer Spieler. +15 Punkte',
            },
            siblingSpores: {
                label: 'Sporengeschwister',
                description: 'Beanspruche genauso viele Pilzfelder wie ein anderer Spieler. +15 Punkte',
            },
            equalEnclaves: {
                label: 'Gleiche Enklaven',
                description: 'Beanspruche genauso viele Bergarbeiter-Enklaven wie ein anderer Spieler. +15 Punkte',
            },
            twistedFate: {
                label: 'Verdrehtes Schicksal',
                description: 'Beanspruche genauso viele Verdrehte Tunnel wie ein anderer Spieler. +15 Punkte',
            },
            boneAgreement: {
                label: 'Knochenpakt',
                description: 'Du und ein anderer Spieler haben gleich viele Knochenhorte beansprucht. +15 Punkte',
            },
            echoesOfWar: {
                label: 'Echos des Krieges',
                description: 'Du bist an mehr Felder anderer Spieler angrenzend als an deine eigenen. +15 Punkte',
            },
        },
    },
    notifications: {
        claimedATile: '{{player}} hat ein {{type}}-Feld beansprucht!',
        claimedAShrine: '{{player}} hat die Kontrolle über einen Schrein übernommen!',
        foundAHenge: '{{player}} hat einen Verfallenen Steinkreis entdeckt!',
        type: ({ type }: { type: string | undefined }): string => {
            switch (type) {
                case 'gemstone-caverns':
                    return 'Edelstein-Kaverne';
                case 'bone-hoards':
                    return 'Knochenhort';
                case 'fungal-fields':
                    return 'Pilzfeld';
                case 'twisted-tunnels':
                    return 'Verdrehter Tunnel';
                case 'miners-enclaves':
                    return 'Bergarbeiter-Enklave';
                case 'hollow-henge':
                    return 'Verfallener Steinkreis';
                case 'ancient-shrines':
                    return 'Alter Schrein';
                case 'entrance':
                    return 'Eingang';
                case 'undiscovered':
                    return 'Unentdeckt';
                case 'void':
                    return 'Leere';
                default:
                    return 'undefined';
            }
        },
    },
    tutorial: {
        selectTile:
            'Tippe auf ein `Aufgedecktes` Hex, um mit dem Hexfeld zu interagieren. Nutze das Detailsymbol, um mehr über ein Feld zu erfahren. Tippe auf diese Nachricht, um fortzufahren.',
        claimTile:
            'Einige Hexfelder haben einen roten Impuls. Nutze das `Krone`-Symbol, um ein solches Feld zu beanspruchen. Dadurch werden angrenzende Felder aufgedeckt. Tippe zum Schließen.',
        shrines:
            'Ein `Alter Schrein` wurde gerade aufgedeckt! Der Spieler mit den meisten beanspruchten angrenzenden Feldern erhält die Kontrolle über den Schrein und das zugehörige Relikt.',
        henges: 'Ein `Verfallener Steinkreis` wurde entdeckt. Beanspruche ein angrenzendes Feld, um eine Mission zu erhalten, die dir bei Erfüllung zusätzliche Punkte bringt.',
        final: 'Du weißt nun alles, was du brauchst, um die Netherdunkelheit für dich zu beanspruchen! Aber sei gewarnt - du bist nicht der Einzige, der nach Macht strebt!',
    },
});
