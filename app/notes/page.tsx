"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Note = {
  id: number;
  title: string;
  body: string;
  color: string;
  pinned: boolean;
};

const starterNotes: Note[] = [
  {
    id: 1,
    title: "A slower morning",
    body: "Coffee, open windows, and absolutely no rushing. Make a little space before the day gets loud.",
    color: "butter",
    pinned: true
  },
  {
    id: 2,
    title: "Little things to do",
    body: "Pick up a few groceries\nReply to Sam\nWater the plants",
    color: "lilac",
    pinned: false
  },
  {
    id: 3,
    title: "Idea for later",
    body: "A tiny weekend photo journal — one picture a day, no pressure to make it perfect.",
    color: "mint",
    pinned: false
  }
];

const noteColors = ["butter", "lilac", "mint", "peach"];

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState(starterNotes);
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showComposer, setShowComposer] = useState(false);
  const [error, setError] = useState("");

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return notes.filter((note) =>
      `${note.title} ${note.body}`.toLowerCase().includes(query)
    );
  }, [notes, search]);

  function addNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() && !body.trim()) {
      setError("Add a title or a thought before saving.");
      return;
    }

    setNotes((current) => [
      {
        id: Date.now(),
        title: title.trim() || "Untitled note",
        body: body.trim(),
        color: noteColors[current.length % noteColors.length],
        pinned: false
      },
      ...current
    ]);
    setTitle("");
    setBody("");
    setError("");
    setShowComposer(false);
  }

  function togglePinned(id: number) {
    setNotes((current) =>
      current.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  }

  function deleteNote(id: number) {
    setNotes((current) => current.filter((note) => note.id !== id));
  }

  return (
    <main className="notes-page">
      <header className="notes-header">
        <a className="brand notes-brand" href="/" aria-label="NoteUp home">
          <span className="brand-mark" aria-hidden="true">n.</span>
          <span>noteup</span>
        </a>
        <div className="header-actions">
          <span className="welcome-label">A fresh page, just for you</span>
          <button className="logout-button" onClick={() => router.push("/")} type="button">
            Log out <span aria-hidden="true">↗</span>
          </button>
        </div>
      </header>

      <section className="notes-content">
        <div className="notes-heading-row">
          <div>
            <p className="eyebrow">YOUR PERSONAL SPACE</p>
            <h1>Your notes<span className="heading-period">.</span></h1>
            <p className="notes-subtitle">Catch the thought before it wanders off.</p>
          </div>
          <button
            className="add-button"
            onClick={() => {
              setShowComposer((current) => !current);
              setError("");
            }}
            type="button"
          >
            <span aria-hidden="true">＋</span> New note
          </button>
        </div>

        {showComposer && (
          <form className="composer" onSubmit={addNote}>
            <input
              autoFocus
              aria-label="Note title"
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Give your note a title"
              value={title}
            />
            <textarea
              aria-label="Note content"
              onChange={(event) => setBody(event.target.value)}
              placeholder="Start writing..."
              rows={3}
              value={body}
            />
            <div className="composer-actions">
              {error && <p className="form-error composer-error" role="alert">{error}</p>}
              <button className="text-button" onClick={() => setShowComposer(false)} type="button">Cancel</button>
              <button className="primary-button save-button" type="submit">Save note <span aria-hidden="true">↗</span></button>
            </div>
          </form>
        )}

        <div className="notes-toolbar">
          <span className="notes-count">{filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}</span>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              aria-label="Search notes"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Find a thought..."
              value={search}
            />
          </label>
        </div>

        {filteredNotes.length > 0 ? (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <article className={`note-card ${note.color}`} key={note.id}>
                <div className="note-card-top">
                  <span className="note-card-label">{note.pinned ? "PINNED THOUGHT" : "A LITTLE REMINDER"}</span>
                  <button
                    aria-label={note.pinned ? "Unpin note" : "Pin note"}
                    className={`icon-button pin-button ${note.pinned ? "is-pinned" : ""}`}
                    onClick={() => togglePinned(note.id)}
                    title={note.pinned ? "Unpin note" : "Pin note"}
                    type="button"
                  >✳</button>
                </div>
                <h2>{note.title}</h2>
                <p className="note-body">{note.body}</p>
                <div className="note-card-bottom">
                  <span>JUST NOW</span>
                  <button
                    aria-label={`Delete ${note.title}`}
                    className="icon-button delete-button"
                    onClick={() => deleteNote(note.id)}
                    title="Delete note"
                    type="button"
                  >×</button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">✳</span>
            <h2>No thoughts found.</h2>
            <p>Try another search, or start a fresh note.</p>
          </div>
        )}
        <p className="notes-footer">Made for the thoughts worth keeping <span aria-hidden="true">✳</span></p>
      </section>
    </main>
  );
}
