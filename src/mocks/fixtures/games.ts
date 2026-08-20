export interface MockGame {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  rating: number;
  tags: string[];
  popularity: number;
}

export const mockGames: MockGame[] = [
  {
    id: "valorant",
    title: "Valorant",
    subtitle: "Tactical FPS",
    description:
      "Fast local queues, tournament nights, and strong cafe availability across competitive PC venues.",
    rating: 4.8,
    tags: ["5v5", "Competitive", "PC"],
    popularity: 100,
  },
  {
    id: "counter-strike-2",
    title: "Counter-Strike 2",
    subtitle: "Tactical FPS",
    description:
      "The default scrim title for bootcamp rooms, with deep demo review and coaching support.",
    rating: 4.9,
    tags: ["5v5", "Competitive", "PC"],
    popularity: 96,
  },
  {
    id: "tekken-8",
    title: "Tekken 8",
    subtitle: "Fighting",
    description:
      "Popular for console pods, weekend brackets, and quick pickup matches with cafe regulars.",
    rating: 4.6,
    tags: ["Console", "Fighting", "Tournaments"],
    popularity: 84,
  },
  {
    id: "ea-fc-26",
    title: "EA FC 26",
    subtitle: "Sports",
    description:
      "A favorite for groups looking for couch competition and relaxed cafe sessions.",
    rating: 4.4,
    tags: ["Console", "Sports", "Co-op"],
    popularity: 79,
  },
  {
    id: "street-fighter-6",
    title: "Street Fighter 6",
    subtitle: "Fighting",
    description:
      "Strong fit for arcade-style cafes, quick sets, and casual tournament nights.",
    rating: 4.7,
    tags: ["Arcade", "Console", "Fighting"],
    popularity: 68,
  },
  {
    id: "league-of-legends",
    title: "League of Legends",
    subtitle: "MOBA",
    description:
      "Five-player team bays and long sessions, best suited to cafes with comfortable seating.",
    rating: 4.5,
    tags: ["5v5", "MOBA", "PC"],
    popularity: 88,
  },
  {
    id: "rocket-league",
    title: "Rocket League",
    subtitle: "Sports",
    description:
      "Short matches and an easy learning curve make this the go-to pick for mixed skill groups.",
    rating: 4.6,
    tags: ["Co-op", "Sports", "Cross-platform"],
    popularity: 72,
  },
  {
    id: "baldurs-gate-3",
    title: "Baldur's Gate 3",
    subtitle: "RPG",
    description:
      "A long-session single-player and co-op pick for quieter cafes with private rooms.",
    rating: 4.9,
    tags: ["RPG", "Co-op", "Story"],
    popularity: 61,
  },
];
