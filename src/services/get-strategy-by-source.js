import { MangaPillStrategy } from "./manga-pill.strategy";

export function getStrategy(source) {
  switch (source) {
    default:
    case "MANGA_PILL":
      return new MangaPillStrategy();
  }
}
