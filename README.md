# Coding challenge

## Running the project

0. have docker and docker-compose installed
1. clone the repo
2. navigate to the directory containing the docker-compose.yml file
3. run ``docker-compose up -d --build`` or ``./start.sh``
4. Use [postman](https://www.getpostman.com/) or an equivalent software to make use of the endpoints like explained below
5. [mailtrap project](https://mailtrap.io/share/854980/76f94f46f1d04131eeae79a3639984a0) -> to see the resulting emails
## Endpoints

- POST _localhost:3000_/submit?email={valid email}
  - to submit the text of the subtitles file (starts the translation process)

- POST _localhost:30001_/import
  - to import the translation json data

- There are two other endpoints that are used internally:
  - POST _localhost:3000_/notify?email={valid email}
    - SMT will call this one when the translations are done so that the email can be notified

  - POST _localhost:30001_/translate
    - the server calls this one to start the translation process on SMT

Diagram:
![Copy of Copy of Untitled](https://user-images.githubusercontent.com/14142563/101345340-d1b0ed00-387e-11eb-8a47-41c6548e9677.png)

-----
-----

## Business description

A Subtitles Translator is a service that translates subtitles, it takes one or several subtitle files as input and produces the subtitles in the same format containing the translations of each one of the contained sentences. The translation is performed by using historical data stored in a [Translation Management System (TMS)](https://en.wikipedia.org/wiki/Translation_management_system). One translation is performed by going through the following steps:

1. Parses the subtitles file and extract the translatable source.
2. Translates the source using historical data.
3. Pairs the result with the source.
4. Reconstructs the subtitles file.

Below you can find an example of how a subtitles file looks like:

```
1 [00:00:12.00 - 00:01:20.00] I am Arwen - I've come to help you.
2 [00:03:55.00 - 00:04:20.00] Come back to the light.
3 [00:04:59.00 - 00:05:30.00] Nooo, my precious!!.
```

Is basically conformed by the id of the line, the time range, and then the content to be translated.

The output for this input would be a file containing something as:

```
1 [00:00:12.00 - 00:01:20.00] Ich bin Arwen - Ich bin gekommen, um dir zu helfen.
2 [00:03:55.00 - 00:04:20.00] Komm zurück zum Licht.
3 [00:04:59.00 - 00:05:30.00] Nein, my Schatz!!.
```

The second part of the system is the aforementioned TMS, as its name states, is a system that stores past translations to be reused, the structure of this system is really simple, it contains two endpoints, one for translating and the other for introducing data. 

In order to translate a query, it uses the following flow:

1. Search for strings that are **approximately** equal in the database — They might not be the same but close enough to be consider a translation.
2. It calculates the distance between the query and the closest string found. — A standard way of calculating strings distance is by using [Levenshtein distance algorithm](https://en.wikipedia.org/wiki/Levenshtein_distance).
3. If the distance is less than 5, is considered a translation, otherwise the same query is returned as result.

In order to import data, it uses the following structure:

```json
[
  {
    "source": "Hello World",
    "target": "Hallo Welt",
		"sourceLanguage": "en",
		"targetLanguage": "de"
  },
  {
    "source": "Hello guys",
    "target": "Hallo Leute",
		"sourceLanguage": "en",
		"targetLanguage": "de"
  },
  {
    "source": "I walk to the supermarket",
    "target": "Ich gehe zum Supermarkt.",
		"sourceLanguage": "en",
		"targetLanguage": "de"
  }
]
```

## Task

Your task is:

1. Create a REST API for uploading subtitles in a plain text format (.txt) and send an email with the translation as attachment once the process done.
2. Create the TMS either inside or outside the document translator (however you feel is the best way) with the two endpoints stated before.

Feel free to define yourself the API contracts and the project structure.
