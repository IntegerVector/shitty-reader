import { MangaPillStrategy } from "@/strategies/manga-pill.strategy";

export function getStrategy(source) {
  switch (source) {
    default:
    case "MANGA_PILL":
      return new MangaPillStrategy();
  }
}
