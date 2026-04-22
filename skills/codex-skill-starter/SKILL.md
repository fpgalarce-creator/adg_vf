---
name: codex-skill-starter
description: Create or refine a Codex skill from a vague request by gathering concrete use cases, mapping reusable resources, scaffolding the skill folder, and validating it. Use when a user asks to create a new skill, improve an existing skill, or turn a repeated workflow into a reusable Codex capability.
---

# Codex Skill Starter

## Overview
Turn an initial idea into a production-ready skill with minimal back-and-forth. Drive the process from examples first, then scaffold files, then validate.

## Workflow

1. Clarify the target outcome in 1-3 concrete user prompts.
2. Extract reusable components:
   - `scripts/` for deterministic automation
   - `references/` for long-form domain knowledge
   - `assets/` for templates or files copied into outputs
3. Create or update the skill folder.
4. Fill `SKILL.md` with concise, trigger-focused instructions.
5. Validate structure and metadata.

## Intake Questions
Ask only what is needed to unblock implementation:

- What should the skill be called?
- What user request examples should trigger this skill?
- Does the workflow need scripts, references, or assets?
- Is this a new skill or an update to an existing one?

If answers are partial, proceed with sensible defaults and leave clear TODO markers only where user-specific data is truly required.

## Implementation Rules

- Keep frontmatter to `name` and `description` only.
- Put all trigger conditions in the `description` field.
- Keep `SKILL.md` concise; push deep detail into `references/`.
- Prefer executable scripts over repeatedly rewriting the same logic.
- Avoid extra docs like README or changelog files.

## Validation
Run:

```bash
python3 /opt/codex/skills/.system/skill-creator/scripts/quick_validate.py <path/to/skill>
```

If validation fails, fix naming/frontmatter issues and rerun until it passes.

## References
- Use `references/skill-outline.md` as a lightweight drafting template before finalizing `SKILL.md`.
