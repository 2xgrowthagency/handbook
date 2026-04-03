# Heartbeats vs Crons

Use this rule: heartbeats maintain awareness, crons keep time-based promises.

A heartbeat is your agent quietly checking the environment on a rhythm and speaking only when there is signal. Example: it scans key project topics during the day and alerts you only when something important changed. No change, no message.

A cron is a scheduled commitment that should happen at a specific time. Example: a daily brief arrives at 9:00 a.m. sharp every weekday. If it is late or missing, that is a failure.

That is the distinction most people need. Heartbeats are maintenance loops. Crons are calendar-grade deliveries.

Once you see that, behavior that felt odd starts making sense. Silence after a heartbeat pass is often success, not neglect. A missed cron is a real issue, because timing was the point.

The best systems use both without overlap. Heartbeats watch for changing conditions and keep drift under control. Crons handle exact-time workflows such as reminders, report delivery, or phased handoffs.

A useful pattern is to separate prep from delivery: one scheduled job gathers and stages information earlier, another scheduled job sends the final output at the promised time. Each step stays simple, observable, and recoverable.

When teams blur the roles, they create duplicates, gaps, or noisy alerts. When roles are clean, the rhythm feels natural: quiet upkeep in the background, punctual outputs when they matter.
