# Placeholderin

![Status: Unstable](https://img.shields.io/badge/status-unstable-red)
![Work in progress](https://img.shields.io/badge/work%20in%20progress-%F0%9F%9A%A7-orange)

A browser extension for Chrome and Firefox that fills web forms with realistic fake data - built for manual testers who are tired of typing the same dummy values over and over again.

## What is this?

Placeholderin is a lightweight extension for Chrome and Firefox that detects input fields on any web page and populates them with contextually appropriate fake data: names, addresses, phone numbers, tax identifiers, and more.

It is aimed primarily at **manual testers** who need to quickly fill out forms during exploratory testing, regression testing, or demo walkthroughs - without copy-pasting from a notes file or making things up on the spot.

## Status

> [!WARNING]
> **Unstable - work in progress.** This project is in early development. Things are incomplete, APIs may change, and some features are still missing. There is no set release date - this project is developed in free time, for fun, with no deadlines and no pressure.

## Features

### Fill the whole form at once

Click the extension icon and hit **Fill form** to auto-detect and fill every matching field on the page in one shot.

### Fill individual fields from the popup

The popup exposes each field type as a separate button, so you can fill just one category at a time.

### Keyboard shortcut overlay

Hover over any input and press the configured shortcut (default **Alt+Shift+F**) to get a small floating menu right next to the field. Pick a data type from the list and it gets inserted immediately. No popup, no clicking around - just hover, press, pick.

### Supported field types

| Field | Detected by |
|---|---|
| 👤 First name | `autocomplete="given-name"`, name/id/placeholder containing `first_name`, `fname`, `imię`, … |
| 👤 Last name | `autocomplete="family-name"`, `last_name`, `surname`, `nazwisko`, … |
| 🏙 City | `autocomplete="address-level2"`, `city`, `town`, `miasto` |
| 🏠 Street | `autocomplete="street-address"` / `address-line1`, `street`, `address`, `ulica`, … |
| 📮 Postal code | `autocomplete="postal-code"`, `zip`, `postcode`, `kod pocztowy` |
| 📞 Phone | `autocomplete="tel"`, name/id/placeholder containing `phone`, `mobile`, `gsm`, `tel` |
| 🆔 PESEL | `pesel` anywhere in name/id/placeholder |
| 🏢 NIP | `nip` (word boundary), `tax_id` |

Fields are auto-detected by matching `autocomplete` attributes, `name`, `id`, and `placeholder` against known patterns - no manual configuration needed.

## Settings

Open the settings page from the extension popup (⚙ Settings).

| Setting | Description |
|---|---|
| **Interface language** | Language of the extension UI. Changing this reloads the settings page immediately. |
| **Data language** | Language of generated data - affects names, cities, streets, phone numbers, and other locale-specific values. |
| **Only empty fields** | When enabled, already-filled fields are not overwritten. |
| **Keyboard shortcut** | Shortcut that opens the quick-fill overlay; click *Change* and press any key combination to record a new one. |
| **Visible options in menu** | Toggle which field types appear in the shortcut overlay. |

### Interface language vs. data language

These are two independent settings:

- **Interface language** controls the labels, buttons, and all text in the extension itself. Defaults to English when no preference has been saved.
- **Data language** controls what kind of data gets generated. Supported locales and what they affect:

| Locale | Names | Cities | Streets | Phone format | Postal code |
|---|---|---|---|---|---|
| 🇬🇧 English | American | US cities | US-style (`123 Main St`) | `(415) 555-1234` | 5 digits |
| 🇵🇱 Polski | Polish | Polish cities | Polish (`ul. Kwiatowa 12`) | 9-digit mobile | `XX-XXX` |
| 🇩🇪 Deutsch | German | German cities | German (`Hauptstraße 1`) | `0176 xxxxxxxx` | 5 digits |
| 🇷🇺 Русский | Russian | Russian cities | Russian (`ул. Ленина 5`) | `+7 9xx xxx-xx-xx` | 6 digits |

PESEL and NIP are Polish-specific identifiers and always generate Polish values regardless of the data language setting.

## Internationalisation

The extension is fully localised using the Chrome/Firefox `_locales` convention. Translation files live in `_locales/<lang>/messages.json`. Currently supported languages: **English** (`en`), **Polish** (`pl`), **German** (`de`), and **Russian** (`ru`).

Adding a new language requires:
1. Creating `_locales/<lang>/messages.json` with the same keys as `_locales/en/messages.json`.
2. Adding the corresponding `<option>` to both language selects in `options.html`.
3. Adding the locale value to the `Locale` constant in `src/settings/types.ts`.
4. Adding locale-specific data to each provider in `src/filler/providers/` (names, cities, streets, phone format, postal code format).

## Development

```bash
# install dependencies
npm install

# build once (outputs to dist/)
npm run build

# watch mode
npm run dev

# run tests
npm test
```

### Packaging for distribution

```bash
# assemble Chrome extension → dist/chrome/
npm run package:chrome

# assemble Firefox extension → dist/firefox/
npm run package:firefox
```

Both commands run a full build first, then copy all extension assets and the right manifest into the target directory. Load that directory in the browser to test the packaged version.

### Loading locally

**Chrome:** open `chrome://extensions`, enable *Developer mode*, click *Load unpacked*, select the **root** of this repository.

**Firefox:** run `npm run package:firefox` first, then open `about:debugging`, click *This Firefox* → *Load Temporary Add-on*, and select any file inside `dist/firefox/`.

Built with TypeScript + esbuild. No framework dependencies - plain DOM, plain browser extension APIs.

## Design goals

- **Lightweight** - no bloat, minimal dependencies
- **Fast** - fills forms instantly, no loading screens
- **Secure** - runs entirely in your browser, no data leaves your machine, ever

## No ads. Ever.

Placeholderin is a passion project. It exists because building useful tools is enjoyable, not because there is money to be made. There will never be ads, tracking, analytics, subscriptions, or any monetisation of any kind.

## Author

**Paweł Jelonek** - built with curiosity and too much coffee, during evenings and weekends.

Have a question, idea, or just want to say hi? Feel free to reach out:
pawel.jelonek [at] gmail [dot] com

## License

[MIT](LICENSE)
