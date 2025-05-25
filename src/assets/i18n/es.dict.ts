import { defineDictionary } from '@vayjs/vay';

export default defineDictionary('es', {
    scenes: {
        main: {
            controls: {
                start: 'Unirse',
                rules: 'Cómo jugar',
                solo: 'Jugar contra IA',
            },
        },
        settings: {
            title: 'Ajustes',
            controls: {
                mirror: {
                    label: 'Invertir interfaz',
                    description: 'Invierte el diseño para facilitar el acceso a los controles',
                },
                language: {
                    label: 'Seleccionar idioma',
                    description: 'Cambiar el idioma',
                    options: {
                        english: 'Inglés 🇬🇧',
                        german: 'Alemán 🇩🇪',
                        spanish: 'Español 🇪🇸',
                    },
                },
            },
        },
        rules: {
            intro: 'Objetivo: Explora las profundidades y supera a tus rivales. Reclama losetas, cumple misiones y controla reliquias para ganar.',
            claiming:
                'Reclama losetas: En tu turno, puedes reclamar cualquier loseta revelada, esté donde esté. Úsalo estratégicamente.',
            missions:
                'Misiones: Reclamar junto a un Henge Hueco te da una misión (solitaria o diplomática). Se puntúan al final del juego.',
            end: 'Puntuación: El juego termina cuando se han reclamado todas las losetas alrededor de los Santuarios. El control se otorga al jugador con más losetas adyacentes. El que tenga más puntos gana.',
            back: 'Volver',
        },
    },
    components: {
        missionOverlay: {
            title: 'Un susurro en tu oído.',
            instruction: 'Has tocado un HENGE HUECO. Elige una misión... pero hazlo con cuidado.',
        },
    },
    tiles: {
        gemstoneCaverns: {
            title: 'Cavernas de Gemas',
            description:
                'Cristales relucientes atraviesan la roca: una promesa de riquezas para quien se atreva. +2 Puntos',
        },
        boneHoards: {
            title: 'Osarios',
            description: 'Montones de restos antiguos, señal de antiguas batallas o bestias aún ocultas. -1 Punto',
        },
        fungalFields: {
            title: 'Campos Fúngicos',
            description: 'Hongos brillantes iluminan la oscuridad. La vida se abre paso donde apenas hay luz. +1 Punto',
        },
        twistedTunnels: {
            title: 'Túneles Retorcidos',
            description: 'Pasajes que desafían la lógica. El sonido se distorsiona, las sombras se deforman. -1 Punto',
        },
        minersEnclaves: {
            title: 'Enclaves Mineros',
            description: 'Puestos olvidados por mineros temerarios. Algunas paredes aún susurran. +1 Punto',
        },
        hollowHenge: {
            title: 'Henge Hueco',
            description:
                'Un círculo de monolitos antiguos que vuelve a despertar. Cada piedra emite un zumbido ancestral.',
        },
        ancientShrines: {
            title: 'Santuarios Antiguos',
            description: 'Suelo sagrado perdido en el tiempo. Un relicto reposa en su núcleo.',
        },
        theMouth: {
            title: 'La Boca',
            description: 'Una grieta que devora lo vivo. Observa. Recuerda.',
        },
        entrance: {
            title: 'Entrada',
            description: 'La única vía conocida al Netherdark. Pocos regresan. Menos aún, intactos.',
        },
        undiscovered: {
            title: 'Sin descubrir',
            description: 'Esta parte del mapa sigue envuelta en sombras.',
        },
        void: {
            title: 'Vacío',
            description: 'Una grieta en la realidad. Aquí no hay nada, ni memoria alguna.',
        },
    },
    missions: {
        labels: {
            title: ({ type }: { type: string }): string => {
                return type === 'solo' ? 'Cumple tu propio objetivo' : 'Oportunidad diplomática';
            },
            description: ({ type }: { type: string }): string => {
                return type === 'solo'
                    ? 'Persigue metas que sólo benefician a tu facción. Sin aliados. Sin testigos.'
                    : 'Forja alianzas temporales o manipula a otros para tu beneficio. Asegúrate de ganar tú.';
            },
        },
        common: {
            gemstoneCaverns: {
                collect: {
                    label: 'Avaricia sin fondo',
                    description: 'Al final del juego, has reclamado al menos 5 Cavernas de Gemas. +5 Puntos',
                },
            },
            boneHoard: {
                collect: {
                    label: 'Señor de los Huesos',
                    description: 'Al final del juego, has reclamado al menos 5 Osarios. +5 Puntos',
                },
            },
            fungalFields: {
                collect: {
                    label: 'Rey Espora',
                    description: 'Al final del juego, has reclamado al menos 5 Campos Fúngicos. +5 Puntos',
                },
            },
            twistedTunnels: {
                collect: {
                    label: 'Caminante Retorcido',
                    description: 'Al final del juego, has reclamado al menos 5 Túneles Retorcidos. +5 Puntos',
                },
            },
            minersEnclaves: {
                collect: {
                    label: 'Aprovechador',
                    description: 'Al final del juego, has reclamado al menos 5 Enclaves Mineros. +5 Puntos',
                },
            },
        },
        uncommon: {
            bonus: {
                label: 'Descubrimiento Afortunado',
                description:
                    'Algunos aventureros simplemente tienen suerte. Gana puntos... sin razón aparente. +7 Puntos.',
            },
            cluster: {
                label: 'Vetas Ricas',
                description: 'Finaliza el juego con un grupo conectado de 3 Cavernas de Gemas. +7 Puntos.',
            },
            industrious: {
                label: 'Espíritu Laborioso',
                description: 'Finaliza el juego con 3 Enclaves Mineros conectados. +7 Puntos.',
            },
        },
        rare: {
            henges: {
                label: 'Susurros en cada Henge',
                description: 'Ten al menos una loseta adyacente a cada Henge Hueco en el tablero. +12 Puntos.',
            },
            relic: {
                label: 'Maestro de Reliquias',
                description: 'Controla más reliquias que cualquier otro jugador al final del juego. +12 Puntos.',
            },
            claims: {
                label: 'Dominio',
                description: 'Controla más Enclaves Mineros que cualquier otro al final. +12 Puntos.',
            },
            fortune: {
                label: 'Señor de las Vetas',
                description: 'Controla más Cavernas de Gemas que cualquier otro. +12 Puntos.',
            },
        },
        diplomatic: {
            religiousConvention: {
                label: 'Convención Religiosa',
                description: 'Un Henge Hueco tiene losetas reclamadas por todos los jugadores. +15 Puntos',
            },
            kingmaker: {
                label: 'El Que Da la Corona',
                description: 'Otro jugador controla más reliquias que tú al final del juego. +15 Puntos',
            },
            myzeelsPact: {
                label: 'Pacto de Myzeel',
                description: 'Cada Campo Fúngico que reclames debe tener un vecino de otro jugador. +15 Puntos',
            },
            outsider: {
                label: 'Forastero',
                description: 'Nunca estás junto a la Entrada de otro jugador. +15 Puntos',
            },
            divineSplit: {
                label: 'División Divina',
                description: 'Cada Santuario tiene al menos dos jugadores adyacentes. +15 Puntos',
            },
            sharedBorders: {
                label: 'Fronteras Compartidas',
                description: 'Tienes al menos 15 losetas adyacentes a otros jugadores. +15 Puntos',
            },
            twinClaims: {
                label: 'Gemas Gemelas',
                description: 'Reclama tantas Cavernas de Gemas como otro jugador. +15 Puntos',
            },
            siblingSpores: {
                label: 'Esporas Hermanas',
                description: 'Reclama tantos Campos Fúngicos como otro jugador. +15 Puntos',
            },
            equalEnclaves: {
                label: 'Enclaves Iguales',
                description: 'Reclama tantos Enclaves Mineros como otro jugador. +15 Puntos',
            },
            twistedFate: {
                label: 'Destino Retorcido',
                description: 'Reclama tantos Túneles Retorcidos como otro jugador. +15 Puntos',
            },
            boneAgreement: {
                label: 'Pacto Óseo',
                description: 'Tú y otro jugador tienen igual número de Osarios. +15 Puntos',
            },
            echoesOfWar: {
                label: 'Ecos de Guerra',
                description: 'Estás junto a más losetas enemigas que propias. +15 Puntos',
            },
        },
    },
    notifications: {
        claimedATile: '¡{{player}} ha reclamado una loseta de tipo {{type}}!',
        claimedAShrine: '¡{{player}} ha tomado el control de un Santuario!',
        foundAHenge: '¡{{player}} ha descubierto un Henge Hueco!',
    },
});
