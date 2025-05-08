export type SupportedLocale = 'en' | 'pl';

export const SupportedLocaleArray: SupportedLocale[] = ["en", "pl"];
export const DefaultLocale = "en";

export const getLocaleWithFlag = (locale: String) => {
  switch (locale) {
    case "pl":
      return "🇵🇱 pl";
    default:
      return "🇺🇸 en";
  }
};

// all of the translation files
type JsonFiles = 'home.json' | 'ig_posts.json' | 'stories.json' | 'destinations.json';

const jsonFiles: JsonFiles[] = [
  'home.json',
  'ig_posts.json',
  'stories.json',
  'destinations.json'
]


const translationGlobPath = import.meta.glob('/src/data/dictionaries/*/*.json', { eager: true });


function loadTranslation(locale: SupportedLocale, jsonFile: JsonFiles) {
  const key = `/src/data/dictionaries/${locale}/${jsonFile}`;
  const translation = translationGlobPath[key];
  if (!translation) throw new Error(`Translation not found: ${key}`);
  return translation;
}


export const translations: Record<SupportedLocale, Record<JsonFiles, () => Promise<any>>> = 
  Object.fromEntries(
    SupportedLocaleArray.map((locale) => [
      locale,
      Object.fromEntries(
        jsonFiles.map((file) => [file, () => loadTranslation(locale, file)])
      ) as Record<JsonFiles, () => Promise<any>>
    ])
  ) as Record<SupportedLocale, Record<JsonFiles, () => Promise<any>>>;
