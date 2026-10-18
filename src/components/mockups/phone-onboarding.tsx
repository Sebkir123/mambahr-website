import { MambaMark } from '@/components/mamba-mark'
import s from './phone.module.css'

// The new hire's own view on their phone: their joining papers, in English or
// Spanish, signed from the link in a text message. The site shows it ahead of
// the app (founder, 2026-10-18: "we will adjust it later in the app but you can
// show it already"). Purely decorative, nothing inside is focusable.
//
// Three screens: the lock screen with the text that brings the link, the
// checklist (`signed` papers ticked, the bar filling), and the done screen.

export type PhoneStep = { label: string }

export type PhoneCopy = {
  greeting: string
  sub: string
  /** "3 de 5 listos": {n} and {total} are filled in. */
  progress: string
  steps: PhoneStep[]
  button: string
  doneTitle: string
  doneBody: string
  lockDate: string
  text: string
}

export const PHONE_ES: PhoneCopy = {
  greeting: 'Hola, Marco',
  sub: 'Empiezas el lunes 26 de octubre. Firma tus papeles antes de tu primer día.',
  progress: '{n} de {total} listos',
  steps: [
    { label: 'Tu oferta' },
    { label: 'Datos personales' },
    { label: 'Formulario I-9, parte 1' },
    { label: 'Impuestos (W-4)' },
    { label: 'Depósito directo' },
  ],
  button: 'Continuar',
  doneTitle: '¡Todo listo, Marco!',
  doneBody: 'Tus papeles están firmados. Te esperamos el lunes a las 7:00 en la obra de Dallas.',
  lockDate: 'Viernes, 23 de octubre',
  text: 'Hola Marco, bienvenido al equipo. Firma tus papeles para el lunes aquí: mambahr.com/s/k8f2',
}

export const PHONE_EN: PhoneCopy = {
  greeting: 'Hi, Marco',
  sub: 'You start Monday, October 26. Sign your papers before your first day.',
  progress: '{n} of {total} done',
  steps: [
    { label: 'Your offer' },
    { label: 'Personal details' },
    { label: 'Form I-9, part 1' },
    { label: 'Taxes (W-4)' },
    { label: 'Direct deposit' },
  ],
  button: 'Continue',
  doneTitle: 'All set, Marco!',
  doneBody: 'Your papers are signed. See you Monday at 7:00 at the Dallas site.',
  lockDate: 'Friday, October 23',
  text: 'Hi Marco, welcome to the crew. Sign your papers for Monday here: mambahr.com/s/k8f2',
}

export function PhoneOnboarding({
  copy = PHONE_ES,
  lang = 'es',
  company = 'Acme',
  screen = 'list',
  signed = 3,
  className,
}: {
  copy?: PhoneCopy
  lang?: 'en' | 'es'
  company?: string
  screen?: 'lock' | 'list' | 'done'
  /** How many papers are signed on the checklist. */
  signed?: number
  className?: string
}) {
  const total = copy.steps.length
  return (
    <div className={`${s.phone}${className ? ` ${className}` : ''}`} aria-hidden="true">
      <div className={`${s.screen}${screen === 'lock' ? ` ${s.lockScreen}` : ''}`}>
        <div className={s.status}><span>9:41</span><span className={s.island} /><span className={s.bars}><i /><i /><i /></span></div>

        {screen === 'lock' && (
          <div className={s.lock} key="lock">
            <p className={s.lockDate}>{copy.lockDate}</p>
            <p className={s.lockTime}>9:41</p>
            <TextMessage className={s.notice} from={company} body={copy.text} />
          </div>
        )}

        {screen !== 'lock' && (
          <div className={s.top}>
            <span className={s.company}>{company}</span>
            <span className={s.lang}>
              <span className={lang === 'en' ? s.langOn : ''}>English</span>
              <span className={lang === 'es' ? s.langOn : ''}>Español</span>
            </span>
          </div>
        )}

        {screen === 'list' && (
          <div className={s.view} key="list">
            <p className={s.hello}>{copy.greeting}</p>
            <p className={s.sub}>{copy.sub}</p>
            <div className={s.progressRow}>
              <span className={s.progressT}>{copy.progress.replace('{n}', String(signed)).replace('{total}', String(total))}</span>
              <span className={s.bar}><i style={{ width: `${(signed / total) * 100}%` }} /></span>
            </div>
            <ul className={s.steps}>
              {copy.steps.map((x, i) => {
                const done = i < signed
                const current = i === signed
                return (
                  <li key={x.label} className={done ? s.stepDone : current ? s.stepNow : s.step}>
                    <span className={done ? s.tick : s.dot} />
                    {x.label}
                  </li>
                )
              })}
            </ul>
            <span className={s.cta}>{copy.button}</span>
          </div>
        )}

        {screen === 'done' && (
          <div className={`${s.view} ${s.doneWrap}`} key="done">
            <span className={s.bigTick} />
            <p className={s.doneT}>{copy.doneTitle}</p>
            <p className={s.doneB}>{copy.doneBody}</p>
            <ul className={s.steps}>
              {copy.steps.map((x) => <li key={x.label} className={s.stepDone}><span className={s.tick} />{x.label}</li>)}
            </ul>
          </div>
        )}

        <span className={s.powered}><MambaMark size={10} />MambaHR</span>
      </div>
    </div>
  )
}

/** The text message that brings the link, as a notification. */
export function TextMessage({ from = 'Acme', body, time = 'now', className }: { from?: string; body: string; time?: string; className?: string }) {
  return (
    <div className={`${s.sms}${className ? ` ${className}` : ''}`} aria-hidden="true">
      <span className={s.smsIcon} />
      <span className={s.smsBody}>
        <span className={s.smsTop}><b>{from}</b><span>{time}</span></span>
        <span className={s.smsText}>{body}</span>
      </span>
    </div>
  )
}
