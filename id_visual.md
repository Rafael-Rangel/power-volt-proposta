# Identidade Visual — KoruVision CRM

> Brand book técnico para propostas, landing e materiais comerciais · Julho 2026  
> Base do projeto: `C:\Users\GC1\Desktop\stack`

---

## 1. Marca

| Campo | Valor |
|-------|--------|
| **Nome comercial** | KoruVision CRM |
| **Nome curto** | KoruVision |
| **Plataforma interna** | Stackflow / FlowIA |
| **Tagline** | Conversas viram oportunidades / Transforme conversas em receita |
| **Subtítulo do painel** | CRM · Automações · IA |
| **Idioma** | pt-BR |

### Atenção — marcas no mesmo repositório

| Marca | Uso | Usar na proposta KoruVision? |
|-------|-----|------------------------------|
| **KoruVision CRM** | Produto CRM / marketing / trial | **Sim** |
| **ARA System / KoruSocial** | Página `/proposta` legada | **Não** (marca diferente) |

---

## 2. Logos — caminhos absolutos (Windows)

### 2.1 KoruVision (usar na proposta)

| Arquivo | Uso recomendado | Caminho absoluto | URL no app | Tamanho |
|---------|-----------------|------------------|------------|---------|
| **Logo completa** | Header, capa de proposta, PDF, slides | `C:\Users\GC1\Desktop\stack\crm\public\brand\koruvision-logo.png` | `/brand/koruvision-logo.png` | ~590 KB |
| **Mark / símbolo** | Favicon grande, avatar, ícone compacto, marca d'água | `C:\Users\GC1\Desktop\stack\crm\public\brand\koruvision-mark.png` | `/brand/koruvision-mark.png` | ~89 KB |
| **Avatar formulários (SVG)** | Placeholder de host nos forms | `C:\Users\GC1\Desktop\stack\crm\public\brand\avatar-perfil.svg` | `/brand/avatar-perfil.svg` | ~0,5 KB |

> O código referencia também `/brand/avatar-perfil.jpg`, mas **esse JPG não existe** no disco. Use o SVG ou gere um JPG depois.

### 2.2 Favicons e ícones de app

| Arquivo | Caminho absoluto | URL |
|---------|------------------|-----|
| Favicon ICO | `C:\Users\GC1\Desktop\stack\crm\public\favicon.ico` | `/favicon.ico` |
| Favicon 16×16 | `C:\Users\GC1\Desktop\stack\crm\public\favicon-16.png` | `/favicon-16.png` |
| Favicon 32×32 | `C:\Users\GC1\Desktop\stack\crm\public\favicon-32.png` | `/favicon-32.png` |
| Favicon PNG | `C:\Users\GC1\Desktop\stack\crm\public\favicon.png` | `/favicon.png` |
| App icon | `C:\Users\GC1\Desktop\stack\crm\public\icon.png` | `/icon.png` |
| Apple touch | `C:\Users\GC1\Desktop\stack\crm\public\apple-icon.png` | `/apple-icon.png` |
| App icon (Next metadata) | `C:\Users\GC1\Desktop\stack\crm\src\app\icon.png` | (App Router) |
| Apple icon (Next metadata) | `C:\Users\GC1\Desktop\stack\crm\src\app\apple-icon.png` | (App Router) |

### 2.3 Marca ARA (NÃO usar na proposta KoruVision)

| Arquivo | Caminho absoluto | URL |
|---------|------------------|-----|
| ARA logo | `C:\Users\GC1\Desktop\stack\crm\public\brand\ara-logo.png` | `/brand/ara-logo.png` |
| ARA mark | `C:\Users\GC1\Desktop\stack\crm\public\brand\ara-mark.png` | `/brand/ara-mark.png` |

Usadas em: `C:\Users\GC1\Desktop\stack\crm\src\app\proposta\page.tsx`

### 2.4 Pasta de brand (resumo)

```
C:\Users\GC1\Desktop\stack\crm\public\brand\
├── koruvision-logo.png   ← logo completa (principal)
├── koruvision-mark.png   ← símbolo / mark
├── avatar-perfil.svg     ← avatar forms
├── ara-logo.png          ← outra marca
└── ara-mark.png          ← outra marca
```

---

## 3. Paleta de cores

Fonte canônica: `C:\Users\GC1\Desktop\stack\crm\src\styles\tokens.css`

### 3.1 Cores de marca

| Token CSS | Hex | Uso |
|-----------|-----|-----|
| `--color-purple` | `#b24bff` | Primária / accent / CTAs |
| `--color-purple-soft` | `#c77dff` | Hover, highlights suaves |
| `--color-purple-deep` | `#6b21a8` | Ênfase escura, fundos de bloco |
| `--color-gold-deep` | `#803000` | Íris da logo (tom profundo) |
| `--color-gold` | `#d4620a` | Ouro/laranja da logo |
| `--color-gold-bright` | `#e8912a` | Ouro claro / warning visual |
| `--color-cyan` | `#2ee8c0` | Secundária / info / “blue” de marca |

**Cor primária default do tenant:** `#b24bff`  
Arquivo: `C:\Users\GC1\Desktop\stack\crm\src\lib\theme\branding.ts`

### 3.2 Fundos (modo dark — padrão)

| Token | Hex |
|-------|-----|
| `--color-bg-primary` | `#010208` |
| `--color-bg-secondary` | `#0a0e1c` |
| `--color-bg-tertiary` | `#12182a` |

### 3.3 Texto (modo dark)

| Token | Hex |
|-------|-----|
| `--color-text-primary` | `#f0f4ff` |
| `--color-text-secondary` | `#8b9ec4` |
| `--color-text-tertiary` | `#4b5e80` |

### 3.4 Bordas e glass

| Token | Valor |
|-------|--------|
| `--color-border` | `rgba(255, 255, 255, 0.08)` |
| `--color-border-hover` | `rgba(255, 255, 255, 0.16)` |
| `--color-border-solid` | `#1e2940` |
| `--glass-bg` | `rgba(255, 255, 255, 0.04)` |
| `--glass-bg-hover` | `rgba(255, 255, 255, 0.07)` |
| `--glass-border` | `rgba(255, 255, 255, 0.08)` |
| `--glass-blur` | `20px` |

### 3.5 Semânticas

| Token | Hex / ref | Uso |
|-------|-----------|-----|
| `--color-success` | `#14f0a0` | Sucesso |
| `--color-warning` | `#e8912a` (gold-bright) | Alerta |
| `--color-danger` | `#ff4d6a` | Erro / destrutivo |
| `--color-info` | `#2ee8c0` (cyan) | Informação |
| `--color-accent` | `#b24bff` (purple) | Acento geral |

### 3.6 Modo claro (overrides)

Quando `tema_modo = light` (`C:\Users\GC1\Desktop\stack\crm\src\lib\theme.ts`):

| Token | Hex |
|-------|-----|
| bg primary | `#f4f4f5` |
| bg secondary | `#ffffff` |
| bg tertiary | `#e4e4e7` |
| text primary | `#18181b` |
| text secondary | `#52525b` |
| text tertiary | `#71717a` |

---

## 4. Gradientes de marca

| Nome | CSS / descrição | Uso |
|------|-----------------|-----|
| **Brand principal** | `linear-gradient(120deg, #803000 0%, #d4620a 38%, #b24bff 100%)` | Hero, botões premium, faixas de marca |
| **Inverso** | `linear-gradient(120deg, #b24bff 0%, #d4620a 100%)` | Variação |
| **Gold** | `linear-gradient(135deg, #e8912a 0%, #d4620a 45%, #803000 100%)` | Destaques ouro |
| **Purple → black** | `#b24bff` → `#010208` | Fade vertical |
| **Gold → black** | `#d4620a` → `#010208` | Fade vertical |

Tokens: `--gradient-brand`, `--gradient-purple-blue`, `--gradient-gold`, etc. em `tokens.css`.

### Glow

| Token | Valor |
|-------|--------|
| `--glow-purple` | `0 0 32px rgba(178, 75, 255, 0.35)` |
| `--glow-gold` | `0 0 32px rgba(212, 98, 10, 0.32)` |

---

## 5. Tipografia

### 5.1 App CRM (padrão)

Arquivo: `C:\Users\GC1\Desktop\stack\crm\src\app\layout.tsx`

| Papel | Fonte | Variável CSS |
|-------|-------|--------------|
| UI / corpo | **Inter** | `--font-ui` |
| Display / títulos | **Geist** | `--font-display` |
| Mono | **Geist Mono** | `--font-mono` |

Uso em CSS: `C:\Users\GC1\Desktop\stack\crm\src\app\globals.css`

### 5.2 Formulários / interesse (marketing Koru)

Arquivo: `C:\Users\GC1\Desktop\stack\crm\src\app\interesse\layout.tsx`

| Papel | Fonte | Variável |
|-------|-------|----------|
| Display | **Space Grotesk** (500–700) | `--koru-font-display` |
| Corpo | **Archivo** (400–700) | `--koru-font-body` |

### 5.3 Página proposta ARA (outra marca)

Arquivo: `C:\Users\GC1\Desktop\stack\crm\src\app\proposta\layout.tsx`

| Papel | Fonte |
|-------|-------|
| Display | **Space Grotesk** |
| Corpo | **Inter** |

### 5.4 Escala de tamanho

| Token | Valor |
|-------|--------|
| `--text-xs` | 0.75rem |
| `--text-sm` | 0.875rem |
| `--text-base` | 1rem |
| `--text-lg` | 1.125rem |
| `--text-xl` | 1.5rem |
| `--text-2xl` | 2rem |
| `--text-3xl` | 2.75rem |

---

## 6. Raios, espaçamento e sombra

### Raios

| Token | Valor |
|-------|--------|
| `--radius-sm` | 8px |
| `--radius-md` | 12px |
| `--radius-lg` | 16px |
| `--radius-xl` | 24px |
| `--radius-full` | 999px |

### Espaçamento base

4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 px  
(`--space-1` … `--space-24`)

### Sombras

| Token | Valor |
|-------|--------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.3)` |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.35)` |
| `--shadow-lg` | `0 16px 40px rgba(0,0,0,0.45)` |

---

## 7. Tom visual para propostas

Sugestão de aplicação (alinhada ao produto):

| Elemento | Recomendação |
|----------|--------------|
| Fundo capa | `#010208` ou `#0a0e1c` |
| Título | `#f0f4ff` · Geist ou Space Grotesk Bold |
| Corpo | `#8b9ec4` · Inter / Archivo |
| CTA / destaque | `#b24bff` |
| Detalhe / accent secundário | `#d4620a` (ouro da logo) |
| Linha / divisor | `rgba(255,255,255,0.08)` |
| Logo na capa | `koruvision-logo.png` em fundo escuro |
| Logo em canto / rodapé | `koruvision-mark.png` |

**Evitar:** roxo genérico “AI purple” sem o ouro da íris; fundo cream/serif; misturar logo ARA com copy KoruVision.

---

## 8. Branding no código (referências)

| O quê | Caminho absoluto |
|-------|------------------|
| Tokens CSS | `C:\Users\GC1\Desktop\stack\crm\src\styles\tokens.css` |
| Theme runtime | `C:\Users\GC1\Desktop\stack\crm\src\lib\theme.ts` |
| Branding tenant | `C:\Users\GC1\Desktop\stack\crm\src\lib\theme\branding.ts` |
| Branding forms | `C:\Users\GC1\Desktop\stack\crm\src\lib\forms\branding.ts` |
| CSS forms Koru | `C:\Users\GC1\Desktop\stack\crm\src\styles\chat-form-wizard.css` |
| Home marketing | `C:\Users\GC1\Desktop\stack\crm\src\app\home\page.tsx` |
| UI branding agência | `C:\Users\GC1\Desktop\stack\crm\src\app\(agencia)\agencia\branding\page.tsx` |
| Form branding agência | `C:\Users\GC1\Desktop\stack\crm\src\components\agencia\agencia-branding-form.tsx` |
| Migration branding | `C:\Users\GC1\Desktop\stack\supabase\migrations\016_branding_agencia.sql` |
| Rebrand KoruVision | `C:\Users\GC1\Desktop\stack\supabase\migrations\064_rebrand_koruvision.sql` |

### Defaults de forms (`branding.ts`)

```
companyName: "KoruVision CRM"
hostName: "Equipe KoruVision"
hostRole: "CRM com IA para WhatsApp e omnichannel"
logoUrl: "/brand/koruvision-mark.png"
logoText: "KoruVision"
```

---

## 9. Assets da proposta ARA (referência — outra marca)

Pasta: `C:\Users\GC1\Desktop\stack\crm\public\proposta\`

| Arquivo | Caminho absoluto |
|---------|------------------|
| hero.webp | `C:\Users\GC1\Desktop\stack\crm\public\proposta\hero.webp` |
| marketing.webp | `C:\Users\GC1\Desktop\stack\crm\public\proposta\marketing.webp` |
| automacao.webp | `C:\Users\GC1\Desktop\stack\crm\public\proposta\automacao.webp` |
| infra.webp | `C:\Users\GC1\Desktop\stack\crm\public\proposta\infra.webp` |
| conteudo.webp | `C:\Users\GC1\Desktop\stack\crm\public\proposta\conteudo.webp` |
| ia.webp | `C:\Users\GC1\Desktop\stack\crm\public\proposta\ia.webp` |
| prop-funnel.webp | `C:\Users\GC1\Desktop\stack\crm\public\proposta\prop-funnel.webp` |
| prop-chip.webp | `C:\Users\GC1\Desktop\stack\crm\public\proposta\prop-chip.webp` |
| prop-gears.webp | `C:\Users\GC1\Desktop\stack\crm\public\proposta\prop-gears.webp` |
| prop-media.webp | `C:\Users\GC1\Desktop\stack\crm\public\proposta\prop-media.webp` |
| prop-shield.webp | `C:\Users\GC1\Desktop\stack\crm\public\proposta\prop-shield.webp` |
| prop-orb.webp | `C:\Users\GC1\Desktop\stack\crm\public\proposta\prop-orb.webp` |

Só reaproveite se a proposta for da marca ARA — não misture com KoruVision CRM.

---

## 10. Checklist rápido para montar a proposta

1. Abrir logo: `C:\Users\GC1\Desktop\stack\crm\public\brand\koruvision-logo.png`
2. Mark: `C:\Users\GC1\Desktop\stack\crm\public\brand\koruvision-mark.png`
3. Fundo escuro `#010208` / `#0a0e1c`
4. Primária `#b24bff` · ouro `#d4620a` · texto `#f0f4ff` / `#8b9ec4`
5. Gradiente capa: ouro → violeta (`#803000` → `#d4620a` → `#b24bff`)
6. Conteúdo de produto: `C:\Users\GC1\Desktop\stack\docs\PRODUTO-COMPLETO-KORUVISION.md`
7. **Não** usar `ara-logo.png` / `ara-mark.png` na proposta KoruVision

---

## 11. Swatch rápido (copiar/colar)

```
Primária:     #b24bff
Primária soft:#c77dff
Primária deep:#6b21a8
Ouro deep:    #803000
Ouro:         #d4620a
Ouro bright:  #e8912a
Ciano:        #2ee8c0
Bg:           #010208
Bg 2:         #0a0e1c
Bg 3:         #12182a
Texto:        #f0f4ff
Texto 2:      #8b9ec4
Texto 3:      #4b5e80
Sucesso:      #14f0a0
Perigo:       #ff4d6a
```

---

*Documento gerado a partir dos assets e tokens reais do repositório Stack / KoruVision CRM.*
