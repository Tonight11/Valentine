import type { Song } from '@/types';

export const songs: Song[] = [
    {
        id: 1,
        src: '/our-song.mp3',
        name: 'Наша песня',
        artist: 'Любимая мелодия',
        description: 'Песня, которая значит для нас так много',
        whySpecial: 'Эта песня - гимн нашей любви! Каждый раз, когда я её слышу, я думаю о тебе, Душа моя!',
    },
    {
        id: 2,
        src: '/love-theme.mp3',
        name: 'Love Theme',
        artist: 'Cant recall',
        description: 'Нежная мелодия любви',
        whySpecial: 'Эта композиция напоминает мне о наших романтических моментах вместе. Каждая нота наполнена любовью!',
    },
    {
        id: 3,
        src: '/jap.mp3',
        name: 'Romantic Melody',
        artist: 'EVE',
        description: 'Красивая японская мелодия',
        whySpecial: 'Эта песня особенная, потому что я ее слушал после первого свидания. Она всегда будет напоминать мне о том вечере!',
    },
];
