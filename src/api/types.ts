export type HuluHub = {
  _type: string;
  id: string;
  href: string;
  name: string;
  theme: string;
  artwork: Artwork;
  browse: Browse;
  components: DetailedComponent[];
  actions: unknown[];
};

type Artwork = {
  [key: string]: {
    path: string;
    accent: {
      hue: number;
      classification: string;
    };
    image_type: string;
    image_id: string;
  };
};

type Browse = {
  target_type: string;
  target_id: string;
  target_theme: string;
  params: Record<string, unknown>;
  type: string;
};

type BaseComponent = {
  _type: string;
  id: string;
  href: string;
  items?: CollectionItem[]; // Array of items within the collection
};

type TextComponent = BaseComponent & {
  _type: 'text';
  text: string;
  style?: string;
};

type ImageComponent = BaseComponent & {
  _type: 'image';
  image_url: string;
  alt_text?: string;
};

type ButtonComponent = BaseComponent & {
  _type: 'button';
  label: string;
  action: {
    type: string;
    target: string;
  };
};

type VideoComponent = BaseComponent & {
  _type: 'video';
  video_url: string;
  autoplay?: boolean;
  duration?: number;
};

export type CollectionComponent = BaseComponent & {
  _type: 'collection';
  name: string;
  theme: string;
  artwork: Record<string, unknown>;
};

export type CollectionItem = {
  _type: string;
  id: string;
  visuals?: Visuals;
  entity_metadata?: EntityMetadata;
  name?: string;
  view_template?: string;
  theme?: string;
  items?: CollectionItem[];
};

type Visuals = {
  artwork: {
    _type: string;
    horizontal_tile?: ArtworkTile;
    vertical_tile?: ArtworkTile;
    vertical_title?: ArtworkTile;
  };
  headline: string;
  action_text: string;
  subtitle?: string;
  body: string;
  footer?: string;
  prompt: string;
  primary_branding?: {
    id: string;
    name: string;
    artwork: Artwork;
  };
};

type ArtworkTile = {
  _type: string;
  artwork_type: string;
  image: {
    path: string;
    accent: {
      hue: number;
      classification: string;
    };
    image_id: string;
  };
  text?: string;
};

type EntityMetadata = {
  genre_names: string[];
  premiere_date: string;
  rating?: {
    code?: string;
  };
  series_description?: string;
  episode_text?: string;
  entity_type: string;
  is_warm: boolean;
};

// Union type for all possible components
export type DetailedComponent =
  | TextComponent
  | ImageComponent
  | ButtonComponent
  | VideoComponent
  | CollectionComponent;
