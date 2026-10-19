export const asset = (file: string) => `${import.meta.env.BASE_URL}site/${file}`

export const FOUNDED = 2011

export const CONTACT_URL = 'https://www.facebook.com/flow.ultimate.wroclaw'

export const SOCIALS = [
  { label: 'Facebook', href: CONTACT_URL },
  { label: 'Instagram', href: 'https://www.instagram.com/flow.ultimate.wroclaw/' },
]

export const HERO_PHOTOS = [
  { file: 'photo-sprint-clean.webp', pos: '60% 40%', alt: 'Flow players sprinting' },
  { file: 'photo-catch-v2.webp', pos: '70% 25%', alt: 'Flow player skying for a disc' },
  { file: 'photo-throw.webp', pos: '55% 35%', alt: 'Flow player throwing a forehand' },
]

export const PLAYERS: [name: string, num: number][] = [
  ['Aleksandra Czerwonko', 5],
  ['Andrzej Zaród', 49],
  ['Anton Gatsko', 10],
  ['Ewa Szewczyk-Leśniak', 4],
  ['Grzegorz Ruszczyński', 87],
  ['Hanna Kędziora', 36],
  ['Jan Kubis', 16],
  ['Katarzyna Kiełbińska', 15],
  ['Katarzyna Widźgowska', 95],
  ['Maciej Kiciński', 28],
  ['Maciej Pająk', 42],
  ['Maja Kozak', 72],
  ['Małgorzata Czaplińska', 13],
  ['Maria Bazan', 70],
  ['Michał Krotliński', 9],
  ['Natalia Nędzi', 18],
  ['Paweł Milanowicz', 32],
  ['Rafał Furman', 81],
  ['Tomasz Klin', 11],
  ['Zuzanna Wywiał', 34],
]

export const COACHES: { first: string; last: string; photo: { file: string; pos: string; credit?: string } }[] = [
  { first: 'Andrzej', last: 'Zaród', photo: { file: 'coach-andrzej-zarod.webp', pos: '57% 22%' } },
  { first: 'Natalia', last: 'Nędzi', photo: { file: 'coach-natalia-nedzi.webp', pos: '60% 30%', credit: 'Fot. Zizo Sport Photo' } },
]

export const TITLE_YEARS = new Set(['2015', '2018–19', '2021'])

type Finish = [year: string, place: number]

export const PODIUMS: Finish[][] = [
  [['2021', 1], ['2019', 1], ['2018', 1], ['2026', 3], ['2024', 2], ['2022', 3], ['2016', 3], ['2015', 2]],
  [['2021', 1], ['2015', 1], ['2025', 3], ['2023', 2], ['2022', 2], ['2017', 2]],
  [['2022', 3], ['2020', 3], ['2019', 2], ['2018', 2], ['2014', 3]],
]

export const EUCF: Finish[] = [['2021', 4], ['2019', 5], ['2018', 5], ['2014', 4]]

const ZIZO = 'Fot. Zizo Sport Photo'

export const TRAINING_SLIDES = [
  { file: 'tr-stretch.webp', alt: 'Two players reaching for a disc at training', pos: '50% 40%' },
  { file: 'tr-throw-27.webp', alt: 'Player #27 winding up a backhand', pos: '50% 18%' },
  { file: 'tr-reach.webp', alt: 'Orange-bib catch at an evening training', pos: '60% 45%' },
  { file: 'tr-dog.webp', alt: 'Player with the team dog on the sideline', pos: '50% 50%', credit: ZIZO },
  { file: 'tr-sky.webp', alt: 'Contested catch at training', pos: '50% 35%' },
  { file: 'tr-catch-orange.webp', alt: 'Player throwing a flick at training', pos: '50% 30%' },
  { file: 'tr-discs.webp', alt: 'Warming up indoors', pos: '45% 40%' },
  { file: 'tr-catch-duo.webp', alt: 'Holding Flow discs on the field', pos: '50% 45%' },
  { file: 'tr-night-pitch.webp', alt: 'Team photo under the floodlights after an evening training', pos: '50% 60%' },
  { file: 'tr-night-grass.webp', alt: 'Group photo on the grass after a night training', pos: '50% 60%' },
  { file: 'tr-night-street.webp', alt: 'Players gathered on the path after training', pos: '50% 58%' },
]

export const MEDIA = [
  { file: 'photo-catch-v2.webp', alt: 'Flow player skying for a disc', pos: '70% 20%', span: 'w2 tall' },
  { file: 'photo-huddle.webp', alt: 'Team huddle', pos: '50% 50%' },
  { file: 'photo-sprint-clean.webp', alt: 'Flow players sprinting', pos: '40% 50%' },
  { file: 'photo-highfive-dark-clean.webp', alt: 'High fives after a game', pos: '50% 35%', span: 'w2' },
  { file: 'photo-anthem.webp', alt: 'Players lined up before a game', pos: '35% 40%' },
  { file: 'photo-highfive-white.webp', alt: 'Spirit line high fives', pos: '40% 40%' },
  { file: 'photo-team-white.webp', alt: 'Flow team photo in white kits', pos: '50% 45%', span: 'w2' },
  { file: 'photo-wroc-32.webp', alt: 'Flow #32 breaking the mark at WROC-Series', pos: '40% 40%', span: 'w2 tall', credit: 'Fot. Marysia Bazan / WROC-Series' },
  { file: 'photo-zizo-sky.webp', alt: 'Flow #49 skying for a disc', pos: '45% 30%', credit: ZIZO },
  { file: 'photo-zizo-throw.webp', alt: 'Flow player throwing around a mark', pos: '35% 40%', credit: ZIZO },
  { file: 'photo-zizo-highfive.webp', alt: 'Flow #32 celebrating a point', pos: '50% 30%', span: 'w2', credit: ZIZO },
]
