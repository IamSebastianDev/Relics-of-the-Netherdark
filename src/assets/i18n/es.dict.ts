import { defineDictionary } from '@vayjs/vay';

export default defineDictionary('es', {
    scenes: {
        main: {
            controls: {
                start: 'Unirse',
                rules: 'Cómo jugar',
                solo: 'Jugar contra la IA',
            },
        },
        settings: {
            title: 'Configuración',
            controls: {
                mirror: {
                    label: 'Reflejar UI',
                    description: 'Refleja el diseño de la interfaz para facilitar el acceso a los controles',
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
                tutorial: {
                    label: 'Reiniciar tutorial',
                    description: 'Mostrará todos los consejos nuevamente',
                },
            },
        },
        rules: {
            intro: 'Objetivo: Explora las profundidades y supera a tus rivales. Reclama losetas, completa misiones y controla reliquias para ganar.',
            claiming:
                'Reclamar losetas: En tu turno, reclama cualquier loseta revelada. Puedes reclamar losetas en cualquier parte — úsalas para bloquear o avanzar. Después de seleccionar una loseta, usa el icono de la `Corona` para reclamar.',
            missions:
                'Misiones: Reclamar una loseta junto a un `Círculo Hueco` por primera vez te otorga una misión, ya sea solitaria o diplomática. Todas las misiones puntúan al final del juego.',
            end: 'Puntuación: El juego termina cuando todas las losetas alrededor de los Santuarios Antiguos han sido reclamadas. El control del Santuario va al jugador con más losetas adyacentes. El jugador con la puntuación más alta gana.',
            back: 'Atrás',
        },
    },
    components: {
        missionOverlay: {
            title: 'Un susurro en tu oído.',
            instruction: 'Has puesto tus manos sobre un CÍRCULO HUECO. Elige una misión, pero elige sabiamente.',
        },
    },
    tiles: {
        gemstoneCaverns: {
            title: 'Cavernas de Gemas',
            description:
                'Vetas brillantes de cristales recorren la roca, prometiendo riquezas a quienes se atrevan a reclamarlas. +2 Puntos',
        },
        boneHoards: {
            title: 'Montones de Huesos',
            description: 'Pilas de restos antiguos — evidencia de batallas pasadas o criaturas aún al acecho. -1 Punto',
        },
        fungalFields: {
            title: 'Campos de Hongos',
            description:
                'Hongos bioluminiscentes iluminan el suelo húmedo con tonos inquietantes. La vida prospera donde apenas llega la luz. +1 Punto',
        },
        twistedTunnels: {
            title: 'Túneles Retorcidos',
            description:
                'Caminos serpenteantes que desafían la lógica. El sonido resuena de forma extraña y las sombras se retuercen de manera imposible. -1 Punto',
        },
        minersEnclaves: {
            title: 'Enclaves Mineros',
            description:
                'Puestos olvidados de almas valientes que cavaron demasiado profundo. Algunas paredes aún susurran con ecos de picos. +1 Punto',
        },
        hollowHenge: {
            title: 'Círculo Hueco',
            description:
                'Un círculo de antiguos monolitos, despertando lentamente. Cada piedra vibra con pactos olvidados y un propósito compartido, esperando ser reclamada.',
        },
        ancientShrines: {
            title: 'Santuarios Antiguos',
            description:
                'Terreno sagrado perdido en el tiempo. Una reliquia emite un zumbido suave en su centro, esperando ser despertada.',
        },
        theMouth: {
            title: 'La Boca',
            description: 'Una grieta que ansía a los vivos. Observa. Recuerda.',
        },
        entrance: {
            title: 'Entrada',
            description:
                'El único pasaje conocido hacia la Oscuridad Inferior. Pocos regresan, y los que lo hacen, no vuelven igual.',
        },
        undiscovered: {
            title: 'No Descubierto',
            description: 'Esta parte del mapa permanece oculta en sombras, esperando ser explorada.',
        },
        void: {
            title: 'Vacío',
            description: 'Una grieta en el mundo. Aquí no existe nada — ni siquiera el recuerdo.',
        },
    },
    missions: {
        labels: {
            title: ({ type }: { type: string }): string => {
                return type === 'solo' ? 'Cumple tu propia Agenda' : 'Una oportunidad diplomática';
            },
            description: ({ type }: { type: string }): string => {
                return type === 'solo'
                    ? 'Persigue objetivos que solo beneficien a tu facción. Sin aliados. Sin testigos.'
                    : 'Forja alianzas breves o manipula a otros para tu beneficio. Solo asegúrate de sacar la mayor ventaja.';
            },
        },
        common: {
            gemstoneCaverns: {
                collect: {
                    label: 'La codicia es profunda',
                    description: 'Al final del juego, haber reclamado al menos 5 Cavernas de Gemas. +5 Puntos',
                },
            },
            boneHoard: {
                collect: {
                    label: 'Maestro de los Huesos',
                    description: 'Al final del juego, haber reclamado al menos 5 Montones de Huesos. +5 Puntos',
                },
            },
            fungalFields: {
                collect: {
                    label: 'Señor de las Esporas',
                    description: 'Al final del juego, haber reclamado al menos 5 Campos de Hongos. +5 Puntos',
                },
            },
            twistedTunnels: {
                collect: {
                    label: 'Caminante Retorcido',
                    description: 'Al final del juego, haber reclamado al menos 5 Túneles Retorcidos. +5 Puntos',
                },
            },
            minersEnclaves: {
                collect: {
                    label: 'Usurpador de Reclamos',
                    description: 'Al final del juego, haber reclamado al menos 5 Enclaves Mineros. +5 Puntos',
                },
            },
        },
        uncommon: {
            bonus: {
                label: 'Descubrimiento Afortunado',
                description:
                    'Algunos exploradores simplemente tienen suerte. Obtén puntos sin razón aparente. +7 Puntos.',
            },
            cluster: {
                label: 'Vetas Ricas',
                description: 'Termina el juego con un grupo conectado de 3 Cavernas de Gemas. +7 Puntos.',
            },
            industrious: {
                label: 'Manos Laboriosas',
                description: 'Termina el juego con un grupo conectado de 3 Enclaves Mineros. +7 Puntos.',
            },
        },
        rare: {
            henges: {
                label: 'Susurros en Cada Círculo',
                description:
                    'Tener al menos una loseta reclamada adyacente a cada Círculo Hueco en el tablero. +12 Puntos.',
            },
            relic: {
                label: 'Maestro de Reliquias',
                description: 'Controlar más reliquias que cualquier otro jugador al final del juego. +12 Puntos.',
            },
            claims: {
                label: 'Dominio',
                description:
                    'Controlar más Enclaves Mineros que cualquier otro jugador al final del juego. +12 Puntos.',
            },
            fortune: {
                label: 'Maestro de las Vetas',
                description:
                    'Controlar más Cavernas de Gemas que cualquier otro jugador al final del juego. +12 Puntos.',
            },
        },
        diplomatic: {
            religiousConvention: {
                label: 'Convención Religiosa',
                description: 'Asegura que haya un Círculo Hueco con una loseta reclamada por cada jugador. +15 Puntos',
            },
            kingmaker: {
                label: 'Hacedor de Reyes',
                description: 'Termina el juego con otro jugador controlando más reliquias que tú. +15 Puntos',
            },
            myzeelsPact: {
                label: 'Pacto de Myzeel',
                description:
                    'Cada Campo de Hongos que reclames debe tener una loseta vecina reclamada por otro jugador. +15 Puntos',
            },
            outsider: {
                label: 'Forastero',
                description: 'Nunca estás adyacente a la loseta de Entrada de ningún jugador. +15 Puntos',
            },
            divineSplit: {
                label: 'División Divina',
                description: 'Cada Santuario Antiguo debe tener al menos dos jugadores adyacentes. +15 Puntos',
            },
            sharedBorders: {
                label: 'Fronteras Compartidas',
                description:
                    'Tener al menos quince losetas directamente adyacentes a losetas de otro jugador. +15 Puntos',
            },
            twinClaims: {
                label: 'Reclamos Gemelos',
                description: 'Reclama la misma cantidad de Cavernas de Gemas que otro jugador. +15 Puntos',
            },
            siblingSpores: {
                label: 'Esporas Hermanas',
                description: 'Reclama la misma cantidad de Campos de Hongos que otro jugador. +15 Puntos',
            },
            equalEnclaves: {
                label: 'Enclaves Iguales',
                description: 'Reclama la misma cantidad de Enclaves Mineros que otro jugador. +15 Puntos',
            },
            twistedFate: {
                label: 'Destino Retorcido',
                description: 'Reclama la misma cantidad de Túneles Retorcidos que otro jugador. +15 Puntos',
            },
            boneAgreement: {
                label: 'Acuerdo Óseo',
                description: 'Tú y otro jugador han reclamado la misma cantidad de Montones de Huesos. +15 Puntos',
            },
            echoesOfWar: {
                label: 'Ecos de Guerra',
                description: 'Estás adyacente a más losetas reclamadas por otros que a las tuyas propias. +15 Puntos',
            },
        },
    },
    notifications: {
        claimedATile: '¡{{player}} ha reclamado una loseta de tipo {{type}}!',
        claimedAShrine: '¡{{player}} ha tomado el control de un Santuario!',
        foundAHenge: '¡{{player}} ha descubierto un Círculo Hueco!',
        type: ({ type }: { type: string | undefined }): string => {
            switch (type) {
                case 'gemstone-caverns':
                    return 'Cavernas de Gemas';
                case 'bone-hoards':
                    return 'Montones de Huesos';
                case 'fungal-fields':
                    return 'Campos de Hongos';
                case 'twisted-tunnels':
                    return 'Túneles Retorcidos';
                case 'miners-enclaves':
                    return 'Enclaves Mineros';
                case 'hollow-henge':
                    return 'Círculo Hueco';
                case 'ancient-shrines':
                    return 'Santuarios Antiguos';
                case 'entrance':
                    return 'Entrada';
                case 'undiscovered':
                    return 'No Descubierto';
                case 'void':
                    return 'Vacío';
                default:
                    return 'undefined';
            }
        },
    },
    tutorial: {
        selectTile:
            'Interactúa con el tablero hexagonal tocando cualquier Hex revelado. Usa el ícono de detalles para aprender más sobre una loseta. Toca este mensaje para continuar.',
        claimTile:
            'Algunos hexágonos tienen un brillo rojo. Usa el ícono de la `Corona` para reclamar uno. Esto revelará todas las losetas adyacentes. Toca para cerrar.',
        shrines:
            '¡Un `Santuario Antiguo` ha sido revelado! El jugador con más losetas reclamadas alrededor lo controlará y obtendrá su reliquia.',
        henges: 'Se ha descubierto un `Círculo Hueco`. Reclamar una loseta adyacente otorgará una misión que brinda puntos adicionales al completarse.',
        final: '¡Ya sabes todo lo necesario para reclamar la Oscuridad Inferior como tuya! Pero cuidado: no eres el único que busca el poder.',
    },
});
