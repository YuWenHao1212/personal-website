# Tasks

Task management for personal-website project.

## Structure

```
tasks/
├── backlog/        ← Pending tasks (not started)
├── in-progress/    ← Currently working on
└── README.md       ← This file

tasks-done/         ← Completed (archived)
```

## Workflow

1. New task → `backlog/`
2. Start working → move to `in-progress/`
3. Complete → move to `tasks-done/`

## Naming Convention

`YYYY-MM-DD-task-name.md` or `task-name/` folder

## Template

```markdown
# Task Name

**Created**: YYYY-MM-DD
**Status**: Pending | In Progress | Done

## Goal

What needs to be accomplished.

## Tasks

- [ ] Subtask 1
- [ ] Subtask 2

## Notes

Additional context.
```
