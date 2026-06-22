'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useEditor, EditorContent, type Editor as TipTapEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import { uploadImage } from './upload'
import styles from './editor.module.css'

type Props = {
  initialContent: unknown | null
  onChange: (html: string, json: unknown) => void
  // Bumping `restore.nonce` replaces the editor content with `restore.json`
  // (used when restoring a revision). null on first render.
  restore?: { json: unknown; nonce: number } | null
}

function ToolbarButton({
  active,
  onClick,
  label,
  title,
}: {
  active?: boolean
  onClick: () => void
  label: string
  title: string
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={active ? styles.tbBtnActive : styles.tbBtn}
    >
      {label}
    </button>
  )
}

function Toolbar({ editor }: { editor: TipTapEditor }) {
  const fileRef = useRef<HTMLInputElement>(null)

  const onPickImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      e.target.value = ''
      if (!file) return
      const url = await uploadImage(file)
      if (!url) return
      // Alt text is a real ranking + accessibility signal; a raw filename like
      // "Screenshot 2026-06-15.png" is worse than nothing. Prompt, defaulting to
      // a humanised filename.
      const guess = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim()
      const alt = (window.prompt('Describe this image (alt text, helps SEO & screen readers)', guess) ?? guess).trim()
      editor.chain().focus().setImage({ src: url, alt: alt || guess }).run()
    },
    [editor],
  )

  const setLink = useCallback(() => {
    const prev = editor.getAttributes('link').href as string | undefined
    const url = window.prompt('Link URL', prev || 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  return (
    <div className={styles.toolbar}>
      <ToolbarButton title="Heading 2" label="H2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
      <ToolbarButton title="Heading 3" label="H3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />
      <span className={styles.tbSep} />
      <ToolbarButton title="Bold" label="B" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} />
      <ToolbarButton title="Italic" label="I" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} />
      <ToolbarButton title="Strike" label="S" active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} />
      <ToolbarButton title="Inline code" label="‹›" active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} />
      <span className={styles.tbSep} />
      <ToolbarButton title="Bullet list" label="• List" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} />
      <ToolbarButton title="Numbered list" label="1. List" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} />
      <ToolbarButton title="Quote" label="❝" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
      <ToolbarButton title="Divider" label="―" onClick={() => editor.chain().focus().setHorizontalRule().run()} />
      <span className={styles.tbSep} />
      <ToolbarButton title="Link" label="Link" active={editor.isActive('link')} onClick={setLink} />
      <ToolbarButton title="Insert image" label="Image" onClick={() => fileRef.current?.click()} />
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onPickImage} />
    </div>
  )
}

export default function RichText({ initialContent, onChange, restore }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ inline: false }),
      Placeholder.configure({ placeholder: 'Write your post…' }),
    ],
    content: (initialContent as object) ?? '',
    onUpdate: ({ editor }) => onChange(editor.getHTML(), editor.getJSON()),
  })

  // Apply a restored revision: replace content and emit it so autosave persists.
  const nonce = restore?.nonce ?? 0
  useEffect(() => {
    if (!editor || !restore || nonce === 0) return
    editor.commands.setContent((restore.json as object) ?? '')
    onChange(editor.getHTML(), editor.getJSON())
    // Only react to a new restore signal, not to editor/onChange identity.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nonce])

  if (!editor) return <div className={styles.editorLoading}>Loading editor…</div>

  const words = editor.getText().trim().split(/\s+/).filter(Boolean).length
  const mins = Math.max(1, Math.round(words / 200))

  return (
    <div className={styles.richText}>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className={styles.prose} />
      <div className={styles.editorMeta}>
        {words.toLocaleString()} {words === 1 ? 'word' : 'words'} · {mins} min read
      </div>
    </div>
  )
}
