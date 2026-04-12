'use client'

import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (!rect) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)
      return { w: rect.width, h: rect.height }
    }

    let dims = resize()
    if (!dims) return
    let { w, h } = dims

    const onResize = () => { dims = resize(); if (dims) { w = dims.w; h = dims.h } }
    window.addEventListener('resize', onResize)

    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number; ps: number; po: number }[] = []
    for (let i = 0; i < 80; i++) {
      particles.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25, r: Math.random() * 1.8 + 0.4, o: Math.random() * 0.35 + 0.05, ps: Math.random() * 0.02 + 0.005, po: Math.random() * Math.PI * 2 })
    }

    let animId: number, t = 0
    function draw() {
      t++; ctx!.clearRect(0, 0, w, h)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) { ctx!.beginPath(); ctx!.moveTo(particles[i].x, particles[i].y); ctx!.lineTo(particles[j].x, particles[j].y); ctx!.strokeStyle = `rgba(176,141,87,${0.05 * (1 - dist / 140)})`; ctx!.lineWidth = 0.5; ctx!.stroke() }
        }
      }
      for (const p of particles) {
        const pulse = Math.sin(t * p.ps + p.po) * 0.15 + 0.85
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r * pulse, 0, Math.PI * 2); ctx!.fillStyle = `rgba(176,141,87,${p.o * pulse})`; ctx!.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10; if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
}
