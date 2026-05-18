import { StaticDataGenerator } from './static';

export const streetGenerator = new StaticDataGenerator({
  en: ['123 Main St', '456 Oak Ave', '789 Pine Rd', '321 Elm St', '654 Maple Dr', '987 Cedar Ln', '111 Birch Blvd', '222 Walnut Way', '333 Willow Ct', '444 Ash Pl'],
  pl: ['ul. Kwiatowa 12', 'ul. Słoneczna 5', 'ul. Lipowa 8', 'ul. Polna 3', 'ul. Leśna 21', 'ul. Różana 7', 'ul. Akacjowa 14', 'ul. Brzozowa 9', 'ul. Wierzbowa 2', 'ul. Klonowa 17'],
  de: ['Hauptstraße 1', 'Bahnhofstraße 5', 'Kirchstraße 12', 'Gartenstraße 3', 'Schillerstraße 8', 'Goethestraße 22', 'Ringstraße 4', 'Waldstraße 17', 'Bergstraße 9', 'Lindenstraße 6'],
  ru: ['ул. Ленина 5', 'ул. Мира 12', 'ул. Советская 3', 'пр. Победы 7', 'ул. Садовая 15', 'ул. Молодёжная 2', 'ул. Центральная 8', 'ул. Школьная 11', 'ул. Лесная 19', 'пр. Октябрьский 34'],
});
