export interface SectionItem {
  text: string;
}

export interface Section {
  title: string;
  description?: string;
  items: SectionItem[];
}
