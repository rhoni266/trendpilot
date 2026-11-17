import { PlatformType } from "../types";
import { PlatformConnector } from "./types";
import { TikTokConnector } from "./tiktokConnector";
import { InstagramConnector } from "./instagramConnector";
import { ThreadsConnector } from "./threadsConnector";
import { FacebookConnector } from "./facebookConnector";

class ConnectorRegistry {
  private connectors: Map<PlatformType, PlatformConnector> = new Map();

  constructor() {
    this.connectors.set("TIKTOK", new TikTokConnector());
    this.connectors.set("INSTAGRAM", new InstagramConnector());
    this.connectors.set("THREADS", new ThreadsConnector());
    this.connectors.set("FACEBOOK", new FacebookConnector());
  }

  getConnector(platform: PlatformType): PlatformConnector {
    const connector = this.connectors.get(platform);
    if (!connector) {
      throw new Error(`No connector registered for platform: ${platform}`);
    }
    return connector;
  }

  getAllConnectors(): PlatformConnector[] {
    return Array.from(this.connectors.values());
  }
}

export const connectorRegistry = new ConnectorRegistry();
