module.exports = {
    apps: [
      {
        name: '6ac79c1ea772c1703a52118d--server',
        script: 'npm',
      interpreter: "/usr/local/bin/icod-sandbox-run",
      interpreter_args: ["/app/data/projects/6ac79c1ea772c1703a52118d"],
        args: 'start',
        cwd: './server',
        instances: 1,
        exec_mode: 'fork',
        autorestart: true,
        watch: false,
        time: true,
	max_memory_restart: '500M',
	exp_backoff_restart_delay: 100,
	min_uptime: 3000,
	max_restarts: 10,

      },
      {
        name: '6ac79c1ea772c1703a52118d--client',
        script: 'npm',
      interpreter: "/usr/local/bin/icod-sandbox-run",
      interpreter_args: ["/app/data/projects/6ac79c1ea772c1703a52118d"],
        args: 'start',
        cwd: './client',
        instances: 1,
        exec_mode: 'fork',
        autorestart: true,
        watch: false,
        time: true,
	max_memory_restart: '500M',
	exp_backoff_restart_delay: 100,
	min_uptime: 3000,
	max_restarts: 10,

      }
    ]
  };
