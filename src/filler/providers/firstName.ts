import { StaticDataGenerator } from './static';

export const firstNameGenerator = new StaticDataGenerator({
  en: ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Barbara'],
  pl: ['Jan', 'Anna', 'Piotr', 'Maria', 'Krzysztof', 'Katarzyna', 'Andrzej', 'Małgorzata', 'Tomasz', 'Agnieszka'],
  de: ['Lukas', 'Leon', 'Ben', 'Finn', 'Jonas', 'Lea', 'Emma', 'Hannah', 'Mia', 'Sofia'],
  ru: ['Александр', 'Сергей', 'Дмитрий', 'Андрей', 'Алексей', 'Елена', 'Наталья', 'Ольга', 'Татьяна', 'Ирина'],
});
