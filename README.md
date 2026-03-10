# 📚 Marginalia

> *marginalia* — dal latino. Le note scritte a margine dei libri: pensieri, dubbi, intuizioni lasciate dal lettore tra le righe. Ciò che sfugge alla parola scritta, catturato a matita sul bordo della pagina.

Un'app personale per tenere traccia dei libri letti, in corso e da leggere. Funziona offline, si installa come app nativa su Android e iOS, e si sincronizza tra dispositivi tramite Firebase.

---

## Novità — v5.1

**Copertine dalla galleria.** È ora possibile caricare una copertina direttamente dalla galleria del dispositivo. L'immagine viene ridimensionata automaticamente a 400px e salvata in locale — nessun link esterno, nessun problema di copyright.

**Campo "Iniziato il".** Il form di ogni libro ora include la data di inizio lettura, affiancata alla data di fine. Il Compendium annuale calcola automaticamente la durata media di lettura in giorni.

**Compendium annuale**. La schermata di riepilogo annuale è stata rinominata Compendium per evitare conflitti con marchi registrati. Mostra libri letti, pagine, media voti, sessioni Pomodoro, libro dell'anno, genere e autore preferiti, grafico mensile, citazione casuale e — con il nuovo campo "Iniziato il" — la durata media per libro.

**Streak più rigorosa.** La streak giornaliera si incrementa solo completando una sessione Pomodoro o aggiornando manualmente la pagina corrente. Aprire l'app non è sufficiente.

**Sezione Scopri.** Nella schermata di ricerca, quando il campo è vuoto, compare una selezione curata di classici divisi per genere (Narrativa letteraria, Narrativa italiana, Fantascienza, Filosofia, Giallo e noir, Saggistica). Toccare un libro precompila il form automaticamente.

**Sicurezza XSS.** Tutti i contenuti dinamici passano ora per la funzione di escape `h()`. Gli handler `onclick` inline sono stati rimossi in favore di `addEventListener`.

**Validazione importazione JSON.** I file importati vengono ora validati campo per campo con lunghezze massime e whitelist per lo stato.

---

## Novità — v5.0

**Nuovo stile della selezione profili.** La schermata iniziale mostra i profili come tile con avatar emoji, nome e streak. La modalità gestione permette di aggiungere, modificare ed eliminare profili senza uscire dalla schermata.

---

## Novità — v4.0

**Icone per i profili.** Al momento della creazione di un profilo è possibile scegliere un'icona tra 14 emoji disponibili. L'icona si può cambiare in qualsiasi momento dalla pagina del profilo.

**Pagina profilo utente.** Statistiche personali, libri preferiti e griglia completa dei distintivi in un unico posto.

**Condivisione scheda libro.** Genera una scheda grafica con copertina, titolo, autore, valutazione, stato e recensione, esportabile come PNG o PDF.

**Avviso modifiche non salvate.** Dialogo di conferma prima di abbandonare il form con modifiche in corso.

**Verifica distintivi all'avvio.** I badge vengono controllati ad ogni accesso al profilo.

---

## Novità — v3.0

**Timer Pomodoro.** Sessioni configurabili con anello animato e aggiornamento automatico del progresso al termine.

**Streak giornaliera.** Giorni consecutivi di lettura tracciati automaticamente.

**Distintivi.** 12 badge sbloccabili in base all'attività di lettura.

---

## Novità — v2.0

**Profili utente locali.** Più profili sulla stessa installazione con librerie separate.

**Note per capitolo.** Appunti per ogni capitolo, modificabili dalla scheda dettaglio.

**Backup locale.** Esporta e importa come file JSON.

---

## Funzionalità complete

- **Scaffale visivo** con copertine, filtri per stato e ordinamento
- **Ricerca libri** su Open Library — copertina, autore, editore, anno, trama
- **Sezione Scopri** — 48 classici curati divisi per genere, precompilano il form al tocco
- **Copertine dalla galleria** — carica dal dispositivo, ridimensionate automaticamente
- **Scheda completa** per ogni libro — tutti i metadati, recensione, citazione, trama
- **Date di inizio e fine lettura** — con calcolo automatico della durata nel Compendium
- **Timer Pomodoro** — sessioni configurabili con pausa, aggiornamento pagina automatico
- **Barra di avanzamento** — pagina corrente su totale, visibile in griglia e in scheda
- **Streak giornaliera** — si incrementa solo con sessioni Pomodoro o aggiornamento pagina
- **Compendium annuale** — riepilogo statistiche, libro dell'anno, grafico mensile, export PNG
- **Profili utente** separati con icone emoji personalizzabili
- **Pagina profilo** — statistiche, libri preferiti, distintivi
- **Condivisione scheda libro** — esporta come PNG o PDF
- **12 distintivi** sbloccabili, verificati ad ogni accesso
- **Backup locale** — esporta e importa come file JSON
- **Sincronizzazione Firebase** — tra dispositivi tramite Realtime Database
- **Funzionamento offline** completo — Service Worker e IndexedDB
- **Sicurezza XSS** — escape di tutti i contenuti dinamici

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
index.html        # Struttura HTML
js/script.js      # Logica applicazione
css/master.css    # Stili
sw.js             # Service Worker per cache offline
manifest.json     # Manifest PWA per installazione nativa
icon-192.png      # Icona app 192×192
icon-512.png      # Icona app 512×512
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

L'app usa **Firebase Realtime Database** (piano gratuito Spark) per sincronizzare i dati. Ogni profilo ha il proprio spazio separato.

### Configurazione iniziale

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

- **⬆ Carica** — invia i dati locali su Firebase
- **⬇ Scarica** — recupera i dati da Firebase

> Le copertine caricate dalla galleria vengono salvate in base64 e sincronizzate insieme ai dati del libro. I backup JSON le includono automaticamente.

---

## Tecnologie utilizzate

| Tecnologia | Utilizzo |
|---|---|
| HTML / CSS / JS | App su tre file, nessuna dipendenza di build |
| IndexedDB | Persistenza locale, funziona offline |
| Service Worker | Cache offline e installazione PWA |
| Open Library API | Ricerca libri e recupero copertine |
| Firebase Realtime Database | Sincronizzazione cloud gratuita |
| html2canvas + jsPDF | Generazione schede PNG e PDF e export Compendium |
| Lora + DM Sans | Tipografia (Google Fonts) |

---

## Utilizzo offline

L'app funziona completamente offline dopo la prima apertura. Richiedono connessione internet: la ricerca libri su Open Library, la sincronizzazione Firebase, e il caricamento delle librerie CDN (html2canvas, jsPDF).

---

## Licenza

Uso personale.
