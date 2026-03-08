# 📚 La Mia Libreria

Un'app personale per tenere traccia dei libri letti, in corso e da leggere. Funziona offline, si installa come app nativa su Android e iOS, e si sincronizza tra dispositivi tramite Firebase.

---

## Novità — v4.0

**Icone per i profili.** Al momento della creazione di un profilo è possibile scegliere un'icona tra 16 emoji disponibili. L'icona si può cambiare in qualsiasi momento dalla pagina del profilo, cliccando sull'avatar.

**Pagina profilo utente.** Cliccando sul proprio nome nell'header si apre una pagina dedicata con statistiche personali (libri totali, completati, pagine lette, media voti, sessioni Pomodoro, streak), i 4 libri più amati in evidenza, e la griglia completa dei distintivi. Il pulsante per cambiare utente si trova in fondo a questa pagina.

**Condivisione scheda libro.** Nella pagina di dettaglio di ogni libro compare il pulsante "↗ Condividi". Genera una scheda grafica con copertina, titolo, autore, valutazione, stato e un estratto della recensione, esportabile come PNG o PDF a scelta.

**Avviso modifiche non salvate.** Se si inizia a compilare il form di un libro e si tenta di uscire senza salvare, compare un dialogo con tre opzioni: salvare, scartare le modifiche, o tornare indietro.

**Verifica distintivi all'avvio.** I badge vengono ora controllati ad ogni accesso al profilo, e non solo al salvataggio manuale. Questo garantisce che i distintivi vengano assegnati correttamente anche dopo un'importazione da file o un download da Firebase.

---

## Novità — v3.0

**Sessione di lettura con timer Pomodoro.** Ogni libro ha una sezione dedicata alla sessione di lettura. La pagina corrente è modificabile direttamente dalla scheda e viene mostrata come barra di avanzamento nella griglia. Il pulsante 🍅 apre una schermata fullscreen con timer configurabile, anello animato e aggiornamento automatico del progresso al termine di ogni sessione.

**Streak giornaliera.** L'app traccia i giorni consecutivi di utilizzo. La fiamma 🔥 appare nell'header e nella schermata di selezione utente. Si azzera se si salta un giorno.

**Distintivi (Achievements).** Dodici badge sbloccabili in base all'attività di lettura. Al momento dello sblocco compare una notifica animata.

---

## Novità — v2.0

**Profili utente locali.** Più profili sulla stessa installazione, ognuno con la propria libreria separata.

**Note per capitolo.** Titolo, riassunto e appunti per ogni capitolo del libro, modificabili dalla scheda dettaglio.

**Backup locale.** Esporta e importa la libreria come file JSON dalla pagina Impostazioni.

---

## Funzionalità

- **Icone profilo** — scelta tra 16 emoji, modificabile in qualsiasi momento
- **Pagina profilo** — statistiche personali, libri preferiti e distintivi in un unico posto
- **Condivisione scheda libro** — esporta come PNG o PDF
- **Avviso modifiche non salvate** — nessuna perdita accidentale di dati
- **Timer Pomodoro** — sessioni configurabili con aggiornamento automatico del progresso
- **Barra di avanzamento lettura** — pagina corrente su totale, visibile in griglia e in scheda
- **Streak giornaliera** — giorni consecutivi tracciati automaticamente
- **Distintivi** — 12 badge sbloccabili, verificati ad ogni accesso
- **Profili utente** separati sulla stessa installazione
- **Note per capitolo** — appunti per ogni capitolo del libro
- **Backup locale** — esporta e importa come file JSON
- **Scaffale visivo** con copertine, filtri per stato e ordinamento
- **Ricerca automatica** su Open Library — copertina, autore, editore, anno e trama
- **Scheda completa** per ogni libro con tutti i metadati
- **Recensione personale**, citazione preferita e valutazione a stelle (1–5)
- **Stato di lettura**: Letto, In corso, Da leggere, Abbandonato
- **Statistiche** in tempo reale: totale libri, media voti, pagine totali
- **Funzionamento offline** completo grazie a Service Worker e IndexedDB
- **Sincronizzazione** tra dispositivi tramite Firebase Realtime Database

---

## Distintivi disponibili

| Badge | Condizione |
|---|---|
| 📖 Prima pagina | Aggiungi il primo libro |
| ✅ Primo traguardo | Completa il primo libro |
| 📚 Scaffale pieno | 10 libri nella libreria |
| 🎓 Lettore assiduo | 5 libri completati |
| 🔥 Una settimana | 7 giorni consecutivi |
| 📅 Maratoneta | 30 giorni consecutivi |
| 🍅 Concentrato | 10 sessioni Pomodoro completate |
| ⏱ Instancabile | 50 sessioni Pomodoro completate |
| ⭐ Critico | 5 recensioni scritte |
| 🗺 Esploratore | 5 generi diversi letti |
| 🌙 Nottambulo | Sessione dopo le 22:00 |
| 🏃 Velocista | Libro completato in meno di 7 giorni |

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
| html2canvas + jsPDF | Generazione schede PNG e PDF |
| Lora + DM Sans | Tipografia (Google Fonts) |

---

## Utilizzo offline

L'app funziona completamente offline dopo la prima apertura. Le uniche funzionalità che richiedono connessione internet sono la ricerca di nuovi libri su Open Library, la sincronizzazione con Firebase, e la generazione di schede da condividere (per il caricamento delle librerie CDN).

---

## Hosting su GitHub Pages

1. Crea un repository pubblico su GitHub
2. Carica tutti i file (`index.html`, `sw.js`, `manifest.json`, `icon-192.png`, `icon-512.png`)
3. Vai su *Settings → Pages → Deploy from branch → main*
4. L'app sarà disponibile su `https://TUONOME.github.io/REPOSITORY/`

> Dopo ogni aggiornamento significativo, incrementa la versione della cache in `sw.js` (es. `lib-v6` → `lib-v7`) per forzare l'aggiornamento sui client già installati.

---

## Licenza

Uso personale.
