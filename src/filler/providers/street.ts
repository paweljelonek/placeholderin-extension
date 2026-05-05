import { StaticDataGenerator } from './static';

export const streetGenerator = new StaticDataGenerator({
  en: ['123 Main St', '456 Oak Ave', '789 Pine Rd', '321 Elm St', '654 Maple Dr', '987 Cedar Ln', '111 Birch Blvd', '222 Walnut Way', '333 Willow Ct', '444 Ash Pl'],
  pl: ['ul. Kwiatowa 12', 'ul. Słoneczna 5', 'ul. Lipowa 8', 'ul. Polna 3', 'ul. Leśna 21', 'ul. Różana 7', 'ul. Akacjowa 14', 'ul. Brzozowa 9', 'ul. Wierzbowa 2', 'ul. Klonowa 17'],
});
