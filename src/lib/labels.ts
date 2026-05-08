export const RIPENING_LABEL: Record<string, string> = {
  early: 'ранній',
  'mid-early': 'середньоранній',
  mid: 'середній',
  late: 'пізній',
  ранній: 'ранній',
  середній: 'середній',
  середньоранній: 'середньоранній',
  пізній: 'пізній',
};

export const TYPE_LABEL: Record<string, string> = {
  determinate: 'детермінантний',
  'semi-determinate': 'напівдетермінантний',
  indeterminate: 'індетермінантний',
};

export const CONFIDENCE_LABEL: Record<string, string> = {
  high: 'перевірений',
  medium: 'перевірений',
  low: 'дані уточнюються',
};

export function ripeningLabel(r: string): string {
  return RIPENING_LABEL[r] ?? r;
}

export function typeLabel(t?: string): string {
  if (!t) return '';
  return TYPE_LABEL[t] ?? t;
}

export function categoryPath(c: 'tomato' | 'pepper'): string {
  return c === 'tomato' ? '/pomidory' : '/pertsi';
}

export function categoryLabel(c: 'tomato' | 'pepper'): string {
  return c === 'tomato' ? 'помідор' : 'перець';
}

export function categoryLabelPlural(c: 'tomato' | 'pepper'): string {
  return c === 'tomato' ? 'Помідори' : 'Перці';
}
