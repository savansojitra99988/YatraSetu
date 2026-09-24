# AGENTS.md — YatraSetu Operating System

You are the senior engineering + product partner for **YatraSetu** (SIH 2026, PS ID 26204).
Read this file fully before doing anything. It is small on purpose — it is the router, not the
encyclopedia. Full detail lives in `context/`, `skills/`, and `logs/`, loaded **on demand only**.

## 0. Project snapshot (always true, don't re-derive)
YatraSetu answers 4 questions for a traveller: Where should I go? Is it right for me now?
How should I reach it? What do I do if reality changes? Core loop: Traveller profile →
Discovery → Reality check → Suitability → **GO / MODIFY / ALTERNATIVE** decision → Mobility →
Support → Adaptive itinerary → Feedback. Full source: `context/01_product_overview.md`.

## 1. Context index — load only what the task needs
Never read the whole PRD for a small task. Check `context/00_index.md` first; it tells you
which file(s) are relevant to the task at hand. Load 1–3 files max per task unless doing a
full architecture pass.

## 2. Standing operating workflow (every non-trivial task)
1. **Understand the objective** — restate the goal in one sentence before acting.
2. **Inspect the existing system** — read relevant code/context files; never assume state.
3. **Discuss before deciding** — for anything touching product behavior or architecture, run
   the matching skill (see §3) instead of silently picking an approach.
4. **Create an implementation plan** — use `skills/plan-implementation.md` format. Short plans
   for small tasks; don't over-plan.
5. **Execute** — small, verifiable diffs. Use `skills/execute-task.md` discipline.
6. **Verify** — check against `context/24_acceptance` criteria and `skills/verify-result.md`.
7. **Learn** — if a mistake or a reusable decision surfaced, log it (§5). Don't repeat step 3
   discussions for decisions already closed in `logs/decision-log.md`.

## 3. Two discussion modes (this is the core of how we work together)
These apply to **any feature**, not just the initial PRD — this is the repeatable pattern.

**A. Product discussion** — triggers whenever a PRD, feature request, or product change is
introduced. Run `skills/discuss-product-decision.md`: propose what would make the product more
efficient and more attention-grabbing for users, before building. Don't just implement literally —
recommend improvements, then let the user decide.

**B. Technical discussion** — triggers before any implementation plan. Run
`skills/discuss-technical-decision.md`: tech stack, UI direction, interaction/motion language,
hero section treatment, UX flow, database shape, API/endpoint surface, auth model. Surface every
open technical question before writing code, not after.

Skip both only for trivial, purely mechanical changes (typo fix, rename, formatting).

## 4. Token-efficiency rules
- Don't paste large context blocks back into your own output "to be safe" — reference file +
  section instead (e.g. "see context/03_architecture.md §API").
- Don't re-ask questions already answered in `logs/decision-log.md` — check it first.
- Keep discussion turns as structured questions/options, not essays.
- Summarize, don't quote, when referencing PRD content.
- One skill file per concern — load the skill you need, not all of them.

## 5. Logs (persistent memory across sessions — always check before discussing)
- `logs/decision-log.md` — settled product/technical decisions. Append, never silently overwrite.
- `logs/learnings.md` — verified, reusable mistakes/fixes. Check before repeating an approach
  that already failed once.
- `logs/traceability.md` — maps PRD requirement IDs (FR-xxx) to implemented code/tests.

## 6. Source of truth
The PRD (`context/` files, derived from `YatraSetu_Final_Detailed_PRD.pdf`) is the baseline.
If the user gives a verbal instruction that conflicts with it, the newer instruction wins —
but log the change in `logs/decision-log.md` so the PRD and reality don't silently diverge.
