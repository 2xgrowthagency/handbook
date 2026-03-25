# Heartbeats vs Crons

Staff often notice two kinds of agent behavior. Some things happen quietly in the background. Other things arrive at a specific time, like clockwork.

That difference is the difference between heartbeats and crons.

The easiest way to understand it is purpose, not mechanics.

**Heartbeats** are recurring background check-ins. Think housekeeping. The agent looks around at regular intervals, checks whether anything needs attention, and keeps the system healthy — without turning every check into a message. These are the wandering-the-office tasks: look around, see what needs attention, speak up only if there's actual signal.

**Crons** are precise scheduled jobs. Think calendar alarms. They exist for tasks that need to happen at a specific time, not just "roughly throughout the day." Exact timing matters, so the system treats them differently.

That distinction explains a lot of agent behavior. If your agent is quietly monitoring active work, keeping memory tidy, or checking whether something noteworthy changed — that's heartbeat territory. If your agent sends a morning brief at a set hour or fires off a timed reminder — that's cron territory.

Why should staff care? Because it makes the silence make sense.

A healthy system doesn't narrate every maintenance action. If a heartbeat checks five things and none of them produced anything worth surfacing, the correct behavior is silence. That's not the system forgetting. That's the system doing its job without cluttering your day.

Crons are different. If something is meant to show up at a certain time, you should expect it at that time. Their whole purpose is punctuality.

One way to remember this:

- Heartbeats keep awareness alive.
- Crons keep promises on a clock.

Both matter, but they solve different problems. Without heartbeats, the system becomes reactive and brittle — it only notices things when someone asks. Without crons, the system becomes fuzzy about timing. Together they create a healthier rhythm: the agent maintains the environment quietly where it can, and surfaces punctual information where it should.

---

## How they're designed together

Heartbeats and crons aren't alternatives — they're complementary parts of the same control system. The cleanest setups give each one a distinct job and don't blur the line.

A useful pattern that emerged from practice: separate *prep* from *delivery*. An early-morning cron quietly gathers information and writes it to a file. A later cron reads that file and sends the daily brief. Neither tries to do both. This keeps each job simple, restartable, and easy to debug when something goes wrong.

The same principle applies to long-running delegated work. When an agent launches a background task that might run for an hour or more, a temporary monitor cron can check in every 20 minutes — watching for completion or failure — then cancel itself once the job is confirmed done. That's a cron doing supervision work so the heartbeat doesn't have to carry state it doesn't need.

**Ownership matters.** Each check should have one owner. If the same thing is being watched by both a heartbeat and a cron, you'll eventually get duplicate alerts or, worse, silent gaps when each assumes the other is handling it. Design them together, not independently.

So if you ever wonder why one task produced no message while another shows up like an appointment — that's the answer. One is background maintenance. The other is scheduled delivery. Housekeeping versus alarms.
