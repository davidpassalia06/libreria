# 📚 La Mia Libreria

Un'app personale per tenere traccia dei libri letti, in corso e da leggere. Funziona offline, si installa come app nativa su Android e iOS (in lavorazione), e si sincronizza tra dispositivi tramite Firebase.

---

## Novità — v2.0

**Profili utente locali.** Puoi ora creare più profili sulla stessa installazione, ognuno con la propria libreria separata. Utile per famiglie o per tenere distinte collezioni diverse. Il cambio profilo avviene dalla schermata iniziale o dalla pillola nell'header.

**Note per capitolo.** Ogni libro può avere un numero di capitoli definito dall'utente. Per ciascuno è possibile aggiungere un titolo, un riassunto o appunti — tutto consultabile dalla pagina di dettaglio e modificabile con un clic.

**Backup locale (esporta/importa).** Dalla pagina Impostazioni è possibile esportare la propria libreria come file JSON e reimportarla su qualsiasi dispositivo, senza account e senza internet.

---

## Funzionalità

- **Profili utente** separati sulla stessa installazione
- **Note per capitolo** — titolo, riassunto e appunti per ogni capitolo
- **Backup locale** — esporta e importa la libreria come file JSON
- **Scaffale visivo** con copertine, filtri per stato e ordinamento
- **Ricerca automatica** su Open Library — recupera copertina, autore, editore, anno e trama
- **Scheda completa** per ogni libro: copertina, autore, editore, anno, pagine, genere, ISBN, data di lettura
- **Recensione personale**, citazione preferita e valutazione a stelle (1–5)
- **Stato di lettura**: Letto, In corso, Da leggere, Abbandonato
- **Statistiche** in tempo reale: totale libri, media voti, pagine totali
- **Funzionamento offline** completo grazie a Service Worker e IndexedDB
- **Sincronizzazione** tra dispositivi tramite Firebase Realtime Database

---

## Struttura del repository

```
index.html       # App completa (singolo file)
sw.js            # Service Worker per cache offline
manifest.json    # Manifest PWA per installazione nativa
icon-192.png     # Icona app 192×192
icon-512.png     # Icona app 512×512
```

---

## Installazione

### Come PWA da browser (consigliato)

1. Apri l'app su `https://TUONOME.github.io/libreria/`
2. Su **Android** (Chrome): tre puntini → *Aggiungi alla schermata Home*
3. Su **iOS** (Safari): pulsante condividi → *Aggiungi a schermata Home*
4. Su **Desktop** (Chrome/Edge): icona di installazione nella barra degli indirizzi

> ⚠ Firefox su Android non supporta i service worker su GitHub Pages in modo affidabile. Si consiglia Chrome o Samsung Internet.

### Come APK Android

1. Vai su [pwabuilder.com](https://pwabuilder.com)
2. Inserisci l'URL GitHub Pages
3. Scegli *Other Android* → scarica il sorgente ZIP
4. Apri il progetto in Android Studio
5. *Build → Generate Signed Bundle / APK* → seleziona *release*
6. Installa l'APK sul dispositivo

---

## Sincronizzazione tra dispositivi

L'app usa **Firebase Realtime Database** (piano gratuito Spark) per sincronizzare i dati. Ogni profilo utente ha il proprio spazio separato su Firebase.

### Configurazione iniziale (una volta sola)

1. Vai su [console.firebase.google.com](https://console.firebase.google.com)
2. Crea un nuovo progetto (piano gratuito **Spark**)
3. Vai su *Realtime Database* → *Crea database* → *Modalità test*
4. Copia l'URL del database (es. `https://nome-progetto-default-rtdb.firebaseio.com`)
5. Nell'app clicca ⚙ → incolla l'URL → *Salva*

### Regole Firebase consigliate

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### Utilizzo

- **⬆ Carica** — invia i dati locali su Firebase (esegui sul dispositivo A)
- **⬇ Scarica** — recupera i dati da Firebase (esegui sul dispositivo B)

> I dati locali vengono sempre salvati automaticamente tramite IndexedDB. Firebase è necessario solo per la sincronizzazione tra dispositivi.

---

## Tecnologie utilizzate

| Tecnologia | Utilizzo |
|---|---|
| HTML/CSS/JS | App completa in un singolo file, nessuna dipendenza |
| IndexedDB | Persistenza locale dei dati, funziona offline |
| Service Worker | Cache offline e installazione PWA |
| Open Library API | Ricerca libri e recupero copertine |
| Firebase Realtime Database | Sincronizzazione cloud gratuita |
| Lora + DM Sans | Tipografia (Google Fonts) |

---

## Utilizzo offline

L'app funziona completamente offline dopo la prima apertura. Le uniche funzionalità che richiedono connessione internet sono:

- La ricerca di nuovi libri su Open Library
- La sincronizzazione con Firebase

---

## Licenza

Uso personale.
