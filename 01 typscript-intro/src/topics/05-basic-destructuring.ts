interface AudioPlayer {
  audioVolume: number;
  songDuration: number;
  song: string;
  details: Details;
}

interface Details {
  author: string;
  year: number;
}

const audioPlayer: AudioPlayer = {
  audioVolume: 90,
  songDuration: 36,
  song: 'Love',
  details: {
    author: 'Pepe Moreno',
    year: 2024,
  },
};

const song = 'Nueva Song';

//Desestructuración de objetos
const { song: anotherSong, songDuration: duration, details } = audioPlayer;

const { author } = details;

// console.log('Song: ', anotherSong);
// console.log('Duration: ', duration);
// console.log('Author: ', author);

const [, , trunks = 'Not found']: string[] = ['Goku', 'Vegeta', 'Trunks'];

//Me interesa extraer el personaje Trunks
console.log('Personaje Trunks: ', trunks);

export {};
