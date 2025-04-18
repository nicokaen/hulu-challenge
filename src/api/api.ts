

/**
 * API Integration
 *
 * API Endpoints:
 * - Hub Data: https://d1q0vy0v52gyjr.cloudfront.net/hub.json
 * - Collections: https://d1q0vy0v52gyjr.cloudfront.net/collections/<id>.json
 */

import { HuluHub, CollectionComponent } from "./types";

export const fetchHuluHub = async (): Promise<HuluHub> => {
    const response = await fetch(
      "https://d1q0vy0v52gyjr.cloudfront.net/hub.json"
    );
    const data = await response.json();
    return data;
};

export const fetchHubById = async (id: string): Promise<CollectionComponent> => {
  const response = await fetch(`https://d1q0vy0v52gyjr.cloudfront.net/collections/${id}.json`);
  const data = await response.json();
  return data;
};
